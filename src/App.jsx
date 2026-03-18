import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

/* ===== Social Icon SVGs ===== */
const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.258 5.63ZM17.08 19.77h1.833L7.084 4.126H5.117Z"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="3" ry="3"/>
    <path d="M7 10v7M7 7v.01M12 10v7M12 13a3 3 0 0 1 6 0v4"/>
  </svg>
)

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
  </svg>
)

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="4" width="20" height="16" rx="4" ry="4"/>
    <polygon points="10,8.5 10,15.5 16,12" fill="currentColor" stroke="none"/>
  </svg>
)

const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.069.069 0 0 0-.032.027C.533 9.048-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .077.01c.124.098.246.198.372.292a.077.077 0 0 1-.006.128 12.81 12.81 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.947 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z"/>
  </svg>
)

/* ===== Animation Variants ===== */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
}

/* ===== Question Data ===== */
const QUESTIONS = [
  {
    id: 1,
    type: 'options',
    text: 'What class are you in right now?',
    options: ['Class 9', 'Class 10', 'Class 11', 'Class 12 / Gap year']
  },
  {
    id: 2,
    type: 'options',
    text: 'Your school type?',
    options: ['Government school', 'Private school (local)', 'Private school (semi-urban)', 'Other']
  },
  {
    id: 3,
    type: 'options',
    text: 'Has anyone in your family ever studied or worked abroad?',
    options: ['No one at all', 'Someone worked abroad, not studied', 'Someone studied abroad', 'Not sure']
  },
  {
    id: 4,
    type: 'open',
    text: "How would you honestly describe your academics right now — grades, subjects you're strong in, subjects you struggle with?",
    placeholder: 'Tell us about your studies...'
  },
  {
    id: 5,
    type: 'options',
    text: 'Have you taken or are you planning any standardised tests?',
    options: ['No idea what these are', "I know about them but haven't started", 'Currently preparing', 'Already given one or more']
  },
  {
    id: 6,
    type: 'open',
    text: 'What do you genuinely enjoy doing outside school — even if it feels small or completely unrelated to studies?',
    placeholder: 'Your interests and hobbies...'
  },
  {
    id: 7,
    type: 'options-other',
    text: 'Have you done anything outside school so far?',
    options: ['Nothing yet honestly', 'School-level competitions or clubs', 'State or national level achievements'],
    otherLabel: 'Something else'
  },
  {
    id: 8,
    type: 'open',
    text: 'Which countries or universities are you dreaming about — even if they feel impossible right now?',
    placeholder: 'Dream destinations...'
  },
  {
    id: 9,
    type: 'options-other',
    text: 'Do you know what you want to study?',
    options: ['No idea yet', 'I have a rough direction', 'I know the field, not the course'],
    otherLabel: 'I know exactly what I want'
  },
  {
    id: 10,
    type: 'options',
    text: 'What does your family situation look like when it comes to funding education abroad?',
    options: ['We cannot fund this at all — need full scholarship', 'We can manage a little — need partial scholarship', 'We can manage tuition but need living cost help', 'Funding is not the main problem']
  },
  {
    id: 11,
    type: 'options-other',
    text: "What's the biggest thing confusing you about studying abroad?",
    options: ["I don't know where to even start", "I don't know if my profile is good enough", "My family isn't convinced yet"],
    otherLabel: 'Something else'
  },
  {
    id: 12,
    type: 'options',
    text: 'If you had to choose — Safely abroad, maybe not dream university vs Small chance at your dream, real chance of staying back — which would you choose?',
    options: ['Safely abroad, maybe not dream university', "Small chance at my dream, real chance of staying back", 'Somewhere in between', "I genuinely don't know yet"]
  },
  {
    id: 13,
    type: 'options',
    text: 'How likely are you to stick to a 6-month daily plan without skipping for more than 2 weeks?',
    options: ['3 or below — I struggle to stay consistent', '4–6 — I try but life gets in the way', "7–8 — I'm pretty disciplined", "9–10 — I don't stop once I start"]
  },
  {
    id: 14,
    type: 'options',
    text: 'How comfortable are you speaking in English for 10 minutes straight?',
    options: ['I panic and freeze up', "I manage but it's uncomfortable", "I'm okay, not fully confident", 'Completely comfortable']
  },
  {
    id: 15,
    type: 'options',
    text: 'Who will keep you accountable for this plan?',
    options: ['Honestly no one right now', 'Myself only', 'My parents', 'A friend, teacher or mentor']
  },
  {
    id: 16,
    type: 'open',
    text: 'If you could tell us one thing about yourself that no grade or CV ever shows — what would it be?',
    placeholder: 'Something personal about you...'
  },
  {
    id: 17,
    type: 'open',
    text: 'Anything else you want us to know? This is your space.',
    placeholder: 'Skip if nothing comes to mind',
    optional: true
  }
]

