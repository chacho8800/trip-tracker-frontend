import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { UserContext } from '../../contexts/UserContext'
import * as attractionService from "../../services/attractionService.js"


const AttractionList = () => {
    const { user } = useContext(UserContext)

    const [attractions, setAttractions] = useState([])

    const navigate = useNavigate()

    const { destinationId, attractionId, tripId} = useParams()
  
    useEffect(() => {
      const fetchAttractions = async () => {
        const fetcedAttractions = await attractionService.index(destinationId)
  
        console.log("fetched attractions", fetcedAttractions)
        setAttractions(fetcedAttractions)
      }
      if(user) fetchAttractions()
  
    }, [user])

  return (
    <main>
    <button onClick={() => navigate(`/trips/${tripId}/destinations/${destinationId}/attractions/new`)}>Add Attraction</button>

    {attractions.length === 0 ? (
      <p>No attractions found.</p>
    ) : (
      <ul>
        {attractions.map((attraction) => (
          <li key={attraction._id}>
            <Link to={`/destinations/${destinationId}/attractions/${attraction._id}`}>
              {attraction.name} — Posted by {user.firstName} {user.lastName}
            </Link>
          </li>
        ))}
      </ul>
    )}
  </main>
  )
}

export default AttractionList