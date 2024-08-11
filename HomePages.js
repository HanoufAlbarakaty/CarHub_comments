import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Welcome to CarHub App</h1>
      <Link to="/posts">
        <button
          style={{
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer',
            borderRadius: '10px',
            fontSize: '18px',
            margin: '10px',
          }}
        >
          View Posts
        </button>
      </Link>
      <Link to="/add-edit">
        <button
          style={{
            backgroundColor: 'green',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer',
            borderRadius: '10px',
            fontSize: '18px',
            margin: '10px',
          }}
        >
          Add/Edit Post
        </button>
      </Link>
    </div>
  );
}

export default HomePage;
