export interface Task {
  id: string
  title: string
  completed: boolean
  createdAt: string
}

export interface Session {
  id: string
  taskId: string | undefined
  taskTitle: string | undefined
  duration: number
  completedAt: string
}

export interface FocusContextType {
  tasks: Task[]
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>

  sessions: Session[]
  setSessions: React.Dispatch<React.SetStateAction<Session[]>>
}