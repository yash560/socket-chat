import axios from 'axios';
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { setCurrentUser } from '../redux/slices/userSlice';
import { useDispatch } from 'react-redux';


function Login() {
    const dispatch=useDispatch();
    const [email, setEmail]=useState("");
  const [password, setPassword] = useState('');
  const nav=useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/user/login', {
        email,
        password,
      });
      console.log('Login successful', response);
      // Set the current user in Redux state
      localStorage.setItem('currUser', JSON.stringify(response.data.user));
      dispatch(setCurrentUser(response.data.user));
      nav('/');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
        <div className='authpage'>
        <h2>Login</h2>
        <input
          type="text"
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
        <button onClick={handleLogin}>Login</button>
        <div>
          <Link to='/signup'>Not registered? Signup now</Link>
        </div>
      </div>
    </div>
  )
}

export default Login;
