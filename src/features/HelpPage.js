

export default function HelpPage() {
    return(
        <div>
            <h2>HelpPage</h2>
            <h2>Quiz application</h2>
            <div className="helppage">
                <p>
                    The Science Quiz is here to test childrens knowledge on a veriety of topics in a fun and engaging way.
                    The quiz is simple to navigate to allow for a positive experience.
                </p>
                <p>
                    On the homepage you will be able to choose from multiple toppics.
                </p>
                <p>
                    Each quiz has around 10 questions which can vary between 3 types:
                </p>
                <ul>
                    <li>Multiple choise</li>
                    <li>True/False</li>
                    <li>Fill in the blanks</li>
                </ul>
                <br></br>
                <p>
                    For each question select your answer and click "next" to move to the next question.<br></br>
                    You can move back throught the questions and change your answer if needed.<br></br>
                    When you are happy with all your answers click submit on the final question.<br></br>
                    On submission you will be taken to a results page where you can check your answers.<br></br>
                    You can then choose to take another quiz or clear your answers for the next participant.
                </p>
            </div>
        </div>
    )
}