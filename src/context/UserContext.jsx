import { createContext, useState } from 'react'
import run from '../gemini';
export const datacontext = createContext()

function UserContext({ children }) {
    let [speaking, setSpeaking] = useState(false)
    let [prompt, setPrompt] = useState("listening...")
    let [response, setResponse] = useState(false)

    function speak(text) {
        let text_speak = new SpeechSynthesisUtterance(text)
        text_speak.volume = 1;
        text_speak.rate = 1;
        text_speak.pitch = 1;
        text_speak.lang = "hi-GB"
        window.speechSynthesis.speak(text_speak)
    }
    // async function aiResponse(prompt) {
    //     let text = await run(prompt)
    //     let newText = text.split(" ") && text.split(" ") && text.replace("google", "Qmark technolabs") && text.replace("Google", "Qmark technolabs")
    //     setPrompt(newText)
    //     speak(newText)
    //     setResponse(true)
    //     setTimeout(() => {
    //         setSpeaking(false)
    //     }, 5000)
    // }


    async function aiResponse(prompt) {
        let text = await run(prompt);
        let newText = text
            .replace("google", "Qmark technolabs")
            .replace("Google", "Qmark technolabs");

        setPrompt(newText);
        setResponse(true);

        // Create speech synthesis object
        let text_speak = new SpeechSynthesisUtterance(newText);
        text_speak.volume = 1;
        text_speak.rate = 1;
        text_speak.pitch = 1;
        text_speak.lang = "hi-GB";

        // Set event listener to detect when speech is complete
        text_speak.onend = () => {
            setSpeaking(false); // Only stop speaking after speech ends
        };

        window.speechSynthesis.speak(text_speak);
    }


    let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    let recognition = new speechRecognition()
    recognition.onresult = (e) => {
        let currentIndex = e.resultIndex
        let transcript = e.results[currentIndex][0].transcript
        setPrompt(transcript)
        takeCommand(transcript.toLowerCase())
    }

    function takeCommand(command) {
        if (command.includes("open") && command.includes("youtube")) {
            window.open("https://www.youtube.com/", "_blank")
            speak("opening Youtube")
            setResponse(true)
            setPrompt("opening Youtube...")
            setTimeout(() => {
                setSpeaking(false)
            }, 5000)
        } else if (command.includes("open") && command.includes("google")) {
            window.open("https://www.google.com/", "_blank")
            speak("opening google")
            setResponse(true)
            setPrompt("opening google...")
            setTimeout(() => {
                setSpeaking(false)
            }, 5000)
        } else if (command.includes("open") && command.includes("instagram")) {
            window.open("https://www.instagram.com/", "_blank")
            speak("opening instagram")
            setResponse(true)
            setPrompt("opening instagram...")
            setTimeout(() => {
                setSpeaking(false)
            }, 5000)
        } else if (command.includes("time")) {
            let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" })
            speak(time)
            setResponse(true)
            setPrompt(time)
            setTimeout(() => {
                setSpeaking(false)
            }, 5000)
        }
        else if (command.includes("date")) {
            let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" })
            speak(date)
            setResponse(true)
            setPrompt(date)
            setTimeout(() => {
                setSpeaking(false)
            }, 5000)
        }
        else {
            aiResponse(command)
        }
    }

    let value = {
        recognition,
        speaking,
        setSpeaking,
        prompt,
        setPrompt,
        response,
        setResponse
    }
    return (
        <div>
            <datacontext.Provider value={value}>
                {children}
            </datacontext.Provider>
        </div>
    )
}

export default UserContext
