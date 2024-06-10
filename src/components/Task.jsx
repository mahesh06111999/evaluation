import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Task = ({ taskTitle, taskId, handleDeleteTask }) => {
  return (
    <div className="border flex flex-col gap-2 bg-slate-100 my-2 p-4 rounded-md z-40">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-lg font-medium">{taskTitle}</h4>
        </div>

        <div className="flex flex-col gap-2">
          <button onClick={() => handleDeleteTask(taskId)}>
            <DeleteForeverIcon
              className="text-red-500 hover:text-red-600"
              titleAccess="Delete Task"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;
