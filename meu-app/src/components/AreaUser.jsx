import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaUsers, FaUser, FaTicketAlt, FaPuzzlePiece, FaBoxes } from 'react-icons/fa'; // Importando ícones do react-icons
import '../styles/AreaUser.css'; 

const AreaUser = () => {
    const [openSubmenus, setOpenSubmenus] = useState({});

    const toggleSubmenu = (menu) => {
        setOpenSubmenus((prevState) => ({
            ...prevState,
            [menu]: !prevState[menu],
        }));
    };

    return (
        <nav className="menu-lateral">
            <ul>
               <br></br><br></br><br></br><br></br><br></br><br></br>
                <li onClick={() => toggleSubmenu('tickets')}>
                    
                        <FaTicketAlt className="icon" /> {/* Ícone para Usuários */}
                        Tickets

                    <ul className={openSubmenus['tickets'] ? 'submenu open' : 'submenu'}>
                        <li><NavLink to="/tickets">Listar Tickets</NavLink></li>
                    </ul>
                    <ul className={openSubmenus['tickets'] ? 'submenu open' : 'submenu'}>
                        <li><NavLink to="/responderticket">Responder Tickets</NavLink></li>
                    </ul>
                    <ul className={openSubmenus['usuarios'] ? 'submenu open' : 'submenu'}>
                        <li><NavLink to="/categorias">Categorias</NavLink></li>
                    </ul>
                    <ul className={openSubmenus['usuarios'] ? 'submenu open' : 'submenu'}>
                        <li><NavLink to="/adicionar-stock">Adicionar Stock</NavLink></li>
                    </ul>
                </li>
                <li>
                    <NavLink to="/inventario" className="menu-link">
                        <div className="menu-item">
                            <FaBoxes className="icon" /> {/* Ícone para Inventário */}
                            Inventário
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/perfil" className="menu-link">
                        <div className="menu-item">
                            <FaUser className="icon" /> {/* Ícone para Perfil */}
                            Perfil
                        </div>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default AreaUser;
    