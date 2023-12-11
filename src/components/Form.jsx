import Input from './Input'

const Form = (params) =>
{
    return (
        <div>
            <h2>{params.label}</h2>
            <form onSubmit={params.onSubmitFunc} >
                <Input label="name" type="text" onChangeFunc={params.onChangeFuncName} />
                <Input label="phone number" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" onChangeFunc={params.onChangeFuncPhone} />
                <Input value="add" type="submit" />
            </form>
        </div>
    )
}
export default Form