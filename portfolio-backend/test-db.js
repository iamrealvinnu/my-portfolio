require('dotenv').config();
const mongoose = require('mongoose');

console.log('Starting connection test...');
console.log('MongoDB URI exists:', !!process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000, // 5 second timeout
    connectTimeoutMS: 5000
})
.then(() => {
    console.log('Connected successfully! 🎉');
    process.exit(0);
})
.catch((err) => {
    console.error('Connection failed:', err);
    process.exit(1);
}); 