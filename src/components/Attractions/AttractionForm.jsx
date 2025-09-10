import {useState} from 'react'
import * as attractionService from "../../services/attractionService.js"
import { useNavigate, useParams } from 'react-router'


const AttractionForm = () => {
    const [attractions, setAttractions] = useState([])

    const navigate = useNavigate()

    const { destinationId, tripId } = useParams()

    const [formData, setFormData] = useState({
        name: "",
        img: "",
        rating: ""
    })

    const {name, img, rating} = formData

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name] : event.target.value })
    }

    const handleAddAttraction = async (attractionFormData) => {
        const newAttraction = await attractionService.create(destinationId, attractionFormData)
        setAttractions([newAttraction, ...attractions])

        console.log("Attraction Form Data", newAttraction)
        navigate(`/trips/${tripId}/destinations/${destinationId}/attractions`)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        handleAddAttraction(formData)
        console.log("Form Data", formData)
    }



  return (
    <main>
        <h1>Create New Attraction</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input 
                type="text"
                name='name'
                id='name'
                value={name}
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <label htmlFor="img">Img With URL:</label>
                <input 
                type="url"
                name='img'
                id='img'
                value={img}
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <label htmlFor="rating">Rating:</label>
                <input 
                type="text"
                name='rating'
                id='rating'
                value={rating}
                onChange={handleChange}
                required
                />
            </div>
            <button type='submit'>Create Attraction</button>
        </form>
    </main>
  )
}

export default AttractionForm