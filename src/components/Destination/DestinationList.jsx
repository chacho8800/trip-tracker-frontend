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
        const fetcedDestination = await destinationService.index(tripId)
        console.log("fetched Destination", fetcedDestination)
        setDestination(fetcedDestination)
      }
      if(user) fetchDestination()
    }, [user])
  return (
    <main>
    {destination.length === 0 ? (
      <p>No destination  </p>
    ) : (
      <ul>
        {destination.map((dest) => (
          <li key={dest._id}>
            <h3>{dest.city}, {dest.country}</h3>
            <p>{dest.description}</p>
    
      <button onClick={() => navigate(`/trips/${tripId}/destinations/${dest._id}/attractions/new`)}>
        Add Attraction
      </button>

          </li>


          
        ))}

      </ul>
    )}
  </main>
  )
}

export default DestinationList