import React from 'react';
import './App.scss';
import Carousel from './components/Carousel/Carousel';

import characters from '../src/assets/images/characters.jpg';
import lifeSucks from '../src/assets/images/life-sucks.gif';
import openning from '../src/assets/images/opening.jpg';
import finnAndJake from '../src/assets/images/finn-and-jake.jpg';

function App() {
    return (
        <div className="App">
            <Carousel
                type="image--carousel"
                // images={[openning, lifeSucks, characters, finnAndJake]}
                images={[
                    'https://unsplash.it/1280/768',
                    'https://unsplash.it/1281/768',
                    'https://unsplash.it/1282/768',
                    'https://unsplash.it/1283/768'
                ]}
            />
            <button onClick={() => alert('button works!')} >Click me!</button>
        </div>
    );
}

export default App;
