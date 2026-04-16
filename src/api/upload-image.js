const fs = require("fs")
const path = require("path")

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  // Writing to the local filesystem only makes sense during development.
  if (process.env.NODE_ENV !== "development") {
    return res.status(400).json({
      error:
        "This endpoint only works during local development (npm run develop). " +
        "To publish images, commit static/gallery/ and the updated src/data/gallery.js.",
    })
  }

  try {
    const { images } = req.body

    if (!Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ error: "No images provided." })
    }

    const projectRoot = process.cwd()
    const galleryDir = path.join(projectRoot, "static", "gallery")
    fs.mkdirSync(galleryDir, { recursive: true })

    // Write each image file to static/gallery/
    const newEntries = {}
    for (const { plantName, fileName, fileData } of images) {
      if (!plantName || !fileName || !fileData) {
        return res.status(400).json({ error: "Missing fields for one or more images." })
      }
      fs.writeFileSync(path.join(galleryDir, fileName), Buffer.from(fileData, "base64"))
      newEntries[plantName] = `/gallery/${fileName}`
    }

    // Patch the imageMap block in src/data/gallery.js
    const galleryJsPath = path.join(projectRoot, "src", "data", "gallery.js")
    let content = fs.readFileSync(galleryJsPath, "utf8")

    content = content.replace(
      /(export const imageMap = \{)([\s\S]*?)(\})/,
      (_, open, inner, close) => {
        let body = inner
        for (const [name, imgPath] of Object.entries(newEntries)) {
          const esc = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
          const existing = new RegExp(`[ \\t]*"${esc}":[^\\n]+\\n?`)
          const line = `  "${name}": "${imgPath}",\n`
          body = existing.test(body)
            ? body.replace(existing, line)
            : body.trimEnd() + "\n" + line
        }
        return `${open}${body}${close}`
      }
    )

    fs.writeFileSync(galleryJsPath, content)

    return res.status(200).json({ success: true, count: images.length })
  } catch (err) {
    console.error("[upload-image]", err)
    return res.status(500).json({ error: err.message })
  }
}

handler.config = {
  bodyParser: {
    json: { limit: "10mb" },
  },
}

module.exports = handler
