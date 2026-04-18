import { createSlice } from '@reduxjs/toolkit';

 

export const quizSlice = createSlice({
    name: 'quizzes', //in the store this slice will be registered as "state.quiz"
    initialState: {
        quizzes: {
            volcanoes: {
                id: 'volcanoes',
                title: 'volcanoes',
                img: {
                    key: 'volcano',
                    alt: "Immage showing an errupting volcano against a horrizon"
                },
                questions: [
                    {
                        id: 'q1',
                        type: 'multipleChoice',
                        question: 'Where does the name volcano come from?',
                        options: {
                            a: 'The Roman god of fire called Vulcan',
                            b: 'The Egiptian got of the mountains',
                            c: 'The 1st person to ever climb a volcano',
                            d: 'The largest volcano on earth'
                        },
                        correctAnswer: 'a'
                    },
                    {
                        id: 'q2',
                        type: 'trueFalse',
                        question: 'The name volcano comes from the Roman god of fire Vulcan!',
                        correctAnswer: true
                    },
                    {
                        id: 'q3',
                        type: 'fillBlank',
                        blankCount: 2,
                        question: {
                            questionPart1: 'The name volcano comes from the',
                            questionPart2: 'god of',
                            questionPart3: 'Vulcan!',
                        },
                        options: {
                            a: "Roman",
                            b: "Egyptian",
                            c: "lava",
                            d: "fire"
                        },
                        correctAnswer: ['a', 'd']
                    },
                    {
                        id: 'q4',
                        type: 'multipleChoice',
                        question: 'Where does the name volcano come from?',
                        options: {
                            a: 'The Roman god of fire called Vulcan',
                            b: 'The Egiptian got of the mountains',
                            c: 'The 1st person to ever climb a volcano',
                            d: 'The largest volcano on earth'
                        },
                        correctAnswer: 'a'
                    },
                ]
            },
            weather: {
                id: 'weather',
                title: 'weather',
                img: {
                    key: 'weather',
                    alt: "Immage showing a stromcloud hit by the light from a sunset with heavy rain coming from the cloud"
                },
                questions: []
            },
            solarSystem: {
                id: 'solarSystem',
                title: 'solarSystem',
                img: {
                    key: 'solarSystem',
                    alt: "Immage showing an overview of our solarsystem"
                },
                questions: []
            },
            body: {
                id: 'body',
                title: 'body',
                img: {
                    key: 'body',
                    alt: "Image picturing the anatomy of a humen, in this case the torso and its sceleton"
                },
                questions: []
            }
        },
        activeQuizId: null,
        currentQuestionIndex: 0,
        questionOrder: []
    },

    reducers: { 
        startQuiz(state, action) {
            const quizId = action.payload;
            const questions = state.quizzes[quizId].questions;

            state.activeQuizId = quizId;
            state.currentQuestionIndex = 0;

            //state.questionOrder = shuffleArray(
            //questions.map(q => q.id)
            //);
        },

        nextQuestion(state) {
            state.currentQuestionIndex += 1;
        },

        previousQuestion(state) {
            state.currentQuestionIndex -=1;
        },

        resetQuiz(state) {
            state.activeQuizId = null;
            state.currentQuestionIndex = 0;
        }

        
    },
});

//export
export const selectQuiz = (state) => state.quizzes.quizzes
export const selectActiveQuizId = (state) => state.quizzes.activeQuizId;
export const selectCurrentQuestionIndex = (state) => state.quizzes.currentQuestionIndex;
export const selectQuestionOrder = (state) => state.quizzes.questionOrder;

export const {
    startQuiz,
    nextQuestion,
    previousQuestion,
    resetQuiz
  } = quizSlice.actions;

export default quizSlice.reducer;