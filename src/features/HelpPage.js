

export default function HelpPage() {
    return(
        <div>
            <h2>HelpPage</h2>
            <h2>Quiz application</h2>
            <p>
                This Quiz application allows you to take a quiz from the multiple quizzes shown on the homepage.
            </p>
            <p>
                Each quiz has around 10 questions which can vary between 3 types:
            </p>
            <ul>
                <li>Multiple choise</li>
                <li>True/False</li>
                <li>Fill in the blanks</li>
            </ul>
            <p>
                For each question select your answer and click "next" to move to the next question.<br></br>
                You can move back throught the questions and change your answer if needed.<br></br>
                When you are happy with all your answers click submit, which is only possible when all questions are answered.<br></br>
                On submission you will be taken to a results page where you can check your answers.<br></br>
                You can then choose to take another quiz or clear your answers.
            </p>
        </div>
    )
}