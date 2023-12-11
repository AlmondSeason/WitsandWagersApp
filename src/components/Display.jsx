import Country from './Country'
import Input from './Input'

const Display = (params) =>
{
    const addView = (obj, string) =>
    {
        return (
            <div id={obj.name.common + "divshow"} style={{ display: string }}>
                <div>
                    <h2>{obj.name.common}</h2>
                    <div>Capital: {obj.capital} </div>
                    <div>Area: {obj.area}  </div>
                    <ul>Languages:
                        {Object.entries(obj.languages).map((v) => { return (<li key={v[1] + "ll"}> {v[1]} </li>); })}
                    </ul>
                    <div> <img src={obj.flags.png} /> </div>
                </div>
            </div>
        );
    }

    const showView = (obj) =>
    {
        let div = document.getElementById(obj.name.common + "divshow");
        if (div.style.display === "block")
        {
            div.style.display = "none";
        }
        else
        {
            div.style.display = "block";
        }
    }

    const makePerson = (obj) =>
    {
        if (obj)
        {
            return (
                <div key={obj.name.common + "div"}>
                    <Country key={obj.name.common + "person"} name={obj.name.common} phone={obj.number} />
                    <Input key={obj.name.common + "lol"} value="show" type="submit" onClickFunc={() => showView(obj)} />
                    {addView(obj, "none")}
                </div>
            );
        }
    }

    if (params.list && params.list.length == 1)
    {
        return addView(params.list[0], "block");
    }
    else if (params.list &&params.list.length > 10)
    {
        return (<div> too many results </div>)
    }
    else if (params.list && params.list.length > 0)
    {
        return (
            <div>
                <h2>{params.name}</h2>
                <span>{params.list.map((v) => { return makePerson(v); })}</span>
                <div> debug: {params.randomVar} </div>
            </div>
        )
    }
    else
    {
        return (<div> No results </div>)
    }
}

export default Display