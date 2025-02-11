import React, { useState, useContext } from 'react';
import { UserContext } from './UserContext'; // importamos el userContext

export default function UserForm() {
  const [inputName, setInputName] = useState(''); // Creamos un estado para el nombre
  const { setName } = useContext(UserContext); // consumimos el contexto

  function handleSubmit(e) {
    e.preventDefault();
    setName(inputName);  // Set the name in context
    window.history.pushState({}, '', '/quiz');  // Change the URL without reloading the page
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);  // Dispatch a navigation event
  }

  return (
    // Add the form here
    <form onSubmit={handleSubmit}>
        <label>
            Name:
            <input 
            type='text'
            value={inputName}
            onChange={function(e){
                setInputName(e.target.value);
            }}
            ></input>
            <button type='submit' >Submit</button>
        </label>
    </form>
  );
}