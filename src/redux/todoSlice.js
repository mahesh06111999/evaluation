import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currState: 'mainCard',
  mainCard: [
    {
      id: 101,
      groupName: 'To-do',
      tasks: [
        { id: 1, title: 'Assignment - 3' },
        { id: 2, title: 'Assignment - 4' },
        { id: 3, title: 'Assignment - 5' },
      ],
    },
    {
      id: 103,
      groupName: 'Doing',
      tasks: [{ id: 4, title: 'Assignment - 2' }],
    },
    {
      id: 104,
      groupName: 'Done',
      tasks: [{ id: 5, title: 'Assignment - 1' }],
    },
  ],
  newBoard: [
    {
      id: 543,
      groupName: 'Task List',
      tasks: [],
    },
  ],
};

export const userSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const items = Array.from(
        state.currState === 'mainCard' ? state.mainCard : state.newBoard
      );
      const a = items.find((item) => item.id === action.payload.cardId);
      const aArray = a.tasks;
      aArray.push({
        id: Date.now(),
        title: action.payload.message,
      });

      return state;
    },

    addCard: (state, action) => {
      const card =
        state.currState === 'mainCard' ? state.mainCard : state.newBoard;
      card.push({
        id: Date.now(),
        groupName: action.payload.title,
        tasks: [],
      });

      return state;
    },

    deleteTask: (state, action) => {
      const items = Array.from(
        state.currState === 'mainCard' ? state.mainCard : state.newBoard
      );
      const a = items.find((item) => item.id === action.payload.cardId);
      const aArray = a.tasks;

      aArray.splice(
        aArray.findIndex((item) => item.id === action.payload.id),
        1
      );
    },

    deleteCard: (state, action) => {
      const items =
        state?.currState === 'mainCard' ? state.mainCard : state.newBoard;
      console.log(items);

      items.splice(
        items.findIndex((item) => item.id === action.payload.cardId),
        1
      );
    },

    shiftTask: (state, action) => {
      const items = Array.from(
        state?.currState === 'mainCard' ? state.mainCard : state.newBoard
      );

      const a = items.find(
        (item) => item.id === Number(action.payload.res.source.droppableId)
      );
      const aArray = a.tasks;

      const splicedItem = aArray.splice(action.payload.res.source.index, 1);

      const b = items.find(
        (item) => item.id === Number(action.payload.res.destination.droppableId)
      );
      const bArray = b.tasks;

      bArray.splice(action.payload.res.destination.index, 0, splicedItem[0]);
    },

    newBoardDispatch: (state, action) => {
      if (state.currState === 'mainCard') {
        state.currState = 'newBoard';
      } else {
        state.currState = 'mainCard';
      }
    },
  },
});

export const {
  addTask,
  deleteTask,
  editTask,
  shiftTask,
  removeFromFav,
  updateFavourites,
  editCardName,
  newBoardDispatch,
  addCard,
  deleteCard,
} = userSlice.actions;

export default userSlice.reducer;
