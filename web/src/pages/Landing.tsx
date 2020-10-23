import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

import '../styles/pages/landing.css';
import { Link } from 'react-router-dom'

import logoImg from '../images/logo.svg';

function Landing() {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <div className="happy">
          <img src={logoImg} alt="Happy - Logo"/>
          <div className="location">
            <strong>Guarapari</strong>
            <span>Espirito Santo</span>
          </div>
        </div>

        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>

        <Link to="/app"  className="enter-app">
          <FiArrowRight size={26} color="rgba(0,0,0,0.6)" />
        </Link>

        <Link to="/dashboard/login" className="enter-dash">
          Acesso restrito
        </Link>
      </div>
    </div>
  );
}

export default Landing