import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // State to keep track of comments and the input value
  const [comments, setComments] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Fetch comments from the server when the component mounts
  useEffect(() => {
    fetchComments();
  }, []);

  // Function to fetch comments from the server
  const fetchComments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/comments');
      setComments(response.data); // Update state with fetched comments
    } catch (error) {
      console.error('Error fetching comments:', error); // Log errors if any
    }
  };

  // Handle changes to the input field
  const handleInputChange = (event) => {
    setInputValue(event.target.value); // Update state with input value
  };

  // Handle adding a new comment
  const handlePost = async () => {
    if (inputValue.trim()) { // Check if input is not just whitespace
      try {
        const response = await axios.post('http://localhost:5000/api/comments', {
          content: inputValue // Send input value as comment content
        });
        setComments([response.data, ...comments]); // Add new comment to the list
        setInputValue(''); // Clear the input field
      } catch (error) {
        console.error('Error creating comment:', error); // Log errors if any
      }
    }
  };

  // Handle deleting a specific comment
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/comments/${id}`); // Send delete request
      setComments(comments.filter(comment => comment._id !== id)); // Remove deleted comment from state
    } catch (error) {
      console.error('Error deleting comment:', error); // Log errors if any
    }
  };

  // Handle deleting all comments
  const handleDeleteAll = async () => {
    try {
      await Promise.all(comments.map(comment => axios.delete(`http://localhost:5000/api/comments/${comment._id}`))); // Delete all comments
      setComments([]); // Clear comments from state
    } catch (error) {
      console.error('Error deleting all comments:', error); // Log errors if any
    }
  };

  // Handle key down events in the input field
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') { // Check if the key pressed is "Enter"
      event.preventDefault(); // Prevent default behavior (like form submission)
      handlePost(); // Call handlePost to add the new comment
    }
  };

  return (
    <div style={{ backgroundColor: 'white', height: '100vh', textAlign: 'center' }}>
      <h1>CarHub App</h1>
      <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'center' }}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
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
          onClick={handlePost}
          style={{
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            cursor: 'pointer',
            borderRadius: '10px',
            width: '8%',
            fontSize: '23px',
          }}
        >
          Post
        </button>
        <button
          onClick={handleDeleteAll}
          style={{
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            cursor: 'pointer',
            borderRadius: '10px',
            width: '8%',
            fontSize: '20px',
          }}
        >
          Delete All
        </button>
      </div>
      <div className="posts-container">
        {comments.length > 0 ? (
          comments.map(comment => (
            <div key={comment._id} className="post">
              {comment.content}
              <button
                onClick={() => handleDelete(comment._id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No comments yet!</p> // Message displayed when there are no comments
        )}
      </div>
    </div>
  );
}

export default App;

