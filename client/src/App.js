import './App.css';
import React, { useEffect, useState } from "react";
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
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.css';

const App = () => {


  const [user, setUser] = useState();

  const getUser = async () => {
    const token = localStorage.getItem("token")
    const response = await axios("/api/users/myProfile", {
      headers: {
        "Authorization": token
      }
    })
    setUser(response.data.user)
  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUser()
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">

        <Router>

          <Route path="/:x">
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
              <Login getUser={getUser} />
            </Route>
            <Route path="*" component={() => "404 NOT FOUND"}>
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
