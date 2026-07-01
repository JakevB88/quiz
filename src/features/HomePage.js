
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { startQuiz, selectQuiz } from "../store/quizSlice";
import {resetQuizResults} from "../store/resultsSlice";
import {quizImageMap} from "../lib/QuizImageMap"

export default function HomePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const quizzes = useSelector(selectQuiz);

    const handleQuizSelection = (id) => {
        dispatch(startQuiz(id));
        dispatch(resetQuizResults(id));
        navigate("questionspage");
    };


    return(
        <div className="homepage">
            <h2>Quiz Topics</h2>
            <div className="quizzes">
                {Object.values(quizzes).map((quiz) => (
                    <div key={quiz.id} className="quiz-item">
                        <p className="quizTitle">{quiz.title}</p>
                        <button onClick={() => handleQuizSelection(quiz.id)} >
                            <img className="quizImage"
                                src={quizImageMap[quiz.img.key]} 
                                alt={quiz.img.alt} 
                            />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}