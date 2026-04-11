import HomePage from "../features/HomePage"
import QuestionsPage from "../features/QuestionsPage";
import questionIcon from "../images/question-inquiry-icon.png"
import { 
  Route, 
  RouterProvider, 
  createBrowserRouter, 
  createRoutesFromElements 
} from 'react-router-dom';


const appRouter = createBrowserRouter( 
  createRoutesFromElements(
  <Route path="/" element={ <HomePage /> }>
    <Route path='homepage' element={ <HomePage/> } />
    <Route path='questionspage' elemtent={ <QuestionsPage/>}/>
  </Route>
  )
);

function App() {
  return (
    <div>
      <div className="header">
          <h1>Science Quiz</h1>
          <img className="questionIcon" src={questionIcon}/>
      </div>
      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  );
}

export default App;
