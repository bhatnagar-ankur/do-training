import { useState , useEffect} from "react";
import HomeLayout from "@/components/HomeLayout";
import { FaFlag, FaRegCheckCircle, FaRegClock , FaPaperclip } from "react-icons/fa"; 

const TodoPage = () => {
  const [tasks, setTasks] = useState({
    holding: [],
    prioritized: [],
    started: [],
    finished: [],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    text: "",
    status: "holding",
    dueDate: "",
    file: null,
    priority: "low", 
  });
 
  const addTask = () => {
    if (newTask.text.trim() !== "") {
      setTasks((prev) => ({
        ...prev,
        [newTask.status]: [...prev[newTask.status], newTask],
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
      [section]: prev[section].filter((t) => t !== task),
    }));
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
    if (due < today)
       {
      return "text-red-500";
    } 
    return "text-green-500"; 
  };

  return (
     <HomeLayout >
    <div className="p-6 bg-gray-100 min-h-screen font-sans">
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
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

   
      <div className="grid grid-cols-4 gap-4">
        {Object.entries(tasks).map(([section, taskList]) => (
          <div key={section} className="bg-white p-4 shadow-lg rounded-md min-h-[200px]">
            <h3 className="text-xl font-semibold mb-4 capitalize">{section}</h3>
            {taskList.length > 0 ? (
              taskList.map((task, index) => (
                <div key={index} className="p-2 bg-gray-200 rounded-md mb-2 flex justify-between hover:bg-gray-300 transition-all">
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
                  <button
                    onClick={() => deleteTask(task, section)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700 transition-all"
                  >
                    X
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No tasks</p>
            )}
          </div>
        ))}
      </div>
    </div>
    </HomeLayout>
  );
};

export default TodoPage;
