
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/trips`;

// Create a new trip
const  create = async (tripData) =>  {
  try {
    const response = await fetch(BASE_URL,{
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tripData)
    });
    
    const data = await response.json()

    if(data.err) throw new Error(data.err)

    return data

  } catch (error) {
    console.log(error)
    throw new Error
  }
}

// Get all trips
export async function getAll() {
  try {
    const response = await fetch(BASE_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    const data = await response.json()

    if(data.err) throw new Error(data.err)

    return data

  } catch (error) {
    console.log(error)
    throw new Error
  }
}

// Get a single trip by id
export async function getById(tripId) {
  try {
    const response = await fetch(`${BASE_URL}/${tripId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json()

    if(data.err) throw new Error(data.err)

    return data

  } catch (error) {
    console.log(error)
    throw new Error
  }
}

// Update a trip
const update = async (id, tripData) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(tripData)
    })
    const data = await response.json()

    if(data.err) throw new Error(data.err)

    return data

  } catch (error) {
    console.log(error)
    throw new Error
  }
}

// Delete a trip
export async function remove(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    const data = await response.json()

    if(data.err) throw new Error(data.err)

    return data

  } catch (error) {
    console.log(error)
    throw new Error
  }
}

export async function addReview(tripId, reviewData) {
  try {
    const response = await fetch(`${BASE_URL}/${tripId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(reviewData)
    });
    const data = await response.json()

    if(data.err) throw new Error(data.err)

    return data

  } catch (error) {
    console.log(error)
    throw new Error
  }
}

export {
  create,
  update,
}