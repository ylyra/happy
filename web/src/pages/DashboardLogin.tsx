import React, { FormEvent, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import '../styles/pages/dashboard-login.css'
import logoImg from '../images/logoLogin.svg';
import api from '../services/api'

export default function DashboardLogin() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    
    if(user.length > 0 && password.length > 0) {
      
      let data = {
        params: {
          user,
          password
        }
      }

      api.get('login', data)
    }
  }

  function handleCheckboxChange() {
    if(remember) {
      setRemember(false);
    } else {
      setRemember(true);
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

          <div className="input-block">
            <label htmlFor="senha">Senha</label>
            <input type="password" id="senha" value={password} onChange={event => setPassword(event.target.value)} />
          </div>

          <div className="infos">
            <div className="input-checkbox">
              <input type="checkbox" id="lembra" onChange={handleCheckboxChange} />
              <label htmlFor="lembra"> Lembrar-me</label>
            </div>

            <Link to="/dashboard/esqueci" className="esqueci-senha" >Esqueci minha senha</Link>
          </div>

          <button className={(user.length > 0 && password.length > 0) ? 'confirm-button' : 'confirm-button disabled'} type="submit">
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