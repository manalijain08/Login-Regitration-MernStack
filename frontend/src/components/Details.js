import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CardContent from '@mui/material/CardContent';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Link, useParams } from "react-router-dom";

const Details = () => {

    const [getuserdata, setUserdata] = useState([]);
    console.log(getuserdata);

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
            setUserdata(data)
            console.log("get data");
        }
    }

    useEffect(() => {
        getdata();
    }, []);

    return (
        <div className="auth-wrapper">
            <div className="auth-inner" style={{width:"auto"}}>
                <div className='container mt-3'>
                    <Link to={'/adminHome'}>Back</Link>
                    <h1 style={{ fontweight: 400 }}>View Details</h1>
                    <Card sx={{ maxWidth: 700 }}>
                        <CardContent>
                            {/* <div className='add_btn'>
                       <button className='btn btn-primary mx-2'><EditIcon/></button>
                       <button className='btn btn-danger'><DeleteOutlineIcon/></button>
                    </div> */}

                            <div className="view">
                                <h3 className='mt-3'>First Name: <span>{getuserdata.fname}</span></h3>
                                <h3>Last Name: <span>{getuserdata.lname}</span></h3>
                                <p> UserType: <span>{getuserdata.userType}</span></p>
                                <p><MailOutlineIcon /> Email: <span>{getuserdata.email}</span></p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>

    )
}

export default Details