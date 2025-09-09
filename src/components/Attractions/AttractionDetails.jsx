import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { UserContext } from '../../contexts/UserContext'
import * as attractionService from "../../services/attractionService.js"


const AttractionDetails = () => {
    const { destinationId, attractionId } = useParams();
    const { user } = useContext(UserContext)

    const [attractions, setAttractions] = useState(null)

    const navigate = useNavigate()
  
    useEffect(() => {
      const fetchAttractions = async () => {
        const fetcedAttractions = await attractionService.show(destinationId, attractionId)
  
        console.log("fetched attractions", fetcedAttractions)
        setAttractions(fetcedAttractions)
      }
      if(user) fetchAttractions()
  
    }, [user])

    if(!attractions) {
        return <h1>Loading...</h1>
    }

  return (
    <main>
        <article>
            <h2>{attractions.name}</h2>
            <p>Rating: {attractions.rating}</p>
            <img src={attractions.img} alt={attractions.name} />
            <p>Created at: {new Date(attractions.createdAt).toLocaleDateString()}</p>

        <ul>
            {attractions.attractionReviews.length === 0 ? (
            <li>No reviews yet</li>
            ) : (
            attractions.attractionReviews.map((review) => (
            <li key={review._id}>{review.comment}</li>
          ))
        )}
        </ul>
        </article>
    </main>
  )
}

export default AttractionDetails