import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail]=useState("");
  const [password, setPassword] = useState('');
  const nav=useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post('http://localhost:5000/api/user/signup', {
        name,
        email,
        password,
      });
      console.log('User registered successfully');
      nav('/login');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div>
      <div>
        <h2>Signup</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSignup}>Signup</button>
      </div>
    </div>
  );
}

export default Signup;
