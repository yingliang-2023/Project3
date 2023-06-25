import React,{Component} from 'react';
import Home from './Home';
import { Navbar } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faShirt,faHatCowboy} from "@fortawesome/free-solid-svg-icons";
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import ItemList from './ItemList';
import ItemEdit from './ItemEdit';
import './App.css';



class App extends Component {

  logOut=()=>{
    window.localStorage.clear();
    alert('You left your closet!');
  }

  render() {
    return (
      <Router>

      <Navbar className='navbar'>
      <Link to="/"> Home </Link>
      <Link  id="headline"> 
      <FontAwesomeIcon icon={faShirt} bounce/>
      {"    "} {"    "}<h1 id="headline_h1">My Digital Closet </h1> {"    "} {"    "} 
      <FontAwesomeIcon icon={faHatCowboy} bounce />
      </Link>
      <Link to = '/' onClick={this.logOut}>Leave</Link>
      </Navbar>


        <Routes>
          <Route path='/' exact element = {<Home />} />
          <Route path='/items' exact element = {<ItemList />} />
          <Route path='/item/:id' element = {<ItemEdit  />}  />
        </Routes>
      </Router>
    )
  }
}
export default App;
