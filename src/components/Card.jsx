import Tasks from './Tasks';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch } from 'react-redux';
import { deleteCard } from '../redux/todoSlice';

const Card = ({ title, todoList, groupId }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col border bg-slate-300  p-2 rounded-md h-fit">
      <div className="flex items-center justify-around px-10 py-3 ">
        <h2 className="font-medium text-xl">{title}</h2>
        <div className="space-x-4">
          <DeleteForeverIcon
            onClick={() => dispatch(deleteCard({ cardId: groupId }))}
            className="text-red-500 cursor-pointer"
            titleAccess="Delete Card"
          />
        </div>
      </div>

      <Tasks todoList={todoList} />
    </div>
  );
};

export default Card;
