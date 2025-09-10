const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/destinations`;

const index = async (destinationId) => {
  try {
    const res = await fetch(`${BASE_URL}/${destinationId}/attractions`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    const data = await res.json();

    if (data.err) throw new Error(data.err);

    return data;
  } catch (error) {
    console.error(error);
    throw new Error;
  }
};

const show = async (destinationId, attractionId) => {
    try {
        const res = await fetch(`${BASE_URL}/${destinationId}/attractions/${attractionId}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
            
        })

        const data = await res.json()

        if(data.err) throw new Error(data.err)

        return data

    } catch (error) {
        console.log(error)
        throw new Error
    }
}

const create = async (destinationId, attractionFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${destinationId}/attractions`, {
            method: "POST",
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(attractionFormData)
        })

        const data = await res.json()

        if(data.err) throw new Error(data.err)

        return data

    } catch (error) {
        console.log(error)
        throw new Error
    }
}

const addReview = async (destinationId, attractionId, reviewData) => {
    const response = await fetch(
      `${BASE_URL}/destinations/${destinationId}/attractions/${attractionId}/reviews`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(reviewData),
      }
    );
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to add review");
    }
  
    return response.json();
  };

export {
    index,
    show,
    create,
    addReview
}

