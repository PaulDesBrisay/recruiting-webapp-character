import { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts';
import {Attributes, Class} from './types'
import Character from './Character'
import CharacterEditor from './CharacterEditor';


function App() {
  const [num, setNum] = useState<number>(0);
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <div>
          <CharacterEditor/>
        </div>
      </section>
    </div>
  );
}



export default App;
