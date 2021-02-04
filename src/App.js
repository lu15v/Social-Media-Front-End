import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import MenuBar from './components/MenuBar';
import {Container} from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';


function App() {
  return (
   <Router>
     <Container>
        <MenuBar/>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/login' component={Login}></Route>
        <Route exact path='/register' component={Register}></Route>
     </Container>
   </Router>
  );
}

export default App;
