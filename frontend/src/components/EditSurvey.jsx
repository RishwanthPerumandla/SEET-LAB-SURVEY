// src/components/EditSurvey.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditSurvey = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSurvey = async () => {
      const { data } = await axios.get(`http://localhost:3000/api/surveys/${id}`);
      setTitle(data.title);
    };

    fetchSurvey();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.put(`http://localhost:3000/api/surveys/${id}`, { title });
    navigate('/surveys');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Survey Title:
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
      </label>
      <button type="submit">Update Survey</button>
    </form>
  );
};

export default EditSurvey;
