import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './updateStyles.css';

function Update() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [values, setValues] = useState({
        suppliername: '',
        contactpersonname: '',
        email: '',
        phoneNum: '',
        address: '',
        password: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:8081/readsupplier/${id}`)
          .then((res) => {
            console.log(res.data);
            console.log(id);
            const data = res.data[0];
            setValues({
              ...values,
              suppliername: data.suppliername,
              contactpersonname: data.contactpersonname, 
              email: data.email, 
              phoneNum: data.phoneNum, 
              address: data.address, 
              password: data.password 
            });
          })
          .catch((err) => console.log("Error:", err));
      }, [id]); // Include 'id' as a dependency to trigger the effect when 'id' changes

    const handleUpdate = (event) => {
        event.preventDefault();
        console.log(values);
        axios.put(`http://localhost:8081/updatesupplier/${id}`, values)
            .then((res) => {
                console.log(res);
                navigate('/readsuppliers');
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
                    <h2>Update Supplier Details</h2>
                    <div className='mb-2'>
                        <label htmlFor='suppliername'>Supplier Name</label>
                        <input
                            type='text'
                            id='suppliername'
                            name='suppliername'
                            placeholder='Enter Product  Name'
                            className='form-control'
                            onChange={handleInputChange}
                            value={values.suppliername}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='contactpersonname'>Contact Person Name</label>
                        <input
                            type='text'
                            id='contactpersonname'
                            name='contactpersonname'
                            placeholder='Enter Name'
                            className='form-control'
                            onChange={handleInputChange}
                            value={values.contactpersonname}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            placeholder='Enter email'
                            className='form-control'
                            onChange={handleInputChange}
                            value={values.email}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='phoneNum'>Phone Number</label>
                        <input
                            type='text'
                            id='phoneNum'
                            name='phoneNum'
                            placeholder='Enter Phone Number'
                            className='form-control'
                            onChange={handleInputChange}
                            value={values.phoneNum}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='address'>Address</label>
                        <input
                            type='text'
                            id='address'
                            name='address'
                            placeholder='Enter address'
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
                    <button className='btn btn-success'>Update</button>
                </form>
            </div>
        </div>
    );
}

export default Update;
