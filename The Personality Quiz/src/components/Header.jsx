import React from 'react';
import {Link} from "react-router-dom";

export default function Header() {
    return(
        
        <header>
            <h1>Which Element Are You?</h1>
            <p>based on completely random things</p>
            <nav>
                <Link to="/" id="Link">Home</Link>
                <Link to="/quiz" id="Link" >Quiz</Link>
            </nav>
        </header>


        
    )
}