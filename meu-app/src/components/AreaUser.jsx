import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/AreaUser.css';
import { FaTicketAlt, FaBoxOpen, FaUserCircle } from 'react-icons/fa';

const AreaUser = () => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <nav className="menu-lateral">
      <ul>
        <li>
          <NavLink to="/listar-respostas">
            <FaTicketAlt className="icon" /> Tickets
          </NavLink>
        </li>
        <li>
          <NavLink to="/inventario">
            <FaBoxOpen className="icon" /> Inventário
          </NavLink>
        </li>
        <li>
          <div onClick={toggleSubMenu}>
            <FaUserCircle className="icon" /> Perfil
          </div>
          {isSubMenuOpen && (
            <ul className="submenu open">
              <li>
                <NavLink to="/perfil/info">Informações</NavLink>
              </li>
              <li>
                <NavLink to="/perfil/settings">Configurações</NavLink>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default AreaUser;
