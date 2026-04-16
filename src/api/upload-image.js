import fs from "fs"
import path from "path"

// Disable default body parser — we read the raw stream so there's no
// hard-coded size limit blocking large batches of base64-encoded images.
export const config = { bodyParser: false }

const readBody = req =>
  new Promise((resolve, reject) => {
    const chunks = []
    req.on("data", chunk => chunks.push(chunk))
    req.on("end", () => resolve(Buffer.concat(chunks).toString()))
    req.on("error", reject)
  })

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  // This function writes to the local filesystem, which only makes sense
  // during development. Refuse to run in production to avoid confusing errors.
  if (process.env.NODE_ENV !== "development") {
    return res.status(400).json({
      error:
        "This endpoint only works during local development (npm run develop). " +
        "To add images in production, commit them to static/gallery/ and update src/data/gallery.js.",
    })
  }

  try {
    const raw = await readBody(req)
    const { images } = JSON.parse(raw)

    if (!Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ error: "No images provided." })
    }

    const projectRoot = process.cwd()
    const galleryDir = path.join(projectRoot, "static", "gallery")
    fs.mkdirSync(galleryDir, { recursive: true })

    // Write each image file
    const newEntries = {}
    for (const { plantName, fileName, fileData } of images) {
      if (!plantName || !fileName || !fileData) {
        return res.status(400).json({ error: `Missing fields for one or more images.` })
      }
      const buffer = Buffer.from(fileData, "base64")
      fs.writeFileSync(path.join(galleryDir, fileName), buffer)
      newEntries[plantName] = `/gallery/${fileName}`
    }

    // Patch the imageMap in src/data/gallery.js
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

    res.status(200).json({ success: true, count: images.length })
  } catch (err) {
    console.error("[upload-image]", err)
    res.status(500).json({ error: err.message })
  }
}
