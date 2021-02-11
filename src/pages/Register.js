import gql from 'graphql-tag';
import React, {useContext, useState} from 'react'
import {useMutation} from '@apollo/react-hooks';
import  { Button, Form } from 'semantic-ui-react';
import {useForm} from '../util/hooks';

import {AuthContext} from '../context/auth'; 

const  Register = (props) =>{
    
    const context = useContext(AuthContext);

    const [errors, setErrors] = useState({});
    
    const {onChange, onSubmit, values} = useForm(registerUser, {
        username: '',
        password: '', 
        confirmPassword: '',
        email: ''
    });


    const [adduser, {loading}] = useMutation(REGISTER_USER, {
        update(_, {data: {register: userData}}){
            context.login(userData);
            props.history.push('/');
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables:values
    })

    function registerUser() {
        adduser();
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
                <h1>Register</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username.."
                    name="username"
                    type="text"
                    value={values.username}
                    error={errors.username}
                    onChange={onChange}
                    />
                    <Form.Input
                    label="Email"
                    placeholder="Email.."
                    name="email"
                    type="text"
                    value={values.email}
                    error={errors.email}
                    onChange={onChange}
                    />
                    <Form.Input
                    label="Password"
                    placeholder="Password.."
                    name="password"
                    type="password"
                    value={values.password}
                    error={errors.password}
                    onChange={onChange}
                    />
                    <Form.Input
                    label="Confirm Password"
                    placeholder="Confirm Password.."
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    error={errors.confirmPassword}
                    onChange={onChange}
                    />

                    <Button type="submit" primary >
                        Register
                    </Button>
            </Form>
            {/* {Object.keys(errors).length > 0 && (
            <div className="ui error message">
                <ul className="list">
                    {Object.values(errors).map(value=>(
                        <li key={value}>{value}</li>
                    ))}
                </ul>
            </div>
            )} */}
        </div>
    )
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $password: String!
        $confirmPassword: String!
        $email: String!
    ){
        register(
            registerInput:{
                username: $username
                password: $password
                confirmPassword: $confirmPassword
                email: $email
            }
        ){
            id
            email
            token
            username
        }
    }
`


export default Register;