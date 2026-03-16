import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ChatModalProps {
  isOpen: boolean
  onClose: () => void
}

const SUGGESTION_CHIPS = [
  'What has he built?',
  'Is he a good Tech Lead?',
  'Best tech skill?',
  'Open to new roles?',
]

function TypingIndicator() {
  return (
    <div className="flex gap-2 items-start">
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
        style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
      >
        H
      </div>
      <div
        className="px-3 py-2.5 rounded-2xl rounded-tl-sm border"
        style={{ background: '#1a1a28', borderColor: '#2a2a3a' }}
      >
        <div className="flex gap-1 items-center h-4">
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#6366f1] animate-bounce-dot"
          />
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#6366f1] animate-bounce-dot-2"
          />
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#6366f1] animate-bounce-dot-3"
          />
        </div>
      </div>
    </div>
  )
}

function ChatBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user'
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex gap-2 items-start ${isUser ? 'flex-row-reverse' : ''}`}
    >
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
        style={
          isUser
            ? { background: '#2a2a3a', color: '#888' }
            : { background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: 'white' }
        }
      >
        {isUser ? 'U' : 'H'}
      </div>
      <div
        className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
          isUser
            ? 'rounded-tr-sm text-white'
            : 'rounded-tl-sm border text-[#ccc]'
        }`}
        style={
          isUser
            ? { background: 'linear-gradient(135deg, #6366f1, #7c3aed)' }
            : { background: '#1a1a28', borderColor: '#2a2a3a' }
        }
      >
        {message.content}
      </div>
    </motion.div>
  )
}

export default function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hey! Ask me anything about Hemant — his projects, skills, experience, or if he's the right hire for your team.",
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [chips, setChips] = useState<string[]>(SUGGESTION_CHIPS)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  async function sendMessage(text: string) {
    if (!text.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: text.trim() }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data = (await response.json()) as { reply: string }
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Something went wrong — email modihemant409@gmail.com directly.',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  function handleChip(chip: string) {
    setChips((prev) => prev.filter((c) => c !== chip))
    void sendMessage(chip)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      void sendMessage(input)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
            onClick={onClose}
          />

          {/* Modal — slide from right on desktop, bottom sheet on mobile */}
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed z-50 flex flex-col chat-modal-panel"
            style={{
              right: 0,
              top: 0,
              bottom: 0,
              width: '100%',
              maxWidth: '440px',
              background: '#0f0f1a',
              borderLeft: '1px solid #2a2a40',
              boxShadow: '-20px 0 80px rgba(0,0,0,0.8)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile bottom-sheet overrides via CSS — handled by media query in style tag */}

            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4 border-b flex-shrink-0"
              style={{ background: '#111120', borderColor: '#1e1e30' }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-base text-white"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
                >
                  H
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#e2e2f0]">
                    Hemant's AI
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#22c55e]">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-green-400"
                      style={{ boxShadow: '0 0 4px #22c55e' }}
                    />
                    online
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-[#555] hover:text-[#e2e2f0] transition-colors text-lg leading-none p-1"
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
              {messages.map((msg, i) => (
                <ChatBubble key={i} message={msg} />
              ))}
              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestion chips */}
            {chips.length > 0 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5 flex-shrink-0">
                {chips.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => handleChip(chip)}
                    className="text-xs px-3 py-1.5 rounded-full border text-[#a78bfa] transition-colors hover:bg-[#1a1a28]"
                    style={{ borderColor: '#2a2a3a', background: 'transparent' }}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div
              className="px-4 py-3 border-t flex gap-2 flex-shrink-0"
              style={{ borderColor: '#1e1e30' }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything..."
                disabled={isLoading}
                className="flex-1 text-xs px-3.5 py-2.5 rounded-lg border text-[#e2e2f0] outline-none transition-colors placeholder-[#444] disabled:opacity-50"
                style={{
                  background: '#1a1a28',
                  borderColor: '#2a2a3a',
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = '#6366f1')
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = '#2a2a3a')
                }
              />
              <button
                onClick={() => void sendMessage(input)}
                disabled={isLoading || !input.trim()}
                className="px-4 py-2.5 rounded-lg text-white text-sm font-semibold transition-opacity disabled:opacity-40 hover:opacity-85"
                style={{ background: 'linear-gradient(135deg, #6366f1, #7c3aed)' }}
                aria-label="Send message"
              >
                →
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
