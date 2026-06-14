import { useState, Suspense, lazy } from 'react'
import {
  RiShieldFlashLine,
  RiLayoutGridLine,
  RiBrainLine,
  RiFolderOpenLine,
  RiPhoneLine,
  RiSettings4Line,
  RiImageLine
} from 'react-icons/ri'
import ViewSkeleton from '@renderer/components/ViewSkelrton'

import DashboardView from '../views/Dashboard'
import PhoneView from '../views/Phone'
import { Status } from '@renderer/types/panel'

// const AppsView = lazy(() => import('../views/APP'))
const WorkFlowEditorView = lazy(() => import('../views/WorkFlowEditor'))
const NotesView = lazy(() => import('../views/Notes'))
const SettingsView = lazy(() => import('../views/Settings'))
const GalleryView = lazy(() => import('../views/Gallery'))

interface IrisProps {
  isConnected: boolean
  toggleConnection: () => void
  systemStatus: Status
  isSpeaking: boolean
  isMuted: boolean
  handleMicToggle: () => void
}

const glassPanel = 'bg-zinc-950/40 backdrop-blur-xl border border-white/5 rounded-2xl shadow-xl'

const IRIS = ({
  isConnected,
  toggleConnection,
  systemStatus,
  isSpeaking,
  isMuted,
  handleMicToggle
}: IrisProps) => {
  const [activeTab, setActiveTab] = useState('DASHBOARD')

  return (
    <div className="h-screen w-full bg-black text-zinc-100 font-sans overflow-hidden select-none flex flex-col relative pb-5">
      <div className="h-14 w-full flex items-center justify-between px-6 bg-zinc-950/80 border-b border-white/5 z-50 backdrop-blur-md">
        <div className="hidden lg:flex items-center gap-3">
          <RiShieldFlashLine className="text-emerald-500 text-xl animate-pulse" />
          <div className="flex flex-col leading-none">
            <span className="font-black tracking-widest text-lg text-zinc-100">IRIS AI</span>
            <span className="text-[12px] font-mono text-emerald-500/60 tracking-wide">
              Advanced Voice Assistant
            </span>
          </div>
        </div>

        <div className="hidden md:flex gap-2 bg-black/40 p-1 rounded-lg border border-white/5">
          {[
            { id: 'DASHBOARD', icon: <RiLayoutGridLine /> },
            { id: 'Macros', icon: <RiBrainLine /> },
            // { id: 'Apps', icon: <RiFolderOpenLine /> },
            { id: 'NOTES', icon: <RiFolderOpenLine /> },
            { id: 'GALLERY', icon: <RiImageLine /> },
            { id: 'PHONE', icon: <RiPhoneLine /> },
            { id: 'SETTINGS', icon: <RiSettings4Line /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`cursor-pointer px-5 py-1.5 text-[10px] font-bold tracking-widest rounded-md transition-all duration-300 flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
              }`}
            >
              {tab.icon} {tab.id}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-zinc-900/50 via-black to-black">
        <div className={`absolute inset-0 ${activeTab === 'DASHBOARD' ? 'block' : 'hidden'}`}>
          <DashboardView
            isConnected={isConnected}
            toggleConnection={toggleConnection}
            systemStatus={systemStatus}
            isSpeaking={isSpeaking}
            isMuted={isMuted}
            handleMicToggle={handleMicToggle}
          />
        </div>

        <div className={`absolute inset-0 ${activeTab === 'PHONE' ? 'block' : 'hidden'}`}>
          <PhoneView glassPanel={glassPanel} />
        </div>

        <Suspense fallback={<ViewSkeleton />}>
          {activeTab === 'Macros' && <WorkFlowEditorView />}
          {/* {activeTab === 'Apps' && <AppsView />} */}
          {activeTab === 'NOTES' && <NotesView glassPanel={glassPanel} />}
          {/* {activeTab === 'SETTINGS' && <SettingsView isSystemActive={props.isSystemActive} />} */}
          {activeTab === 'GALLERY' && <GalleryView />}
        </Suspense>
      </div>
    </div>
  )
}

export default IRIS
