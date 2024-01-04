import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/userdashboard.css';

function Update() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [values, setValues] = useState({
        name: '',
        age: '',
        email: '',
        phoneNo: '',
        address: '',
        password: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:8081/readcustomer/${id}`)
            .then((res) => {
                const data = res.data[0];
                setValues({
                    ...values,
                    name: data.name,
                    age: data.Age,
                    email: data.Email,
                    phoneNo: data.phone_number,
                    address: data.address,
                    password: data.password
                });
            })
            .catch((err) => console.log("Error:", err));
    }, []); // Empty dependency array

    const handleUpdate = (event) => {
        event.preventDefault();
        console.log(values);
        axios.put(`http://localhost:8081/updatecustomer/${id}`, values)
            .then((res) => {
                console.log(res);
                window.history.back();
            })
            .catch((err) => console.log("Error found", err));
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    }

    return (
        <div className='edit-container'>
            <div className='edit-form-container'>
                <form onSubmit={handleUpdate}>
                    <h2>Update Customer Details</h2>
                    <div className='mb-2'>
                        <label htmlFor='name'>Name</label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            placeholder='Enter Name'
                            className='form-control'
                            onChange={handleInputChange}
                            value={values.name}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='age'>Age</label>
                        <input
                            type='text'
                            id='age'
                            name='age'
                            placeholder='Enter Age'
                            className='form-control'
                            onChange={handleInputChange}
                            value={values.age}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            placeholder='Enter Email'
                            className='form-control'
                            onChange={handleInputChange}
                            value={values.email}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='phoneNo'>Phone No.</label>
                        <input
                            type='text'
                            id='phoneNo'
                            name='phoneNo'
                            placeholder='Enter Phone No.'
                            className='form-control'
                            onChange={handleInputChange}
                            value={values.phoneNo}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='address'>Address</label>
                        <input
                            type='text'
                            id='address'
                            name='address'
                            placeholder='Enter Address'
                            className='form-control'
                            onChange={handleInputChange}
                            value={values.address}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='text'
                            id='password'
                            name='password'
                            placeholder='Enter Password'
                            className='form-control'
                            onChange={handleInputChange}
                            value={values.password}
                        />
                    </div>
                    <div className='updatebtns'>
                        <button onClick={()=>window.history.back()} className='btn btn-back'>Back</button>
                        <button className='btn btn-update'>Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Update;
