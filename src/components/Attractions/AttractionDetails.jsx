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
    <p>
      Created at:{" "}
      {new Date(attractions.createdAt).toLocaleDateString()}
    </p>

    {attractions.attractionreviews && attractions.attractionreviews.length > 0 && (
      <section style={{ marginTop: "1rem" }}>

        <h3>Reviews:</h3>
        <ul>
          {attractions.attractionreviews.map((review) => (
            <li key={review._id}>
              <strong>Rating:</strong> {review.rating} / 5 <br />
              <strong>Comment:</strong> {review.comment}
            </li>
          ))}
        </ul>
      </section>
    )}
  </article>
</main>
  )
}

export default AttractionDetails