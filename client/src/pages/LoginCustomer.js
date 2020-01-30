import React, { Component } from "react";
import { Input, FormBtn } from "../components/Form";
import API from "../utils/API";
import './style.css';
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';

class LoginCustomer extends Component {
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

    handleCustomerReturnSubmit = event => {
        event.preventDefault();
        API.getCustomers()
            .then(res => {
                const customerInfo = res.data.filter(data => data.username === this.state.username && data.password === this.state.password);
                if (!customerInfo[0]) {
                    this.setState({ message: "No match, please try again!" })
                    this.setState({ username: "", password: "" });
                }
                else {
                    const user_variable = customerInfo[0].username;
                    sessionStorage.clear();
                    sessionStorage.setItem("username", user_variable)
                    sessionStorage.setItem("registered", "customer")
                    this.setState({ username: "", password: "" });
                    this.setState({ message: "Success!" })
                    window.location.replace("/customer")
                }
            })
    }

    render() {
        return (
            <div>
                <div className="top">
                    <nav class="navbar navbar-expand-lg">
                        <i className="material-icons">cake</i>  <a class="navbar-brand"><Link to="/">Bakery Link</Link></a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div class="navbar-nav">
                                <a className="nav-item nav-link active"><Link to="/login-customer">Customer Log In <span class="sr-only">(current)</span></Link></a>
                                <a className="nav-item nav-link active"><Link to="/login-bakery">Bakery Log In</Link></a>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="container-fluid">
                    <p>Message: {this.state.message ? this.state.message : "None"}</p>
                    <form>
                        <p>Customer sign in</p>
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
                        />
                        <FormBtn
                            onClick={this.handleCustomerReturnSubmit}
                        >
                            Submit
                </FormBtn>
                    </form>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}

export default LoginCustomer;