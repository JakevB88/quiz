import volcanoImage from "../images/volcanoImage-alain-bonnardeaux-tLxGw_ITs7k-unsplash.jpg";
import solarSystemImage from "../images/solarSystemImagenasa-hubble-space-telescope-rZhFmSl1Jow-unsplash.jpg";
import weatherImage from "../images/weatherImage-noaa-ZVhm6rEKEX8-unsplash.jpg";
import bodyImage from "../images/bodyImage-julien-tromeur-ZMK0DU5wARA-unsplash.jpg";
import { useNavigate } from "react-router-dom";



export default function HomePage() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/questionspage");
    }


    return(
        <div>
            

            <h1>Quiz Topics</h1>
            <div className="quizzes">
                <div className="quiz-item"> 
                    <p>Vulcanoes</p>
                    <img 
                        src={volcanoImage} 
                        alt="Immage showing an errupting volcano agains a horrizon" 
                        onClick={() => {navigate("/questionspage")}}
                    />
                </div>
                <div className="quiz-item">
                    <p>Weather</p>
                    <img 
                        src={weatherImage} 
                        alt="Immage showing a stromcloud hit by the light from a sunset with heavy rain coming from the cloud"
                        onClick={() => {navigate("/questionspage")}}
                    />
                </div>
                <div className="quiz-item">
                    <p>Solar System</p>
                    <img 
                        src={solarSystemImage} 
                        alt="Immage showing an overview of our solarsystem"
                        onClick={() => {navigate("/questionspage")}}
                    />
                </div>
                <div className="quiz-item">
                    <p>Body</p>
                    <img 
                        src={bodyImage} 
                        alt="Image picturing the anatomy of a humen, in this case the torso and its sceleton"
                        onClick={() => {navigate("/questionspage")}}
                    />
                </div>
            </div>
        </div>
    )
}