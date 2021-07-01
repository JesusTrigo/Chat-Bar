import logo from './logo.svg';
import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Bares from './pages/Bares';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Bar from './components/Bar';
import Perfil from './components/Perfil';
import ChatRoom from './components/ChatRoom';
import Signup from './components/Signup';
import Login from './components/Login';
import Messages from './components/Messages';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <Router>

          <Route>
            <NavBar />
          </Route>
          <Switch>
            <Route path="/" exact={true}>
              <Home />
            </Route>
            <Route path="/bares" exact={true}>
              <Bares />
            </Route>
            <Route path="/bares/:id" exact={true}>
              <Bar />
            </Route>
            <Route path="/perfil/:id/:barid" exact={true}>
              <Perfil />
            </Route>
            <Route path="/chat/:id">
              <ChatRoom />
            </Route>
            <Route path="/message/:id" exact={true}>
              <Messages />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>


        </Router>

      </header>
    </div>
  );
}

// {/* <Router>


// <Switch>
//   <Route path="/" exact={true}>
//     <Home /> */}
// {/* cambiar Home por la pagina login / signup = localohst:3000/*/ }
// {/* </Route>
//   <Route>
//     <NavBar />
//   </Route>
//   <Route path="/bares">
//     <Bares />
//   </Route>
//   <Route path="/bares/:id">
//     <Bar />
//   </Route>
// </Switch>


// </Router> */}

export default App;
