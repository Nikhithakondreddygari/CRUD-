import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Create() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    age: '',
    gender: ''
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    // Convert age to number
    const data = { ...values, age: parseInt(values.age) };

    axios.post('http://13.232.173.163:5000/add_user', data)
      .then((res) => {
        if (res.data.success) {
          console.log('Student added:', res.data);
          navigate('/');
        } else {
          setError(res.data.message || 'Failed to add student');
        }
      })
      .catch((err) => {
        console.error('Error adding student:', err);
        setError('Failed to add student: ' + err.message);
      });
  }

  return (
    <div className='container vh-100 vw-100 bg-primary'>
        <div className='row'>
            <h3>Add Student</h3>
            <div className='d-flex justify-content-end'>
                <Link to='/' class='btn btn-success'>Home</Link>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='form-group my-3'>
                    <label htmlFor='name'>Name</label>
                    <input type='text' name='name' required onChange={(e)=> setValues({...values, name: e.target.value})} />
                </div>
                <div className='form-group my-3'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' required onChange={(e)=> setValues({...values, email: e.target.value})} />
                </div>
                <div className='form-group my-3'>
                    <label htmlFor='gender'>Gender</label>
                    <input type='text' name='gender' required onChange={(e)=> setValues({...values, gender: e.target.value})} />
                </div>
                <div className='form-group my-3'>
                    <label htmlFor='age'>Age</label>
                    <input type='number' name='age' required onChange={(e)=> setValues({...values, age: e.target.value})} />
                </div>
                <div className='form-group my-3'>
                    <button type='submit' className='btn btn-success'>Save</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Create
