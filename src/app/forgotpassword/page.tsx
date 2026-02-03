"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const ForgotPasswordPage = () => {
  const  router = useRouter();
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [token, setToken] = useState("");
  // const [resetPassword, setResetPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const sendEmail = async () => {
    try {
      await axios.post('/api/users/forgotpassword', { email });
      setEmail("");
      setEmailSent(true);
    } catch (err: any) {
      console.log(err.response.data);

    }
  }

  const updatePassword = async () => {
    try {
      await axios.post("/api/users/resetpassword/", {password, token});
      router.push('/login');
    } catch (err: any) {
      console.log(err.response.data);
    }
  }

  useEffect(() => {
    const token = window.location.search.split("=")[1];
    if (token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setToken(token);
      setEmail("");
      setEmailSent(false);
    }
  }, []);

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      {
        token ? (
          <div className='flex flex-col'>
            <label htmlFor='password'>Password</label>
            <input
              id="password"
              className='border rounded m-2 py-2 px-4 hover:border-gray-400'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

             <label htmlFor='confirm-password'>Confirm password</label>
            <input
              className='border rounded m-2 py-2 px-4 hover:border-gray-400'
              id="confirm-password"
              type="password"
              value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

            <button className='bg-blue-600 py-2 px-4 rounded hover:bg-blue-500 text-white' onClick={updatePassword}>Submit</button>
          </div>
        ) : (
          <>
            <label htmlFor="email">Enter email</label>
      <input
        id="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className='border rounded m-2 py-2 px-4 hover:border-gray-400'
      />
      <button
        className='bg-blue-600 py-2 px-4 rounded hover:bg-blue-500 text-white'
        onClick={sendEmail}
      >Send Email</button>
          </>
        )
      }
      {
        emailSent && (
          <>
            <p>Please check your inbox for the email</p>
          </>
        ) 
      }
    </div>
  )
}

export default ForgotPasswordPage;
