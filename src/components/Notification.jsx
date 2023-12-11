const Notification = (params) =>
{
    const notificationStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16,
        backgroundColor: 'lightgrey'
    }
    if (params.state == 1)
    {
        notificationStyle.color = "red";
    }

    return (
        <div style={notificationStyle} >
            {params.message}
        </div>
    )
}

export default Notification