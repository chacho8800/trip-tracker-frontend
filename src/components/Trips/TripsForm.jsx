import { useState } from 'react';
import { useNavigate } from 'react-router';
import * as tripService from '../../services/tripService';

const TripsForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    travelers: '',
    trip_duration: '',
    startDate: '',
    endDate: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      console.log("Submitting trip:", formData);
      const newTrip = await tripService.create(formData);
      console.log("Created trip:", newTrip);
      navigate(`/trips/${newTrip._id}`);
    } catch (err) {
      console.error(err);
      setMessage('Failed to create trip.');
    }
  };

  return (
    <main>
      <h1>Add New Trip</h1>
      {message && <p style={{ color: 'red' }}>{message}</p>}
      <form onSubmit={handleSubmit} autoComplete="off">
        <div>
          <label htmlFor="travelers">Trip Name:</label>
          <input
            type="text"
            id="travelers"
            name="travelers"
            value={formData.travelers}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="trip_duration">Trip Duration (days):</label>
          <input
            type="number"
            id="trip_duration"
            name="trip_duration"
            value={formData.trip_duration}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Create Trip</button>
          <button type="button" onClick={() => navigate('/trips')}>Cancel</button>
        </div>
      </form>
    </main>
  );
};

export default TripsForm;