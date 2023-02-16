import React, { Component, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom"

export default function Edit() {


    const navigate = useNavigate("");

    const [content, setcontent] = useState({
        fname: "",
        lname: "",
        email: "",
        password: ""
    })

    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setcontent((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }

    // const [getuserdata, setUserdata] = useState([]);
    // console.log(getuserdata);

    const { id } = useParams("");
    console.log(id);

    const getdata = async () => {
        const res = await fetch(`http://localhost:5000/getUser/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 404 || !data) {
            console.log("error");
        } else {
            setcontent(data)
            console.log("get data");
        }
    }

    useEffect(() => {
        getdata();
    }, []);

    const updateuser = async (e) => {
        e.preventDefault();

        const { fname, lname, email, password } = content;

        const res2 = await fetch(`http://localhost:5000/updateuser/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fname, lname, email, password
            })
        });

        const data2 = await res2.json();
        console.log(data2);

        if (res2.status === 404 || !data2) {
            alert("fill the data")
        } else {
            alert("data added");
            navigate("/adminHome");
        }
    }

    return (
        <div className="auth-wrapper">
            <div className="auth-inner" style={{width:"auto"}}>
                <form >
                    <h3>Edit Details</h3>
                    <Link to={'/adminHome'}>Back</Link>
                    <div className="mb-3">
                        <label>First name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="First name"
                            value={content.fname}
                            onChange={setdata}
                            name="fname"
                        />
                    </div>

                    <div className="mb-3">
                        <label>Last name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Last name"
                            value={content.lname}
                            name="lname"
                            onChange={setdata}
                        />
                    </div>

                    <div className="mb-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            value={content.email}
                            name="email"
                            onChange={setdata}
                        />
                    </div>

                    <div className="mb-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={content.password}
                            name="password"
                            onChange={setdata}
                        />
                    </div>

                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary" onClick={updateuser}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}
