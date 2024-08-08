import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [comments, setComments] = useState([]); // State to store comments
  const [inputValue, setInputValue] = useState(''); // State for new comment input
  const [editingId, setEditingId] = useState(null); // State to track the ID of the comment being edited
  const [editingValue, setEditingValue] = useState(''); // State for the edited content
  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const [filteredComments, setFilteredComments] = useState([]); // State to store filtered comments

  // Fetch comments from the server on component mount
  useEffect(() => {
    fetchComments();
  }, []);

  // Fetch all comments from the server
  const fetchComments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/comments');
      setComments(response.data); // Update state with fetched comments
      setFilteredComments(response.data); // Initialize filtered comments
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Search comments
  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/comments/search', {
        params: { query: searchQuery }
      });
      setFilteredComments(response.data); // Update state with filtered comments
      setSearchQuery(''); // Clear the search input field
    } catch (error) {
      console.error('Error filtering comments:', error);
    }
  };

  // Update inputValue state when the user types a new comment
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Update editingValue state when the user edits a comment
  const handleEditInputChange = (event) => {
    setEditingValue(event.target.value);
  };

  // Post a new comment
  const handlePost = async () => {
    if (inputValue.trim()) {
      try {
        const response = await axios.post('http://localhost:5000/api/comments', {
          content: inputValue
        });
        const newComment = response.data;
        setComments([newComment, ...comments]);
        setFilteredComments([newComment, ...filteredComments]);
        setInputValue('');
      } catch (error) {
        console.error('Error creating comment:', error);
      }
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/comments/${id}`)
    setFilteredComments(filteredComments.map(comment => comment._id === id ? { ...comment, isDeleted: true } : comment));
  };
  

  // Enable edit mode for a comment
  const handleEdit = (id, content) => {
    setEditingId(id);
    setEditingValue(content);
  };

  // Save the edited comment
  const handleSaveEdit = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/comments/${id}`, {
        content: editingValue
      });
      const updatedComment = response.data;
      setComments(comments.map(comment => (comment._id === id ? updatedComment : comment)));
      setFilteredComments(filteredComments.map(comment => (comment._id === id ? updatedComment : comment)));
      setEditingId(null);
      setEditingValue('');
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  // Cancel editing mode
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingValue('');
  };

  // Delete all comments (only from the screen, not from the database)
  const handleDeleteAll = () => {
    setComments(comments.map(comment => ({ ...comment, isDeleted: true })));
    setFilteredComments(filteredComments.map(comment => ({ ...comment, isDeleted: true })));
  };

  // Handle Enter key press to post a new comment
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handlePost();
    }
  };

  return (
    <div style={{ backgroundColor: 'white', height: '100vh', textAlign: 'center' }}>
      <h1>CarHub App</h1>
      
      <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'center' }}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search comments..."
          style={{
            width: '60%',
            padding: '10px',
            fontSize: '18px',
            border: '2px solid rgb(255,168,10)',
            borderRadius: '5px',
            marginRight: '10px',
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            cursor: 'pointer',
            borderRadius: '10px',
            fontSize: '18px',
          }}
        >
          Search
        </button>
      </div>

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
        {filteredComments.length > 0 ? (
          filteredComments.filter(comment => !comment.isDeleted).map(comment => (
            <div key={comment._id} className="post">
              {editingId === comment._id ? (
                <div>
                  <input
                    type="text"
                    value={editingValue}
                    onChange={handleEditInputChange}
                    style={{
                      width: '60%',
                      padding: '10px',
                      fontSize: '18px',
                      border: '2px solid rgb(255,168,10)',
                      borderRadius: '5px',
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
                    <button
                      onClick={() => handleSaveEdit(comment._id)}
                      style={{
                        backgroundColor: 'green',
                        color: 'white',
                        border: 'none',
                        padding: '10px 15px',
                        cursor: 'pointer',
                        borderRadius: '10px',
                        width: '8%',
                        fontSize: '23px',
                      }}
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      style={{
                        backgroundColor: 'grey',
                        color: 'white',
                        border: 'none',
                        padding: '10px 15px',
                        cursor: 'pointer',
                        borderRadius: '10px',
                        width: '8%',
                        fontSize: '20px',
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p>{comment.content}</p>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                    <button
                      onClick={() => handleEdit(comment._id, comment.content)}
                      style={{
                        backgroundColor: 'blue',
                        color: 'white',
                        border: 'none',
                        padding: '5px 10px',
                        cursor: 'pointer',
                        borderRadius: '5px',
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(comment._id)}
                      style={{
                        backgroundColor: 'red',
                        color: 'white',
                        border: 'none',
                        padding: '5px 10px',
                        cursor: 'pointer',
                        borderRadius: '5px',
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No comments found!</p>
        )}
      </div>
    </div>
  );
}

export default App;
