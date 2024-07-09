import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBook, FaCheckCircle, FaClock, FaHistory, FaUser } from 'react-icons/fa';
import '../styles/MenuLateralUtilizador.css';

const MenuLateralUtilizador = () => {
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
                <li>
                    <NavLink to="/biblioteca">
                        <FaBook className="icon" /> Biblioteca
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/ativados">
                        <FaCheckCircle className="icon" /> Ativados
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/por-ativar">
                        <FaClock className="icon" /> Por Ativar
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/historico">
                        <FaHistory className="icon" /> Histórico
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/perfil">
                        <FaUser className="icon" /> Perfil
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default MenuLateralUtilizador;
