

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import * as tripService from "../../services/tripService";

const TripDetails = () => {
  const [trip, setTrip] = useState(null);
  const navigate = useNavigate();
  const { tripId } = useParams();

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        if (!tripId) return;
        const data = await tripService.getById(tripId);
        setTrip(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTrip();
  }, [tripId]);

  const handleEdit = () => {
    navigate(`/trips/${tripId}/edit`);
  };

  const handleAddDestination = () => {
    navigate(`/trips/${tripId}/destinations/new`);
  };

  const handleGiveReview = () => {
    navigate(`/trips/${tripId}/reviews/`);
  };

  if (!trip) return <p>Loading trip details...</p>;

  return (
    <main>
      <h1>Trip Details</h1>
      <h2>Trip Name: {trip.travelers} {trip.travelers > 1 ? 's' : ''}</h2>
      <p>
        <strong>Start Date:</strong> {new Date(trip.startDate).toLocaleDateString()}<br />
        <strong>End Date:</strong> {new Date(trip.endDate).toLocaleDateString()}<br />
        <strong>Duration:</strong> {trip.trip_duration} days
      </p>
      <div>
        <button onClick={handleEdit}>Edit Trip Details</button>
        <button onClick={handleGiveReview}>Give Review</button>
        <button onClick={handleAddDestination}>Add Destination</button>
      </div>

     {trip.reviews && trip.reviews.length > 0 && (
        <div style={{ marginTop: "1rem" }}>
          <h3>Reviews:</h3>
          <ul>
            {trip.reviews.map((review) => (
              <li key={review._id}>
                <strong>Rating:</strong> {review.rating} / 5 <br />
                <strong>Comment:</strong> {review.comment} <br />
              </li>
            ))}
          </ul>
        </div>
      )}

      {trip.destination && trip.destination.length > 0 && (
        <div style={{ marginTop: "0.5rem" }}>
          <h3>Destinations:</h3>
          <ul>
            {trip.destination.map((dest, index) => (
              <li key={index}>
                {dest.city}, {dest.country} - {dest.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
};

export default TripDetails;