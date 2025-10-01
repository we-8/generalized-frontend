'use client';

import React, { useState } from "react";
import "./ContactUsForm.css";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subject = encodeURIComponent(`Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `${formData.message}`
    );
    
    // Opens Gmail web interface
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=ceylonrichproducts@gmail.com&su=${subject}&body=${body}`,
      '_blank'
    );
    
    // Clear form after opening Gmail
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-container">
      <div className="form-container">
        <h2>Send us a message</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="name" 
            placeholder="Name" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required 
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required 
          />
          <textarea 
            name="message" 
            placeholder="Message" 
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            required
          ></textarea>
          
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3968.3665328143566!2d80.54740057447758!3d5.944120329625948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae139abb4f0a243%3A0x2fcc082abb56c8d6!2sCEYLON%20RICH%20PRODUCTS%20(PVT)%20LTD!5e0!3m2!1sen!2slk!4v1730781021865!5m2!1sen!2slk"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactForm;