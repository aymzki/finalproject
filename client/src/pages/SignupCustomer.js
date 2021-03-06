import React, { Component } from "react";
import { Input, FormBtn } from "../components/Form";
import API from "../utils/API";
import './style.css';
import Footer from "../components/Footer";


class SignupCustomer extends Component {
    state = {
        username: "",
        password: "",
        name: "",
        phone: "",
        email: "",
        location: "",
        message: ""
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleCustomerNewSubmit = event => {
        event.preventDefault();
        API.getCustomers()
            .then(res => {
                const allUsers = res.data;
                const usernameDuplicate = allUsers.filter(user => user.username === this.state.username);
                const userBakeryCreated = allUsers.filter(user => user.phone === this.state.phone);
                if (usernameDuplicate.length !== 0){
                    this.setState({message: "Username already taken, please try again!"})
                    this.setState({username: ""});
                }
                else if (userBakeryCreated.length !== 0){
                    API.updateCustomer(userBakeryCreated[0]._id,
                        {
                            username: this.state.username,
                            password: this.state.password,
                            name: this.state.name,
                            email: this.state.email,
                            location: this.state.location
                    })
                    .catch(err => console.log(err));
                    const user_variable = this.state.username;
                    sessionStorage.clear();
                    sessionStorage.setItem("username", user_variable)
                    sessionStorage.setItem("registered", "customer")
                    this.setState({message: "Registation completed!"})
                    window.location.replace("/customer")
                }
                else {
                    API.saveCustomer({
                        username: this.state.username,
                        password: this.state.password,
                        name: this.state.name,
                        phone: this.state.phone,
                        email: this.state.email,
                        location: this.state.location
                    })
                        .catch(err => console.log(err));
                    const user_variable = this.state.username;
                    sessionStorage.clear();
                    sessionStorage.setItem("username", user_variable)
                    sessionStorage.setItem("registered", "customer")
                    this.setState({message: "Success!"})
                   window.location.replace("/customer")
               }
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>  
                <div className="top">
                    <nav class="navbar navbar-expand-lg">
                        <i className="material-icons">cake</i>  <a class="navbar-brand" href="/">Bakery Link</a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="navbar-collapse" id="navbarNavAltMarkup">
                            <div class="navbar-nav ml-auto">
                                <a className="nav-item nav-link active" href="/login-customer">Customer Log In <span class="sr-only">(current)</span></a>
                                <a className="nav-item nav-link active" href="/login-bakery">Bakery Log In</a>
                            </div>
                        </div>
                    </nav>
                </div>
        <div className="container-fluid">
        <form className="customerSignup">
            <p class="signUpP">Message: {this.state.message ? this.state.message : "None"}</p>
            
                <p class="signUpP">Customer sign up</p>
                <Input
                    value={this.state.username}
                    onChange={this.handleInputChange}
                    name="username"
                    placeholder="username"
                />
                <Input
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    name="password"
                    placeholder="password"
                    type="password"
                />
                <Input
                    value={this.state.name}
                    onChange={this.handleInputChange}
                    name="name"
                    placeholder="name"
                />
                <Input
                    value={this.state.phone}
                    onChange={this.handleInputChange}
                    name="phone"
                    placeholder="phone"
                />
                <Input
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    name="email"
                    placeholder="email"
                />
                <Input
                    value={this.state.location}
                    onChange={this.handleInputChange}
                    name="location"
                    placeholder="location"
                />
                <FormBtn
                    onClick={this.handleCustomerNewSubmit}
                >
                    Submit
                </FormBtn>
            </form>
            <div className="images">
            <img className="loginPic"src={require("../images/white-round-cake-topped-with-yellow-slice-fruit-140831.jpg")} alt="yellow slice"/>            <img className="loginPic2"src={require("../images/baked-pastries-2872882.jpg")} alt="pastries"/>            <img className= "loginPic3" src={require("../images/close-up-photo-of-brownies-3026804.jpg")} alt="brownies"/>
         
            </div>
            </div>
            <Footer></Footer>
            </div>
        )
    }
}

export default SignupCustomer;