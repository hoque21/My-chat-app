import React, { useRef, useState } from 'react';
import Header from '../components/Header';
import Message from '../components/Message';
import { auth, db } from '../firebase'; 
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, collection, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import FlipMove from 'react-flip-move'; // Import FlipMove for animations

const Homepage = () => {
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);
  const lastMessageDiv = useRef(null);

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim()) return; // Don't send empty messages

    try {
      await addDoc(collection(db, 'chats'), {
        sender: user?.displayName,
        message: input,
        time: serverTimestamp()
      });
      setInput("");
      scrollToBottom();
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again."); // Display error message
    }
  };

  const [messages, loading, error] = useCollection(
    query(collection(db, 'chats'), orderBy("time", "asc"))
  );

  const scrollToBottom = () => {
    lastMessageDiv.current.scrollIntoView({ behavior: "smooth" }); // Corrected function name and typo
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while messages are loading
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Show error message if there's an error
  }

  return (
    <div>
      <Header />
      <div className='max-w-2xl mx-auto mt-5'>
        <div className='p-5'>
          <FlipMove>
            {messages && messages.docs.map((doc) => (
              <Message
                key={doc.id} // Add key prop for optimization
                sender={doc.data().sender}
                message={doc.data().message}
                time={doc.data().time?.toDate().toLocaleString()}
              />
            ))}
          </FlipMove>

          <div ref={lastMessageDiv} className='mb-10'></div>
        </div>
        <form className='flex items-center justify-between space-x-2 w-96 fixed bottom-2'>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            className='flex-1 outline-none bg-gray-200 p-3 rounded-lg'
            type="text"
            placeholder='Enter a message...'
          />
          <button
            disabled={!input}
            onClick={sendMessage}
            className={`disabled:bg-gray-200 ${!input ? 'disabled:cursor-not-allowed' : ''} bg-green-400 hover:bg-green-500 text-sm text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105`}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Homepage;