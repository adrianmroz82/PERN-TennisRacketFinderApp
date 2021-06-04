import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';
import RacketFinder from '../apis/RacketFinder';

const UpdateComponent = () => {
  const { id } = useParams();
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [onSale, setOnSale] = useState('');
  let history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const response = await RacketFinder.get(`/${id}`);
      setBrand(response.data.data.rackets.brand);
      setModel(response.data.data.rackets.model);
      setPrice(response.data.data.rackets.price);
      setOnSale(response.data.data.rackets.on_sale);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updated = await RacketFinder.put(`/${id}`, {
      brand,
      model,
      price,
      on_sale: onSale,
    });
    history.push('/');
  };

  return (
    <div>
      <form action="">
        <div className="form-group">
          <label htmlFor="brand">Brand</label>
          <input
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            id="brand"
            type="text"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="model">Model</label>
          <input
            value={model}
            onChange={(e) => setModel(e.target.value)}
            id="model"
            type="text"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            id="price"
            type="number"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="on_sale">On sale</label>
          <input
            placeholder="Type: yes or no"
            value={onSale}
            onChange={(e) => setOnSale(e.target.value)}
            id="on_sale"
            type="boolean"
            className="form-control"
          />
        </div>

        <button onClick={handleSubmit} className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateComponent;
