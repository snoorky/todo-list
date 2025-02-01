import { useState } from "react";
import Input from "./assets/components/Inputs";
import Task from "./assets/components/Task";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

export default function App() {
  const [tasks, setTasks] = useState([])

  const addTask = (newTask) => {
    setTasks([...tasks, newTask])
  }

  const removeTask = (id) => {
    const items = tasks.filter(item => item.id !== id)
    setTasks(items)
  }

  const completeTask = (task) => {
    const updateTask = tasks.map(item => item.id === task.id ? { ...item, isCompleted: !task.isCompleted } : item)
    setTasks(updateTask)
  }

  const handleDragEnd = (result) => {
    if (!result.destination) return

    const item = reorder(tasks, result.source.index, result.destination.index)
    setTasks(item)
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  return (
    <div className="w-screen min-h-screen bg-gray-200 p-4 flex flex-col items-center justify-center space-y-4">
      <h1 className="text-center text-2xl font-bold text-gray-800">To Do List 📝</h1>
      <Input addTask={addTask} />
      {tasks.length !== 0 &&
        <div className="w-full md:max-w-xl bg-gray-100 p-2 rounded-md space-y-2">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="tasksList" type="list" direction="vertical">
              {(provided) => (
                <div className="w-full bg-gray-100 p-2 rounded-md space-y-2" ref={provided.innerRef} {...provided.droppableProps}>
                  {tasks.map((task, index) => (
                    <Task key={task.id} index={index} task={task} removeTask={removeTask} completeTask={completeTask} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      }
    </div>
  )
}
