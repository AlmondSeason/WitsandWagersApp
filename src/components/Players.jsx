import { useState, useEffect } from 'react';
import Input from './Input';
import SilentCartographer from '.././services/SilentCartographer';

const Players = (params) =>
{
    const [players, setPlayers] = useState([]);

    const getData = () =>
    {
        setPlayers(params.players);
    }
    useEffect(getData, [params.players]);

    const createPlayerList = (v) =>
    {
        return (
            <span key={v.id} style={{ margin: "2px", display: "table-cell", backgroundColor: random_rgba(), color: "white", padding: "0.5em", borderRadius: "8px" }}>
                <span style={{ display: "table-cell", backgroundColor: "white", color: "black", padding: "2px" }} > {v.name}: </span>
                <span style={{ display: "table-cell", backgroundColor: "white", color: "black", padding: "2px" }} > ${v.money} </span>
                <Input type="submit" value="x" onClickFunc={() => { deletePlayers(v); }} />
            </span>
        )
    }

    function random_rgba()
    {
        var o = Math.round, r = Math.random, s = 255;
        return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + 1 + ')';
    }

    const addplayerstoDB = (csl) =>
    {
        let arr = (csl.split(","));
        let JSONSTRING = "";
        arr.forEach(v =>
        {
            JSONSTRING += '{"name":' + '"' + v + '"' + ', "money": 1000 }';
        });

        const JSONOBJ = JSON.parse(JSONSTRING);
        SilentCartographer.newPlayers(JSONOBJ)
            .then(response =>
            {

            });
    }

    const deletePlayers = (v) =>
    {
        return SilentCartographer.delPlayers(v).then(() => { params.update(); });
    }

    if (!players)
    {
        return (
            <div style={{ fontSize: "20px" }}>
                <section style={{ color: "white", backgroundColor: "black", padding: "1em" }}>
                    <Input id="newplayerslist" label="Add players here, one at a time: " type="text" />
                    <Input type="submit" noReload={true} onClickFunc={() => { addplayerstoDB(document.getElementById("newplayerslist").value); params.update(); }} styler={{ color: "white", backgroundColor: "black", padding: "1em" }} />
                </section>
                NO PLAYERS LOADED YET
            </div>
        )
    }
    else
    {
        return (
            <div style={{ fontSize: "20px" }}>
                <section style={{ color: "white", backgroundColor: "black", padding: "1em", backgroundImage: "url('" + '././12345.jfif' + "') "}}>
                    <Input styler={{ backgroundColor: "black"}} id="newplayerslist" label="Add players here, one at a time: " type="text" />
                    <Input type="submit" onClickFunc={() => { addplayerstoDB(document.getElementById("newplayerslist").value); params.update(); }} styler={{ color: "white", padding: "1em" }} />
                </section>
                <span> {players.map((v) => { return createPlayerList(v); })} </span>
            </div>
        )
    }

}
export default Players