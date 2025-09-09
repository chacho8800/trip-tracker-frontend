import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/trips`;



// Create a new trip
export async function create(tripData) {
  try {
    const response = await axios.post(BASE_URL, tripData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

// Get all trips
export async function getAll() {
  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    return response.data
  } catch (error) {
    throw error.response ? error.response.data : error
  }
}

// Get a single trip by id
export async function getById(tripId) {
  try {
    const response = await axios.get(`${BASE_URL}/${tripId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

// Update a trip
export async function update(id, tripData) {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, tripData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    return response.data
  } catch (error) {
    throw error.response ? error.response.data : error
  }
}

// Delete a trip
export async function remove(id) {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    return response.data
  } catch (error) {
    throw error.response ? error.response.data : error
  }
}

export async function addReview(tripId, reviewData) {
  try {
    const response = await axios.post(`${BASE_URL}/${tripId}/reviews`, reviewData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error("Review submission error:", err.response || err);
    throw err.response ? err.response.data : err;
  }
}