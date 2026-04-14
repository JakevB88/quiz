
import { useNavigate } from "react-router-dom";


export default function ResultsPage() {
    const navigate = useNavigate();

    const retakeQuiz = () => {

    }

    return(
        <div>
            <h1>ResultsPage</h1>
            <p>Congratulations you have completed the quiz on Volcano's</p>
            <p>you have achieved a score of 100%</p>
        
            <div className="pageFooter">
                <a className="questionFooterPrevious" onClick={() => {navigate("/questionspage")}}>retake quiz</a>
                <a className="questionFooterNext" onClick={() => {navigate("/")}}>all quizez</a>
            </div>
        </div>
    )
}