import React, { forwardRef } from 'react';
import { auth } from '../firebase'; 
import { useAuthState } from "react-firebase-hooks/auth";

const Message = forwardRef(({ sender, message, time }, ref) => {
    const [user] = useAuthState(auth);

    return (
        <div ref={ref} className={`${
            sender === user?.displayName
            ? 'w-fit bg-blue-300 min-w-[120px] p-2 rounded-lg relative mt-10 text-right ml-auto'
            : 'w-fit bg-blue-300 min-w-[120px] p-2 rounded-lg relative mt-10 text-left'
        }`}>
            <p className='text-sm absolute -top-5'>{sender}</p>
            <p>{message}</p>
            <p className='text-xs'>{time}</p>
        </div>
    );
});

export default Message;
