import HomePage from "../features/HomePage"
import QuestionsPage from "../features/QuestionsPage";
import HelpPage from "../features/HelpPage";
import ResultsPage from "../features/ResultsPage";
import homeIcon from "../images/homepage-icon.png";
import resultsIcon from "../images/diagnostic-icon.png"
import questionIcon from "../images/question-inquiry-icon.png"
import { 
  Route, 
  RouterProvider, 
  createBrowserRouter, 
  createRoutesFromElements,
  Outlet,
  useNavigate
} from 'react-router-dom';



function Layout() {
  const navigate = useNavigate();
  
  return (
    <div>
      <div className="header">
        <h1>Science Quiz</h1>
        <div className="headerIcons">
          <img 
            className="resultsIcon" 
            src={resultsIcon} 
            alt="results" 
            onClick={() => {navigate("resultspage")}}
          />
          <img 
            className="questionIcon" 
            src={questionIcon} 
            alt="help" 
            onClick={() => {navigate("helppage")}}
          />
          <img 
            className="homeIcon" 
            src={homeIcon} 
            alt="home" 
            onClick={() => {navigate("/")}}
          />
        </div>
      </div>
      <hr className="header-line" />
      <Outlet />
    </div>
  );
}


const appRouter = createBrowserRouter( 
  createRoutesFromElements(
  <Route path="/" element={ <Layout /> }>
    <Route index element={ <HomePage/> } />
    <Route path='questionspage' element={ <QuestionsPage/>}/>
    <Route path='resultspage' element={ <ResultsPage/>}/>
    <Route path='helppage' element={ <HelpPage/>}/>
  </Route>
  )
);

function App() {
  return (
    <RouterProvider router={appRouter}></RouterProvider>
  );
}

export default App;
