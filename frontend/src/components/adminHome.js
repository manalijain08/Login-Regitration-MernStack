import React, { Component, useEffect, useState } from "react";
import { faEye, faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

export default function AdminHome({ userData }) {
    const [data, setData] = useState([]);
    useEffect(() => {
        getAllUser();
    }, []);

    const getAllUser = () => {
        fetch("http://localhost:5000/getAllUser", {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "userData");
                setData(data.data);
            });
    };

    const logOut = () => {
        window.localStorage.clear();
        window.location.href = "./sign-in";
    };
    const deleteUser = (id, name) => {
        if (window.confirm(`Are you sure you want to delete ${name}`)) {
            fetch("http://localhost:5000/deleteUser", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    userid: id,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    alert(data.data);
                    getAllUser();
                });
        }
    };

    return (
        <div className="auth-wrapper" style={{height:"900px"}}>
            <div className="auth-inner" style={{width:"auto"}}>
                <div className="adminPage">
                    <h1 className="admin">Welcome Admin</h1>
                    <table style={{ width: 500 }}>
                        <tbody>
                            <tr className="heading">
                                <th>Name</th>
                                <th>Email</th>
                                <th>User Type</th>
                                <th>Actions</th>
                            </tr>
                            {data.map((i) => {
                                return (
                                    <tr>
                                        <td>{i.fname}</td>
                                        <td>{i.email}</td>
                                        <td>{i.userType}</td>
                                        <td className="actions">
                                            <Link to={`view/${i._id}`}><button className="btn btn-success"><RemoveRedEyeOutlinedIcon /></button></Link>  <nbps />
                                            <Link to={`edit/${i._id}`}><button className="btn btn-primary"><EditIcon /></button></Link> <nbps />
                                            <button className="btn btn-danger" onClick={() => deleteUser(i._id, i.fname)}><DeleteOutlineIcon /></button>

                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>

                    </table> <br />
                    <button onClick={logOut} className="btn btn-primary">
                        Log Out
                    </button>
                </div>
            </div>
        </div>

    );
}