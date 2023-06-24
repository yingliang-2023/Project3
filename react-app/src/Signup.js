import React, {Component} from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";


function withParams(Component) {
    return props => <Component {...props} params={useParams()} navigation={useNavigate()}  />;
  }

class Signup extends Component {
    // emptyUser={
    //     username: '',
    //     password: '',
    // }

    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:'',
        };

    this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleSubmit = (e)=>{
        e.preventDefault();
        const {username,password} = this.state;

            fetch('/api/user',{
            method:'POST',
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({username,password})
        })
        .then((res) => res.json())
        .then(() =>alert("Congratulation, you've become user of digital closet!"));
            };
        

        render() {
            return(
                <div className="signup">
                <h1>Please Create Your Account</h1>

                <form onSubmit={this.handleSubmit} class=""  method="post"> 
                {/*action="/register"*/}

                <p class="warning">  </p>
                <div class="form-group">
                    <label>Username</label>
                    <input class="form-control-sm" 
                        type="text" 
                        ame="username" 
                        placeholder="username" 
                        onChange={e=>this.setState({username:e.target.value})}
                        required/>
            
                    <label>Password</label>
                    <input class=" form-control-sm" 
                        type="password" 
                        name="password" 
                        rows="5" cols="30" 
                        placeholder='password'
                        onChange={e=>this.setState({password:e.target.value})} 
                        required/>
                    </div>
                <button class="small-btn" type="submit" name="button" >Sign Up</button>
                </form>
            
            </div>
            )
            };
};

export default withParams(Signup);