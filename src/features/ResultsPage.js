
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
    selectAllScores
} from "../store/resultsSlice";


export default function ResultsPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const activeQuizId = useSelector(selectActiveQuizId);
    const quizScores = useSelector(selectAllScores);
    const quizzes = useSelector(selectQuiz); 
    const activeQuiz = quizzes[activeQuizId];

    const retakeQuiz = () => {
        dispatch(resetQuiz())
        navigate("/questionspage")

    }

    return(
        <div>
            <h1>ResultsPage</h1>
            <p>Congratulations you have completed the quiz on {activeQuizId}</p>
            
            <p>You achieved a score of {quizScores[activeQuizId]} out of {Object.keys(activeQuiz.questions).length}</p>
            
            <br></br>
            <p>Previously completed quizzes:</p>
            {Object.values(quizzes)
                .filter(quiz => quiz.id !== activeQuizId)
                .map(quiz => {
                    // Calculate total questions for this specific quiz in the loop
                    const totalQuestions = Object.keys(quiz.questions).length;
                    const score = quizScores[quiz.id];

                    return (
                        <div key={quiz.id} className="quiz-item">
                            <p><strong>{quiz.title}</strong></p>
                            {/* Corrected: Access the specific score for this quiz ID */}
                            <p>Score: {score} out of {totalQuestions}</p>
                        </div>
                    );
                })
            }
            <div className="pageFooter">
                <a className="questionFooterPrevious" onClick={retakeQuiz}>retake {activeQuizId} quiz</a>
                <a className="questionFooterNext" onClick={() => {navigate("/")}}>all quizez</a>
            </div>
        </div>
    )
}

