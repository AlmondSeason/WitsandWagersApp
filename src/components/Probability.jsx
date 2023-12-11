import { useState, useEffect } from 'react';
import Input from './Input';
import SilentCartographer from '.././services/SilentCartographer';

const Probability = (params) =>
{
    const stringProbBet = "ProbBet";
    const [players, setPlayers] = useState([]);
    const [margin, setMargin] = useState(0);
    const [myInterval, setMyInterval] = useState(0);
    const [winningMult, setWinningMult] = useState(0);
    const [winningProb, setWinningProb] = useState(0);

    const probabilityBoardWidth = 900;
    const fontSizeStyle = "24px";
    const pointerStyle = {
        position: 'absolute',
        marginLeft: margin - 20 + "px",
        fontSize: 50,
        color: "white",
        fontWeight: "bold",
        width: "30px",
        padding: "0px"
    }

    const getData = () =>
    {
        setPlayers(params.players);
    }
    useEffect(getData, [params.players]);

    const setMarginLeft = () =>
    {
        setMargin(Math.floor((Math.random() * probabilityBoardWidth) + 1));
    }

    const stopRoll = async () =>
    {
        params.update();
        const promises = []
        if (myInterval !== 0)
        {
            setMyInterval(0);
            clearInterval(myInterval);

            const winningCalc = calcWinnings();
            setWinningProb(winningCalc);

            players.forEach((v) =>
            {
                let newMoney = 0;          
                let bet = document.getElementById(stringProbBet + v.name + winningCalc);
                if (v.money >= bet.value)
                {
                    newMoney = v.money + (bet.value * winningCalc);
                }

                let losers = document.getElementsByName("ProbabilityBet");
                losers.forEach((l) =>
                {
                    console.log(l.id);
                    if (l.id.includes(v.name))
                    {
                        if (l.value)
                        {
                            newMoney = newMoney - l.value;
                        }
                    }
                })

                const newPlayer = { ...v, money: newMoney };
                promises.push(SilentCartographer.setPlayers(newPlayer));
            })
        }
        await Promise.all(promises).then(() => { params.update(); });
        setWinningMult(winningMult + 1);
    }

    const startRoll = () =>
    {
        params.update();
        if (myInterval === 0)
        {
            setMyInterval(setInterval(setMarginLeft, 100));
        }
    }

    const calcWinnings = () =>
    {
        let multiplier = 0;
        if (margin > probabilityBoardWidth*0.95)
        {
            multiplier = 20;
        }
        else if (margin < probabilityBoardWidth * 0.95 && margin > probabilityBoardWidth * 0.85)
        {
            multiplier = 10;
        }
        else if (margin < probabilityBoardWidth * 0.85 && margin > probabilityBoardWidth * 0.65)
        {
            multiplier = 5;
        }
        else if (margin < probabilityBoardWidth * 0.65 && margin > probabilityBoardWidth * 0.40)
        {
            multiplier = 4;
        }
        else
        {
            multiplier = 1.5;
        }
        return multiplier;
    }

    const makePlayerOptions = (id) =>
    {
        let obj = players.map((v) =>
        {
            return <div key={v.id + id}> <Input styler={{ float: "right", borderStyle: "inset", width: "98%", height: "98%", textAlign: "end"  }} id={stringProbBet + v.name + id} type="number" label={v.name + ": "} name="ProbabilityBet" /> </div>
        })
        return obj;
    }

    const makeBettingCellHeaders = (innerText, backgroundColor, width) =>
    {
        return (
            <td style={{ color: "white", backgroundColor: backgroundColor, width: width, padding: "0", fontSize: "24px", fontWeight: "bold", textAlign: "center", borderStyle: "inset" }}>
                <span style={{ textAlign: "center" }}>{innerText}</span>
            </td>
        )
    }

    if (players != null && players.length > 0)
    {
        return (
            <div style={{ backgroundColor: "forestgreen", borderColor: "white", borderStyle: "ridge", borderRadius: "8px", margin: "5px", backgroundImage: "url('" + '././3043611.jpg' + "') " }} >
                <div style={{ fontSize: fontSizeStyle, backgroundColor: "black", color: "yellow", textAlign: "center", width: "100%", borderTopLeftRadius: "8px", borderTopRightRadius: "8px"}}> THE WINNING MULTIPLIER IS...  </div>
                <div style={{ fontSize: fontSizeStyle, color: "yellow", backgroundColor: "black", textAlign: "center", width: "100%" }}>{winningProb}</div>
                <h2 style={{ color: "white", fontSize: "50px", textAlign: "center", margin: "0" }}> Bet on Random Chance </h2>
                <div style={{ textAlign: "center"}}>
                    <Input styler={{ margin: "5px", marginBottom: "30px", verticalAlign: "center", fontSize: "36px" }} noReload={true} type="submit" value="Roll" onClickFunc={startRoll} onChangeFunc={null} />
                    <Input styler={{ margin: "5px", marginBottom: "30px", verticalAlign: "center", fontSize: "36px" }} noReload={true} type="submit" value="Stop" onClickFunc={stopRoll} onChangeFunc={null} />
                </div>
                <table style={{ borderCollapse: "collapse", height: "100px", minWidth: probabilityBoardWidth + "px", maxWidth: probabilityBoardWidth + "px", flexDirection: "column", backgroundColor: "lightgrey", marginBottom: "2em" }}>
                    <thead style={{ borderColor: "white", height: "100px" }}>
                        <tr style={{ height: "150px", width: "350px", flexDirection: "column", borderColor: "white" }} >
                            {makeBettingCellHeaders("1.5x", "black", "40%")}
                            {makeBettingCellHeaders("4x", "red", "25%")}
                            {makeBettingCellHeaders("5x", "black", "20%")}
                            {makeBettingCellHeaders("10x", "red", "10%")}
                            {makeBettingCellHeaders("20x", "black", "5%")}
                        </tr>
                        <tr style={{ height: 0 }}>
                            <td id="pointer" style={pointerStyle} >
                                ^
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                <table style={{ borderCollapse: "collapse", height: "100px", minWidth: probabilityBoardWidth + "px", maxWidth: probabilityBoardWidth + "px", flexDirection: "column", backgroundColor: "lightgrey", marginBottom: "1em" }}>
                    <thead style={{ height: "100px" }}>
                        <tr>
                            {makeBettingCellHeaders("1.5x", "black")}
                            {makeBettingCellHeaders("4x", "red")}
                            {makeBettingCellHeaders("5x", "black")}
                            {makeBettingCellHeaders("10x", "red")}
                            {makeBettingCellHeaders("20x", "black")}
                        </tr>
                        <tr style={{}}>
                            <td style={{ color: "white", backgroundColor: "black" }}>{makePlayerOptions(1.5)}</td>
                            <td style={{ color: "white", backgroundColor: "red" }}>{makePlayerOptions(4)}</td>
                            <td style={{ color: "white", backgroundColor: "black" }}>{makePlayerOptions(5)}</td>
                            <td style={{ color: "white", backgroundColor: "red" }}>{makePlayerOptions(10)}</td>
                            <td style={{ color: "white", backgroundColor: "black" }}>{makePlayerOptions(20)}</td>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        )
    }
    else
    {
        return <div style={{ color: "white" }}> No Probability players </div>
    }
}
export default Probability