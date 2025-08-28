import './App.css'
import Sidebar from './Sidebar.jsx';
import ChatWindow from './ChatWindow.jsx';
import { MyContext } from './MyContext.jsx';
import { useState, useEffect } from 'react';
import { v1 as uuidv1 } from "uuid";
import LoginPage from './LoginPage.jsx'; // Make sure this path is correct

function App() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to set isAuthenticated to true after successful login
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  // Your existing state management for chat
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]); // stores chats of current thread
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]); // all chat histories

  // Whenever prevChats change, update allThreads
  useEffect(() => {
    // Only update allThreads if authenticated, to prevent issues before login
    if (isAuthenticated) {
      setAllThreads((threads) => {
        const others = threads.filter((t) => t.id !== currThreadId);
        return [...others, { id: currThreadId, chats: prevChats }];
      });
    }
  }, [prevChats, currThreadId, isAuthenticated]); // Added isAuthenticated to dependencies

  // Switch thread (to view old chat history)
  const loadThread = (threadId) => {
    setCurrThreadId(threadId);
    const found = allThreads.find((t) => t.id === threadId);
    if (found) {
      setPrevChats(found.chats);
      setNewChat(false);
    }
  };

  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setCurrThreadId,
    newChat, setNewChat,
    prevChats, setPrevChats,
    allThreads, setAllThreads,
    loadThread, // function to load chat history
  };

  return (
    <MyContext.Provider value={providerValues}>
      {isAuthenticated ? (
        // Render Sidebar and ChatWindow if authenticated
        <div className='app' style={{ display: 'flex', height: '100vh', width: '100vw' }}>
          <Sidebar />
          <ChatWindow />
        </div>
      ) : (
        // Render LoginPage if not authenticated
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      )}
    </MyContext.Provider>
  );
}

export default App;