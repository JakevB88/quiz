

export default function QuestionsPage() {
    const previousQuestion = () => {
        console.log(`previous question clicked`)
    }

    const nextQuestion = () => {
        console.log(`next question clicked`)
    }

        
    const allowDrop = (e) => {
        e.preventDefault();
    }

    const drag = (e) => {
        e.dataTransfer.setData("text/plain", e.target.id);
    }

    const drop = (e) => {
        e.preventDefault();
        const id = e.dataTransfer.getData("text/plain");
        e.target.appendChild(document.getElementById(id));
    }


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
                    The name volcano comes from the
                    <span className="blank" onDrop={drop} onDragOver={allowDrop}></span>
                    god of
                    <span className="blank" onDrop={drop} onDragOver={allowDrop}></span>
                    Vulcan!
                </p>

                <ul className="options">
                    <li draggable="true" onDragStart={drag} id="roman">Roman</li>
                    <li draggable="true" onDragStart={drag} id="egyptian">Egyptian</li>
                    <li draggable="true" onDragStart={drag} id="lava">lava</li>
                    <li draggable="true" onDragStart={drag} id="fire">fire</li>
                </ul>
            </div>

            <br></br>
            <div className="questionFooter">
                <a className="questionFooterPrevious" onClick={previousQuestion}>previous</a>
                <a className="questionFooterNext" onClick={nextQuestion}>next</a>
            </div>
        </div>
    )
}