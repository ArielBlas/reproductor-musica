import React from 'react';
import { render } from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'

import Main from "./components/Main";

render(
    <BrowserRouter>
        <Route path="/" component={Main}/>
    </BrowserRouter>, 
    document.getElementById('app')    
)

// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker
//         .register('./sw.js')
//         .then(() => {
//             console.log('Service worker registered!');
//         })
//         .catch((err) => {
//             console.log(err)
//         });
// }
