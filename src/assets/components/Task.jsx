import { Draggable } from "@hello-pangea/dnd";

export default function Task({ task, index, removeTask, completeTask }) {
  const deleteTask = () => {
    removeTask(task.id)
  }

  const setTaskComplete = () => {
    completeTask(task);
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div className="bg-gray-100 border border-gray-300 flex items-center justify-between p-2 rounded-md space-x-2" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          {task.isCompleted ? (
            <>
              <i className="bi bi-check-circle text-blue-500" onClick={setTaskComplete}></i>
              <p className="w-full line-through break-words opacity-25">{task.title}</p>
              <i className="bi bi-trash-fill text-red-500" onClick={deleteTask}></i>
            </>
          ) : (
            <>
              <i className="bi bi-circle" onClick={setTaskComplete}></i>
              <p className="w-full break-words">{task.title}</p>
              <i className="bi bi-trash-fill text-red-500" onClick={deleteTask}></i>
            </>
          )}
        </div>
      )}
    </Draggable>
  )
}
