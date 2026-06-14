import { fetchSystemStats, fetchInstalledApps, fetchStorageDrives } from '../logic/system'
import { manageApp } from '../logic/app-control'
import { executeWebAction } from '../agent/browser-agent'
import { scanDirectoryTree } from '../logic/fileScanner'
import { Type, FunctionDeclaration } from '@google/genai'
import { openFileSystemItem } from '../logic/fileOpener'

export const systemToolDeclarations: FunctionDeclaration[] = [
  {
    name: 'get_system_stats',
    description:
      'Retrieves real-time system telemetry including CPU usage, RAM usage, CPU temperature, and Network latency.',
    parameters: { type: Type.OBJECT, properties: {} }
  },
  {
    name: 'get_installed_apps',
    description: 'Retrieves a list of all installed applications and software on the host machine.',
    parameters: { type: Type.OBJECT, properties: {} }
  },
  {
    name: 'get_storage_drives',
    description:
      'Retrieves information about the attached hard drives, including Total Space and Free Space in GB.',
    parameters: { type: Type.OBJECT, properties: {} }
  },
  {
    name: 'file_system_operation',
    description:
      'Performs a local file system operation. Use this to read, write, copy, move, delete, create directories, or list folder contents.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        action: {
          type: Type.STRING,
          description:
            'The specific operation to perform. MUST be one of: "read", "write", "append", "copy", "move", "delete", "mkdir", "list"'
        },
        targetPath: {
          type: Type.STRING,
          description:
            'The primary file or directory path to act upon (e.g., "~/Documents/project" or "C:/data.txt").'
        },
        destPath: {
          type: Type.STRING,
          description: 'The destination path. ONLY required for "copy" and "move" actions.'
        },
        content: {
          type: Type.STRING,
          description: 'The text content to inject. ONLY required for "write" and "append" actions.'
        }
      },
      required: ['action', 'targetPath']
    }
  },
  {
    name: 'manage_application',
    description:
      'Forcefully opens or completely terminates software applications running on the host machine across Windows, Mac, or Linux.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        action: {
          type: Type.STRING,
          description: 'The action to perform. MUST be either "open" or "close".'
        },
        appName: {
          type: Type.STRING,
          description:
            'The common or colloquial name of the app. Prefer clean names like "code", "chrome", "file manager", "spotify", "discord", "terminal", or "calculator". Do not append file extensions like .exe.'
        }
      },
      required: ['action', 'appName']
    }
  },
  {
    name: 'smart_web_agent',
    description:
      'A powerful web agent that can search the internet for information, or physically open media and websites for the user. STRATEGY: Use "read" to extract real-time text/news/facts. Use "play" to find and play music/videos on YouTube. Use "open" to just open a specific website in the user\'s native browser.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        query: {
          type: Type.STRING,
          description:
            'The search query (e.g., "latest AI news", "blinding lights the weeknd", "github.com").'
        },
        intent: {
          type: Type.STRING,
          description: 'MUST be one of: "read", "play", "open"'
        }
      },
      required: ['query', 'intent']
    }
  },
  {
    name: 'scan_directory',
    description:
      'Scans a local directory and returns a JSON tree of its contents. Acts like the "ls" command.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        targetPath: {
          type: Type.STRING,
          description:
            'The EXACT absolute path (e.g., "D:\\", "C:\\Users\\pande\\Desktop") or shortcuts like "downloads".'
        },
        maxDepth: {
          type: Type.NUMBER,
          description:
            'CRITICAL RULE: If the user just says "load", "scan", or "open", set this to 1. If the user explicitly says "deeply", "recursively", "all subfolders", or "everything inside", set this to 5. If they say "maximum depth", set to 10.'
        }
      },
      required: ['targetPath']
    }
  },
  {
    name: 'open_file_natively',
    description:
      'Physically opens a file or directory on the user\'s screen. Folders open in File Explorer. Files open in their default OS application (e.g., PDFs in Acrobat, MP4s in VLC). Use this when the user says "open", "launch", or "show me".',
    parameters: {
      type: Type.OBJECT,
      properties: {
        targetPath: {
          type: Type.STRING,
          description:
            'The EXACT absolute path to the file or folder (e.g., "D:\\Downloads\\gta" or "C:\\Documents\\iris-info.pdf"). If you just scanned a directory, use the absolute path from your memory.'
        },
        specificApp: {
          type: Type.STRING,
          description:
            '(Optional) The name of a specific application to force open the file with (e.g., "code", "chrome"). Leave completely blank to use the OS default.'
        }
      },
      required: ['targetPath']
    }
  }
]

const toolHandlers: Record<string, (args: any) => Promise<any>> = {
  get_system_stats: () => fetchSystemStats(),
  get_installed_apps: () => fetchInstalledApps(),
  get_storage_drives: () => fetchStorageDrives(),
  file_system_operation: (args) =>
    executeFSOperation(args.action, args.targetPath, args.destPath, args.content),
  manage_application: (args) => manageApp(args.action, args.appName),
  smart_web_agent: (args) => executeWebAction(args.query, args.intent),
  scan_directory: (args) => {
    const depth = args.maxDepth !== undefined ? Math.min(args.maxDepth, 10) : 1
    return scanDirectoryTree(args.targetPath, 0, depth)
  },
  open_file_natively: (args) => openFileSystemItem(args.targetPath, args.specificApp)
}

export async function executeSystemTool(fc: any) {
  const functionName = fc.name
  const args = fc.args || {}

  try {
    const handler = toolHandlers[functionName]

    if (!handler) {
      throw new Error(`Tool ${functionName} is not implemented inside the router.`)
    }

    const result = await handler(args)

    return {
      id: fc.id,
      name: functionName,
      response: { result: result }
    }
  } catch (error: any) {
    console.error(`[Tool Execution Error] ${functionName}:`, error)
    return {
      id: fc.id,
      name: functionName,
      response: { error: error.message || 'Unknown error occurred during tool execution.' }
    }
  }
}

