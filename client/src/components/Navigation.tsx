import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const Navigation: React.FC = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Gestion des Appels d'Offres
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {user && user.token ?  (
              <>
                <li className="nav-item">
                  <span className="nav-link">
                    Hello, {user.username}
                  </span>
                </li>
                {user.role === 'demandeur' && (
                  <li className="nav-item">
                    <Link to="/addAppelOffre" className="nav-link">
                      Add Appel d'Offre
                    </Link>
                  </li>
                )}
                {['demandeur', 'concurrent'].includes(user.role) && (
                  <li className="nav-item">
                    <Link to="/clientDashboard" className="nav-link">
                      Dashboard
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <a href="#" className="nav-link text-danger" onClick={handleLogout}>
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
           
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
            
                </li>
                <li className="nav-item">
            
                    <Link to="/register" className="nav-link">
                      Register
                    </Link>
                  
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
