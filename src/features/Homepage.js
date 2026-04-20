import volcanoImage from "../images/volcanoImage-alain-bonnardeaux-tLxGw_ITs7k-unsplash.jpg";
import solarSystemImage from "../images/solarSystemImagenasa-hubble-space-telescope-rZhFmSl1Jow-unsplash.jpg";
import weatherImage from "../images/weatherImage-noaa-ZVhm6rEKEX8-unsplash.jpg";
import bodyImage from "../images/bodyImage-julien-tromeur-ZMK0DU5wARA-unsplash.jpg";
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
        <div>
            <h1>Quiz Topics</h1>
            <div className="quizzes">
                {Object.values(quizzes).map((quiz) => (
                    <div key={quiz.id} className="quiz-item">
                        <p>{quiz.title}</p>
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