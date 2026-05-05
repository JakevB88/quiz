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



export default function QuestionsPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const quizzes = useSelector(selectQuiz);
    const activeQuizId = useSelector(selectActiveQuizId);
    const currentQuestionIndex = useSelector(selectCurrentQuestionIndex);
    const activeQuiz = quizzes[activeQuizId];
    const asnwerForQuiz = useSelector(state => selectAnswersForQuiz(state, activeQuizId));
    const questionOrder = useSelector(selectQuestionOrder);
    const currentQuestionId = questionOrder[currentQuestionIndex];
    const currentQuestion = activeQuiz.questions[currentQuestionId];

    //create the state for the blanks in the drag/drop questions
    const [blanks, setBlanks] = useState({});

    //load the state for the fillBlank questions
    useEffect(() => {
        if (currentQuestion.type === 'fillBlank') {
            const storedAnswerKeys = asnwerForQuiz[currentQuestion.id];

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
    }, [currentQuestion.id, asnwerForQuiz]);



    const results = useSelector(state => state.results);
    useEffect(() => {
        console.log("Current Results State:", results);
    }, [results]);

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
                <h2>{activeQuiz.title} Quiz</h2>
                <h3>Question {currentQuestionIndex+1} of {questionOrder.length}</h3>
                <div className="question">
                    {console.log(`questionOrder ${questionOrder}`)}
                    {/*if the question is multipleChoise or trueFalse*/}
                        {(currentQuestion.type === 'multipleChoice' || currentQuestion.type === 'trueFalse') && (
                            <div>
                                {console.log(`currentQuesiton ${currentQuestion.id}`)}
                                
                                <p>{currentQuestion.question}</p>
                                <ul >
                                    {Object.entries(currentQuestion.options).map(([key, value]) => (
                                    
                                    <li key={key} 
                                        className={`pointer ${asnwerForQuiz[currentQuestion.id] === key ? 'selected-bold' : ''}`}  
                                        onClick={() => handleAnswerSelection(key)}>
                                        {value}
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
                                            <li 
                                                key={word} 
                                                id={word} 
                                                className="pointer"
                                                onClick={() => handleClickOption(word)} // Click to fill blank
                                            >
                                                {word}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        )}
                </div>
            </div>
            <div className="pageFooter">
                {currentQuestionIndex > 0 ? (
                    <a className="pointer" onClick={handlePrevious}>
                        previous
                    </a>
                ) : (
                    <span>1st question</span> 
                )}



                <a onClick={handleNext} className="pointer"> 
                    {currentQuestionIndex < questionOrder.length - 1 ? "next" : "submit"}
                </a>
            </div> 
        </div>
    )
}