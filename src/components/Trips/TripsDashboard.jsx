import { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router';

import { UserContext } from '../../contexts/UserContext';

import * as tripService from '../../services/tripService';

const TripsDashboard = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);

  const handleViewTrip = (tripId) => {
    navigate(`/trips/${tripId}`);
  };

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const fetchedTrips = await tripService.getAll(); // fetch all trips, not getById
        setTrips(fetchedTrips);
        console.log(fetchedTrips)
      } catch (err) {
        console.log(err);
      }
    };
    if (user) fetchTrips();
  }, [user]);

  return (
    <main>
      <h1>Trips Dashboard</h1>
      <p>
        This is the trips dashboard where you can see a list of all the trips.
      </p>
      <button type="button" onClick={() => navigate('/trips/new')}>
        Add New Trip
      </button>
      <ul>
        {trips.length === 0 ? (
          <p>No Trips in Dashboard</p>
        ) : (
          trips.map((trip) => (
            <li key={trip._id}>
              <button onClick={() => handleViewTrip(trip._id)}>
                <strong>Trip Name:</strong> {trip.travelers} 
                </button>
              {/* <Link to={`/trips/${tripid}`}>
                {attraction.name} — Posted by {user.firstName} {user.lastName}
              </Link> */}
            </li>
          ))
          
        )}
      </ul>
    </main>
  );
};

export default TripsDashboard;
