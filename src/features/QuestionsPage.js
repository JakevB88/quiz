import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ResultsPage from "./ResultsPage";
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
    resetQuizResults,
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
    const [blanks, setBlanks] = useState({
        blank1: null,
        blank2: null,
        blank3: null,
        blank4: null,
    });

    //load the state for the drag/drop questions
    useEffect(() => {
        if (currentQuestion.type === 'fillBlank') {
            const storedAnswerKeys = asnwerForQuiz[currentQuestion.id];

            if (storedAnswerKeys && Array.isArray(storedAnswerKeys)) {
                //Convert the keys ('a', 'c') back into the actual words
                const loadedBlanks = {};
                storedAnswerKeys.forEach((key, index) => {
                    if (key) {
                        loadedBlanks[index] = currentQuestion.options[key];
                    }
                });
                
                //Update the local state
                setBlanks(loadedBlanks);
            } else {
                //Reset if no answer exists
                setBlanks({});
            }
        } else {
            setBlanks({}); //reset if not a fillBlank question
        }
    }, [currentQuestion.id, asnwerForQuiz]); //run when currentQuestion updates or answerForQuiz



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
        if (currentQuestionIndex < questionOrder.length - 1) {
            dispatch(previousQuestion());
        } else {
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
        handleAnswerSelection(finalAnswerKeys); // Sends ['a', 'c']
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


    //Logic for the drag and drop question
    const drag = (e) => {
        e.dataTransfer.setData("text/plain", e.target.id);
    };
    const allowDrop = (e) => e.preventDefault();
    const dropIntoBlank = (blankKey) => (e) => {
        e.preventDefault();
        const word = e.dataTransfer.getData("text/plain");
        setBlanks((prev) => ({
            ...prev,
            [blankKey]: word
        }));
    };
    const clearBlank = (blankKey) => {
        setBlanks((prev) => ({
            ...prev,
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
                    {/*if the question is 'multipleChoise' or 'trueFalse'*/}
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

                    

                    {/*if the question is 'fillBlank'*/}
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
                                                        className="blank"
                                                        onDrop={dropIntoBlank(index)} // Use index as the ID
                                                        onDragOver={allowDrop}
                                                        onClick={() => clearBlank(index)}
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
                                        .filter((word) => !Object.values(blanks).includes(word))
                                        .map((word) => (
                                            <li key={word} id={word} draggable onDragStart={drag}>
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