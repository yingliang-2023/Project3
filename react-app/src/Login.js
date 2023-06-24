import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

export default class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:'',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    };

handleSubmit(e){
    e.preventDefault();
    const {username, password} = this.state;
    fetch('/api/login-user',{
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
        .then((data) =>{
            console.log(data,"UserRegister")
            if(data.status==="ok"){
                alert("success!");
                // window.localStorage("token",data.data);
                window.location.href = "/items";
            }
        });
    console.log(username,password);
}

render(){
    return (
<div className="form login">  
            <h1>Log In to Your Closet</h1>
 
    <form onSubmit={this.handleSubmit} class="" action="/login" method="post">
      <div class="form-group">
        <label>Username</label>
        <input 
            class=" form-control-sm" 
            type="text" 
            name="username" 
            placeholder='Username'
            onChange={(e) => this.setState({ username: e.target.value })}
            />

        <label>Password</label>
        <input 
            class=" form-control-sm" 
            type="password" 
            name="password" 
            rows="5" cols="30" 
            placeholder='password'
            onChange={(e) => this.setState({ password: e.target.value })}
            />
      </div>
      <button class="small-btn" type="submit" name="button">Login</button>
    </form>
</div>
    
    )
}
};

