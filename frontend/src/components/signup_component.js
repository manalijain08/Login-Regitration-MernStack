import React, { Component } from 'react'
import app from "./firebase_congif";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const auth = getAuth(app);
export default class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fname: "",
            lname: "",
            email: "",
            phone: "",
            password: "",
            userType: "",
            secretKey: "",
            // verifyButton: false,
            // verifyOtp: false,
            // otp: "",
            // verified: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.onSignInSubmit = this.onSignInSubmit.bind(this);
        // this.verifyCode= this.verifyCode.bind(this);
    }

    // onCaptchaVerify() {
    //     window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
    //         'size': 'invisible',
    //         'callback': (response) => {
    //             this.onSignInSubmit();
    //             // reCAPTCHA solved, allow signInWithPhoneNumber.
    //             // ...
    //         },
    //     }, auth);

    // }

    // onSignInSubmit() {
    //     this.onCaptchaVerify();
    //     const phoneNumber = "+91" + this.state.phone;
    //     const appVerifier = window.recaptchaVerifier;

    //     const auth = getAuth();
    //     signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    //         .then((confirmationResult) => {
    //             // SMS sent. Prompt user to type the code from the message, then sign the
    //             // user in with confirmationResult.confirm(code).
    //             window.confirmationResult = confirmationResult;
    //             alert("OTP sended");
    //             this.setState({ verifyOtp: true });
    //             // ...
    //         }).catch((error) => {
    //             // Error; SMS not sent
    //             // ...
    //         });

    // }

    // verifyCode() {
    //     window.confirmationResult.confirm(this.state.otp).then((result) => {
    //         // User signed in successfully.
    //         const user = result.user;
    //         console.log(user)
    //         alert("Verification Done");
    //         this.setState({
    //             verified:true,
    //             verifyOtp: false,
    //         })
    //         // ...
    //     }).catch((error) => {
    //         alert("Invalid OTP");
    //         // User couldn't sign in (bad verification code?)
    //         // ...
    //     });
    // }

    // changeMobile(e) {
    //     this.setState({ phone: e.target.value }, function () {
    //         if (this.state.phone.length == 10) {
    //             this.setState({
    //                 verifyButton: true,
    //             });
    //         }
    //     });
    // }

    handleSubmit(e) {
        if (this.state.userType == "Admin" && this.state.secretKey != "myapp") {
            e.preventDefault();
            alert("Invalid Admin")
        } else {
            e.preventDefault();
            const { fname, lname, email, phone, password, userType } = this.state;
            console.log(fname, lname, email, phone, password, userType);
            fetch("http://localhost:5000/register", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    fname,
                    email,
                    lname,
                    phone,
                    password,
                    userType
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data, "userRegister");
                    if (data.status === "ok") {
                        alert("registered successfully");
                        window.location.href = "./sign-in"
                    } else {
                        alert("Something went wrong");
                    }
                });
        }

    }

    render() {
        return (
            <div className="auth-wrapper">
                <div className="auth-inner" style={{ width: "auto" }}>
                    <form onSubmit={this.handleSubmit}>
                        <h3>Sign Up</h3>

                        {/* <div id="recaptcha-container"></div> */}

                        <div className="sign-up">
                            Register As <br />
                            <input
                                type="radio"
                                name="UserType"
                                value="User"
                                onChange={(e) => this.setState({ userType: e.target.value })}
                            />
                            User
                            <input
                                type="radio"
                                name="UserType"
                                value="Admin"
                                onChange={(e) => this.setState({ userType: e.target.value })}
                            />
                            Admin
                        </div>
                        {this.state.userType === "Admin" ? (
                            <div className="mb-3">
                                <label>Secret Key</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Secret Key"
                                    onChange={(e) => this.setState({ secretKey: e.target.value })}
                                />
                            </div>) : null}

                        <div className='left'>
                            <div className="mb-3">
                                <label>First name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="First name"
                                    onChange={(e) => this.setState({ fname: e.target.value })}
                                />
                            </div>

                            <div className="mb-3">
                                <label>Last name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Last name"
                                    onChange={(e) => this.setState({ lname: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className='right'>
                            <div className="mb-3">
                                <label>Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter email"
                                    onChange={(e) => this.setState({ email: e.target.value })}
                                />
                            </div>

                            <div className="mb-3">
                                <label>Mobile Number</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter number"
                                    onChange={(e) => /*this.changeMobile(e)*/  this.setState({phone: e.target.value})}
                                />
                                {/* {this.state.verifyButton ? (<input
                                    type="button"
                                    value={this.state.verified ? "Verified" : "Verify"}
                                    onClick={this.onSignInSubmit}
                                    style={{
                                        backgroundColor: "#0163d2",
                                        width: "100%",
                                        padding: 8,
                                        color: "white",
                                        border: "none",
                                    }}
                                />) : null} */}
                            </div>

                            {/* {this.state.verifyOtp ? (<div className="mb-3">
                                <label>OTP</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter OTP"
                                    onChange={(e) => this.setState({ phone: e.target.value })}
                                />
                                <input type="button"
                                    value="OTP"
                                    onClick={this.verifyCode}
                                    style={{
                                        backgroundColor: "#0163d2",
                                        width: "100%",
                                        padding: 8,
                                        color: "white",
                                        border: "none",
                                    }}
                                />
                            </div>) : null} */}


                            <div className="mb-3">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter password"
                                    onChange={(e) => this.setState({ password: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="d-grid button">
                            <button type="submit" className="btn btn-primary">
                                Sign-up
                            </button>
                        </div>
                        <p className="forgot-password text-right">
                            Already registered <a href="/sign-in">sign in?</a>
                        </p>
                    </form>
                </div>
            </div>

        );
    }
}