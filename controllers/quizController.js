const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
let curr_quiz;

exports.createQuiz = async (req, res) => {
    const { title, description, questions } = req.body;
    try {
        const quiz = new Quiz({ title, description, questions, creator: req.user });
        await quiz.save();
        curr_quiz = { title, description, questions, creator: req.user }
        res.status(201).json(quiz);
    } catch (err) {
        res.status(500).send('Server Error ' + err);
    }
};

exports.getQuizzes = async (req, res) => {
    try {
        const quizzes = curr_quiz.questions;
        res.json(quizzes);
    } catch (err) {
        res.status(500).send('Server Error ' + err);
    }
};

exports.getQuizDetails = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id).populate('questions');
        if (!quiz) return res.status(404).json({ msg: 'Quiz not found' });
        res.json(quiz);
    } catch (err) {
        res.status(500).send('Server Error ' + err);
    }
};

exports.takeQuiz = async (req, res) => {
    const { answers } = req.body;
    try {
        const quiz = await Quiz.findById(req.params.id).populate('questions');
        if (!quiz) return res.status(404).json({ msg: 'Quiz not found' });

        let score = 0;
        quiz.questions.forEach((question, index) => {
            if (question.correctAnswer === answers[index]) {
                score++;
            }
        });

        res.json({ score, totalQuestions: quiz.questions.length });
    } catch (err) {
        res.status(500).send('Server Error ' + err);
    }
};
