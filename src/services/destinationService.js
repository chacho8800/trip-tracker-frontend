const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/trips`;


const index = async (tripId) => {
  try {
    const res = await fetch(`${BASE_URL}/${tripId}/destinations`, {
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




const show = async (destinationId, tripId) => {
    try {
        const res = await fetch(`${BASE_URL}/${tripId}/destinations/${destinationId}`, {
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




const create = async (tripId, destinationsFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${tripId}/destinations`, {
            method: "POST",
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(destinationsFormData)
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

    create ,
    index ,
    show
}