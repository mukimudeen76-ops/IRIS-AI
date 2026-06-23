import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const api = {}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', {
      ...electronAPI,
      ipcRenderer: {
        ...electronAPI.ipcRenderer,
        invoke: (channel: string, ...args: any[]) => ipcRenderer.invoke(channel, ...args)
      }
    })
    contextBridge.exposeInMainWorld('api', api)


    contextBridge.exposeInMainWorld('irisAgent', {
      startResearch: (query: string) => ipcRenderer.invoke('trigger-deep-research', { query }),

      onProgress: (callback: (payload: any) => void) => {
        const subscription = (_event: any, payload: any) => callback(payload)
        ipcRenderer.on('oracle-progress', subscription)
        return () => ipcRenderer.removeListener('oracle-progress', subscription)
      },
      onStart: (callback: (payload: any) => void) => {
        const subscription = (_event: any, payload: any) => callback(payload)
        ipcRenderer.on('deep-research-start', subscription)
        return () => ipcRenderer.removeListener('deep-research-start', subscription)
      },
      onDone: (callback: (payload: any) => void) => {
        const subscription = (_event: any, payload: any) => callback(payload)
        ipcRenderer.on('deep-research-done', subscription)
        return () => ipcRenderer.removeListener('deep-research-done', subscription)
      }
    })
  } catch (error) {}
} else {
  // @ts-ignore (define in dts)
  window.electron = {
    ...electronAPI,
    ipcRenderer: {
      ...electronAPI.ipcRenderer,
      invoke: ipcRenderer.invoke.bind(ipcRenderer)
    }
  }
  // @ts-ignore (define in dts)
  window.api = api
}
