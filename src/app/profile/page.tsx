"use client";
import axios from 'axios';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      await axios("api/users/logout");
      router.push('/login');
    } catch(err: any) {
      console.log(err.message);
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <hr />
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2'
        onClick={logout}
      >Logout</button>
    </div>
  );
}

export default ProfilePage;
