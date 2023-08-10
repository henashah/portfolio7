// TestimonyPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TestimonyPage.css'; // Import your custom CSS file
// import { NavLink, Switch, Route, Routes } from 'react-router-dom';
import './App.css';
import Button from '@mui/material/Button';

const TestimonyPage = () => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [testimonies, setTestimonies] = useState([]);

  const fetchTestimonies = async () => {
    try {
      const response = await axios.get('/api/testimonies');
      setTestimonies(response.data);
    } catch (error) {
      console.error('Error fetching testimonies:', error);
    }
  };

  useEffect(() => {
    fetchTestimonies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/submit-testimony', { name, content });
      fetchTestimonies();
      setName('');
      setContent('');
    } catch (error) {
      console.error('Error submitting testimony:', error);
    }
  };

  return (
    <div className="testimony-container">
      <h2>Submit a Testimony</h2><br></br>
      <form className="testimony-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />
        <textarea
          placeholder="Your Testimony"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="textarea-field"
        />
        <Button type="submit" className="submit-button" variant="contained" sx = {{backgroundColor : '#00A897' }}>Submit</Button>
      </form>

      <h2>All Testimonies</h2>
      <div className="testimonies-list">
        {testimonies.map((testimony) => (
          <div key={testimony.id} className="testimony">
            <p className="testimony-name">{testimony.name}</p>
            <p className="testimony-content">{testimony.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonyPage;
