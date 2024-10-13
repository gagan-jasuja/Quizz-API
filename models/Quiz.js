const mongoose = require('mongoose');

// Define Question schema
const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true
  },
  options: {
    type: [String],  // Array of options
    required: true,
    validate: [arrayLimit, 'Options must have exactly 4 choices']
  },
  correctOptionIndex: {
    type: Number,
    required: true
  }
});

// Helper function to ensure exactly 4 options are provided
function arrayLimit(val) {
  return val.length === 4;
}

// Define Quiz schema
const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  questions: [questionSchema]
});

// Create the Quiz model from the schema
const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
