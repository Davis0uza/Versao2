import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaUser, FaTicketAlt, FaBoxOpen, FaPuzzlePiece, FaPlusSquare } from 'react-icons/fa'; // Importando ícones do react-icons
import '../styles/AreaGestorProdutos.css'; // CSS específico para o menu lateral

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
               <br></br><br></br><br></br><br></br><br></br><br></br>
                <li onClick={() => toggleSubmenu('produtos')}>
                    <FaBoxOpen  className="icon" /> {/* Ícone para Usuários */}
                    Produtos
                    <ul className={openSubmenus['produtos'] ? 'submenu open' : 'submenu'}>
                        <li><NavLink to="/produtos">Listar Produtos</NavLink></li>
                    </ul>
                    <ul className={openSubmenus['produtos'] ? 'submenu open' : 'submenu'}>
                        <li><NavLink to="/versoes">Versões</NavLink></li>
                    </ul>
                    <ul className={openSubmenus['produtos'] ? 'submenu open' : 'submenu'}>
                        <li><NavLink to="/categorias">Categorias</NavLink></li>
                    </ul>
                    <ul className={openSubmenus['produtos'] ? 'submenu open' : 'submenu'}>
                        <li><NavLink to="/adicionar-stock">Adicionar Stock</NavLink></li>
                    </ul>
                    <ul className={openSubmenus['produtos'] ? 'submenu open' : 'submenu'}>
                        <li><NavLink to="/efetuar-compra">Atribuir Produtos</NavLink></li>
                    </ul>
                </li>
                <li onClick={() => toggleSubmenu('dlcs')}>
                    <FaPuzzlePiece className="icon" /> {/* Ícone para Gestores */}
                    Add-ons
                    <ul className={openSubmenus['dlcs'] ? 'submenu open' : 'submenu'}>
                        <li><NavLink to="/dlcs">Listar Add-ons</NavLink></li>
                    </ul>
                </li>
                <li onClick={() => toggleSubmenu('tickets')}>
                    <FaTicketAlt className="icon" /> {/* Ícone para Usuários */}
                    Tickets
                    <ul className={openSubmenus['tickets'] ? 'submenu open' : 'submenu'}>
                        <li><NavLink to="/tickets">Listar Tickets</NavLink></li>
                    </ul>
                    <ul className={openSubmenus['tickets'] ? 'submenu open' : 'submenu'}>
                        <li><NavLink to="/responderticket">Responder Tickets</NavLink></li>
                    </ul>
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

export default AreaGestorComprador;
