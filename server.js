const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const commentRoutes = require('./routes/commentRoutes'); // Import the comment routes

const app = express();
const port = 5000;

app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(bodyParser.json());

const uri = 'mongodb+srv://hanoufbarakaty:12345678Admin@devapi.td05unq.mongodb.net/?retryWrites=true&w=majority&appName=DevAPI';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use the comment routes
app.use('/api/comments', commentRoutes);

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
