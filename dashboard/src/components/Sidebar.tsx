import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/components/sidebar.css';

export default function Sidebar() {
  const { goBack } = useHistory();
  
  return (
    <aside className="app-sidebar">
      <img src={mapMarkerImg} alt="Happy" />

      <nav>
        <Link to="/orphanages/create" className="create-orphanage">
          <FiPlus size={24} color="#FFF" />
        </Link>
      </nav>

      <footer>
        <button type="button" onClick={goBack}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </aside>
  );
}