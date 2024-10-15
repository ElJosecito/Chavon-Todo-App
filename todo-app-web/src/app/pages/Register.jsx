import React, { useState, useEffect } from 'react';

import { register } from '../../../api/auth';
import { useAuthStore } from '../../../store/auth';

//react hot toast
import { toast, Toaster } from 'react-hot-toast'

//react router
import { useNavigate, Link } from 'react-router-dom'

//frame motion
import { motion } from 'framer-motion'

function Register() {

  const navigate = useNavigate()

  const { setToken, setUser, setUserId } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await register(email, password, firstName, lastName);
    if (response.error) {
      setError(response.message);
      toast.error(response.message);
      setLoading(false);
      return;
    }

    if (response.status === 404) {
      setError(response.message);
      toast.error(response.message);
      setLoading(false);
      return;
    }

    setToken(response.token);
    setUser(response.user);
    setUserId(response.user.id);
    toast.success('Registered successfully');
    setTimeout(() => {
      navigate('/home')
    }, 1000)

  }

  return (
    <>
      <section className='w-full h-screen flex justify-center items-center'>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className='w-full max-w-md p-4 bg-white shadow-lg rounded-lg'>
          <h1 className='text-2xl font-bold text-center'>Register</h1>
          <form onSubmit={handleSubmit} className='mt-4'>
            <div className='mb-4'>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email</label>
              <input type='email' id='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
            </div>
            <div className='mb-4'>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password</label>
              <input type='password' id='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
            </div>
            <div className='mb-4'>
              <label htmlFor='firstName' className='block text-sm font-medium text-gray-700'>First Name</label>
              <input type='text' id='firstName' name='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)} className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
            </div>
            <div className='mb-4'>
              <label htmlFor='lastName' className='block text-sm font-medium text-gray-700'>Last Name</label>
              <input type='text' id='lastName' name='lastName' value={lastName} onChange={(e) => setLastName(e.target.value)} className='w-full px-3 py-2 mt-1 border border-gray-300
                rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
            </div>
            <div className='mb-4'>
              <button type='submit' className='w-full px-3 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md focus:outline-none focus:shadow-outline' disabled={loading}>
                {loading ? 'Loading...' : 'Register'}
              </button>
            </div>
            <div className='text-center'>
              <Link to='/' className='text-blue-500'>Login</Link>
            </div>
          </form>
        </motion.div>
      </section>
      <Toaster />
    </>
  )
}

export default Register