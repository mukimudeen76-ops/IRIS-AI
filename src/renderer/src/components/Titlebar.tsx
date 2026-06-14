import { useState, useEffect } from 'react'
import {
  RiSubtractLine,
  RiCloseLine,
  RiCheckboxBlankLine,
  RiCheckboxMultipleBlankLine
} from 'react-icons/ri'

const TitleBar = () => {
  const [isMaximized, setIsMaximized] = useState(false)
  const [isMac, setIsMac] = useState(false)

  useEffect(() => {
    if (window.electron && window.electron.process) {
      setIsMac(window.electron.process.platform === 'darwin')
    } else {
      setIsMac(navigator.userAgent.toLowerCase().includes('mac'))
    }
  }, [])

  const minimize = () => window.electron.ipcRenderer.send('window-min')
  const toggleMaximize = () => {
    setIsMaximized(!isMaximized)
    window.electron.ipcRenderer.send('window-max')
  }
  const close = () => window.electron.ipcRenderer.send('window-close')

  return (
    <div className="w-full h-12 flex items-center justify-between bg-zinc-950/90 backdrop-blur-md border-b border-white/5 drag-region select-none z-50 relative">
      {/* Precision Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/15 to-transparent pointer-events-none" />

      {/* LEFT SECTION: Platform Window Controls / Brand Icon */}
      <div className="flex items-center h-full pl-4 z-50 no-drag min-w-[120px]">
        {isMac ? (
          <div className="flex items-center gap-2 group/lights">
            <button
              onClick={close}
              className="w-3 h-3 rounded-full bg-[#ff5f56] border border-black/10 flex items-center justify-center transition-all duration-150 active:brightness-70"
            >
              <RiCloseLine
                size={8}
                className="opacity-0 group-hover/lights:opacity-100 text-[#4c0002] transition-opacity duration-150 font-bold"
              />
            </button>
            <button
              onClick={minimize}
              className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-black/10 flex items-center justify-center transition-all duration-150 active:brightness-70"
            >
              <RiSubtractLine
                size={8}
                className="opacity-0 group-hover/lights:opacity-100 text-[#5c3e00] transition-opacity duration-150 font-bold"
              />
            </button>
            <button
              onClick={toggleMaximize}
              className="w-3 h-3 rounded-full bg-[#27c93f] border border-black/10 flex items-center justify-center transition-all duration-150 active:brightness-70"
            >
              <RiCheckboxBlankLine
                size={6}
                className="opacity-0 group-hover/lights:opacity-100 text-[#024d04] transition-opacity duration-150 font-bold"
              />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2.5 opacity-90">
            <div className="relative flex items-center justify-center w-5 h-5">
              <div className="absolute inset-0 rounded bg-emerald-500/10 blur-sm animate-pulse" />
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-4 h-4 text-emerald-400 relative z-10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" x2="12" y1="19" y2="22" />
              </svg>
            </div>
            <span className="text-xs font-bold font-mono tracking-widest text-zinc-300">IRIS</span>
          </div>
        )}
      </div>

      {/* CENTER SECTION: Global Environment Status Readout */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3.5 pointer-events-none">
        {/* Responsive Micro Waveform */}
        <div className="flex items-center gap-0.5 h-3">
          {[0.4, 0.8, 0.5, 0.3].map((delay, i) => (
            <div
              key={i}
              className="w-0.5 bg-emerald-400 rounded-full opacity-80"
              style={{
                height: i === 0 || i === 3 ? '50%' : '100%',
                animation: `pulse 1.6s infinite ease-in-out`,
                animationDelay: `${delay}s`,
                boxShadow: '0 0 6px rgba(52, 211, 153, 0.4)'
              }}
            />
          ))}
        </div>

        {/* Status Copy */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-zinc-200 tracking-widest uppercase font-mono">
            IRIS
          </span>
          <span className="text-xs text-zinc-700 font-mono select-none">/</span>
          <span className="text-xs font-medium text-zinc-500 tracking-wider uppercase font-mono">
            {isMac ? 'macOS.Core' : 'System.Enclave'}
          </span>
        </div>

        {/* Live System Beacon */}
        <div className="relative flex items-center justify-center w-2 h-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500/30 animate-ping" />
          <span
            className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"
            style={{ boxShadow: '0 0 8px rgba(52, 211, 153, 0.8)' }}
          />
        </div>
      </div>

      {/* RIGHT SECTION: Window Action Button Strip (Windows) or Balance Spacer (Mac) */}
      <div className="flex h-full no-drag z-50 min-w-[120px] justify-end">
        {!isMac ? (
          <div className="flex h-full items-center">
            <button
              onClick={minimize}
              className="w-12 h-full flex items-center justify-center text-zinc-400 hover:text-zinc-100 hover:bg-white/5 transition-colors duration-150"
              title="Minimize"
            >
              <RiSubtractLine size={16} />
            </button>
            <button
              onClick={toggleMaximize}
              className="w-12 h-full flex items-center justify-center text-zinc-400 hover:text-zinc-100 hover:bg-white/5 transition-colors duration-150"
              title={isMaximized ? 'Restore' : 'Maximize'}
            >
              {isMaximized ? (
                <RiCheckboxMultipleBlankLine size={14} />
              ) : (
                <RiCheckboxBlankLine size={14} />
              )}
            </button>
            <button
              onClick={close}
              className="w-12 h-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-red-500/80 transition-colors duration-150"
              title="Close"
            >
              <RiCloseLine size={18} />
            </button>
          </div>
        ) : (
          /* Empty structural balance block for proper macOS center alignment */
          <div className="w-12 h-full pointer-events-none" />
        )}
      </div>
    </div>
  )
}

export default TitleBar
