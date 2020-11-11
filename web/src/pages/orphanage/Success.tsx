import React from "react";
import { Link } from 'react-router-dom';

import feitoImg from '../../images/feito.svg';
import '../../styles/pages/success.css';

export default function Success() {  
  return (
    <div id="page-success"> 
      <div className="done">
        <h3>Ebaaa!</h3>
        <p>O cadastro deu certo e foi enviado ao administrador para ser aprovado. Agora é só esperar :)</p>

        <Link to="/app" className="map-button">
          Voltar para o mapa
        </Link>
      </div>
      <div>
        <img src={feitoImg} alt="Happy - Logo"/>
      </div>
    </div>
  );
}