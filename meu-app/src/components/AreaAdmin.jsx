import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaUsers, FaUserShield, FaUserCog, FaUser } from 'react-icons/fa'; // Importando ícones do react-icons
import '../styles/AreaAdmin.css'; // CSS específico para o menu lateral

const MenuLateral = () => {
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
                <li></li><li></li><li></li><li></li><li></li><li></li><li></li>
                <li onClick={() => toggleSubmenu('usuarios')}>
                    <FaUsers className="icon" /> {/* Ícone para Usuários */}
                    Usuários
                    <ul className={openSubmenus['usuarios'] ? 'submenu open' : 'submenu'}>
                        <li><NavLink to="/usuarios">Listar Usuários</NavLink></li>
                    </ul>
                </li>
                <li onClick={() => toggleSubmenu('gestores')}>
                    <FaUserShield className="icon" /> {/* Ícone para Gestores */}
                    Gestores
                    <ul className={openSubmenus['gestores'] ? 'submenu open' : 'submenu'}>
                        <li><NavLink to="/gestores">Promover Gestores</NavLink></li>
                    </ul>
                </li>
                <li onClick={() => toggleSubmenu('tiposUtilizador')}>
                    <FaUserCog className="icon" /> {/* Ícone para Tipos de Utilizador */}
                    Tipos de Utilizador
                    <ul className={openSubmenus['tiposUtilizador'] ? 'submenu open' : 'submenu'}>
                        <li><NavLink to="/tipos-utilizador">Listar Tipos de Utilizador</NavLink></li>
                    </ul>
                    <ul className={openSubmenus['tiposUtilizador'] ? 'submenu open' : 'submenu'}>
                        <li><NavLink to="/promover-tipoutilizador">Promover Tipos de Utilizador</NavLink></li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
};

export default MenuLateral;
