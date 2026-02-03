'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

/**
 * add disable logic to Login button
 * add loading state
 * get rid of any types
 */
const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
    try {
      const response = await axios.post('/api/users/login', user);
      console.log(response);
      router.push('/profile');
    } catch (err: any) {
      toast.error('Could not login ', err.message);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Login</h1>
      <hr />

      <label htmlFor='email'>email</label>
      <input
        className='border p-2 rounded-md mb-4 focus:outline-none focus:border-gray-400'
        id="email"
        value={user.email}
        onChange={e => setUser({...user, email: e.target.value})}
        placeholder='email'
      />

      <label htmlFor='password'>password</label>
      <input
        className='border p-2 rounded-md mb-4 focus:outline-none focus:border-gray-400'
        id="password"
        value={user.password}
        onChange={e => setUser({...user, password: e.target.value})}
        placeholder='password'
        type='password'
      />
      <Link
        href="/forgotpassword"
        className='text-xs mb-2 flex justify-end underline'
      >Forgot password</Link>

      <button
        className='rounded p-2 mb-4 focus:outline-none focus:bg-blue-400 bg-blue-500 text-white cursor-pointer'
        onClick={onLogin}
      >
        Login here
      </button>
      <Link href="/signup">Visit Signup page</Link>
    </div>
  );
}

export default LoginPage;
