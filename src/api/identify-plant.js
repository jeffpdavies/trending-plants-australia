const Anthropic = require("@anthropic-ai/sdk")

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const { imageDataUrl } = req.body
    if (!imageDataUrl) {
      return res.status(400).json({ error: "No image provided" })
    }

    const matches = imageDataUrl.match(/^data:(.+);base64,(.+)$/)
    if (!matches) {
      return res.status(400).json({ error: "Invalid image format" })
    }
    const mediaType = matches[1]
    const base64Data = matches[2]

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 400,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: { type: "base64", media_type: mediaType, data: base64Data },
            },
            {
              type: "text",
              text: 'Identify this plant. Respond with JSON only, no markdown, in this exact format: {"commonName": "Common Name", "scientificName": "Scientific name", "confidence": "High", "careTips": ["Tip one", "Tip two", "Tip three"]}. confidence must be exactly "High", "Medium", or "Low". careTips must be exactly 3 short strings.',
            },
          ],
        },
      ],
    })

    const text = response.content[0].text.trim()
    const parsed = JSON.parse(text)

    const validConfidence = ["High", "Medium", "Low"]
    const result = {
      commonName: parsed.commonName || "Unknown plant",
      scientificName: parsed.scientificName || "",
      confidence: validConfidence.includes(parsed.confidence) ? parsed.confidence : "Medium",
      careTips: Array.isArray(parsed.careTips) ? parsed.careTips.slice(0, 3) : [],
    }

    return res.status(200).json(result)
  } catch (err) {
    console.error("Plant ID error:", err)
    return res.status(500).json({ error: "Plant identification failed. Please try again." })
  }
}

// Attach config after function definition so it isn't overwritten by module.exports
handler.config = {
  bodyParser: {
    json: { limit: "10mb" },
  },
}

module.exports = handler
