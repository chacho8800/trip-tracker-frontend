
import { useContext } from 'react';
import { Routes, Route, useParams } from 'react-router';
import DestinationDetails from './components/Destination/DestinationDetails';
import DestinationForm from './components/Destination/DestinationForm';
import DestinationList from './components/Destination/DestinationList';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';

import TripsDashboard from './components/Trips/TripsDashboard.jsx';
import TripsForm from './components/Trips/TripsForm';
import TripsDetails from './components/Trips/TripsDetails';
import TripsEdit from './components/Trips/TripsEdit';
import TripsReview from './components/Trips/TripsReview';

import AttractionList from './components/Attractions/attractionList.jsx';
import AttractionDetails from './components/Attractions/AttractionDetails.jsx';
import AttractionForm from './components/Attractions/AttractionForm.jsx';



import { UserContext } from './contexts/UserContext';

const App = () => {
  const { user } = useContext(UserContext);
 const {tripId} = useParams();
  
  return (
    <>
     <NavBar/>
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />

        {user ? (<>
        <Route path='/trips' element={<TripsDashboard />} />
        <Route path='/trips/new' element={<TripsForm />} />
        <Route path='/trips/:tripId' element={<TripsDetails />} />
        <Route path='/trips/:tripId/edit' element={<TripsEdit />} />
        <Route path='/trips/:tripId/reviews' element={<TripsReview />} />
          <Route
            path="/trips/:tripId/destinations"
            element={<DestinationList />}
          />
              
          <Route
            path="/trips/:tripId/destinations/new"
            element={<DestinationForm />}
          />
              
          <Route
            path="/:tripId/destinations/:destinationId/"
            element={<DestinationDetails />}
          />
              
          <Route
            path="/trips/:tripId/destinations/:destinationId/attractions/"
            element={<AttractionList />}
          />

          <Route
            path="/trips/:tripsId/destinations/:destinationId/attractions/new"
            element={<AttractionForm />}
          />

          <Route
            path="/destinations/:destinationId/attractions/:attractionId"
            element={<AttractionDetails />}
          />
 </>
        ) : (
          <>
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />   
        </>
        ) }

      </Routes>

    </>
  );
};

export default App;
