import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './Login.css';

import { AppContext } from '../../context/AppContext';
import { loginUser } from '../../Service/AuthService'; 

const Login = () => {
  const { setAuthData } = useContext(AppContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ fixed typo
    setLoading(true);

    try {
      const response = await loginUser(formData); // ✅ call API function
      if (response.status === 200) {
        toast.success('Login successful');
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);
        setAuthData(response.data.token, response.data.role);
        navigate('/dashbord');
      }
    } catch (error) {
      console.error(error);
      toast.error('Email/Password Invalid');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-light d-flex align-items-center justify-content-center vh-100 login-background'>
      <div className='card shadow-lg w-100' style={{ maxWidth: '480px' }}>
        <div className='card-body'>
          <div className='text-center'>
            <h1 className='card-title'>Sign in</h1>
            <p className='card-text text-muted'>
              Sign in below to access your account
            </p>
          </div>
          <div className='mt-4'>
            <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label htmlFor='email' className='form-label text-muted'>
                  Email address
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='yourname@example.com'
                  className='form-control'
                  onChange={handleChange}
                  value={formData.email}
                  required
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='password' className='form-label text-muted'>
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='********'
                  className='form-control'
                  onChange={handleChange}
                  value={formData.password}
                  required
                />
              </div>
              <div className='d-grid'>
                <button
                  type='submit'
                  className='btn btn-dark btn-lg'
                  disabled={loading}
                >
                  {loading ? 'Loading' : 'Sign in'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
