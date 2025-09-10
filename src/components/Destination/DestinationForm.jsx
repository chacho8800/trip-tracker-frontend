import { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import * as destinationService from '../../services/destinationService.js';

const DestinationForm = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { tripId } = useParams(); // grab tripId from URL
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    country: '',
    city: '',
    description: '',
  });

  const [destination, setDestination] = useState([])

  const { country, city, description } = formData;

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const newDestination = await destinationService.create(tripId, formData);
      console.log('New Destination', newDestination);
      setDestination([newDestination, ...destination])
      navigate(`/trips/${tripId}/destinations`);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main>
      <h1>New Destination</h1>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='country'>Country:</label>
          <input
            type='text'
            id='country'
            value={country}
            name='country'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='city'>City:</label>
          <input
            type='text'
            id='city'
            name='city'
            value={city}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='description'>Tell us about this destination:</label>
          <input
            type='text'
            id='description'
            name='description'
            value={description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type='submit'>Create Destination</button>
          <button type='button' onClick={() => navigate('/trips')}>Cancel</button>
        </div>
      </form>
    </main>
  );
};

export default DestinationForm;