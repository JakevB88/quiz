import { createSlice } from '@reduxjs/toolkit';

export const resultsSlice = createSlice({
    name: 'results', //in the store this slice will be registered as "state.results"
    initialState: {
        answersByQuiz: {
            volcanoes: {},
            weather: {},
            solarSystem: {},
            body: {},
            earthquakes: {},
            stormsAndHurricanes: {},
            planetEarth: {}
        }
        
        /*
        answersByQuiz: {
            volcanoes: {
                v1: 'b', v2: 'a', v3: ['a', 'c'], v4: 'c', v5: 'a',
                v6: 'c', v7: ['e', 'b'], v8: 'a', v9: 'a', v10: 'c'
            },

            weather: {
                w1: 'b', w2: 'a', w3: ['a', 'b'], w4: 'b', w5: 'a',
                w6: 'c', w7: ['b'], w8: 'b', w9: 'a', w10: 'c'
            },

            solarSystem: {
                s1: 'c', s2: 'a', s3: ['b', 'c'], s4: 'b', s5: 'b',
                s6: 'a', s7: ['b'], s8: 'c', s9: 'a', s10: 'b'
            },

            body: {
                b1: 'b', b2: 'a', b3: ['a', 'c'], b4: 'b', b5: 'a',
                b6: 'b', b7: ['b'], b8: 'c', b9: 'a', b10: 'b'
            },

            earthquakes: {
                e1: 'a', e2: 'b', e3: 'a', e4: 'b', e5: ['b', 'a'],
                e6: 'b', e7: 'a', e8: 'b', e9: 'c', e10: ['a', 'b']
            },

            stormsAndHurricanes: {
                s1: 'a', s2: 'a', s3: 'b', s4: 'b', s5: 'b',
                s6: 'a', s7: ['a', 'b'], s8: 'b', s9: 'b', s10: 'b'
            },

            planetEarth: {
                p1: ['b', 'a'], p2: 'b', p3: 'd', p4: ['c', 'b'], p5: 'b',
                p6: 'c', p7: 'a', p8: 'c', p9: ['a', 'b'], p10: 'c'
            }
        }
        */
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
        },
        resetAllQuizResults: (state) => {
            Object.keys(state.answersByQuiz).forEach(quizId => {
                state.answersByQuiz[quizId] = {};
            })
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

        //turn any answer (key or word) into its final word value
        const getWord = (val) => {
            if (Array.isArray(val)) {
                return val.map(item => (question.options && question.options[item]) ? question.options[item] : item);
            }
            return (question.options && question.options[val]) ? question.options[val] : String(val);
        };

        const userWord = JSON.stringify(getWord(userAnswer));
        const correctWord = JSON.stringify(getWord(correctAnswer));

        if (userWord === correctWord) {
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


export const { recordAnswer, resetQuizResults, resetAllQuizResults } = resultsSlice.actions;
export default resultsSlice.reducer;