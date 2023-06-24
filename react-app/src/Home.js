import React,{Component} from 'react';
import {Container} from 'reactstrap';
import Signup from './Signup';
import Login from './Login';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';


class Home extends Component {
    render() {
        return (
            <div className='main-body'>
               
                <Container fluid>
                    <Signup /> 
                </Container>

                <Container fluid>
                    <Login/>
                </Container>

            </div>
        )
    }
};

export default Home;