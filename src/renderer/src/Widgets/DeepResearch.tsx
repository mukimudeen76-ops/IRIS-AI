import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Globe, FileText, Cpu, CheckCircle2, Network } from 'lucide-react'

gsap.registerPlugin(useGSAP)

export default function ResearchWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [statusText, setStatusText] = useState('Initializing RAG Pipeline...')
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null)
  const [summary, setSummary] = useState<string>('')

  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  const { contextSafe } = useGSAP({ scope: containerRef })

  useEffect(() => {
    if (!window.electron?.ipcRenderer) return

    const handleStart = (_event: any, data: { query: string }) => {
      setQuery(data.query)
      setIsSuccess(null)
      setSummary('')
      setIsOpen(true)
      setStatusText('Booting Deep Search Node...')
      if (progressRef.current) gsap.to(progressRef.current, { width: '5%', duration: 0.5 })
    }

    const handleProgress = contextSafe(
      (_event: any, data: { status: string; file: string; totalFound: number }) => {
        if (textRef.current) {
          gsap.to(textRef.current, {
            y: -10,
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
              setStatusText(data.file)
              gsap.to(textRef.current, { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' })
            }
          })
        }
        if (progressRef.current) {
          const percentage = data.totalFound === 1 ? '35%' : data.totalFound === 2 ? '70%' : '90%'
          gsap.to(progressRef.current, { width: percentage, duration: 1.2, ease: 'expo.out' })
        }
      }
    )

    const handleDone = contextSafe((_event: any, data: { success: boolean; summary?: string }) => {
      const success = data.success
      setIsSuccess(success)

      if (success && data.summary) {
        setSummary(data.summary)
      }

      if (textRef.current) {
        gsap.to(textRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.2,
          onComplete: () => {
            setStatusText(success ? 'RAG Pipeline Complete & Synthesized.' : 'Pipeline Terminated.')
            gsap.to(textRef.current, { opacity: 1, y: 0, duration: 0.3 })
          }
        })
      }

      if (progressRef.current) {
        gsap.to(progressRef.current, {
          width: '100%',
          backgroundColor: success ? '#10b981' : '#ef4444',
          duration: 0.6,
          ease: 'power3.out'
        })
      }

      // Close the widget after 8 seconds so user can read the results
      setTimeout(() => setIsOpen(false), 8000)
    })

    window.electron.ipcRenderer.on('deep-research-start', handleStart)
    window.electron.ipcRenderer.on('deep-research-done', handleDone)
    window.electron.ipcRenderer.on('oracle-progress', handleProgress)

    return () => {
      window.electron.ipcRenderer.removeListener('deep-research-start', handleStart)
      window.electron.ipcRenderer.removeListener('deep-research-done', handleDone)
      window.electron.ipcRenderer.removeListener('oracle-progress', handleProgress)
    }
  }, [contextSafe])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(15px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 min-h-75 bg-black/60 backdrop-blur-3xl border border-white/10 rounded-2xl p-8 shadow-[0_0_80px_rgba(0,0,0,0.9)] z-9999 text-white font-sans overflow-hidden flex flex-col justify-center"
        >
          <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4 relative z-10">
            <div className="flex items-center gap-3">
              <Network className="w-6 h-6 text-cyan-400 animate-pulse" />
              <h3 className="text-sm font-bold tracking-[0.3em] text-cyan-400 uppercase">
                Autonomous RAG Agent
              </h3>
            </div>
            {isSuccess === true && (
              <CheckCircle2 className="w-6 h-6 text-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)] rounded-full" />
            )}
          </div>

          <div className="mb-6 relative z-10">
            <p className="text-xs text-gray-400 uppercase tracking-[0.2em] mb-2 font-semibold">
              Active Query
            </p>
            <p className="text-lg font-medium text-gray-100 leading-relaxed border-l-2 border-cyan-500 pl-4">
              {query}
            </p>
          </div>

          <div className="flex items-center gap-4 mb-6 bg-black/40 py-3 px-4 rounded-lg border border-white/5 relative z-10">
            {statusText.includes('Tavily') ? (
              <Globe
                className="w-5 h-5 text-cyan-500 animate-spin"
                style={{ animationDuration: '3s' }}
              />
            ) : statusText.includes('Llama') ? (
              <Cpu className="w-5 h-5 text-purple-500 animate-pulse" />
            ) : (
              <FileText className="w-5 h-5 text-emerald-500" />
            )}
            <div ref={textRef} className="text-sm text-gray-300 font-mono tracking-wider">
              {statusText}
            </div>
          </div>

          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-4 relative z-10">
            <div
              ref={progressRef}
              className="h-full bg-cyan-500 rounded-full w-0 shadow-[0_0_15px_rgba(6,182,212,0.8)]"
            />
          </div>

          <AnimatePresence>
            {summary && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="mt-4 p-4 bg-emerald-950/20 border border-emerald-500/20 rounded-lg relative z-10 max-h-37.5 overflow-y-auto custom-scrollbar"
              >
                <p className="text-[10px] text-emerald-400/80 uppercase tracking-widest mb-2 font-bold">
                  Data Extracted
                </p>
                <p className="text-xs text-gray-300 font-mono leading-relaxed whitespace-pre-wrap">
                  {summary}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
