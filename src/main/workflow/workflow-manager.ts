import { app } from 'electron'
import path from 'path'
import fs from 'fs/promises'

// Define the shape of a workflow for TypeScript clarity
export interface WorkflowData {
  name: string
  description?: string
  nodes: any[]
  edges: any[]
  updatedAt?: number
}

// Internal helper to safely resolve the path at runtime
function getWorkflowsFilePath(): string {
  return path.join(app.getPath('userData'), 'iris_workflows.json')
}

// Exported directly to retrieve all saved workflows
export async function loadWorkflows(): Promise<{ success: boolean; workflows: WorkflowData[] }> {
  try {
    const filePath = getWorkflowsFilePath()
    const data = await fs.readFile(filePath, 'utf-8')
    return { success: true, workflows: JSON.parse(data) }
  } catch (e) {
    // Return an empty array if the file doesn't exist yet
    return { success: true, workflows: [] }
  }
}

// Exported directly to save or update a workflow
export async function saveWorkflow({
  name,
  description,
  nodes,
  edges
}: WorkflowData): Promise<{ success: boolean; error?: string }> {
  try {
    const filePath = getWorkflowsFilePath()
    let workflows: WorkflowData[] = []

    try {
      const data = await fs.readFile(filePath, 'utf-8')
      workflows = JSON.parse(data)
    } catch (e) {
      // File doesn't exist, we'll create it
    }

    const existingIndex = workflows.findIndex((w) => w.name === name)
    const newWorkflow: WorkflowData = { name, description, nodes, edges, updatedAt: Date.now() }

    if (existingIndex >= 0) {
      workflows[existingIndex] = newWorkflow
    } else {
      workflows.push(newWorkflow)
    }

    await fs.writeFile(filePath, JSON.stringify(workflows, null, 2), 'utf-8')
    return { success: true }
  } catch (error) {
    return { success: false, error: String(error) }
  }
}

// Exported directly to delete a specific workflow
export async function deleteWorkflow(name: string): Promise<{ success: boolean; error?: string }> {
  try {
    const filePath = getWorkflowsFilePath()
    const data = await fs.readFile(filePath, 'utf-8')
    let workflows: WorkflowData[] = JSON.parse(data)

    workflows = workflows.filter((w) => w.name !== name)

    await fs.writeFile(filePath, JSON.stringify(workflows, null, 2), 'utf-8')
    return { success: true }
  } catch (error) {
    return { success: false, error: String(error) }
  }
}
