import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Contact from './components/Contact'
import ChatModal from './components/ChatModal'

function App() {
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#080810' }}>
      <Navbar onOpenChat={() => setChatOpen(true)} />
      <main>
        <Hero onOpenChat={() => setChatOpen(true)} />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <ChatModal isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  )
}

export default App
