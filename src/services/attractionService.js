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

export {
    index,
    show,
    create,
}

