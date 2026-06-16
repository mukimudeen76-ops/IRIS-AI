import { app, BrowserWindow, safeStorage } from 'electron'
import { tavily } from '@tavily/core'
import Groq from 'groq-sdk'
import path from 'path'
import fsSync from 'fs'
import { error } from 'console'

function emitProgress(
  mainWindow: BrowserWindow,
  payload: { status: string; file: string; totalFound: number }
) {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('oracle-progress', payload)
  }
}

export async function executeDeepResearch({ query }: { query: string }) {
  const mainWindow = BrowserWindow.getAllWindows()[0]

  // 1. Open the UI Widget immediately
  if (mainWindow) {
    mainWindow.webContents.send('deep-research-start', { query })
  }

  try {
    let tavilyKey = ''
    let groqKey = ''
    const secureConfigPath = path.join(app.getPath('userData'), 'iris_secure_vault.json')

    if (fsSync.existsSync(secureConfigPath)) {
      try {
        const data = JSON.parse(fsSync.readFileSync(secureConfigPath, 'utf8'))

        if (safeStorage.isEncryptionAvailable()) {
          if (data.tavily) tavilyKey = safeStorage.decryptString(Buffer.from(data.tavily, 'base64'))
          if (data.groq) groqKey = safeStorage.decryptString(Buffer.from(data.groq, 'base64'))
        } else {
          if (data.tavily) tavilyKey = Buffer.from(data.tavily, 'base64').toString('utf8')
          if (data.groq) groqKey = Buffer.from(data.groq, 'base64').toString('utf8')
        }
      } catch (e) {
        console.error('Vault read error:', e)
      }
    }

    if (!tavilyKey || !groqKey) {
      console.log(tavilyKey)
      throw new Error('Missing API Keys. Please configure Tavily and Groq in the Command Center.')
    }

    emitProgress(mainWindow, {
      status: 'scanning',
      file: 'IRIS and Tavily Neural Search Active...',
      totalFound: 1
    })

    // 3. Execute Web Crawl
    const tvly = tavily({ apiKey: tavilyKey })
    const tavilyData = await tvly.search(query, {
      searchDepth: 'advanced',
      includeAnswer: true,
      maxResults: 5
    })

    const rawContext = tavilyData.results
      .map((r: any) => `Source: ${r.url}\nContent: ${r.content}`)
      .join('\n\n')

    emitProgress(mainWindow, {
      status: 'reading',
      file: 'Llama 3.1 Instantly Synthesizing Data...',
      totalFound: 2
    })

    // 4. Execute Fast Synthesis via Groq
    const groq = new Groq({ apiKey: groqKey })
    const prompt = `
      You are an elite research analyst. Answer: "${query}".
      Output ONLY a JSON object with a key "summary" containing a detailed, well-formatted markdown summary of your findings.
      Context: ${rawContext}
    `

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.1-8b-instant',
      response_format: { type: 'json_object' }
    })

    const jsonString =
      chatCompletion.choices[0]?.message?.content || '{"summary": "No data generated."}'
    const parsedData = JSON.parse(jsonString)
    const extractedSummary = parsedData.summary || 'No data generated.'

    emitProgress(mainWindow, {
      status: 'embedded',
      file: 'Research synthesis complete...',
      totalFound: 3
    })

    // 5. Tell the UI to close/display success
    if (mainWindow) {
      mainWindow.webContents.send('deep-research-done', {
        success: true,
        summary: extractedSummary
      })
    }

    return `Deep research completed. Summary provided to user interface.`
  } catch (error: any) {
    console.log(error)
    if (mainWindow) {
      mainWindow.webContents.send('deep-research-done', { success: false, summary: null })
    }
    return `Error during deep research: ${error.message}`
  }
}
