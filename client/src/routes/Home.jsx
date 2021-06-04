import React from 'react';
import AddingNewRacket from '../components/AddingNewRacket';
import Header from '../components/Header';
import RacketList from '../components/RacketList';

const Home = () => {
  return (
    <div className="container">
      <Header />
      <AddingNewRacket />
      <RacketList />
    </div>
  );
};

export default Home;
