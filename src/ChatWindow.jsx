import "./ChatWindow.css";
import LoginPage from "./LoginPage.jsx";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState, useEffect, useRef } from "react";
import { ScaleLoader } from "react-spinners";
import { Moon, Sun, Mic, MicOff, User, Search, Image, Paperclip } from "lucide-react";

function ChatWindow() {
    
  const { prompt, setPrompt, setReply, currThreadId, prevChats, setPrevChats } =
    useContext(MyContext);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // 🌙 Dark / Light mode state
  const [darkMode, setDarkMode] = useState(false);

  // 🎤 Voice input state
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  // 🔊 Voice output
  const synthRef = useRef(window.speechSynthesis);

  // ✅ Toggle dark theme on <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const API_BASE = import.meta.env.VITE_API_URL;

  // 🎤 Setup Speech Recognition (STT)
  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setPrompt(transcript);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }
  }, [setPrompt]);

  // 🎤 Toggle mic
  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  // 🔊 Speak assistant reply
  const speak = (text) => {
    if (!text || !synthRef.current) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    synthRef.current.cancel();
    synthRef.current.speak(utterance);
  };

  const getReply = async () => {
    if (!prompt.trim() || loading) return;

    setPrevChats((prevChats) => [
      ...prevChats,
      {
        role: "user",
        content: prompt,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

    setLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: prompt, threadId: currThreadId }),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const res = await response.json();
      console.log("✅ Server response:", res);

      setPrevChats((prevChats) => [
        ...prevChats,
        {
          role: "assistant",
          content: res.reply,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);

      setReply(res.reply);
      speak(res.reply);
    } catch (err) {
      console.error("❌ Chat Request Failed:", err.message);
      setPrevChats((prevChats) => [
        ...prevChats,
        {
          role: "assistant",
          content: "⚠️ Could not connect to the server.",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setErrorMsg(
        "⚠️ Could not connect to the server. Make sure the backend is running."
      );
    } finally {
      setPrompt("");
      setLoading(false);
    }
  };

  return (
    <div className="chatWindow bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 min-h-screen">
      {/* Navbar */}
      <div className="navbar flex justify-between items-center px-4 py-2 bg-white dark:bg-gray-800 shadow relative">
        {/* Left: Logo + Title */}
        <div className="navbar-left flex items-center gap-2">
          <img
            src="src/new.jpg"
            alt="Logo"
            className="navbar-logo w-8 h-8 rounded"
          />
          <span className="navbar-title font-semibold">
            PersonalAI
            <i className="fa-solid fa-chevron-down dropdown-icon ml-1"></i>
          </span>
        </div>

        {/* Right: Dark mode + Chat History + User */}
        <div className="flex items-center space-x-3">
          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-800" />
            )}
          </button>

          {/* Chat History button (Search) */}
          <button
            onClick={() => setIsHistoryOpen(!isHistoryOpen)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* User icon (Admin) */}
          <button
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            <User className="w-5 h-5" />
          </button>
        </div>

        {/* Dropdown under user icon */}
        {isOpen && (
          <div className="dropDown bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md absolute right-4 top-12 rounded-lg overflow-hidden z-50">
            <div className="dropDownItem px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              <i className="fa-solid fa-gear mr-2"></i> Settings
            </div>
            <div className="dropDownItem px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              <i className="fa-solid fa-cloud-arrow-up mr-2"></i> Upgrade
            </div>
            <div className="dropDownItem px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              <i className="fa-solid fa-arrow-right-from-bracket mr-2"></i> Log out
            </div>
          </div>
        )}

        {/* Chat History dropdown */}
        {isHistoryOpen && (
          <div className="dropDown bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md absolute right-20 top-12 rounded-lg overflow-hidden z-50 max-h-60 overflow-y-auto w-64">
            {prevChats.length === 0 ? (
              <div className="px-4 py-2 text-gray-500 dark:text-gray-400">
                No chat history
              </div>
            ) : (
              prevChats
                .slice()
                .reverse()
                .map((chat, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 border-b dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <strong>{chat.role === "user" ? "You" : "AI"}:</strong>{" "}
                    {chat.content}
                  </div>
                ))
            )}
          </div>
        )}
      </div>

      {/* Chat Area */}
      <div className="chatArea p-4">
        <Chat messages={prevChats} />
        {loading && (
          <div className="loader-overlay flex flex-col items-center mt-4">
            <ScaleLoader color="#4cafef" loading={loading} />
            <p className="loading-text mt-2">Thinking...</p>
          </div>
        )}
      </div>

      {/* Chat Input */}
      <div className="chatInput flex items-center gap-2 p-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <input
          type="text"
          placeholder="Ask anything"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && getReply()}
          className="flex-1 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 outline-none"
        />

        {/* 🖼️ Image upload button */}
        <button
          onClick={() => alert("Image upload functionality coming soon!")}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-600"
        >
          <Image />
        </button>

        {/* 📎 File upload button */}
        <button
          onClick={() => alert("File upload functionality coming soon!")}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-600"
        >
          <Paperclip />
        </button>

        {/* 🎤 Mic button */}
        <button
          onClick={toggleRecording}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-600"
          style={{ color: isRecording ? "red" : "inherit" }}
        >
          {isRecording ? <MicOff /> : <Mic />}
        </button>

        {/* Send button */}
        <button
          id="submit"
          onClick={getReply}
          disabled={loading}
          className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
          style={{ opacity: loading ? 0.6 : 1 }}
        >
          {loading ? (
            <i className="fa-solid fa-spinner fa-spin"></i>
          ) : (
            <i className="fa-solid fa-paper-plane"></i>
          )}
        </button>
      </div>

      {errorMsg && (
        <p className="info text-red-500 text-center mt-2">{errorMsg}</p>
      )}

      <p className="info text-center text-sm text-gray-700 dark:text-gray-300 py-2">
        ⚠️ PersonalAI can make mistakes. Check important info. See Cookie
        Preferences.
      </p>
    </div>
  );
}

export default ChatWindow;