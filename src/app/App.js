import HomePage from "../features/HomePage"
import QuestionsPage from "../features/QuestionsPage";
import HelpPage from "../features/HelpPage";
import ResultsPage from "../features/ResultsPage";
import homeIcon from "../lib/images/homepage-icon.png";
import resultsIcon from "../lib/images/diagnostic-icon.png"
import questionIcon from "../lib/images/question-inquiry-icon.png"
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
    <div className="appheader">
      <div className="header">
        <h1>Science Quiz</h1>
        <div className="headerIcons">
          <button onClick={() => {navigate("resultspage")}}>
            <img 
              className="resultsIcon" 
              src={resultsIcon} 
              alt="results"   
            />
          </button>
          <button onClick={() => {navigate("helppage")}}>
            <img 
              className="questionIcon" 
              src={questionIcon} 
              alt="help" 
              
            />
          </button>
          <button onClick={() => {navigate("/")}}> 
            <img 
              className="homeIcon" 
              src={homeIcon} 
              alt="home" 
            />
          </button>
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
  ),
  { basename: process.env.NODE_ENV === "test" ? "/" : "/quiz" } 
);

function App() {
  return (
    <RouterProvider router={appRouter}></RouterProvider>
  );
}

export default App;
