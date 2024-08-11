import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function AddEditPost() {
  const [inputValue, setInputValue] = useState('');
  const [editing, setEditing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchComment = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/comments/${id}`);
          setInputValue(response.data.content);
          setEditing(true);
        } catch (error) {
          console.error('Error fetching comment:', error);
        }
      };
      fetchComment();
    }
  }, [id]);

  const handleSubmit = async () => {
    try {
      if (editing) {
        await axios.put(`http://localhost:5000/api/comments/${id}`, { content: inputValue });
      } else {
        await axios.post('http://localhost:5000/api/comments', { content: inputValue });
      }
      navigate('/posts');
    } catch (error) {
      console.error('Error saving comment:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>{editing ? 'Edit Post' : 'Add Post'}</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Write something..."
        style={{
          width: '60%',
          padding: '10px',
          fontSize: '18px',
          border: '2px solid rgb(255,168,10)',
          borderRadius: '5px',
        }}
      />
      <button
        onClick={handleSubmit}
        style={{
          backgroundColor: 'red',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          cursor: 'pointer',
          borderRadius: '10px',
          fontSize: '18px',
          margin: '10px',
        }}
      >
        {editing ? 'Save Changes' : 'Post'}
      </button>
    </div>
  );
}

export default AddEditPost;
