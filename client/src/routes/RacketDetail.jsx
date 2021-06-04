import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';
import RacketFinder from '../apis/RacketFinder';
import { RacketsContext } from '../context/RacketContext';

const RacketDetail = () => {
  const { id } = useParams();
  const { selectedRacket, setSelectedRacket } = useContext(RacketsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RacketFinder.get(`/${id}`);
        setSelectedRacket(response.data.data.rackets);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-3 text-center">
      <h1>{selectedRacket && selectedRacket.brand}</h1>
      <h1>{selectedRacket && selectedRacket.model}</h1>
    </div>
  );
};

export default RacketDetail;
