'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

/*
1. add button disabled state
2. add loading state
3. configure Toaster
*/
const SignupPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: ""
  });

  const onSignup = async () => {
    try {
      const response = await axios.post('/api/users/signup', user);
      console.log("Signup success ", response.data);
      router.push('/login');
    } catch (err: any) {
      console.log('Signup failed ', err.message);
      toast.error(err.message);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster />
      <h1>Signup</h1>
      <hr />

      <label htmlFor='username'>username</label>
      <input
        className='border p-2 rounded-md mb-4 focus:outline-none focus:border-gray-300'
        id="username"
        value={user.username}
        onChange={e => setUser({...user, username: e.target.value})}
        placeholder='username'
      />

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

      <button
        className='border rounded p-2 mb-4 focus:outline-none focus:border-gray-400'
        onClick={onSignup}
      >
        Signup here
      </button>
      <Link href="/login">Visit login page</Link>
    </div>
  );
}

export default SignupPage;
