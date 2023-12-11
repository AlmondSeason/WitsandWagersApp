import Players from './components/Players';
import Questions from './components/Questions';
import Trivia from './components/Trivia';
import Probability from './components/Probability';
import { useState, useEffect } from 'react';
import SilentCartographer from './services/SilentCartographer';

const App = () =>
{
    const [players, setPlayers] = useState([]);

    const getData = () =>
    {
        SilentCartographer.getPlayers()
            .then(data =>
            {
                setPlayers(data);
                console.log("updating...")
            });
    }
    // use this if you want constant updates and flashing colors
    //useEffect(getData, [players]);
    // use this if you want to use rely on passing getData down to children
    useEffect(getData, []);

    return (
        <div style={{ fontFamily: "math", color: "black", }}>
            <div style={{}}>
                <div style={{ color: "black" }}>
                    <Players players={players} update={getData} />
                </div>
                <Questions />
                <div style={{ backgroundColor: "brown", borderRadius: "8px", width: "fit-content", padding: "2px", float: "left" }}>
                    <Trivia players={players} update={getData} />
                </div>
                <div style={{ backgroundColor: "brown", borderRadius: "8px", width: "fit-content", padding: "2px", float: "right" }}>
                    <Probability players={players} update={getData} />
                </div>
            </div>
        </div>
    )
}
export default App