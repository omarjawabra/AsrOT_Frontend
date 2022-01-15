import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import TasksList from "./pages/TasksList"
import CreateTask from "./pages/CreateTask"
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
             <TasksList></TasksList>
          </Route>
          <Route exact path={"/create"}>
             <CreateTask></CreateTask>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
