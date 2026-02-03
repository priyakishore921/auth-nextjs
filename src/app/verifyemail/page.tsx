"use client";
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const VerifyEmailPage = () => {

  const [token, setToken] = useState("");
  const [error, setError] = useState(false);
  const [verified, setVerified] = useState(false);

  const verifyEmail = async () => {
    try {
      await axios.post('/api/users/verifyemail', { token});
      setVerified(true);
    } catch (err: any) {
      // console.log('error ',err.response.data);
      setError(true);
    }
  }

  useEffect(() => {
    const token  = window.location.search.split("=")[1];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToken(token);
  }, []);

  useEffect(() => {
    if (token?.length > 0) {
      verifyEmail();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Verify Email</h1>
      {
        token ? token : "invalid url"
      }
      {
        verified && (
          <div>
            Your email has been verified!!
            <Link href="/login">Login</Link>
          </div>
        )
      }
       {
        error && (
          <div>
            <h2>Error</h2>
            <h3 className='bg-red-500 p-4 text-white'>{error}</h3>
          </div>
        )
      }
    </div>
  );
}

export default VerifyEmailPage;
