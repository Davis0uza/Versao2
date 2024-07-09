import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBook, FaShoppingCart, FaBox, FaHistory, FaUser } from 'react-icons/fa';
import '../styles/MenuLateralVendedor.css';

const MenuLateralVendedor = () => {
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
                    <NavLink to="/vendas">
                        <FaShoppingCart className="icon" /> Vendas
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/artigos">
                        <FaBox className="icon" /> Artigos
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

export default MenuLateralVendedor;
