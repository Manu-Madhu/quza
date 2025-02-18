import { useContext } from 'react'
import { CiMicrophoneOn } from "react-icons/ci";
import { TbWritingSign } from "react-icons/tb";
import { datacontext } from './context/UserContext';
import speakimg from "./assets/speak.gif"
import aigif from "./assets/aiVoice.gif"
import va from "./assets/ai.png"
import "./App.css"

function App() {
  let { recognition, speaking, setSpeaking, prompt, response, setPrompt, setResponse } = useContext(datacontext)

  return (
    <div className='main'>
      <img src={va} alt="" id="quza" />

      <div className='flex  flex-col items-center gap-5 mt-5'>

        <span>I'm Quza,Your Advanced Virtual Assistant</span>

        {!speaking ?
          <div className='flex flex-col lg:flex-row gap-5'>
            <button onClick={() => {
              setPrompt("listening...")
              setSpeaking(true)
              setResponse(false)
              recognition.start()
            }}>Click here <TbWritingSign /></button>
            <button onClick={() => {
              setPrompt("listening...")
              setSpeaking(true)
              setResponse(false)
              recognition.start()
            }}>Click here <CiMicrophoneOn /></button>
          </div>
          :
          <div className='response'>
            {!response ?
              <img src={speakimg} alt="" id="speak" />
              :
              <img src={aigif} alt="" id="aigif" />}
            <p>{prompt}</p>
          </div>
        }

      </div>
    </div>
  )
}

export default App
