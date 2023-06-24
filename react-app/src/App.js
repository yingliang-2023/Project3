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
  render() {
    return (
      <Router>

      <Navbar className='navbar'>
      <Link to="/"> Home </Link>
      <Link  id="headline"> 
      <FontAwesomeIcon icon={faShirt} bounce/>
      {"    "} {"    "}My Digital Closet  {"    "} {"    "} 
      <FontAwesomeIcon icon={faHatCowboy} bounce />
      </Link>
      <Link to = '/'>Leave</Link>
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
