import React from 'react';
import '../styles/Footer.css';
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <>
            <div className="Footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-5 col-12 ft-1">
                            <h3><span>4</span>TECH</h3>
                            <p>Simplificamos o processo de transação!</p>
                            <div className="footer-icons">
                                <i><FaInstagram /></i>
                                <i><FaFacebook /></i>
                                <i><FaLinkedin /></i>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 col-12 ft-2">
                            <h5>Empresa</h5>
                            <ul>
                                <li className="nav-item">
                                    <a className="" href="/">Termos de Utilização</a>
                                </li>
                                <li className="nav-item">
                                    <a className="" href="/">Política e Privacidade</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-6 col-lg-4 col-12 ft-3">
                            <h5>Menu</h5>
                            <ul>
                                <li className="nav-item">
                                    <a className="/sobre" href="/">Sobre</a>
                                </li>
                                <li className="nav-item">
                                    <a className="/contactos" href="/">Contactos</a>
                                </li>
                                <li className="nav-item">
                                    <a className="/registar" href="/">Registar</a>
                                </li>
                                <li className="nav-item">
                                    <a className="/entrar" href="/">Entrar</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;