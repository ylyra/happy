import React, { FormEvent, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import '../../styles/pages/dashboard-change.css'
import logoImg from '../../images/logoLogin.svg';
import api from '../../services/api'

export default function Reset() {
  const [password, setPassword] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [passwordRepeatType, setPasswordRepeatType] = useState('password');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    
    if(password.length > 0 && passwordRepeat.length > 0 && password === passwordRepeat) {
      
      let data = {
        params: {
          password
        }
      }

      api.put('update', data)
    }
  }

  function handleTypeOne() {
    if(passwordType === 'password') {
      setPasswordType('password');
    } else {
      setPasswordType('text')
    }
  }

  function handleTypeTwo() {
    if(passwordRepeatType === 'password') {
      setPasswordRepeatType('password');
    } else {
      setPasswordRepeatType('text')
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
            <label htmlFor="senha_nova">Nova senha</label>
            <input type={passwordType} id="senha_nova" value={password} onChange={event => setPassword(event.target.value)} />
            <button type="button" onClick={handleTypeOne}>O</button>
          </div>

          <div className="input-block">
            <label htmlFor="senha_nova_repeat">Repetir senha</label>
            <input type={passwordRepeatType} id="senha_nova_repeat" value={passwordRepeat} onChange={event => setPasswordRepeat(event.target.value)} />
            <button type="button" onClick={handleTypeTwo}>O</button>
          </div>

          <button className={(password.length > 0 && passwordRepeat.length > 0 && password === passwordRepeat) ? 'confirm-button' : 'confirm-button disabled'} type="submit">
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