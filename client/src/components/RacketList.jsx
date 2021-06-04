import React, { useEffect } from 'react';
import { useContext } from 'react';
import RacketFinder from '../apis/RacketFinder';
import { RacketsContext } from '../context/RacketContext';
import { useHistory } from 'react-router-dom';

const RacketList = (props) => {
  const { rackets, setRackets } = useContext(RacketsContext);
  let history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RacketFinder.get('/');

        setRackets(response.data.data.rackets);
        console.log(response);
      } catch (err) {}
    };

    fetchData();
  }, []);

  const handleRemove = async (e, id) => {
    e.stopPropagation();

    try {
      const response = await RacketFinder.delete(`/${id}`);
      setRackets(
        rackets.filter((racket) => {
          return racket.id !== id;
        })
      );

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e, id) => {
    e.stopPropagation();
    history.push(`/rackets/${id}/update`);
  };

  const handleSelectRacket = (id) => {
    history.push(`/rackets/${id}`);
  };

  return (
    <div>
      <table className="mt-4 table-hover table table-secondary">
        <thead>
          <tr className="bg-warning">
            <th scope="col">Brand</th>
            <th scope="col">Model</th>
            <th scope="col">Price</th>
            <th scope="col">On sale</th>
            <th scope="col">Rating</th>
            <th scope="col">Change</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        <tbody>
          {rackets.map((el) => {
            return (
              <tr onClick={() => handleSelectRacket(el.id)} key={el.id}>
                <td>{el.brand}</td>
                <td>{el.model}</td>
                <td>{el.price}</td>
                <td>
                  {(() => {
                    if (el.on_sale === true) {
                      return <p style={{ color: 'green' }}>Avaliable</p>;
                    }
                    return <p style={{ color: 'red' }}>Not avaliable</p>;
                  })()}
                </td>
                <td>RATING</td>
                <td>
                  <button
                    onClick={(e) => handleChange(e, el.id)}
                    className="btn btn-primary"
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={(e) => handleRemove(e, el.id)}
                    className="btn btn-danger"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RacketList;
