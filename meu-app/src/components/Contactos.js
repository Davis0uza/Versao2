import React from 'react';
import '../styles/Contactos.css';
import heroImage from '../Assets/Contactos-photo.jpg'; 
import { MdOutlineEmail } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";

const Contactos = () => {
  return (
    <div className="contact-page">
      <div className="hero-image-container">
        <img src={heroImage} alt="Hero" className="hero-image" />
      </div>
      <div className="contact-info">
        <h2>Contacta-nos</h2>
        <p><MdOutlineEmail className='icon_email'/>  4techteam@gmail.com</p>
        <p><BsTelephone className='icon_email'/> (123) 456-7890</p>
        <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
        </div>
      </div>
    </div>
  );
};

export default Contactos;
