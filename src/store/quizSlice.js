import { createSlice } from '@reduxjs/toolkit';

const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};
 

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
                questions: {
                    v1: { id: 'v1', type: 'multipleChoice', question: 'What is the hot, melted rock called when it is still underground?', options: { a: 'Lava', b: 'Magma', c: 'Ash', d: 'Dust' }, correctAnswer: 'b' },
                    v2: { id: 'v2', type: 'trueFalse', question: 'Lava is the name for melted rock once it flows out of a volcano.', options: { a: 'true', b: 'false' }, correctAnswer: 'a' },
                    v3: { id: 'v3', type: 'fillBlank', blankCount: 2, question: { questionPart1: 'A volcano that might erupt at any time is called an', questionPart2: 'volcano, but one that is "sleeping" is called', questionPart3: '.' }, options: { a: 'active', b: 'extinct', c: 'dormant', d: 'awake' }, correctAnswer: ['a', 'c'] },
                    v4: { id: 'v4', type: 'multipleChoice', question: 'What is the opening at the top of a volcano called?', options: { a: 'Vent', b: 'Hole', c: 'Crater', d: 'Chimney' }, correctAnswer: 'c' },
                    v5: { id: 'v5', type: 'trueFalse', question: 'Some volcanoes form under the sea.', options: { a: 'true', b: 'false' }, correctAnswer: 'a' },
                    v6: { id: 'v6', type: 'multipleChoice', question: 'What do we call a volcano that will never erupt again?', options: { a: 'Sleepy', b: 'Dead', c: 'Extinct', d: 'Quiet' }, correctAnswer: 'c' },
                    v7: { id: 'v7', type: 'fillBlank', blankCount: 1, question: { questionPart1: 'The giant pieces of the Earth\'s', questionpart2: 'shell that move around are called', questionPart3: '.' }, options: { a: 'puzzles', b: 'plates', c: 'inner', d: 'tiles', e: 'outer', f: 'rocks' }, correctAnswer: ['e', 'b'] },
                    v8: { id: 'v8', type: 'multipleChoice', question: 'Which of these can come out of a volcano?', options: { a: 'Gas and ash', b: 'Water and ice', c: 'Leaves and trees', d: 'Sand and shells' }, correctAnswer: 'a' },
                    v9: { id: 'v9', type: 'trueFalse', question: 'The Earth\'s crust is made of solid rock.', options: { a: 'true', b: 'false' }, correctAnswer: 'a' },
                    v10: { id: 'v10', type: 'multipleChoice', question: 'Where is the "Ring of Fire" located?', options: { a: 'Atlantic Ocean', b: 'Indian Ocean', c: 'Pacific Ocean', d: 'Arctic Ocean' }, correctAnswer: 'c' }
                    },
                    
                
            },
            weather: {
                id: 'weather',
                title: 'weather',
                img: {
                    key: 'weather',
                    alt: "Immage showing a stromcloud hit by the light from a sunset with heavy rain coming from the cloud"
                },
                questions: {
                    w1: { id: 'w1', type: 'multipleChoice', question: 'What is the air around the Earth called?', options: { a: 'Space', b: 'Atmosphere', c: 'Oxygen', d: 'Wind' }, correctAnswer: 'b' },
                    w2: { id: 'w2', type: 'trueFalse', question: 'Wind is just moving air.', options: { a: 'true', b: 'false' }, correctAnswer: 'a' },
                    w3: { id: 'w3', type: 'fillBlank', blankCount: 2, question: { questionPart1: 'Water falls from clouds as', questionPart2: 'or sometimes as frozen', questionPart3: '.' }, options: { a: 'rain', b: 'snow', c: 'juice', d: 'milk' }, correctAnswer: ['a', 'b'] },
                    w4: { id: 'w4', type: 'multipleChoice', question: 'What do we call a giant, spinning storm that forms over the ocean?', options: { a: 'Tornado', b: 'Hurricane', c: 'Breeze', d: 'Fog' }, correctAnswer: 'b' },
                    w5: { id: 'w5', type: 'trueFalse', question: 'Lightning is a giant spark of electricity.', options: { a: 'true', b: 'false' }, correctAnswer: 'a' },
                    w6: { id: 'w6', type: 'multipleChoice', question: 'Which instrument measures how hot or cold it is?', options: { a: 'Barometer', b: 'Anemometer', c: 'Thermometer', d: 'Clock' }, correctAnswer: 'c' },
                    w7: { id: 'w7', type: 'fillBlank', blankCount: 1, question: { questionPart1: 'White, fluffy clouds that look like cotton wool are called', questionPart2: 'clouds.' }, options: { a: 'Stratus', b: 'Cumulus', c: 'Cirrus', d: 'Storm' }, correctAnswer: ['b'] },
                    w8: { id: 'w8', type: 'multipleChoice', question: 'What causes the sound of thunder?', options: { a: 'Clouds bumping', b: 'Air heating up fast', c: 'Rain hitting the ground', d: 'The sun shining' }, correctAnswer: 'b' },
                    w9: { id: 'w9', type: 'trueFalse', question: 'A rainbow only appears when it is both sunny and rainy.', options: { a: 'true', b: 'false' }, correctAnswer: 'a' },
                    w10: { id: 'w10', type: 'multipleChoice', question: 'What is a person who studies the weather called?', options: { a: 'Doctor', b: 'Astronaut', c: 'Meteorologist', d: 'Baker' }, correctAnswer: 'c' }
                }
            },
            solarSystem: {
                id: 'solarSystem',
                title: 'solarSystem',
                img: {
                    key: 'solarSystem',
                    alt: "Immage showing an overview of our solarsystem"
                },
                questions: {
                    s1: { id: 's1', type: 'multipleChoice', question: 'Which planet is closest to the Sun?', options: { a: 'Venus', b: 'Mars', c: 'Mercury', d: 'Earth' }, correctAnswer: 'c' },
                    s2: { id: 's2', type: 'trueFalse', question: 'The Sun is actually a giant star.', options: { a: 'true', b: 'false' }, correctAnswer: 'a' },
                    s3: { id: 's3', type: 'fillBlank', blankCount: 2, question: { questionPart1: 'The Earth takes one', questionPart2: 'to travel all the way around the', questionPart3: '.' }, options: { a: 'day', b: 'year', c: 'Sun', d: 'Moon' }, correctAnswer: ['b', 'c'] },
                    s4: { id: 's4', type: 'multipleChoice', question: 'Which is the largest planet in our solar system?', options: { a: 'Saturn', b: 'Jupiter', c: 'Neptune', d: 'Uranus' }, correctAnswer: 'b' },
                    s5: { id: 's5', type: 'trueFalse', question: 'The Moon makes its own light.', options: { a: 'true', b: 'false' }, correctAnswer: 'b' },
                    s6: { id: 's6', type: 'multipleChoice', question: 'Which planet is known as the "Red Planet"?', options: { a: 'Mars', b: 'Venus', c: 'Jupiter', d: 'Saturn' }, correctAnswer: 'a' },
                    s7: { id: 's7', type: 'fillBlank', blankCount: 1, question: { questionPart1: 'Saturn is famous for the beautiful', questionPart2: 'that spin around it.' }, options: { a: 'moons', b: 'rings', c: 'clouds', d: 'stars' }, correctAnswer: ['b'] },
                    s8: { id: 's8', type: 'multipleChoice', question: 'What do we call a rock that falls from space to Earth?', options: { a: 'Asteroid', b: 'Comet', c: 'Meteorite', d: 'Star' }, correctAnswer: 'c' },
                    s9: { id: 's9', type: 'trueFalse', question: 'There are eight planets in our solar system.', options: { a: 'true', b: 'false' }, correctAnswer: 'a' },
                    s10: { id: 's10', type: 'multipleChoice', question: 'Which planet is famous for its "Great Red Spot"?', options: { a: 'Mars', b: 'Jupiter', c: 'Saturn', d: 'Neptune' }, correctAnswer: 'b' }
                }
            },
            body: {
                id: 'body',
                title: 'body',
                img: {
                    key: 'body',
                    alt: "Image picturing the anatomy of a humen, in this case the torso and its sceleton"
                },
                questions: {
                    b1: { id: 'b1', type: 'multipleChoice', question: 'What is the hard frame inside your body called?', options: { a: 'Muscles', b: 'Skeleton', c: 'Skin', d: 'Organs' }, correctAnswer: 'b' },
                    b2: { id: 'b2', type: 'trueFalse', question: 'Your heart is a muscle that pumps blood.', options: { a: 'true', b: 'false' }, correctAnswer: 'a' },
                    b3: { id: 'b3', type: 'fillBlank', blankCount: 2, question: { questionPart1: 'You use your', questionPart2: 'to breathe in', questionPart3: '.' }, options: { a: 'lungs', b: 'stomach', c: 'air', d: 'food' }, correctAnswer: ['a', 'c'] },
                    b4: { id: 'b4', type: 'multipleChoice', question: 'Which part of your body is the "control center"?', options: { a: 'Heart', b: 'Brain', c: 'Stomach', d: 'Liver' }, correctAnswer: 'b' },
                    s5: { id: 'b5', type: 'trueFalse', question: 'Your blood carries nutrients and oxygen to your cells.', options: { a: 'true', b: 'false' }, correctAnswer: 'a' },
                    b6: { id: 'b6', type: 'multipleChoice', question: 'How many bones does a grown-up human have?', options: { a: '100', b: '206', c: '500', d: '1000' }, correctAnswer: 'b' },
                    b7: { id: 'b7', type: 'fillBlank', blankCount: 1, question: { questionPart1: 'The stretchy parts that help your bones move are called', questionPart2: '.' }, options: { a: 'strings', b: 'muscles', c: 'skin', d: 'hair' }, correctAnswer: ['b'] },
                    b8: { id: 'b8', type: 'multipleChoice', question: 'Where does your food go after you swallow it?', options: { a: 'Heart', b: 'Lungs', c: 'Stomach', d: 'Brain' }, correctAnswer: 'c' },
                    b9: { id: 'b9', type: 'trueFalse', question: 'Your skin is the largest organ in your body.', options: { a: 'true', b: 'false' }, correctAnswer: 'a' },
                    b10: { id: 'b10', type: 'multipleChoice', question: 'What are the tiny building blocks of your body called?', options: { a: 'Bricks', b: 'Cells', c: 'Seeds', d: 'Dots' }, correctAnswer: 'b' }
                }
            }
        },
        activeQuizId: null,
        currentQuestionIndex: 0,
        questionOrder: []
    },

    reducers: { 
        startQuiz(state, action) {
            const quizId = action.payload;
            const quiz = state.quizzes[quizId];
            
            if (quiz) {
            state.activeQuizId = quizId;
            state.currentQuestionIndex = 0;

            const questionIds = Object.keys(quiz.questions);
            state.questionOrder = shuffleArray(questionIds);
            console.log(`startQuiz ${quizId} questionOrder ${state.questionOrder}`)
            }
            else {
                console.error(`Quiz ${quizId} not found!`)
            }
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