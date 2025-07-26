import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import NoTasksFound from "./NoTasksFound";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskLists from "./TaskLists";

const TaskBoard = () => {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn React Native",
    description:
      "I want to Learn React such thanI can treat it like my slave and make it do whatever I want to do.",
    tags: ["web", "react", "js"],
    priority: "High",
    isFavorite: true,
  };

  const [tasks, setTasks] = useState([defaultTask]);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  // handle add task
  const handleAddEditTask = (newTask, isAdd) => {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      const updatedTasks = tasks.map((task) => {
        if (task.id === newTask.id) {
          return newTask;
        }

        return task;
      });

      setTasks(updatedTasks);
    }

    setShowAddTaskModal(false);
  };

  // handle edit task
  const handleEditTask = (task) => {
    setTaskToUpdate(task);
    setShowAddTaskModal(true);
  };

  // handle modal close
  const handleModalClose = () => {
    setShowAddTaskModal(false);
    setTaskToUpdate(null);
  };

  // handle delete task
  const handleDeleteTask = (taskId) => {
    const remainingTasks = tasks.filter((task) => task.id !== taskId);

    setTasks(remainingTasks);
  };

  // handle all delete task
  const handleAllTasksDelete = () => {
    tasks.length = 0;
    setTasks([...tasks]);
  };

  // handle favorite change
  const handleChangeFavorite = (taskId) => {
    // This portion of the commented code is not fully perfect. Here
    // we are not doing the deep cloning of the tasks array. The tasks array has
    // objects inside, while using the spread operator, it will only make the shallow copy.
    // But we need to do the deep copy.

    // We are not removing this commented code as it was part of the recording.
    // But the same code is now made better and written below.
    /*
        const taskIndex = tasks.findIndex((task) => task.id === taskId);
        const newTasks = [...tasks];
        newTasks[taskIndex].isFavorite = !newTasks[taskIndex].isFavorite;
        setTasks(newTasks);
        */

    // The better way of managing updates in the object within an array as a
    // state in react.
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, isFavorite: !task.isFavorite };
        } else {
          return task;
        }
      })
    );
  };

  // handle search task
  const handleSearchTask = (searchTerm) => {
    const filteredTasks = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setTasks([...filteredTasks]);
  };

  return (
    <section className="mb-20" id="tasks">
      {showAddTaskModal && (
        <AddTaskModal
          onSave={handleAddEditTask}
          taskToUpdate={taskToUpdate}
          onCloseClick={handleModalClose}
        />
      )}
      <div className="container mx-auto">
        {/* <!-- Search Box --> */}
        <div className="p-2 flex justify-end">
          <SearchTask onSearch={handleSearchTask} />
        </div>
        {/* <!-- Search Box Ends --> */}
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActions
            onAddTaskHandler={() => setShowAddTaskModal(true)}
            onDeleteAllTaskHandler={handleAllTasksDelete}
          />

          {tasks.length > 0 ? (
            <TaskLists
              tasks={tasks}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onFav={handleChangeFavorite}
            />
          ) : (
            <NoTasksFound />
          )}
        </div>
      </div>
    </section>
  );
};

export default TaskBoard;
