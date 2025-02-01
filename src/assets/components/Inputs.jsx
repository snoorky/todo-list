import { useState } from "react"
import { v4 as uuidv4 } from "uuid"

export default function Input({ addTask }) {
  const [task, setTask] = useState("")
  const id = uuidv4()

  const insertTask = () => {
    if (task) {
      addTask({ id: id, title: task, isCompleted: false })
      setTask("")
    }
  }

  return (
    <div className="w-full md:max-w-xl flex space-x-2">
      <input className="w-full bg-gray-100 py-3 px-4 rounded-md text-sm text-gray-700 border border-gray-300 outline-none"
        type="text" placeholder="Enter your task" value={task} onChange={(e) => setTask(e.target.value)} />
      <button className="bg-blue-500 py-3 px-4 rounded-md text-sm text-white text-nowrap" onClick={insertTask}>Add Task</button>
    </div>
  )
}
