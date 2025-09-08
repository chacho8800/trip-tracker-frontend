import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';

import { UserContext } from '../../contexts/UserContext';

const TripsForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [Trips, setTrips] = useState([]);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    travelers: '',
    trip_duration: "",
    startDate: "",
    endDate: '',
  });

  const { travelers, trip_duration, startDate, endDate } = formData;

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const newTrip = await create(formData);
      console.log("New trip", newTrip)
      setTrips(newTrip);
      navigate('/trips');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main>
      <h1>New Trip</h1>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='travelers'>Travelers:</label>
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
          type="text"
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
            type='endDate'
            id='endDate'
            value={endDate}
            name='endDate'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button>Create Trip</button>
          <button onClick={() => navigate('/trips')}>Cancel</button>
        </div>
      </form>
    </main>
  );
};

export default TripsForm;
