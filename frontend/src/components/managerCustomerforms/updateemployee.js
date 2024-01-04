import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './updateStyles.css';

function Update() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [values, setValues] = useState({
        name: '',
        email: '',
        position: '',
        phoneNo: '',
        address: '',
        hiredate: '',
        salary: '',
        password: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:8081/reademployee/${id}`)
          .then((res) => {
            console.log(res.data);
            console.log(id);
            const data = res.data[0];
            setValues({
              ...values,
              name: data.name,
              email: data.email, 
              position: data.position, 
              phoneNo: data.phoneNo, 
              address: data.address, 
              hiredate: data.hiredate, 
              salary: data.salary, 
              password: data.password 
            });
          })
          .catch((err) => console.log("Error:", err));
      }, [id]); // Include 'id' as a dependency to trigger the effect when 'id' changes

    const handleUpdate = (event) => {
        event.preventDefault();
        console.log(values);
        axios.put(`http://localhost:8081/updateemployee/${id}`, values)
            .then((res) => {
                console.log(res);
                navigate('/reademployees');
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
                    <h2>Update Employee Details</h2>
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
                        <label htmlFor='position'>Position</label>
                        <input
                            type='position'
                            id='position'
                            name='position'
                            placeholder='Enter Position'
                            className='form-control'
                            onChange={handleInputChange}
                            value={values.position}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='phoneNo'>Phone No.</label>
                        <input
                            type='number'
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
                        <label htmlFor='password'>Hire Date</label>
                        <input
                            type='date'
                            id='hiredate'
                            name='hiredate'
                            placeholder='Enter Hidate'
                            className='form-control'
                            onChange={handleInputChange}
                            value={values.hiredate}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='password'>Salary</label>
                        <input
                            type='number'
                            id='salary'
                            name='salary'
                            placeholder='Enter Salary'
                            className='form-control'
                            onChange={handleInputChange}
                            value={values.salary}
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
