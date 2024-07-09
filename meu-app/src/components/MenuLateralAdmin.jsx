import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart, FaUsers, FaUserClock } from 'react-icons/fa';
import '../styles/MenuLateralAdmin.css';

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
                    <NavLink to="/vendas">
                        <FaShoppingCart className="icon" /> Vendas
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/vendedores">
                        <FaUsers className="icon" /> Vendedores
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/utilizadores">
                        <FaUserClock className="icon" /> Utilizadores
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default MenuLateralUtilizador;
