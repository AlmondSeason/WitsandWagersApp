const Input = (params) =>
{
    const buttonStyler = {
        cursor: "pointer",
        boxShadow: "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px",
        minHeight: "2em",
        marginTop: "8px",
        marginBottom: "8px",
        backgroundColor: "white",
        outlineStyle: "auto",
        fontSize: "0.5em",
        verticalAlign: "middle"
    }

    return (
        <label style={params.styler} >
            {params.label}
            <input style={buttonStyler} type={params.type} onChange={params.onChangeFunc}
                onClick={() => { if (params.onClickFunc != null) { params.onClickFunc(); } if (!params.noReload && params.type === "submit") { /*location.reload();*/ } }}
                pattern={params.pattern} value={params.value} id={params.id} name={params.name} label={params.label} required />
        </label>
    )
}

export default Input