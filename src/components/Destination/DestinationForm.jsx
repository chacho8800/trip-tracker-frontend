import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../../contexts/UserContext';

const DestinationForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [Destination, setDestination] = useState([]);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    country: '',
    city: "",
    description: "",
  });

  const { country, city, description } = formData;

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const newDestination = await create(formData);
      console.log("New Destination", newDestination)
      setTrips(newDestination);
      navigate('/trips/:tripId/destinations');
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
          <label htmlFor="city">City:</label>
          <input 
          type="text"
          id='city'
          name='city'
          value={city}
          onChange={handleChange}
          required
          />
        </div>
        <div>
        <label htmlFor="description">Tell us how your current destination is!:</label>
          <input 
          type="text"
          id='description'
          name='description'
          value={description}
          onChange={handleChange}
          required
          />
        </div>
        <div>
          <button>Create Destination</button>
          <button onClick={() => navigate('/trips')}>Cancel</button>
        </div>
      </form>
    </main>
  );
};

export default DestinationForm;
