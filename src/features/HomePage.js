import volcanoImage from "../images/volcanoImage-alain-bonnardeaux-tLxGw_ITs7k-unsplash.webp";
import solarSystemImage from "../images/solarSystemImagenasa-hubble-space-telescope-rZhFmSl1Jow-unsplash.webp";
import weatherImage from "../images/weatherImage-noaa-ZVhm6rEKEX8-unsplash.webp";
import bodyImage from "../images/bodyImage-julien-tromeur-ZMK0DU5wARA-unsplash.webp";
import earthquakeImage from "../images/colin-lloyd-D7jnhK1xFPU-unsplash.webp";
import stormImage from "../images/nasa-i9w4Uy1pU-s-unsplash.webp";
import earthImage from "../images/elena-mozhvilo-znhEe1cbbQE-unsplash.webp"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { startQuiz, selectQuiz } from "../store/quizSlice"
import {resetQuizResults} from "../store/resultsSlice"

export default function HomePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const quizzes = useSelector(selectQuiz);
    

    const quizImageMap = {
        volcano: volcanoImage,
        weather: weatherImage,
        solarSystem: solarSystemImage,
        body: bodyImage,
        earthquake: earthquakeImage,
        storm: stormImage,
        planetEarth: earthImage
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