const submitToSupabase = async (answers) => {
  try {
    const response = await fetch('https://psgssqaqpqufxhuydsnu.supabase.co/rest/v1/submissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzZ3NzcWFxcHF1ZnhodXlkc251Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4MzczOTAsImV4cCI6MjA4OTQxMzM5MH0.vR50LgYZgV-WJCPtakYmRUVYcfJVesOdJoPJtJ0XbQ0',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzZ3NzcWFxcHF1ZnhodXlkc251Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4MzczOTAsImV4cCI6MjA4OTQxMzM5MH0.vR50LgYZgV-WJCPtakYmRUVYcfJVesOdJoPJtJ0XbQ0',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        name: answers.name,
        email: answers.email,
        q1: answers.q1,
        q2: answers.q2,
        q3: answers.q3,
        q4: answers.q4,
        q5: answers.q5,
        q6: answers.q6,
        q7: answers.q7,
        q8: answers.q8,
        q9: answers.q9,
        q10: answers.q10,
        q11: answers.q11,
        q12: answers.q12,
        q13: answers.q13,
        q14: answers.q14,
        q15: answers.q15,
        q16: answers.q16,
        q17: answers.q17,
        created_at: new Date().toISOString()
      })
    });
    console.log('Submitted successfully');
  } catch (error) {
    console.log('Submission error:', error);
  }
};

