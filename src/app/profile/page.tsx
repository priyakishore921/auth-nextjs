"use client";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { useState } from 'react';

const ProfilePage = () => {
  const router = useRouter();
  const [data, setData] = useState('nothing');

  const logout = async () => {
    try {
      await axios("api/users/logout");
      router.push('/login');
    } catch(err: any) {
      console.log(err.message);
    }
  }

  const getUserDetails = async () => {
    const res = await axios.get('/api/me');
    console.log('user details ', res.data);
    setData(res.data.data.username);
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <h2 className="bg-blue-500 py-2 px-4 mt-4 rounded">
        { data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}
      </h2>
      <hr />
      <button
        className='bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2'
        onClick={getUserDetails}
      >Get user details</button>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2'
        onClick={logout}
      >Logout</button>
    </div>
  );
}

export default ProfilePage;
