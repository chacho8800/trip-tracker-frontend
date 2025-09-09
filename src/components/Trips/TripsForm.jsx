import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';

import * as tripService from "../../services/tripService.js"

import { UserContext } from '../../contexts/UserContext';

const TripsForm = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    travelers: '',
    trip_duration: '',
    startDate: '',
    endDate: '',
  });
  const [trips, setTrips] = useState([]);

  const { travelers, trip_duration, startDate, endDate } = formData;

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  // const handleSubmit = async (evt) => {
  //   evt.preventDefault();
  //   try {
  //     const newTrip = await tripService.create(formData);
  //     console.log("New trip", newTrip);
  //     setTrips([newTrip, ...trips]);
  //     navigate('/trips');
  //   } catch (err) {
  //     setMessage(err.message);
  //   }
  // };

      const handleAddTrip = async (tripFormData) => {
          const newTrip = await tripService.create(tripFormData)
          setTrips([newTrip, ...trips]);
  
          console.log("Trips Form Data", newTrip)
          navigate(`/trips`)
      }
  
      const handleSubmit = (event) => {
          event.preventDefault()
  
          handleAddTrip(formData)
          console.log("Form Data", formData)
      }

  return (
    <main>
      <h1>Add a New Trip!</h1>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='travelers'>Trip Name:</label>
          <input
            type='text'
            id='travelers'
            value={travelers}
            name='travelers'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="trip_duration">Trip Duration:</label>
          <input 
          type="text"
          id='trip_duration'
          name='trip_duration'
          value={trip_duration}
          onChange={handleChange}
          required
          />
        </div>
        <div>
        <label htmlFor="startDate">Start Date:</label>
          <input 
          type="date"
          id='startDate'
          name='startDate'
          value={startDate}
          onChange={handleChange}
          required
          />
        </div>
        <div>
          <label htmlFor='endDate'>End Date:</label>
          <input
            type='date'
            id='endDate'
            value={endDate}
            name='endDate'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Create Trip</button>
          <button type="button" onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </main>
  );
};

export default TripsForm;
