const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/trips`;

// Create a new trip
export const create = async (tripData) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(tripData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to create trip');
  }

  return response.json();
};

// Update an existing trip
export const update = async (tripId, tripData) => {
  const response = await fetch(`${BASE_URL}/${tripId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(tripData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to update trip');
  }

  return response.json();
};

// Delete a trip
export const deleteTrip = async (tripId) => {
  const response = await fetch(`${BASE_URL}/${tripId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to delete trip');
  }

  return response.json();
};

// Get all trips
export const getAll = async () => {
  const response = await fetch(BASE_URL, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  if (!response.ok) throw new Error('Failed to fetch trips');
  return response.json();
};

// Get a single trip by ID
export const getById = async (tripId) => {
  const response = await fetch(`${BASE_URL}/${tripId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  if (!response.ok) throw new Error('Failed to fetch trip');
  return response.json();
};

// Add a review to a trip
export const addReview = async (tripId, reviewData) => {
  const response = await fetch(`${BASE_URL}/${tripId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(reviewData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to add review");
  }

  return response.json();
};