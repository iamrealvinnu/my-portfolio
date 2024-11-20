const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Message Schema
const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

// Test route - Add this!
app.get('/test', (req, res) => {
    console.log('Test route hit!'); // This will show in console
    res.json({ message: 'Test successful!' });
});

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Server is running' });
});

// Get all messages
app.get('/api/messages', async (req, res) => {
    console.log('Fetching messages...'); // Log when someone requests messages
    try {
        const messages = await Message.find();
        console.log(`Found ${messages.length} messages`);
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching messages' });
    }
});

// Save new message
app.post('/api/messages', async (req, res) => {
    console.log('Received message:', req.body); // Log incoming messages
    try {
        const newMessage = new Message(req.body);
        await newMessage.save();
        console.log('Message saved successfully!');
        res.status(201).json({ success: true });
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ error: 'Failed to save message' });
    }
});

// Delete message
app.delete('/api/messages/:id', async (req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting message' });
    }
});

// Mark message as read
app.put('/api/messages/:id/read', async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: 'Error updating message' });
  }
});

// Reply to message
app.post('/api/messages/:id/reply', async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    message.replies = message.replies || [];
    message.replies.push({
      content: req.body.reply,
      timestamp: new Date()
    });
    await message.save();
    
    // Send email notification
    // Add your email sending logic here
    
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: 'Error sending reply' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// MongoDB connection
console.log('Attempting MongoDB connection...');

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB Connected Successfully! 🎉');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    });

// Test the API endpoints
console.log('\nAPI Endpoints:');
console.log('GET    http://localhost:5000/api/messages    - Get all messages');
console.log('POST   http://localhost:5000/api/messages    - Send new message');
console.log('DELETE http://localhost:5000/api/messages/:id - Delete message');
console.log('PUT    http://localhost:5000/api/messages/:id/read - Mark message as read');
console.log('POST   http://localhost:5000/api/messages/:id/reply - Reply to message\n');

// Connection event handlers
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// Handle server shutdown
process.on('SIGINT', () => {
    app.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

// Add these routes

// Mark message as read
app.put('/api/messages/:id/read', async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: 'Error updating message' });
  }
});

// Reply to message
app.post('/api/messages/:id/reply', async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    message.replies = message.replies || [];
    message.replies.push({
      content: req.body.reply,
      timestamp: new Date()
    });
    await message.save();
    
    // Send email notification
    // Add your email sending logic here
    
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: 'Error sending reply' });
  }
});

// Access your admin panel at:
// http://localhost:3000/admin
  