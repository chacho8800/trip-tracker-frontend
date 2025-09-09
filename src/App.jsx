import { useContext } from 'react';
import { Routes, Route } from 'react-router';
import DestinationDetails from './components/Destination/DestinationDetails';
import DestinationForm from './components/Destination/DestinationForm';
import DestinationList from './components/Destination/DestinationList';
import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';

import { UserContext } from './contexts/UserContext';

const App = () => {
  const { user } = useContext(UserContext);
  
  return (
    <>
  <NavBar/>
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
          <Route
            path="/:tripId/destinations"
            element={<DestinationList />}
          />
          <Route
            path="/:tripId/destinations/new"
            element={<DestinationForm />}
          />
          <Route
            path="/:tripId/destinations/:destinationId/"
            element={<DestinationDetails />}
          />
          </>
        ) : (
          <>
          <Route path='/sign-up' element={<SignUpForm />} />
          <Route path='/sign-in' element={<SignInForm />} />
          </>
        )}
      </Routes>

    </>
  );
};

export default App;
