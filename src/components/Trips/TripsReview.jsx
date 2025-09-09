import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as tripService from "../../services/tripService"; // make sure tripService has an addReview function

const GiveReviewForm = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    rating: "",
    comment: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      await tripService.addReview(tripId, formData);
      navigate(`/trips/${tripId}`); 
    } catch (err) {
      console.error(err);
      setMessage("Failed to submit review.");
    }
  };

  return (
    <main>
      <h1>Give a Review</h1>
      {message && <p style={{ color: "red" }}>{message}</p>}
      <form onSubmit={handleSubmit} autoComplete="off">
        <div>
          <label htmlFor="rating">Rating (1-5):</label>
          <input
            type="number"
            id="rating"
            name="rating"
            min="1"
            max="5"
            value={formData.rating}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Submit Review</button>
          <button type="button" onClick={() => navigate(`/trips/${tripId}`)}>Cancel</button>
        </div>
      </form>
    </main>
  );
};

export default GiveReviewForm;