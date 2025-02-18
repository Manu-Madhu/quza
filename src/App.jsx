import { useContext, useState } from 'react';
import { CiMicrophoneOn } from "react-icons/ci";
import { TbWritingSign } from "react-icons/tb";
import { datacontext } from './context/UserContext';
import speakimg from "./assets/speak.gif";
import aigif from "./assets/aiVoice.gif";
import va from "./assets/ai2.png";
import "./App.css";
import run from './gemini';

function App() {
  let { recognition, speaking, setSpeaking, prompt, response, setPrompt, setResponse } = useContext(datacontext);
  const [textPrompt, setTextPrompt] = useState('');
  const [isInput, setInput] = useState(false);
  const [error, setError] = useState('');

  const handleTextSubmit = async () => {
    if (textPrompt.trim() === '') {
      setError('Please enter a prompt before submitting.');
      return;
    }
    setError('');

    console.log(textPrompt)
    setPrompt("Processing...");
    setSpeaking(true);
    setResponse(false);

    // Simulate an API call or any async operation
    const newText = await run(textPrompt);
    console.log(newText)
    setPrompt(newText);
    setResponse(true)
    setTextPrompt("")
    setInput(false);
    setTimeout(() => {
      setSpeaking(false);
    }, 5000)
  };


  return (
    <div className='main'>

      <div className="star-field">
        <div className="layer"></div>
        <div className="layer"></div>
        <div className="layer"></div>
      </div>
      <img src={va} alt="" id="quza" className='object-contain h-60%] md:h-[60%] rounded-full shadow-lg shadow-white/10' />

      <div className='flex flex-col items-center gap-5 lg:gap-10'>
        <span>I'm Quza, Your Advanced Virtual Assistant</span>

        {!speaking ? (
          <div className='flex flex-col lg:flex-row gap-5 w-full items-center'>
            {!isInput ? (
              <div className='w-full flex flex-col lg:flex-row gap-4 items-center justify-center'>
                <button onClick={() => setInput(true)}>
                  Click here <TbWritingSign />
                </button>
                <button onClick={() => {
                  setPrompt("listening...");
                  setSpeaking(true);
                  setResponse(false);
                  recognition.start();
                }}>
                  Click here <CiMicrophoneOn />
                </button>
              </div>
            ) : (
              <div className='flex flex-col gap-4 w-full items-center'>
                <textarea
                  type="text"
                  className='w-full rounded focus:outline-none text-gray-300 p-2 bg-black border border-[#4fe0ea]'
                  value={textPrompt}
                  onChange={(e) => setTextPrompt(e.target.value)}
                  placeholder="Type your prompt here"
                />
                <button onClick={handleTextSubmit}>
                  Submit <TbWritingSign />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className='response'>
            {!response ? (
              <img src={speakimg} alt="" id="speak" />
            ) : (
              <img src={aigif} alt="" id="aigif" />
            )}
            <p className='lg:text-wrap text-xs lg:text-sm'>{prompt}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;