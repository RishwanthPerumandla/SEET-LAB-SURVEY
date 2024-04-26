// src/components/CreateSurvey.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateSurvey = () => {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post('http://localhost:3000/api/surveys', { title });
    navigate('/surveys');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Survey Title:
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
      </label>
      <button type="submit">Create Survey</button>
    </form>
  );
};

export default CreateSurvey;
