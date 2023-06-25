import React, { Component } from 'react';
import { Button, ButtonGroup, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import './App.css';


class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [], 
      isLoading: true,
      username: '',
    };
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('/api/items')
      .then(response => response.json())
      .then(data => this.setState({items: data, isLoading: false}));

  }

  

  removeItm = async (id) => {
    console.log(id);
    await fetch(`/api/item/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      console.log("Remove Done!");
      //update inventory state minus removed item
      let updatedItems = [...this.state.items].filter(i => i._id !== id);
      this.setState({items: updatedItems});
  }

  render() {
    const {items, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const itemList = items.map(item => {
      return <tr key={item._id}>
        <td style={{whiteSpace: 'nowrap'}}>{item.itemname}</td>
        <td>{item.brand}</td>
        <td>{item.color}</td>
        <td>{item.year}</td>
        <td>
        <ButtonGroup>
          <Button 
              size="sm" 
              color="primary" 
              tag={Link} 
              to={"/item/" + item._id}
          >Edit</Button>
          <Button 
              size="sm" 
              color="danger" 
              onClick={() => this.removeItm(item._id)}
          >Delete</Button>
        </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div className="main-body item-list">
        <Container fluid>
        <div className="float-left">
          <h3 className='welcome'>These are all I got!</h3>
          
            <Button 
              className="small-btn" 
              tag={Link} 
              to="/item/new"
              >Add New Item</Button>
          </div>
          <table className="mt-4 table-content">
            <thead>
              <tr>
                <th width="20%">Item Name</th>
                <th width="15%">Brand</th>
                <th width="15%">Color</th>
                <th width="15%">Year</th>
                <th width="15%">Actions</th>
              </tr>
            </thead>
            <tbody>
            {itemList}
            </tbody>
          </table>
        </Container>
      </div>
    );
  }
}

export default ItemList;