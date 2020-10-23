import React, { FormEvent, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import '../styles/pages/dashboard-esqueci.css'
import logoImg from '../images/logoLogin.svg';
import api from '../services/api'

export default function DashboardForgetPassword() {
  const [user, setUser] = useState('');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    
    if(user.length > 0) {
      
      let data = {
        params: {
          user
        }
      }

      api.get('esqueci', data)
    }
  }

  return (
    <div id="page-dashboard">
      <div className="sidebar">
        <img src={logoImg} alt="Happy - Logo"/>

        <div className="location">
          <strong>Guarapari</strong>
          <span>Espirito Santo</span>
        </div>
      </div>
      <div className="login">
        <h3>Fazer login</h3>
        <form onSubmit={handleSubmit} className="form-login">
          <div className="input-block">
            <label htmlFor="email">E-mail</label>
            <input id="email" value={user} onChange={event => setUser(event.target.value)} />
          </div>

          <button className={(user.length > 0) ? 'confirm-button' : 'confirm-button disabled'} type="submit">
            Confirmar
          </button>
        </form>

        <Link to="/" className="go-back" >
          <FiArrowLeft size={26} color="#15C3D6" />              
        </Link>
      </div>
    </div>
  );
}