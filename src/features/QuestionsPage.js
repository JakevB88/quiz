import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ResultsPage from "./ResultsPage";



export default function QuestionsPage() {
    
    const navigate = useNavigate();

    const previousQuestion = () => {
        console.log(`previous question clicked`)
    }

    const nextQuestion = () => {
        console.log(`next question clicked`)
    }

    const allOptions = ["Roman", "Egyptian", "lava", "fire"];

    const [blanks, setBlanks] = useState({
        blank1: null,
        blank2: null
    });    

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
        <div>
            <h1>Volcano Quiz</h1>
            <h2>Question 1 of 10</h2>
            <div>
                <p>Where does the name volcano come from?</p>
                <ul>
                    <li><a>The Roman god of fire called Vulcan</a></li>
                    <li><a>The Egiptian got of the mountains</a></li>
                    <li><a>The 1st person to ever climb a volcano</a></li>
                    <li className="listIcon"><a>The largest volcano on earth</a></li>
                </ul>
            </div>
            <div>
                <p>The name volcano comes from the Roman god of fire Vulcan!</p>
                <ul>
                    <li><a>True</a></li>
                    <li><a>False</a></li>
                </ul>
            </div>

            <div class="question">
                <p>
                    The name volcano comes from the{" "}
                    <span
                        className="blank"
                        onDrop={dropIntoBlank("blank1")}
                        onDragOver={allowDrop}
                        onClick={() => clearBlank("blank1")}
                    >
                        {blanks.blank1 ?? "_____"}
                    </span>{" "}
                    god of{" "}
                    <span
                        className="blank"
                        onDrop={dropIntoBlank("blank2")}
                        onDragOver={allowDrop}
                        onClick={() => clearBlank("blank2")}
                    >
                        {blanks.blank2 ?? "_____"}
                    </span>{" "}
                    Vulcan!
                </p>    
                <ul className="options">
                    {allOptions.filter((word) =>
                        word !== blanks.blank1 && word !== blanks.blank2
                    )
                    .map((word) => (
                    <li
                        key={word}
                        id={word}
                        draggable
                        onDragStart={drag}
                    >
                        {word}
                    </li>
                    ))}
                </ul>
            </div>

            <br></br>
            <div className="pageFooter">
                <a className="questionFooterPrevious" onClick={previousQuestion}>previous</a>
                <a className="questionFooterNext" onClick={nextQuestion}>next</a>
                <a onClick={() => {navigate("/resultspage")}}>submit</a>
            </div>
        </div>
    )
}