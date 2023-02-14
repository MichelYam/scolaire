import React from 'react';

import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className='main'>
      <div className='error-content'>
        <h2>404</h2>
        <p>Oups! La page que vous demandez n'existe pas.</p>
        <Link to="/" >Retourner sur la page d'acceuil</Link>
      </div>
    </div>
  )
}
