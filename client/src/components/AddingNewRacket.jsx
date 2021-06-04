import React, { useState, useContext } from 'react';
import RacketFinder from '../apis/RacketFinder';
import { RacketsContext } from '../context/RacketContext';

const AddingNewRacket = () => {
  const { addRacket } = useContext(RacketsContext);

  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [onSale, setOnSale] = useState('');

  //TODO - to add without refreshing whole page has to be reloaded
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RacketFinder.post('/', {
        brand,
        model,
        price,
        on_sale: onSale,
      });

      addRacket(response.data.data.rackets);
      console.log(response);
    } catch (err) {}
  };

  return (
    <div className="mt-5 mr-5 ml-5">
      <form>
        <div className="form-row">
          <div className="col">
            <input
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Brand"
            />
          </div>
          <div className="col">
            <input
              value={model}
              onChange={(e) => setModel(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Model"
            />
          </div>
          <div className="col">
            <input
              value={onSale}
              onChange={(e) => setOnSale(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Avaliable"
            />
          </div>
          <div className="col">
            <select
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="custom-select"
            >
              <option defaultValue="selected">Price</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-secondary"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddingNewRacket;
