import React, { useState } from 'react';
import Task from './Task';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { addTask, deleteTask } from '../redux/todoSlice';
import toast, { Toaster } from 'react-hot-toast';

const Tasks = ({ todoList }) => {
  const dispatch = useDispatch();

  const [message, setMessage] = useState('');

  const handleAddTask = async (e) => {
    e.preventDefault();

    if (message.length === 0) return toast.error('Message cannot be empty');

    try {
      const data = { cardId: todoList.id, message: message };
      dispatch(addTask(data));
      setMessage('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    dispatch(deleteTask({ cardId: todoList?.id, id: taskId }));
  };

  const [openModel, setOpenModel] = useState(false);

  return (
    <div>
      <Droppable droppableId={todoList?.id?.toString()}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {todoList?.tasks?.map(({ id, title }, index) => {
              return (
                <Draggable
                  key={id}
                  index={index}
                  val={index}
                  draggableId={id.toString()}
                >
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <Task
                        handleDeleteTask={handleDeleteTask}
                        taskId={id}
                        taskTitle={title}
                        openModel={openModel}
                        setOpenModel={setOpenModel}
                      />
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <form onSubmit={handleAddTask}>
        <textarea
          id="addTask"
          rows="3"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Add a Task"
          className="w-full p-2 mt-4 rounded-md"
        />
        <button className="border-2 border-green-700 bg-green-700 rounded-md px-4 py-1 ml-[73%] mt-2 text-white">
          Submit
        </button>
      </form>
      <Toaster />
    </div>
  );
};

export default Tasks;
