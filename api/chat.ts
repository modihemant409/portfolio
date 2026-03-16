import type { VercelRequest, VercelResponse } from '@vercel/node'
import Anthropic from '@anthropic-ai/sdk'

const SYSTEM_PROMPT = `You are an AI assistant representing Hemant Modi, a Tech Lead with 4+ years of experience in health-tech. Answer recruiter and hiring manager questions about Hemant professionally and concisely. Keep answers under 120 words. Use bullet points for lists.

Key facts about Hemant:
- Tech Lead at Visit Health (VisitApp), Noida — Dec 2022 to present
- Expert: Node.js, TypeScript, React, Apache Kafka, MySQL, Redis, Elasticsearch, AWS
- Major projects: FWA fraud detection system (20+ signals), AI medical digitisation pipeline (Gemini+OpenAI+Kafka), greenfield TypeScript cashless insurance backend (primary author, 33% commits), OCR microservice (AWS Textract + Vertex AI)
- 800+ production commits, 30+ enterprise clients, systems serve millions of users
- Previous: Celebal Tech (chatbot SDK, Microsoft Bot Framework), iWebwiser (e-learning platform, Node.js + Laravel)
- Education: BCA from MGSU Bikaner (2021)
- Contact: modihemant409@gmail.com | +91 7062896083 | github.com/modihemant409
- Open to full-time roles at product companies and MNCs`

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface RequestBody {
  messages: ChatMessage[]
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const body = req.body as RequestBody

  if (!body?.messages || !Array.isArray(body.messages)) {
    res.status(400).json({ error: 'Invalid request body' })
    return
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    res.status(500).json({ error: 'API key not configured' })
    return
  }

  try {
    const client = new Anthropic({ apiKey })

    const messages = body.messages.map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    }))

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages,
    })

    const textBlock = response.content.find((block) => block.type === 'text')
    const reply = textBlock && textBlock.type === 'text' ? textBlock.text : ''

    res.status(200).json({ reply })
  } catch (err) {
    console.error('Anthropic API error:', err)
    res.status(500).json({ error: 'Failed to get response' })
  }
}
