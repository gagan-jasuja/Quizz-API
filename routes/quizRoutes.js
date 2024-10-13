const express = require('express');
const { createQuiz, getQuizzes, getQuizDetails, takeQuiz } = require('../controllers/quizController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/create', authMiddleware, createQuiz);
router.get('/', getQuizzes);
router.get('/:id', getQuizDetails);
router.post('/:id/take', authMiddleware, takeQuiz);

module.exports = router;
