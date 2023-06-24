import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useParams,useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import './App.css';


function withParams(Component) {
    return props => <Component {...props} params={useParams()} navigation={useNavigate()}  />;
  }

class ItemEdit extends Component {
  emptyItem = {
    itemname: "",
    brand: "",
    color: "",
    year: "",
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem,
    };
  }

  async componentDidMount() {

    let { id } = this.props.params;
    if (id !== "new") {
      const item = await (await fetch(`/api/item/${id}`)).json();
      this.setState({ item: item });
    }
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { item } = this.state;

    await fetch("/api/item", {
      method: item._id ? "PUT":"POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    console.log(item);
    this.props.navigation("/items");
  };

  render() {
    const { item } = this.state;
    const title = (
      <h2 className="mt-3">{item._id ? "Edit Item In My Closet" : "Add Item To My Closet"}</h2>
    );

    return (
      <div className="main-body item-edit">
        
          {title}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="itemname" className="h5 mt-3">
                Item Name
              </Label>
              <Input
                type="text"
                name="itemname"
                id="itemname"
                value={item.itemname || ""}
                onChange={this.handleChange}
                autoComplete="itemname"
              />
            </FormGroup>
            <FormGroup>
              <Label for="qty" className="h5 mt-3">
                Brand
              </Label>
              <Input
                type="text"
                name="brand"
                id="brand"
                value={item.brand || ""}
                onChange={this.handleChange}
                autoComplete="brand"
              />
            </FormGroup>
            <FormGroup>
              <Label for="color" className="h5 mt-3">
                Color
              </Label>
              <Input
                type="text"
                name="color"
                id="color"
                value={item.color || ""}
                onChange={this.handleChange}
                autoComplete="color"
              />
            </FormGroup>
            <FormGroup>
              <Label for="year" className="h5 mt-3">
                Year
              </Label>
              <Input
                type="number"
                name="year"
                id="year"
                value={item.year || ""}
                onChange={this.handleChange}
                autoComplete="year"
              />
            </FormGroup>
            <FormGroup>
              <Button color="primary" type="submit" className="mt-3">
                Save
              </Button>{" "}

              <Button
                color="secondary"
                className="mt-3"
                tag={Link}
                to="/items"
              >
                Cancel
              </Button>
            </FormGroup>
          </Form>
        
      </div>
    );
  }
}

export default withParams(ItemEdit);