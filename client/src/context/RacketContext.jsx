import { useState, createContext } from 'react';

export const RacketsContext = createContext();

export const RacketsContextProvider = (props) => {
  // store for all rackets
  const [rackets, setRackets] = useState([]);
  const [selectedRacket, setSelectedRacket] = useState(null);

  const addRacket = (racket) => {
    setRackets([...rackets, racket]);
  };
  return (
    <RacketsContext.Provider
      value={{
        rackets,
        setRackets,
        addRacket,
        selectedRacket,
        setSelectedRacket,
      }}
    >
      {props.children}
    </RacketsContext.Provider>
  );
};
