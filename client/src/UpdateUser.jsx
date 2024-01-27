import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function UpdateUser() {
    const { id } = useParams()

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [age, setAge] = useState()
    const navigate = useNavigate()


    useEffect(() => {
        axios.get('http://localhost:5000/getUser/' + id)
            .then(result => {

                console.log(result)
                setName(result.data.name)
                setEmail(result.data.email)
                setAge(result.data.age)
            }).catch(err => console.log(err))
    }, [])


    const update = (e) => {
        e.preventDefault();

        axios.put('http://localhost:5000/u/' + id, { id, name, email, age })
            .then(result => {
                console.log(result);
                navigate('/');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center '>
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={update}>
                    <h2>Add User</h2>
                    <div className="mb-2">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" placeholder='Enter your name...' className='form-control' value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email">Email:</label>
                        <input type="text" id="email" placeholder='Enter your email...' className='form-control' value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="age">Age:</label>
                        <input type="text" id="age" placeholder='Enter your age...' className='form-control' value={age}
                            onChange={(e) => setAge(e.target.value)} />
                    </div>
                    <button className='btn btn-success'>Update</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateUser