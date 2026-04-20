
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
    selectScoreForQuiz
} from "../store/resultsSlice";


export default function ResultsPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const activeQuizId = useSelector(selectActiveQuizId);
    const quizScore = useSelector((state) => selectScoreForQuiz(state, activeQuizId));
    const quizzes = useSelector(selectQuiz); 
    const activeQuiz = quizzes[activeQuizId];



    const retakeQuiz = () => {
        dispatch(resetQuiz())
        navigate("/questionspage")

    }

    return(
        <div>
            <h1>ResultsPage</h1>
            <p>Congratulations you have completed the quiz on {activeQuiz.title}</p>
            <p>you have achieved a score of {quizScore} out of {Object.keys(activeQuiz.questions).length}</p>
        
            <div className="pageFooter">
                <a className="questionFooterPrevious" onClick={retakeQuiz}>retake quiz</a>
                <a className="questionFooterNext" onClick={() => {navigate("/")}}>all quizez</a>
            </div>
        </div>
    )
}