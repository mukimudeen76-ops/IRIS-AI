import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiMapPin2Fill, RiCloseLine, RiRouteFill, RiTimeLine } from 'react-icons/ri'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix default Leaflet icon paths in Vite/React
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
})
L.Marker.prototype.options.icon = DefaultIcon

export default function LeafletMapWidget() {
  const [mapData, setMapData] = useState<any>(null)

  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const layersRef = useRef<L.Layer[]>([])

  // ── 1. Listen for AI Backend Commands ──
  useEffect(() => {
    if (!window.electron?.ipcRenderer) return

    const handleMapUpdate = (_event: any, data: any) => {
      setMapData({ mode: 'point', ...data })
    }

    const handleMapRoute = (_event: any, data: any) => {
      setMapData({ mode: 'route', ...data })
    }

    window.electron.ipcRenderer.on('map-update', handleMapUpdate)
    window.electron.ipcRenderer.on('map-route', handleMapRoute)

    return () => {
      window.electron.ipcRenderer.removeAllListeners('map-update')
      window.electron.ipcRenderer.removeAllListeners('map-route')
    }
  }, [])

  // ── 2. Direct Vanilla Leaflet Integration (Crash-Proof) ──
  useEffect(() => {
    if (!mapData || !mapContainerRef.current) return

    // Initialize Map only once
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapContainerRef.current, {
        zoomControl: false, // We hide the default ugly zoom buttons
        attributionControl: false
      })

      // Load Premium Dark Mode Tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(
        mapInstanceRef.current
      )
    }

    const map = mapInstanceRef.current

    // Clear previous markers and routes
    layersRef.current.forEach((layer) => map.removeLayer(layer))
    layersRef.current = []

    // Draw Single Location
    if (mapData.mode === 'point') {
      map.flyTo([mapData.lat, mapData.lng], 13, { duration: 1.5 })

      const marker = L.marker([mapData.lat, mapData.lng])
        .bindPopup(`<strong style="font-family: sans-serif;">${mapData.name}</strong>`)
        .addTo(map)

      layersRef.current.push(marker)
    }

    // Draw Navigation Route
    else if (mapData.mode === 'route') {
      const startMarker = L.marker(mapData.start)
        .bindPopup(`Origin: ${mapData.info.origin}`)
        .addTo(map)

      const endMarker = L.marker(mapData.end)
        .bindPopup(`Destination: ${mapData.info.destination}`)
        .addTo(map)

      const routeLine = L.polyline(mapData.path, {
        color: '#10b981', // Emerald 500
        weight: 4,
        opacity: 0.8,
        lineCap: 'round'
      }).addTo(map)

      layersRef.current.push(startMarker, endMarker, routeLine)

      // Automatically zoom out to fit the entire route on screen
      map.fitBounds(routeLine.getBounds(), { padding: [50, 50], duration: 1.5 })
    }
  }, [mapData])

  // ── 3. Cleanup Function ──
  const closeMap = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove()
      mapInstanceRef.current = null
    }
    setMapData(null)
  }

  return (
    <AnimatePresence>
      {mapData && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/80 backdrop-blur-xl p-8 font-sans">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full h-full max-w-6xl max-h-[85vh] bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          >
            {/* ── TOP HUD BAR ── */}
            <div className="absolute top-6 left-6 right-6 z-1000 flex justify-between items-start pointer-events-none">
              <div className="bg-black/80 backdrop-blur-md border border-white/10 px-5 py-3 rounded-2xl pointer-events-auto shadow-xl flex items-center gap-4">
                {mapData.mode === 'route' ? (
                  <>
                    <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                      <RiRouteFill size={20} />
                    </div>
                    <div className="flex flex-col">
                      <h2 className="text-white font-bold text-sm tracking-wide">
                        {mapData.info.origin} <span className="text-zinc-500 mx-2">→</span>{' '}
                        {mapData.info.destination}
                      </h2>
                      <div className="flex items-center gap-3 text-xs font-mono mt-1">
                        <span className="text-emerald-400 flex items-center gap-1">
                          <RiMapPin2Fill size={12} /> {mapData.info.distance}
                        </span>
                        <span className="text-zinc-600">|</span>
                        <span className="text-emerald-400 flex items-center gap-1">
                          <RiTimeLine size={12} /> {mapData.info.duration}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                      <RiMapPin2Fill size={20} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
                        Target Location
                      </span>
                      <h2 className="text-white font-bold text-base tracking-wide">
                        {mapData.name}
                      </h2>
                    </div>
                  </>
                )}
              </div>

              <button
                onClick={closeMap}
                className="bg-black/80 backdrop-blur-md border border-white/10 hover:border-red-500/50 hover:bg-red-500/10 text-zinc-400 hover:text-red-400 p-3 rounded-2xl pointer-events-auto transition-all shadow-xl cursor-pointer"
              >
                <RiCloseLine size={24} />
              </button>
            </div>

            {/* ── MAP CONTAINER (No React-Leaflet required) ── */}
            <div ref={mapContainerRef} className="flex-1 w-full bg-[#050505]" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
