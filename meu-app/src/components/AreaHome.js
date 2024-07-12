import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaUser, FaSignInAlt, FaUserPlus } from 'react-icons/fa'; // Importando ícones do react-icons
import '../styles/AreaHome.css';

const AreaGestorComprador = () => {
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
               <br></br><br></br>
                <li>
                    <NavLink to="/login" className="menu-link">
                        <div className="menu-item">
                            <FaSignInAlt className="icon" /> {/* Ícone para Perfil */}
                            Login
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/register" className="menu-link">
                        <div className="menu-item">
                            <FaUserPlus className="icon" /> {/* Ícone para Perfil */}
                            Registar
                        </div>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default AreaGestorComprador;
