import { useState } from "react";
import HomeLayout from "@/components/HomeLayout";
import { FaFlag, FaRegCheckCircle, FaRegClock, FaPaperclip } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const TodoPage = () => {
  const [tasks, setTasks] = useState({
    holding: [],
    prioritized: [],
    started: [],
    finished: [],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    id: new Date().getTime().toString(),
    text: "",
    status: "holding",
    dueDate: "",
    file: null,
    priority: "low",
  });

  const [editTask, setEditTask] = useState(null);

  const addTask = () => {
    if (newTask.text.trim() !== "") {
      setTasks((prev) => ({
        ...prev,
        [newTask.status]: [...prev[newTask.status], { ...newTask, id: new Date().getTime().toString() }],
      }));
      setNewTask({ text: "", status: "holding", dueDate: "", file: null, priority: "low" });
      setIsModalOpen(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setNewTask({ ...newTask, file });
  };

  const deleteTask = (task, section) => {
    setTasks((prev) => ({
      ...prev,
      [section]: prev[section].filter((t) => t.id !== task.id),
    }));
  };

  const openEditModal = (task) => {
    setEditTask(task); // Set the task to be edited
    setIsEditModalOpen(true); // Open the edit modal
  };

  const saveEditedTask = () => {
    if (editTask.text.trim() !== "") {
      setTasks((prev) => {
        const updatedTasks = { ...prev };

        // Remove the task from its current section
        Object.keys(updatedTasks).forEach((section) => {
          updatedTasks[section] = updatedTasks[section].filter((t) => t.id !== editTask.id);
        });

        // Add the task to its new section
        updatedTasks[editTask.status] = [...updatedTasks[editTask.status], editTask];

        return updatedTasks;
      });

      setIsEditModalOpen(false); // Close the edit modal
      setEditTask(null); // Reset the editTask state
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "high":
        return <FaFlag className="text-red-500" />;
      case "medium":
        return <FaFlag className="text-yellow-500" />;
      case "low":
      default:
        return <FaFlag className="text-green-500" />;
    }
  };

  const getDueDateStyle = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    if (due < today) {
      return "text-red-500";
    }
    return "text-green-500";
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceTasks = Array.from(tasks[source.droppableId]);
    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceTasks.splice(destination.index, 0, movedTask);
      setTasks((prev) => ({
        ...prev,
        [source.droppableId]: sourceTasks,
      }));
    } else {
      const destinationTasks = Array.from(tasks[destination.droppableId]);
      destinationTasks.splice(destination.index, 0, movedTask);
      setTasks((prev) => ({
        ...prev,
        [source.droppableId]: sourceTasks,
        [destination.droppableId]: destinationTasks,
      }));
    }
  };

  return (
    <HomeLayout>
      <div className="p-6 bg-gray-100 min-h-screen font-sans ">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">Task Board</h2>

        <div className="flex justify-center mb-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-6 py-2 rounded-md transition-all hover:bg-blue-700"
          >
            + Add New Task
          </button>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-96 transform transition-all scale-105">
              <h3 className="text-xl font-semibold mb-4">Add New Task</h3>
              <input
                type="text"
                placeholder="Task name..."
                value={newTask.text}
                onChange={(e) => setNewTask({ ...newTask, text: e.target.value })}
                className="p-2 border border-gray-300 rounded-md w-full mb-3"
              />

              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                className="p-2 border border-gray-300 rounded-md w-full mb-3"
              />

              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                className="p-2 border border-gray-300 rounded-md w-full mb-3"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>

              <div className="mb-3">
                <label className="flex items-center cursor-pointer">
                  <FaPaperclip className="text-gray-600 mr-2" />
                  <span className="text-gray-700">Attach File</span>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                {newTask.file && <p className="text-sm text-gray-500">{newTask.file.name}</p>}
              </div>

              <select
                value={newTask.status}
                onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                className="p-2 border border-gray-300 rounded-md w-full mb-3"
              >
                <option value="holding">Holding</option>
                <option value="prioritized">Prioritized</option>
                <option value="started">Started</option>
                <option value="finished">Finished</option>
              </select>

              <div className="flex justify-between">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={addTask}
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>
        )}

        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-96 transform transition-all scale-105">
              <h3 className="text-xl font-semibold mb-4">Edit Task</h3>
              <input
                type="text"
                placeholder="Task name..."
                value={editTask.text}
                onChange={(e) => setEditTask({ ...editTask, text: e.target.value })}
                className="p-2 border border-gray-300 rounded-md w-full mb-3"
              />

              <input
                type="date"
                value={editTask.dueDate}
                onChange={(e) => setEditTask({ ...editTask, dueDate: e.target.value })}
                className="p-2 border border-gray-300 rounded-md w-full mb-3"
              />

              <select
                value={editTask.priority}
                onChange={(e) => setEditTask({ ...editTask, priority: e.target.value })}
                className="p-2 border border-gray-300 rounded-md w-full mb-3"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>

              <div className="mb-3">
                <label className="flex items-center cursor-pointer">
                  <FaPaperclip className="text-gray-600 mr-2" />
                  <span className="text-gray-700">Attach File</span>
                  <input
                    type="file"
                    onChange={(e) => setEditTask({ ...editTask, file: e.target.files[0] })}
                    className="hidden"
                  />
                </label>
                {editTask.file && <p className="text-sm text-gray-500">{editTask.file.name}</p>}
              </div>

              <select
                value={editTask.status}
                onChange={(e) => setEditTask({ ...editTask, status: e.target.value })}
                className="p-2 border border-gray-300 rounded-md w-full mb-3"
              >
                <option value="holding">Holding</option>
                <option value="prioritized">Prioritized</option>
                <option value="started">Started</option>
                <option value="finished">Finished</option>
              </select>

              <div className="flex justify-between">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEditedTask}
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Save Task
                </button>
              </div>
            </div>
          </div>
        )}

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-4 gap-4">
            {Object.entries(tasks).map(([section, taskList]) => (
              <Droppable droppableId={section} key={section}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-white p-4 shadow-lg rounded-md min-h-[200px]"
                  >
                    <h3 className="text-xl font-semibold mb-4 capitalize">{section}</h3>
                    {taskList.length > 0 ? (
                      taskList.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`p-2 bg-gray-200 rounded-md mb-2 flex justify-between hover:bg-gray-300 transition-all ${task.status === 'finished' ? 'opacity-75 line-through' : ''}`}
                            >
                              <div>
                                <p className="font-medium flex items-center">
                                  {getPriorityIcon(task.priority)} {task.text}
                                </p>
                                {task.dueDate && <p className={`text-xs ${getDueDateStyle(task.dueDate)}`}>Due: {task.dueDate}</p>}
                                {task.file && (
                                  <p className="text-xs text-blue-500">
                                    📎 {task.file.name}
                                  </p>
                                )}
                              </div>
                              <div className="flex items-center">
                                <button
                                  onClick={() => openEditModal(task)}
                                  className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-700 transition-all mr-2"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => deleteTask(task, section)}
                                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700 transition-all"
                                >
                                  X
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))
                    ) : (
                      <p className="text-gray-500">No tasks</p>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>
    </HomeLayout>
  );
};

export default TodoPage;