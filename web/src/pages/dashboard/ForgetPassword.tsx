import React, { FormEvent, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import '../../styles/pages/dashboard-esqueci.css'
import logoImg from '../../images/logoLogin.svg';
import {useAuth} from '../../contexts/auth'

export default function ForgetPassword() {
  const [user, setUser] = useState('');
  const [warning, setWarning] = useState('');
  const {reset} = useAuth();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    
    if(user.length > 0) {
      
      let request = {
        email:user
      }

      const {status, data} = await reset(request)
      if(status === 200) setWarning(data.info)
      
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
        <h3>Esqueci a senha</h3>
        <p className="warning">Sua redefinição de senha será enviada para o e-mail cadastrado.</p>
        <form onSubmit={handleSubmit} className="form-login">
          <div className="input-block">
            <label htmlFor="email">E-mail</label>
            <input id="email" value={user} onChange={event => setUser(event.target.value)} />
          </div>

          <button className={(user.length > 0) ? 'confirm-button' : 'confirm-button disabled'} type="submit">
            Confirmar
          </button>
        </form>

        { warning.length > 0 && (<p className="warning success">{warning}</p>) }

        <Link to="/" className="go-back" >
          <FiArrowLeft size={26} color="#15C3D6" />              
        </Link>
      </div>
    </div>
  );
}