import { useState, useEffect, useContext} from "react";
import { useParams } from "react-router";
import { UserContext } from "../../contexts/UserContext";

const DestinationDetails = () => {
  const { tripId } = useParams();
  const [destination, setDestination] = useState(null);

  const {user} = useContext(UserContext) // get back logged in user
  useEffect(() => {
    const fetchDestination = async () => {
      const fetchedDestination = await destinationService.show(destinationId);
      setDestination(fetchedDestination);
    };

    fetchHoot();
  }, [hootId]); // run on page load and anytime the hootId changes

  const handleAddDiscription = async (discriptionFormData) => {
    console.log('discriptionFormData', discriptionFormData)
    const newDestination = await destinationService.createComment(destinationId, discriptionFormData )
    setDestination({...destination, description: [...destination.discription, newdiscription]})
  }

  if (!destination) {
    return <h1>Loading...</h1>;
  }

  return (
    <main>
      <section>
        <header>
          <p>{destination.country.toUpperCase()}</p>
          <h1>{destination.city}</h1>
          <p>
            {`${destination.author.username} posted on ${new Date(
              destination.createdAt
            ).toLocaleDateString()}`}
          </p>
          {destination.author._id === user._id && (
            <>
              <button>Delete</button>
              <button>Update</button>
            </>
          ) }
        </header>
        <p>{destination.text}</p>
      </section>
      <section>
        <h2>Comments</h2>

        <CommentForm handleAddDiscription={handleAddDiscription} />

        {!destination.discription.length && <p>There are no comments</p>}

        {destination.discription.map(discription => {
            return <article>
                <header>
                    <p>{`${destination.author.username} posted on ${new Date(discription.createdAt).toLocaleDateString()}`}</p>
                </header>
                <p>{discription.text}</p>
            </article>
        })}
      </section>
    </main>
  );
};

export default DestinationDetails;