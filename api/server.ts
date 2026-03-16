/**
 * Local development server for /api/* endpoints.
 * Run with: npx tsx api/server.ts
 * Vite proxies /api/* to this server on port 3001.
 */
import { createServer, IncomingMessage, ServerResponse } from 'http'
import { config } from 'dotenv'
import Anthropic from '@anthropic-ai/sdk'

config() // load .env

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

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk: Buffer) => { data += chunk.toString() })
    req.on('end', () => resolve(data))
    req.on('error', reject)
  })
}

const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }

  if (req.url === '/api/chat' && req.method === 'POST') {
    try {
      const raw = await readBody(req)
      const body = JSON.parse(raw) as { messages: ChatMessage[] }

      const apiKey = process.env.ANTHROPIC_API_KEY
      if (!apiKey) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'ANTHROPIC_API_KEY not set in .env' }))
        return
      }

      const client = new Anthropic({ apiKey })
      const response = await client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 300,
        system: SYSTEM_PROMPT,
        messages: body.messages,
      })

      const textBlock = response.content.find((b) => b.type === 'text')
      const reply = textBlock && textBlock.type === 'text' ? textBlock.text : ''

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ reply }))
    } catch (err) {
      console.error(err)
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'Internal server error' }))
    }
    return
  }

  res.writeHead(404, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ error: 'Not found' }))
})

const PORT = 3001
server.listen(PORT, () => {
  console.log(`[dev-api] listening on http://localhost:${PORT}`)
})
