import React,{Component} from 'react';
import Home from './Home';
import {Router, Routes, Route} from 'react-router-dom';
import inventoryList from './InventoryList';
import InventoryEdit from './InventoryEdit';
import AppNavbar from './Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import InventoryList from './InventoryList';


class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path='/' exact element = {<Home />} />
          <Route path='/inventories' exact element = {<InventoryList />} />
          <Route path='/inventories/:id' element = {<InventoryEdit />} />
        </Routes>
      </Router>
    )
  }
}
export default App;
