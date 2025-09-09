import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { UserContext } from '../../contexts/UserContext'
import * as destinationService from '../../services/destinationService.js'




const DestinationList = () => {
    const { tripId, destinationId } = useParams();
    const { user } = useContext(UserContext)
    const [destination, setDestination] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
      const fetchDestination = async () => {
        const fetcedDestination = await destinatioService.index(tripId)
        console.log("fetched Destination", fetcedDestination)
        setDestination(fetcedDestination)
      }
      if(user) fetchDestination()
    }, [user])
  return (
    <main>
    <button onClick={() => navigate("/:tripId/destinations/new")}>Add Attraction</button>
    {destination.length === 0 ? (
      <p>No </p>
    ) : (
      <ul>
        {destination.map((dest) => (
          <li key={dest._id}>
            <Link to={`/${tripId}/destinations/${destinationId}/`}>
            <h3>  Country:{dest.country}
            </h3>
            </Link>
          </li>
        ))}
      </ul>
    )}
  </main>
  )
}

export default DestinationList