import { useState, useEffect } from 'react';
import Input from './Input';
import SilentCartographer from '.././services/SilentCartographer';

const Trivia = (params) =>
{
    const [players, setPlayers] = useState([]);
    const [winningMult, setWinningMult] = useState(0);
    const stringTrivBet = "TrivBet";
    const probabilityBoardWidth = 900;

    const getData = () =>
    {
        setPlayers(params.players);
    }
    useEffect(getData, [params.players]);

    const makePlayerOptions = (id) =>
    {
        let obj = players.map((v) =>
        {
            return <div key={v.id + id}> <Input styler={{ float: "right", borderStyle: "inset", width: "98%", height: "98%", textAlign: "end"}} id={stringTrivBet + v.name + id} type="number" label={v.name+": "} name={stringTrivBet} /> </div>
        })
        return obj;
    }

    const makeWinButton = (id) =>
    {
        return (
            <td style={{ textAlign: "center" }}> <Input styler={{ fontSize: "48px" }} id={id} noReload={true} type="submit" value="Winning Bet" onClickFunc={() => { calculateTrivia(id) }} onChangeFunc={(x, y) => { return x * y }}  /> </td>
        )
    }

    const makeBettingCellHeaders = (innerText, backgroundColor) =>
    {
        return (
            <td style={{ color: "white", backgroundColor: backgroundColor, height: "150px", borderStyle: "inset", textAlign: "end" }}>
                <Input styler={{ float: "right", paddingRight: "5px", fontSize: "24px", width:"fitContent" }} type="text" onChangeFunc={null} label={innerText + ": "} />
            </td>
        )
    }

    const convertTextToNum = (text) =>
    {
        let m = 0;
        if (text.includes("firstTriviaColumn"))
        {
            m = 5;
        }
        else if (text.includes("secondTriviaColumn"))
        {
            m = 3;
        }
        else if (text.includes("thirdTriviaColumn"))
        {
            m = 2;
        }
        else if (text.includes("fourthTriviaColumn"))
        {
            m = 3;
        }
        else if (text.includes("fifthTriviaColumn"))
        {
            m = 5;
        }
        else
        {
            console.error("convertTextToNum should never return zero!")
        }
        return m;
    }

    const calculateTrivia = async(winningMultString) =>
    {
        params.update();
        const promises = [];
        const mult = convertTextToNum(winningMultString);

        players.map(v =>
        {
            let newMoney = 0;
            // add money to player
            let bet = document.getElementById(stringTrivBet + v.name + winningMultString);
            if (v.money >= bet.value)
            {
                newMoney = v.money + (bet.value * Math.floor(mult));
            }

            // subtract every bet value for this player
            let losers = document.getElementsByName(stringTrivBet);
            losers.forEach((l) =>
            {
                if (l.value && l.id.includes(v.name))
                {
                    newMoney = newMoney - l.value;
                }
            })
            const newPlayer = { ...v, money: newMoney };
            // send updated player to db
            promises.push(SilentCartographer.setPlayers(newPlayer));
        })

        await Promise.all(promises).then(() => { params.update(); });

        const olo = winningMult + 1;
        setWinningMult(olo);
    }

    if (players != null && players.length > 0)
    {
        return (
            <div style={{ backgroundColor: "darkslategray", borderColor: "white", borderStyle: "ridge", borderRadius: "8px", margin: "5px", maxWidth: { probabilityBoardWidth }, backgroundImage: "url('" + '././3043611.jpg' + "') " }}>
                <h2 style={{ color: "white", fontSize: "50px", textAlign: "center", margin: "0" }}> Bet on Trivia </h2>
                <table style={{ height: "100px", flexDirection: "column", borderColor: "white", minWidth: probabilityBoardWidth + "px", maxWidth: probabilityBoardWidth + "px"}} >
                    <thead>
                        <tr>
                            {makeWinButton("firstTriviaColumn")}
                            {makeWinButton("secondTriviaColumn")}
                            {makeWinButton("thirdTriviaColumn")}
                            {makeWinButton("fourthTriviaColumn")}
                            {makeWinButton("fifthTriviaColumn")}
                        </tr>
                        <tr>
                            {makeBettingCellHeaders("5x", "blue")}
                            {makeBettingCellHeaders("3x", "red")}
                            {makeBettingCellHeaders("2x", "darkorange")}
                            {makeBettingCellHeaders("3x", "purple")}
                            {makeBettingCellHeaders("5x", "magenta")}
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{}}>
                            <td style={{ color: "white", backgroundColor: "blue" }}>{makePlayerOptions("firstTriviaColumn")}</td>
                            <td style={{ color: "white", backgroundColor: "red" }}>{makePlayerOptions("secondTriviaColumn")}</td>
                            <td style={{ color: "white", backgroundColor: "darkorange" }}>{makePlayerOptions("thirdTriviaColumn")}</td>
                            <td style={{ color: "white", backgroundColor: "purple" }}>{makePlayerOptions("fourthTriviaColumn")}</td>
                            <td style={{ color: "white", backgroundColor: "magenta" }}>{makePlayerOptions("fifthTriviaColumn")}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
    else
    {
        return <div style={{ color: "white" }}> No Trivia players </div>
    }
}
export default Trivia