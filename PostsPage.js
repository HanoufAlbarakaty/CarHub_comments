import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PostsPage() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/comments');
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Posts</h1>
      <div className="posts-container">
        {comments.length > 0 ? (
          comments.map(comment => (
            <div key={comment._id} className="post">
              <p style={{ fontSize: '18px' }}>{comment.content}</p>
            </div>
          ))
        ) : (
          <p>No comments found.</p>
        )}
      </div>
    </div>
  );
}

export default PostsPage;
