import { app } from 'electron'
import fs from 'fs/promises'
import { existsSync, mkdirSync } from 'fs'
import path from 'path'

// Define the shape of a memory entry
export interface MemoryEntry {
  fact: string
  timestamp: string
}

// Internal helper to safely resolve the path at runtime
function getMemoryFilePath(): string {
  const memoryDir = path.resolve(app.getPath('userData'), 'Memory')

  // Synchronous check/create ensures no race conditions if multiple functions fire at once
  if (!existsSync(memoryDir)) {
    mkdirSync(memoryDir, { recursive: true })
  }

  return path.join(memoryDir, 'saved-user-memory.json')
}

// Exported directly to save a new fact to the JSON bank
export async function saveCoreMemory(fact: string): Promise<boolean> {
  try {
    const filePath = getMemoryFilePath()
    let memoryBank: MemoryEntry[] = []

    try {
      const data = await fs.readFile(filePath, 'utf-8')
      memoryBank = data ? JSON.parse(data) : []
    } catch (readErr: any) {
      // If the file doesn't exist yet (ENOENT), that's fine. We just start with an empty array.
      if (readErr.code !== 'ENOENT') {
        console.error('Error reading memory file:', readErr)
      }
    }

    memoryBank.push({
      fact: fact,
      timestamp: new Date().toISOString()
    })

    await fs.writeFile(filePath, JSON.stringify(memoryBank, null, 2), 'utf-8')
    return true
  } catch (err) {
    console.error('Failed to save core memory:', err)
    return false
  }
}

// Exported directly to retrieve all stored facts
export async function searchCoreMemory(): Promise<MemoryEntry[]> {
  try {
    const filePath = getMemoryFilePath()

    try {
      const data = await fs.readFile(filePath, 'utf-8')
      return data ? JSON.parse(data) : []
    } catch (readErr: any) {
      if (readErr.code === 'ENOENT') {
        return [] // Return empty if the file hasn't been created yet
      }
      throw readErr
    }
  } catch (err) {
    console.error('Failed to search core memory:', err)
    return []
  }
}
