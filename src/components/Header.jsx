import React from "react";
import { auth } from '../firebase'; // Ensure correct import path

import { useAuthState } from "react-firebase-hooks/auth";

const Header = () => {

  const [user] = useAuthState(auth);
  
  const handleSignOut = (e) => {
    e.preventDefault(); // Prevent default behavior
    
    if (auth.currentUser) {
      auth.signOut(); // Call signOut() method on the currentUser if it exists
    }
  };

  return (
    <div className="flex items-center justify-between p-5 shadow-lg sticky top-0 bg-white z-10">
      <h1 className="text-3xl font-bold text-blue-400">MyChatApp</h1>
      <img
        onClick={(e) => handleSignOut(e)} // Pass the event parameter e to handleSignOut
        src={user?.photoURL}
        className="h-10 w-10 rounded-full cursor-pointer"
        alt="profile"
      />
    </div>
  );
};

export default Header;
