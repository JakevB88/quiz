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

const calculateScore = (quizData, userAnswers) => {
    if (!quizData || !userAnswers) return 0;
    let score = 0;
    
    Object.values(quizData.questions).forEach(question => {
        const userAnswer = userAnswers[question.id];
        const correctAnswer = question.correctAnswer;

        if (userAnswer === undefined || userAnswer === null) return;

        // Use String() to handle Boolean vs String mismatches
        if (String(userAnswer) === String(correctAnswer)) {
            score++;
        }
    });
    return score;
};

export const selectAnswersForQuiz = (state, quizId) => state.results.answersByQuiz[quizId] || {};


// Calculate the score for a all quizzes
export const selectAllScores = (state) => {
    const allScores = {};
    const quizzes = state.quizzes.quizzes;
    const answersByQuiz = state.results.answersByQuiz;

    Object.keys(quizzes).forEach(quizId => {
        allScores[quizId] = calculateScore(quizzes[quizId], answersByQuiz[quizId]);
    });

    return allScores;
};


export const { recordAnswer, resetQuizResults } = resultsSlice.actions;
export default resultsSlice.reducer;