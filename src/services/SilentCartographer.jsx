import axios from 'axios';
const URL = "http://localhost:3001/";
const playerURL = "http://localhost:3001/players";
const questionURL = "http://localhost:3001/questions";

const getPlayers = async() =>
{
    const req = axios.get(playerURL);
    return req.then(response =>
    {
        const data = response.data;
        return data;
    });
}
const getQuestions = () =>
{
    const req = axios.get(questionURL);
    return req.then(response =>
    {
        const data = response.data;
        return data;
    });
}
const setPlayers = async(obj) =>
{
    const req = axios.put(`${playerURL}/${obj.id}`, obj);
    return req.then(response =>
    {
            //console.log(response);
    });
}
const newPlayers = (obj) =>
{
    const req = axios.post(playerURL, obj);
    return req.then(response =>
    {
            //console.log(response);
    });
}
const delPlayers = (obj) =>
{
    const req = axios.delete(`${playerURL}/${obj.id}`);
    return req.then(response =>
    {
            //console.log(response);
    });
}

export default { getPlayers, getQuestions, setPlayers, newPlayers, delPlayers }