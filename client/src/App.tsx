import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppelOffresList from './components/AppelOffresList'; // Make sure the import paths are correct
import AppelOffresDetails from './components/AppelOffresDetails'; // Make sure the import paths are correct
import Home from './components/Home'; // Make sure the import paths are correct
import Register from './components/Register';
import Login from './components/Login';
import Navigation from './components/Navigation';
import AddAppelOffre from './components/AddAppelOffre';
import ClientDashboard from './components/ClientDashboard';






function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appelsOffres" element={<AppelOffresList />} />
          <Route path="/appelsOffres/:id" element={<AppelOffresDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addAppelOffre" element={<AddAppelOffre />} />
          <Route path="/clientDashboard" element={<ClientDashboard />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
