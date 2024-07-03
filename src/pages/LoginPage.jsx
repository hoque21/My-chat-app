import { signInWithPopup } from 'firebase/auth';
import React from 'react';
import { auth, provider } from '../firebase'; // Update the import path

const LoginPage = () => {
  const signInUser = () => {
    signInWithPopup(auth, provider)
      .catch((err) => alert(err.message));
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <div className="text-2xl text-center font-bold mb-4">My Chat App</div>
        <button onClick={signInUser} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
