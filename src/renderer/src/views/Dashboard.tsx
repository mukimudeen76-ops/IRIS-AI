import { useState } from 'react'
import { Camera, Mic, MicOff, Phone, PhoneOff, Monitor, X } from 'lucide-react'
import RightPanel from '@renderer/components/UI/RightPanel'
import LeftPanels from '@renderer/components/UI/LeftPanels'
import AICore from '@renderer/components/UI/AICore'
import { Status } from '@renderer/types/panel'

export default function Dashboard({
  isConnected,
  toggleConnection,
  systemStatus,
  isSpeaking,
  isMuted,
  handleMicToggle
}: {
  isConnected: boolean
  toggleConnection: () => void
  systemStatus: Status
  isSpeaking: boolean
  isMuted: boolean
  handleMicToggle: () => void
}) {
  const [visionMode, setVisionMode] = useState<'off' | 'camera' | 'screen'>('off')
  const [showVisionMenu, setShowVisionMenu] = useState(false)

  const changeVisionMode = (mode: 'off' | 'camera' | 'screen') => {
    setVisionMode(mode)
    setShowVisionMenu(false)
  }

  return (
    <div className="h-full w-full bg-transparent flex flex-col relative selection:bg-[#00ff41]/30">
      <div className="absolute top-[10%] left-[-5%] w-[40vw] h-[40vw] bg-[#00ff41] rounded-full mix-blend-screen blur-[180px] opacity-5 pointer-events-none z-0"></div>
      <div className="absolute bottom-[10%] right-[-5%] w-[30vw] h-[30vw] bg-[#00ff41] rounded-full mix-blend-screen blur-[150px] opacity-5 pointer-events-none z-0"></div>

      <main className="flex-1 min-h-0 grid grid-cols-12 gap-6 p-6 relative z-10">
        <div className="col-span-3 flex flex-col gap-6 z-10 min-h-0">
          <LeftPanels status={systemStatus} visionMode={visionMode} />
        </div>

        <div className="col-span-6 relative flex flex-col justify-end items-center pb-8 min-h-0">
          <AICore isConnected={isConnected} isSpeaking={isSpeaking} />

          {/* ─── Control Deck ─── */}
          <div className="flex items-center gap-3 bg-[#050505]/80 backdrop-blur-3xl border border-white/10 p-2 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-20">
            {/* ── VISION MENU TOGGLE ── */}
            <div className="relative flex items-center justify-center">
              {/* Floating Menu */}
              {showVisionMenu && isConnected && (
                <div className="absolute bottom-full mb-4 flex flex-col gap-1 p-1.5 bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,255,65,0.1)] z-50 origin-bottom animate-in zoom-in-95 duration-200">
                  <button
                    onClick={() => changeVisionMode('camera')}
                    className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all font-mono text-[10px] tracking-widest uppercase ${visionMode === 'camera' ? 'bg-[#00ff41]/20 text-[#00ff41]' : 'hover:bg-white/5 text-slate-400 hover:text-white'}`}
                  >
                    <Camera size={14} /> Optics
                  </button>
                  <button
                    onClick={() => changeVisionMode('screen')}
                    className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all font-mono text-[10px] tracking-widest uppercase ${visionMode === 'screen' ? 'bg-cyan-500/20 text-cyan-400' : 'hover:bg-white/5 text-slate-400 hover:text-white'}`}
                  >
                    <Monitor size={14} /> Display
                  </button>
                  <div className="h-px w-full bg-white/10 my-1"></div>
                  <button
                    onClick={() => changeVisionMode('off')}
                    className="flex items-center gap-3 px-4 py-2 rounded-xl transition-all font-mono text-[10px] tracking-widest uppercase hover:bg-red-500/20 text-slate-500 hover:text-red-400"
                  >
                    <X size={14} /> Disable
                  </button>
                </div>
              )}

              {/* Base Button */}
              <button
                onClick={() => isConnected && setShowVisionMenu(!showVisionMenu)}
                disabled={!isConnected}
                className={`cursor-pointer w-12 h-12 flex items-center justify-center rounded-full border transition-all duration-300 ${
                  !isConnected
                    ? 'opacity-30 cursor-not-allowed bg-white/5 text-slate-600 border-transparent'
                    : visionMode === 'camera'
                      ? 'bg-[#00ff41]/10 text-[#00ff41] border-[#00ff41]/30 hover:bg-[#00ff41]/20 shadow-[0_0_15px_rgba(0,255,65,0.2)]'
                      : visionMode === 'screen'
                        ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.2)]'
                        : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border-transparent hover:border-white/10'
                }`}
              >
                {visionMode === 'screen' ? (
                  <Monitor size={20} strokeWidth={1.5} />
                ) : (
                  <Camera size={20} strokeWidth={1.5} />
                )}
              </button>
            </div>

            {/* ── CORE CONNECTION TOGGLE ── */}
            <div
              onClick={toggleConnection}
              className={`flex items-center gap-4 cursor-pointer px-2 py-2 rounded-full border transition-all duration-500 ${
                isConnected
                  ? 'bg-red-500/10 border-red-500/30 hover:bg-red-500/20'
                  : 'bg-[#00ff41]/10 border-[#00ff41]/30 hover:bg-[#00ff41]/20'
              }`}
            >
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full text-white transition-all shadow-lg ${
                  isConnected
                    ? 'bg-red-500 shadow-red-500/40'
                    : 'bg-[#00ff41] text-black shadow-[#00ff41]/40'
                }`}
              >
                {isConnected ? (
                  <PhoneOff size={18} strokeWidth={2} />
                ) : (
                  <Phone size={18} strokeWidth={2} />
                )}
              </div>

              <div className="flex flex-col justify-center pr-4 min-w-30">
                <span
                  className={`text-[10px] tracking-widest font-mono font-bold uppercase transition-colors ${isConnected ? 'text-red-400' : 'text-[#00ff41]'}`}
                >
                  {systemStatus === 'CONNECTING'
                    ? 'INITIALIZING...'
                    : isConnected
                      ? 'System Active'
                      : 'Standby Mode'}
                </span>
                <span className="text-[9px] text-slate-500 tracking-wider font-mono mt-0.5">
                  {isConnected ? 'LIVE FEED ON' : 'AWAITING LINK'}
                </span>
              </div>
            </div>

            {/* ── MIC MUTE TOGGLE ── */}
            <button
              onClick={handleMicToggle}
              disabled={!isConnected}
              className={`w-12 h-12 flex items-center justify-center rounded-full border transition-all duration-300 ${
                !isConnected
                  ? 'opacity-30 cursor-not-allowed bg-white/5 text-slate-600 border-transparent'
                  : isMuted
                    ? 'bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20 cursor-pointer'
                    : 'bg-white/5 text-slate-300 border-white/10 hover:text-white hover:bg-white/10 cursor-pointer'
              }`}
            >
              {isMuted ? (
                <MicOff size={20} strokeWidth={1.5} />
              ) : (
                <Mic size={20} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>

        <div className="col-span-3 h-full flex flex-col z-10 min-h-0">
          <RightPanel />
        </div>
      </main>
    </div>
  )
}
