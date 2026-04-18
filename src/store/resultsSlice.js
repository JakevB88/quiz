import { createSlice } from '@reduxjs/toolkit';

export const resultsSlice = createSlice({
    name: 'results', //in the store this slice will be registered as "state.results"
    initialState: {
        answersByQuiz: {
            volcanoes: {},
            weather: {},
            solarSystem: {},
            body: {}
        }
    },

    reducers: {
        // Record or update an answer for a specific question in a specific quiz
        recordAnswer: (state, action) => {
            const { quizId, questionId, answer } = action.payload;
            if (state.answersByQuiz[quizId]) {
                state.answersByQuiz[quizId][questionId] = answer;
            }
        },
        // Clear results for a specific quiz if they want to retake it
        resetQuizResults: (state, action) => {
            const quizId = action.payload;
            if (state.answersByQuiz[quizId]) {
                state.answersByQuiz[quizId] = {};
            }
        }
    }
});

export const selectAnswersForQuiz = (state, quizId) => state.results.answersByQuiz[quizId] || {};

// Calculate the score for a specific quiz
export const selectScoreForQuiz = (state, quizId) => {
    const userAnswers = state.results.answersByQuiz[quizId] || {};
    const quizData = state.quizzes.quizzes[quizId];
    
    if (!quizData) return 0;

    let score = 0;
    quizData.questions.forEach(question => {
        const userAnswer = userAnswers[question.id];
        const correctAnswer = question.correctAnswer;

        // Handle different answer types (strings, booleans, or arrays for fill-in-the-blanks)
        if (Array.isArray(correctAnswer)) {
            // For fillBlank, check if arrays match (order matters)
            if (JSON.stringify(userAnswer) === JSON.stringify(correctAnswer)) {
                score++;
            }
        } else if (userAnswer === correctAnswer) {
            score++;
        }
    });

    return score;
};

export const { recordAnswer, resetQuizResults } = resultsSlice.actions;
export default resultsSlice.reducer;