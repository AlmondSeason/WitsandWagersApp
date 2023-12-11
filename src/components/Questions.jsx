import { useState, useEffect } from 'react';
import SilentCartographer from '.././services/SilentCartographer';
import Input from './Input';

const Questions = (params) =>
{
    const [round, setRound] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [currQuestion, setCurrQuestion] = useState([]);

    const getData = () =>
    {
        SilentCartographer.getQuestions()
            .then(data =>
            {
                setQuestions(data);
            //    console.log(data);
            });
    }
    useEffect(getData, []);

    const getRandomQuestion = () =>
    {
        let random = Math.floor((Math.random() * questions.length - 1) + 1);
        let result = questions[random];
        setCurrQuestion(result);
        const newRd = round + 1;
        setRound(newRd);
    }

    const toggleVisibility = () =>
    {
        const obj = document.getElementById("answerButton").parentElement;
        if (obj.style.visibility === "visible")
        {
            obj.style.visibility = "hidden";
        }
        else
        {
            obj.style.visibility = "visible";
        }
    }

    if (currQuestion != null)
    {
        return (
            <span>
                <Input type="submit" value="New Question" noReload={true} onClickFunc={getRandomQuestion} styler={{ fontSize: "24px" }}/>
                <h1> Round {round} out of 10 </h1>
                <h1> Question: {currQuestion.question} </h1>
                <h2> Answer:
                    <Input styler={{ paddingRight: "2px"}}value="Click to show/hide answer" onClickFunc={() => { toggleVisibility(); }} onChangeFunc={(x, y) => { return x * y }} />
                    <Input id="answerButton" value={currQuestion.answer} onChangeFunc={(x, y) => { return x * y }} styler={{ visibility: "hidden" }} />
                </h2>
            </span>
        )
    }
    else
    {
        return <div> No Question </div>
    }
}
export default Questions