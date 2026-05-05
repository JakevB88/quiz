import volcanoImage from "../images/volcanoImage-alain-bonnardeaux-tLxGw_ITs7k-unsplash.webp";
import solarSystemImage from "../images/solarSystemImagenasa-hubble-space-telescope-rZhFmSl1Jow-unsplash.webp";
import weatherImage from "../images/weatherImage-noaa-ZVhm6rEKEX8-unsplash.webp";
import bodyImage from "../images/bodyImage-julien-tromeur-ZMK0DU5wARA-unsplash.webp";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { startQuiz, nextQuestion, resetQuiz, selectQuiz } from "../store/quizSlice"
import QuestionsPage from "./QuestionsPage";
import {resetQuizResults} from "../store/resultsSlice"

export default function HomePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const quizzes = useSelector(selectQuiz);
    

    const quizImageMap = {
        volcano: volcanoImage,
        weather: weatherImage,
        solarSystem: solarSystemImage,
        body: bodyImage
    };

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
                        <img className="quizImage"
                            src={quizImageMap[quiz.img.key]} 
                            alt={quiz.img.alt} 
                            onClick={() => handleQuizSelection(quiz.id)}  
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}