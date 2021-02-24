import {useState} from 'react'


export const useForm = (callback, initState) =>{

    const [values, setValues] = useState(initState);

    const onChange = (_, {name, value}) =>{
        setValues({...values, [name] : value})
    }
    
    const onSubmit = event =>{
        event.preventDefault();
        callback();
    }

    return{
        onChange,
        onSubmit,
        values
    }
}