
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import resetResultsIcon from "../images/text-document-remove-icon.webp"
import {  
    selectQuiz, 
    selectActiveQuizId, 
    selectCurrentQuestionIndex,
    selectQuestionOrder,
    nextQuestion,
    previousQuestion,
    resetQuiz
} from "../store/quizSlice";
import {
    selectAllScores,
    resetAllQuizResults
} from "../store/resultsSlice";


export default function ResultsPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const activeQuizId = useSelector(selectActiveQuizId);
    const quizScores = useSelector(selectAllScores);
    const quizzes = useSelector(selectQuiz); 
    const allAnswers = useSelector(state => state.results.answersByQuiz);
    const activeQuiz = quizzes[activeQuizId];

    const retakeQuiz = () => {
        dispatch(resetQuiz())
        navigate("/questionspage")
    }

    const handleReset = () => {
        const confirmed = window.confirm("Reset all quiz results?");
    
        if (confirmed) {
            dispatch(resetAllQuizResults());
        }
    }

    const formatAnswer = (question, answer) => {
        if (answer === undefined || answer === null) return "No answer";
        
        //Handle Fill in the Blanks (Arrays)
        if (question.type === "fillBlank" && Array.isArray(answer)) {
            return answer.map(key => {
                if (question.options && question.options[key]) {
                return question.options[key]; 
            }
            return key;
        }).join(", ");
        }
        
        //Handle Multiple Choice 
        if (question.options && question.options[answer]) {
            return question.options[answer];
        }
        
        //Handle True/False (Booleans or Strings)
        return String(answer);
    };

    const formatQuestion = (question) => {
        // ADD 'return' HERE
        return Object.keys(question.question).map((partKey, index, array) => {
            const partText = question.question[partKey];
            const isLastPart = index === array.length - 1;
            
            return (
                <span key={partKey}>
                    {partText}
                    {!isLastPart && (
                        <span className="blank"></span>
                    )}
                </span>
            );
        });
    };

    return (
        <div className="resultspage">
            <div className="header">
                <h2>ResultsPage</h2>
                    <img className="resetResults" src={resetResultsIcon} alt="reset results" onClick={handleReset} />
                
            </div>
            {activeQuiz && (
                <div>
                    <p>Congratulations you have completed the quiz on {activeQuiz.title}</p>
                    <p>You achieved a score of {quizScores[activeQuizId]} out of {Object.keys(activeQuiz.questions).length}</p>
                </div>
            )}

            <hr />
            <p><strong>Your Progress So Far:</strong></p>
            
            {Object.values(quizzes).map(quiz => {
                const userAnswers = allAnswers[quiz.id] || {};
                // FIX: Define hasStarted
                const hasStarted = Object.keys(userAnswers).length > 0;

                return (
                    <div key={quiz.id} className="quizReviewItem">
                        <h3>{quiz.title} (Score: {quizScores[quiz.id]})</h3>
                        {hasStarted ? (
                            <div>
                                {Object.values(quiz.questions).map((question) => {
                                    const uAns = userAnswers[question.id];
                                    const userWord = JSON.stringify(formatAnswer(question, uAns));
                                    const correctWord = JSON.stringify(formatAnswer(question, question.correctAnswer));
                                    const isCorrect = userWord === correctWord;

                                    return (
                                        <div key={question.id} className="questionsresult" >
                                            <p><strong>Question {question.id}:</strong> {question.type === 'fillBlank' ? formatQuestion(question): question.question}</p>
                                            <div className="questionsresult">
                                                <p><strong>Your Answer:</strong> {formatAnswer(question, uAns)} {isCorrect ? "✅" : "❌"}</p>
                                                {!isCorrect && (
                                                    <p className="correct-reveal">
                                                        <strong>Correct Answer:</strong> {formatAnswer(question, question.correctAnswer)}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p><em>You haven't started this quiz yet.</em></p>
                        )}
                    </div>
                );
            })}

            <div className="pageFooter">
                <a className="questionFooterNext" onClick={() => {navigate("/")}}>back to all quizzes</a>
            </div>
        </div>   
    );
}

