import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    selectQuiz,
    selectActiveQuizId,
    selectCurrentQuestionIndex,
    selectQuestionOrder,
    nextQuestion,
    previousQuestion
} from "../store/quizSlice";
import { useSelector, useDispatch } from "react-redux";
import {
    recordAnswer,
    selectAnswersForQuiz
} from "../store/resultsSlice";
import {quizImageMap} from "../lib/QuizImageMap";


export default function QuestionsPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const quizzes = useSelector(selectQuiz);
    const activeQuizId = useSelector(selectActiveQuizId);
    const currentQuestionIndex = useSelector(selectCurrentQuestionIndex);
    const activeQuiz = quizzes[activeQuizId];
    const answerForQuiz = useSelector(state => selectAnswersForQuiz(state, activeQuizId));
    const questionOrder = useSelector(selectQuestionOrder);
    const currentQuestionId = questionOrder[currentQuestionIndex];
    const currentQuestion = activeQuiz.questions[currentQuestionId];

    //create the state for the blanks in the drag/drop questions
    const [blanks, setBlanks] = useState({});

    //load the state for the fillBlank questions
    useEffect(() => {
        if (currentQuestion.type === 'fillBlank') {
            const storedAnswerKeys = answerForQuiz[currentQuestion.id];

            if (storedAnswerKeys && Array.isArray(storedAnswerKeys)) {
                const loadedBlanks = {};
                storedAnswerKeys.forEach((key, index) => {
                    if (key) {
                        loadedBlanks[index] = currentQuestion.options[key];
                    }
                });
                setBlanks(loadedBlanks);
            } else {
                setBlanks({}); // Reset if no answer exists
            }
        } else {
            setBlanks({}); // Reset if not a fillBlank question
        }
    }, [currentQuestion.id, answerForQuiz]);


    if (!activeQuiz) {
        return (
            <div style={{ padding: "20px", textAlign: "center" }}>
                <h2>No quiz selected!</h2>
                <button onClick={() => navigate("/")}>Return to Home</button>
            </div>
        );
    }


    const handlePrevious = () => {
        if (currentQuestionIndex > 0) { // Changed condition to check if not the first question
            dispatch(previousQuestion());
            setBlanks({}); // Reset blanks for the previous question
        }
    };

   const handleNext = () => {
    if (currentQuestion.type === 'fillBlank') {
        const finalAnswerKeys = [];
        for (let i = 0; i < currentQuestion.blankCount; i++) {
            const word = blanks[i];
            if (word) {
                const key = Object.keys(currentQuestion.options).find(
                    (k) => currentQuestion.options[k] === word
                );
                finalAnswerKeys.push(key || null);
            } else {
                finalAnswerKeys.push(null);
            }
        }
        handleAnswerSelection(finalAnswerKeys);
    }

        if (currentQuestionIndex < questionOrder.length - 1) {
            dispatch(nextQuestion());
            setBlanks({}); //reset the blanks state for the next question
        } 
        else {
            navigate("/resultspage");
        }
    };

    const handleAnswerSelection = (answer) => {
        dispatch(recordAnswer({
            quizId: activeQuizId,
            questionId: currentQuestion.id,
            answer: answer
        }));
    }

    const handleClickOption = (word) => {
        setBlanks((prevBlanks) => {
            const newBlanks = { ...prevBlanks };
            // Find the first empty blank
            let filled = false;
            for (let i = 0; i < currentQuestion.blankCount; i++) {
                if (newBlanks[i] === undefined || newBlanks[i] === null) {
                    newBlanks[i] = word;
                    filled = true;
                    break;
                }
            }
            return filled ? newBlanks : prevBlanks;
        });
    };

    const clearBlank = (blankKey) => {
        setBlanks((prevBlanks) => ({
            ...prevBlanks,
            [blankKey]: null
        }));
    };

    return (
        <div className="questionpage">
            <div>
                <div className="questionheader">
                    <h2>{activeQuiz.title}</h2>
                    <img className="quizImageq"
                        src={quizImageMap[activeQuiz.img.key]} 
                        alt={activeQuiz.img.alt} 
                    />
                </div>
                <h3>Question {currentQuestionIndex+1} of {questionOrder.length}</h3>
                <div className="question">
                    {/*if the question is multipleChoise or trueFalse*/}
                        {(currentQuestion.type === 'multipleChoice' || currentQuestion.type === 'trueFalse') && (
                            <div>
                                <p>{currentQuestion.question}</p>
                                <ul className="options">
                                    {Object.entries(currentQuestion.options).map(([key, value]) => (
                                        <li key={key}>
                                            <button
                                                onClick={() => handleAnswerSelection(key)}
                                                className={`pointer ${answerForQuiz[currentQuestion.id] === key ? 'selected-bold' : ''}`}
                                            >
                                            - {value}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                    

                    {/*if the question is fillBlank*/}
                        {currentQuestion.type === 'fillBlank' && (
                            <div>
                                <p>
                                    {Object.keys(currentQuestion.question).map((partKey, index, array) => {
                                        const partText = currentQuestion.question[partKey];
                                        const isLastPart = index === array.length - 1;

                                        return (
                                            <span key={partKey}>
                                                {partText}
                                                {!isLastPart && (
                                                    <span
                                                        className="blank pointer"
                                                        onClick={() => clearBlank(index)} // Click to clear blank
                                                    >
                                                        {blanks[index] ?? "_____"}
                                                    </span>
                                                )}
                                            </span>
                                        );
                                    })}
                                </p>
                               
                                <ul className="options">
                                    {Object.values(currentQuestion.options)
                                        .filter((word) => !Object.values(blanks).includes(word)) //Filter out words already in blanks
                                        .map((word) => (
                                            <li key={word}>
                                                <button 
                                                    className="pointer"
                                                    onClick={() => handleClickOption(word)}
                                                >
                                                    - {word}
                                                </button>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        )}
                </div>
            </div>
            <div className="pageFooter">
                {currentQuestionIndex > 0 ? (
                    <button className="questionNavigation" onClick={handlePrevious}>
                        previous
                    </button>
                ) : (
                    <span className="questionNavigation">1st question</span> 
                )}



                <button onClick={handleNext} className="questionNavigation"> 
                    {currentQuestionIndex < questionOrder.length - 1 ? "next" : "submit"}
                </button>
            </div> 
        </div>
    )
}