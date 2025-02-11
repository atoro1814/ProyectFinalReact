
import React from 'react';


import Header from "./components/Header";
import {Routes, Route} from 'react-router-dom';

import UserForm from './components/UserForm';
import Question from './components/Question';
import Results from './components/Results';
import { useState, useEffect } from 'react';
import { UserProvider } from './components/UserContext';






function App() {

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [userName, setUserName] = useState("");
  const [element, setElement] = useState(""); 
  const [artwork, setArtwork] = useState(null);

  const questions = [
    {
      question: "What is your favorite color?",
      options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
    },
    {
      question: "What weather do you prefer?",
      options: ["Sunny 🌞", "Rain 🌧️", "Snowy ❄️", "Windy 🌬️"],
    },
    {
      question: "What type of vacation do you prefer?",
      options: ["On the beach 🏖️", "In the mountains 🏞️", "Jungle adventure 🏕️", "In the air 🪂"],
    },
    {
      question: "What activity do you like the most?",
      options: ["Cooking 🔥", "Swimming 🏊‍♂️", "Mountain climbing 🧗‍♂️", "Paragliding 🪂"],
    },
  ];
  
  const elements = {
    "Red 🔴": "Fire",
    "Blue 🔵": "Water",
    "Green 🟢": "Earth",
    "Yellow 🟡": "Air",
    "Sunny 🌞": "Fire",
    "Rain 🌧️": "Water",
    "Snowy ❄️": "Earth",
    "Windy 🌬️": "Air",
    "On the beach 🏖️": "Water",
    "In the mountains 🏞️": "Earth",
    "Jungle adventure 🏕️": "Fire",
    "In the air 🪂": "Air",
    "Cooking 🔥": "Fire",
    "Swimming 🏊‍♂️": "Water",
    "Mountain climbing 🧗‍♂️": "Earth",
    "Paragliding 🪂": "Air",
  };
  
  const keywords = {
    Fire: "fire",
    Water: "water",
    Earth: "earth",
    Air: "air",
  };
  
  
  function handleAnswer(answer) {
    setAnswers([...answers, answer]);  // Agrega la respuesta seleccionada al arreglo de respuestas
    setCurrentQuestionIndex(currentQuestionIndex + 1);  // Avanza al índice de la siguiente pregunta
  };

  function handleUserFormSubmit(name) {
    setUserName(name);
  };
  
 

  function determineElement(answers) {
    const counts = {};  // Objeto para contar las respuestas por elemento
    answers.forEach(function(answer) {
      const element = elements[answer];  // Obtiene el elemento correspondiente a la respuesta
      counts[element] = (counts[element] || 0) + 1;  // Cuenta cuántas veces se ha seleccionado cada elemento
    });
    return Object.keys(counts).reduce(function(a, b) {
      return counts[a] > counts[b] ? a : b  // Devuelve el elemento con más respuestas
    });
  };


  async function fetchArtwork(keyword) {
    try {
      const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${keyword}`);
      const data = await response.json();

      if(data.objectIDs && data.objectIDs.length > 0){
        const randomIndex = Math.floor(Math.random() * data.objectIDs.length);
        const objectID = data.objectIDs[randomIndex];

        const objectResponse = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);
        const objectData = await objectResponse.json();
        setArtwork(objectData);
      }else{
        setArtwork(null);

      }

    } catch (error) {
      setArtwork(null);
    }

      
 
  };
  



  useEffect(
    function () {
      if (currentQuestionIndex === questions.length) {
        const selectedElement = determineElement(answers); // Determina el elemento basado en las respuestas
        setElement(selectedElement); // Establece el elemento en el estado
        fetchArtwork(keywords[selectedElement]);  
      }
    },
    [currentQuestionIndex]
  );

  return (
    <div>

      <Header/>
      <UserProvider>
        <Routes>
          <Route path="/" exact element={<UserForm onSubmit={handleUserFormSubmit}/>} />
          <Route
            path="/quiz"
            element={
              currentQuestionIndex < questions.length ? (
                <Question question={questions[currentQuestionIndex].question} options={questions[currentQuestionIndex].options} onAnswer={handleAnswer} />
              ) : (
                <Results element={element} artwork={artwork} />
              )
            }
          
          />
        </Routes>
      </UserProvider>
        
      

      


    </div>

        

    
   
    
  )
}

export default App
