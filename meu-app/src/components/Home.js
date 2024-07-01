import React from 'react';
import MenuLateral from './MenuLateral';

function Home() {
  return (
    <div>
      <MenuLateral />
      <div style={{ marginLeft: '260px', padding: '20px' }}>
        <h1>Bem-vindo ao Sistema de Gestão</h1>
        <p>Utilize o menu acima para navegar pelas diferentes seções do sistema.</p>
      </div>
    </div>
  );
}

export default Home;
