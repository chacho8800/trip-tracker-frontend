import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import * as tripService from '../../services/tripService';

const EditTripForm = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [formData, setFormData] = useState({
    travelers: '',
    trip_duration: '',
    startDate: '',
    endDate: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const trip = await tripService.getById(tripId);
        setFormData({
          travelers: trip.travelers,
          trip_duration: trip.trip_duration,
          startDate: trip.startDate.slice(0,10), // format for date input
          endDate: trip.endDate.slice(0,10),
        });
      } catch (err) {
        console.error(err);
        setMessage('Failed to load trip details.');
      }
    };
    fetchTrip();
  }, [tripId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const updatedTrip = await tripService.update(tripId, formData);
      console.log("Updating Form Data", formData)
      setTrips([updatedTrip, ...trips])
      // stop from here ......
      
      navigate(`/trips/${tripId}`); // redirect to trip details after update
    } catch (err) {
      console.error(err);
      setMessage('Failed to update trip.');
    }
  };

  return (
    <main>
      <h1>Edit Trip Details</h1>
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
            type="string"
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
          <button type="submit">Update Trip</button>
          <button type="button" onClick={() => navigate(`/trips/${tripId}`)}>Cancel</button>
        </div>
      </form>
    </main>
  );
};

export default EditTripForm;