import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import TasksList from "./pages/TasksList"
import CreateTask from "./pages/CreateTask"
import HomePage from "./pages/HomePage"
import DataSelectionPage from "./pages/DataSelectionPage";
import SharedFilesPage from "./pages/SharedFilesPage";
import AssignPage from "./pages/AssignPage";
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom' 

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path={"/login"}>
             <LoginPage></LoginPage>
          </Route>
          <Route exact path={"/register"}>
             <RegisterPage></RegisterPage>
          </Route>
          <Route exact path={"/"}>
             <HomePage></HomePage>
          </Route>
          <Route exact path={"/selectdata"}>
             <DataSelectionPage></DataSelectionPage>
          </Route>
          <Route exact path={"/create"}>
             <CreateTask></CreateTask>
          </Route>
          <Route exact path={"/list"}>
             <TasksList></TasksList>
          </Route>
          <Route exact path={"/shared"}>
             <SharedFilesPage></SharedFilesPage>
          </Route>
          <Route exact path={"/assign"}>
             <AssignPage></AssignPage>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
