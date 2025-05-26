'use client'

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pin, setPin] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/customers`, {
        username,
        email,
        phone,
        address,
        pin,
        password,
      });
      console.log('Signup successful:', response.data);

      localStorage.setItem('userToken', response.data.token);
      localStorage.setItem('username', response.data.username);
      navigate('/'); // Redirect to home or desired page after signup
    } catch (error) {
      console.error('Signup error:', error.response ? error.response.data : error.message);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        <form>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            margin="normal"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            margin="normal"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            label="PIN"
            variant="outlined"
            fullWidth
            margin="normal"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-center mt-6">
            <Button
              variant="contained"
              onClick={handleSignUp}
              sx={{
                background: 'linear-gradient(to right, #41295a 0%, #2F0743 51%, #41295a 100%)',
                color: 'white',
              }}
            >
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