export default function App() {
  const [view, setView] = useState('landing') // landing, name-email, intro, questions, final
  const [currentQ, setCurrentQ] = useState(0)
  const [formData, setFormData] = useState({})
  const [direction, setDirection] = useState(1) // 1 for next, -1 for prev

  const spring = { type: 'spring', stiffness: 300, damping: 30 }

  const nextView = (next) => {
    setDirection(1)
    setView(next)
  }

  const handleLandingSubmit = (e) => {
    e.preventDefault()
    nextView('name-email')
  }

  const handleNameEmailSubmit = (e) => {
    e.preventDefault()
    const name = e.target.name.value
    const email = e.target.email.value
    if (!name || !email) return
    setFormData(prev => ({ ...prev, name, email }))
    nextView('intro')
  }

  const handleIntroConfirm = () => {
    nextView('questions')
  }

  const handleAnswer = (answer) => {
    const updatedData = { ...formData, [`q${currentQ + 1}`]: answer }
    setFormData(updatedData)
    
    if (currentQ < QUESTIONS.length - 1) {
      setDirection(1)
      setCurrentQ(prev => prev + 1)
    } else {
      submitToSupabase(updatedData)
      nextView('final')
    }
  }

  const handleOtherAnswer = (e) => {
    e.preventDefault()
    const text = e.target.other.value
    if (!text) return
    handleAnswer(text)
  }

  const handleOpenSubmit = (e) => {
    e.preventDefault()
    const text = e.target.response.value
    if (!QUESTIONS[currentQ].optional && !text) return
    handleAnswer(text || 'Skipped')
  }

  /* ── VIEW RENDERS ── */

  const renderLanding = () => (
    <motion.div
      key="landing"
      className="card-inner"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={spring}
    >
      <motion.div variants={itemVariants} initial="hidden" animate="visible">
        <span className="badge">For the student figuring it out alone.</span>
      </motion.div>
      <motion.h1 className="heading" variants={itemVariants} initial="hidden" animate="visible">
        Take a breath. Your path exists.
      </motion.h1>
      <motion.p className="subtext" variants={itemVariants} initial="hidden" animate="visible">
        You don't have to figure this out alone. What feels overwhelming and out of reach right now — is absolutely possible for you.
      </motion.p>
      <motion.form className="form" onSubmit={handleLandingSubmit} variants={itemVariants} initial="hidden" animate="visible">
        <motion.button
          id="submit-btn"
          className="submit-btn"
          type="submit"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.985 }}
        >
          Show me my path
        </motion.button>
      </motion.form>
      <motion.div className="socials" variants={itemVariants} initial="hidden" animate="visible">
        <a href="https://x.com/Sakshamm_mov" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="X (Twitter)"><XIcon /></a>
        <a href="https://www.linkedin.com/in/sakham-undefined-6689a43b3/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn"><LinkedInIcon /></a>
        <a href="https://www.instagram.com/saksham.mov/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram"><InstagramIcon /></a>
        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="YouTube"><YouTubeIcon /></a>
      </motion.div>
      <motion.div className="student-tagline" variants={itemVariants} initial="hidden" animate="visible">
        For the student, by the student.
      </motion.div>
    </motion.div>
  )

  const renderNameEmail = () => (
    <motion.div
      key="name-email"
      className="card-inner"
      initial={{ opacity: 0, x: 20 * direction }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 * direction }}
      transition={spring}
    >
      <h2 className="flow-subheading">Before we start, tell us a little about you.</h2>
      <form className="flow-form" onSubmit={handleNameEmailSubmit}>
        <input name="name" className="flow-input" placeholder="Your name" required />
        <input name="email" type="email" className="flow-input" placeholder="Your email address" required />
        <button type="submit" className="submit-btn primary">Let{"'"}s begin</button>
      </form>
    </motion.div>
  )

  const renderIntro = () => (
    <motion.div
      key="intro"
      className="card-inner"
      initial={{ opacity: 0, x: 20 * direction }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 * direction }}
      transition={spring}
    >
      <p className="intro-text">
        "Before we start — this is just between you and us. No judgment. No right or wrong answers. Just be completely honest. The more real you are, the better your roadmap will be."
      </p>
      <button onClick={handleIntroConfirm} className="submit-btn primary">I'm ready</button>
    </motion.div>
  )

  const renderQuestions = () => {
    const q = QUESTIONS[currentQ]
    const progress = ((currentQ + 1) / QUESTIONS.length) * 100

    return (
      <motion.div
        key={`q-${currentQ}`}
        className="card-inner flow-container"
        initial={{ opacity: 0, x: 20 * direction }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 * direction }}
        transition={spring}
      >
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
          <span className="progress-text">Question {currentQ + 1} of {QUESTIONS.length}</span>
        </div>

        <h3 className="question-text">{q.text}</h3>

        {(q.type === 'options' || q.type === 'options-other') && (
          <div className="options-grid">
            {q.options.map((opt, i) => (
              <button key={i} className="option-card" onClick={() => handleAnswer(opt)}>
                <span className="option-key">{String.fromCharCode(65 + i)}</span>
                <span className="option-val">{opt}</span>
              </button>
            ))}
            {q.type === 'options-other' && (
              <div className="other-container">
                 <div className="option-card other-trigger">
                    <span className="option-key">{String.fromCharCode(65 + q.options.length)}</span>
                    <span className="option-val">{q.otherLabel}</span>
                 </div>
                 <form className="other-form" onSubmit={handleOtherAnswer}>
                    <input name="other" className="flow-input minimal" placeholder="Please specify..." autoFocus required />
                    <button type="submit" className="continue-link">Continue →</button>
                 </form>
              </div>
            )}
          </div>
        )}

        {q.type === 'open' && (
          <form className="open-form" onSubmit={handleOpenSubmit}>
            <textarea name="response" className="flow-textarea" placeholder={q.placeholder} autoFocus required={!q.optional} />
            {q.optional && <span className="muted-hint">Skip if nothing comes to mind</span>}
            <button type="submit" className="submit-btn primary mt-2">Continue →</button>
          </form>
        )}
      </motion.div>
    )
  }

  const renderFinal = () => (
    <motion.div
      key="final"
      className="card-inner final-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={spring}
    >
      <p className="final-message">
        "You just did something most people never do — you were honest about where you are and brave enough to imagine where you could be. That takes more courage than any exam.<br /><br />
        Your roadmap is being built. We'll be in touch soon.<br /><br />
        Whatever happens next — you were always capable of more than they told you."
      </p>
      <div className="signature">— Saksham</div>
      
      <motion.div 
        className="discord-section"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="discord-content">
          <div className="discord-icon"><DiscordIcon /></div>
          <p className="discord-text">
            "We{"'"}re building a community where students like you share opportunities, support each other, and find peers who actually get it."
          </p>
        </div>
        <a href="https://discord.gg/ucN9WfjM" target="_blank" rel="noopener noreferrer" className="discord-btn">
          Join our Discord
        </a>
      </motion.div>
    </motion.div>
  )

  return (
    <div className="page">
      {/* ── Rotating Background Orbs ── */}
      <div className="bg-scene">
        <div className="bg-rotator rotator-a"><div className="bg-orb orb-a" /></div>
        <div className="bg-rotator rotator-b"><div className="bg-orb orb-b" /></div>
        <div className="bg-rotator rotator-c"><div className="bg-orb orb-c" /></div>
      </div>

      {/* ── Card ── */}
      <motion.div className="card" variants={cardVariants} initial="hidden" animate="visible">
        <div className="card-glow" />
        <AnimatePresence mode="wait" custom={direction}>
          {view === 'landing' && renderLanding()}
          {view === 'name-email' && renderNameEmail()}
          {view === 'intro' && renderIntro()}
          {view === 'questions' && renderQuestions()}
          {view === 'final' && renderFinal()}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
