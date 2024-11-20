const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});