import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Cards from '../components/Cards';
import { useDispatch, useSelector } from 'react-redux';
import { newBoardDispatch, addCard } from '../redux/todoSlice';
import toast, { Toaster } from 'react-hot-toast';

const Home = () => {
  const disaptch = useDispatch();

  const states = useSelector((card) => card.todo);

  const [stateToMap, setStateToMap] = useState(
    states?.currState === 'mainCard' ? states.mainCard : states.newBoard
  );

  const changeState = () => {
    disaptch(newBoardDispatch());

    if (states.currState === 'mainCard') {
      setStateToMap(states.newBoard);
    } else {
      setStateToMap(states.mainCard);
    }
  };

  const [addCardTitle, setAddCardTitle] = useState('');

  const handleAddCard = () => {
    if (addCardTitle === '') {
      toast.error('Add a Card Title');
    } else {
      disaptch(addCard({ title: addCardTitle }));
      setAddCardTitle('');
    }
  };

  useEffect(() => {
    setStateToMap(
      states.currState === 'mainCard' ? states.mainCard : states.newBoard
    );
  }, [states]);

  return (
    <div className="min-h-screen bg-blue-900 px-10 py-5 text-black-900">
      <Navbar changeState={changeState} />

      <div
        className="bg-gray-100 p-2 my-5 flex items-center gap-10 ml-[30%]"
        style={{ width: '550px', padding: '10px', borderRadius: '10px' }}
      >
        <h2 className="text-xl font-medium">Add Card</h2>
        <input
          value={addCardTitle}
          onChange={(e) => setAddCardTitle(e.target.value)}
          type="text"
          className="px-2 py-1 rounded-md border-2"
          placeholder="Enter Card Title"
        />
        <button
          onClick={handleAddCard}
          className="border border-green-700 rounded-md px-2 py-1 bg-green-700 text-white"
        >
          Submit
        </button>
      </div>
      <Toaster />
      <div>
        <Cards stateToMap={stateToMap} />
      </div>
    </div>
  );
};

export default Home;
