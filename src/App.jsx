import { useContext } from 'react';
import { Routes, Route } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import Trips from './components/Trips/Trips';
import TripsForm from './components/Trips/TripsForm';
import TripsDetails from './components/Trips/TripsDetails';
import TripsEdit from './components/Trips/TripsEdit';
import TripsReview from './components/Trips/TripsReview';


import { UserContext } from './contexts/UserContext';

const App = () => {
  const { user } = useContext(UserContext);
  
  return (
    <>
      <NavBar/>


      
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        {user ? (<>
        <Route path='/trips' element={<Trips />} />
        <Route path='/trips/new' element={<TripsForm />} />
        <Route path='/trips/:tripId' element={<TripsDetails />} />
        <Route path='/trips/:tripId/edit' element={<TripsEdit />} />
        <Route path='/trips/:tripId/reviews' element={<TripsReview />} />        
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
