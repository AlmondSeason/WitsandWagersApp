const Course = (params) =>
{
    let list = [];
    params.course.parts.forEach((v) => list.push(v.exercises));

    return (
        <div>
            <Header course={params.course.name} />
            {params.course.parts.map(v => makeContentMap(v))}
            <Total total={sumArr(list)} />
        </div>
    )
}
const Header = (params) =>
{
    return (
        <h1> {params.course} </h1>
    );
}
const Content = (params) =>
{
    return (
        <p>
            {params.title} {params.content}
        </p>
    );
}
const Total = (params) =>
{
    return (
        <p>Number of exercises {params.total}</p>
    );
}

const makeContentMap = (params) =>
{
    return <Content title={params.name} content={params.exercises} key={params.id} />
}

const sumArr = (arr) =>
{
    let initialValue = 0;
    return arr.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);
}

export default Course
