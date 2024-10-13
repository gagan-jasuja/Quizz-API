const Quiz = require('../models/Quiz');

const createQuiz = async (req, res) => {
  try {
    const { title, description, questions } = req.body;

    if (!title || !description || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    const newQuiz = new Quiz({ title, description, questions });
    const savedQuiz = await newQuiz.save();

    res.status(201).json({
      message: 'Quiz created successfully',
      quiz: savedQuiz
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error while creating the quiz' });
  }
};


const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching quizzes' });
  }
};


const getQuizDetails = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching quiz details' });
  }
};


const takeQuiz = async (req, res) => {
  try {
    const { answers } = req.body;
    const quizId = req.params.id;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (question.correctOptionIndex === answers[index]) {
        score++;
      }
    });

    res.status(200).json({
      message: 'Quiz completed successfully',
      score: score,
      totalQuestions: quiz.questions.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error while taking the quiz' });
  }
};

module.exports = { createQuiz, getQuizzes, getQuizDetails, takeQuiz };
