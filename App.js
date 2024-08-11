import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePages from './Pages/HomePages';
import PostsPage from './Pages/PostsPage';
import AddEditPost from './Pages/AddEditPost';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/add-edit" element={<AddEditPost />} />
      </Routes>
    </Router>
  );
}

export default App;
