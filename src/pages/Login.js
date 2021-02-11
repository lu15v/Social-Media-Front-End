import gql from 'graphql-tag';
import React, {useContext, useState} from 'react'
import {useMutation} from '@apollo/react-hooks';
import  { Button, Form } from 'semantic-ui-react';
import {useForm} from '../util/hooks';

import {AuthContext} from '../context/auth';

const  Login = (props) =>{
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const {onChange, onSubmit, values} = useForm(loginUser, {
        username: '',
        password: ''
    });

    const [login, {loading}] = useMutation(LOGIN_USER, {
        update(_, {data: {login: userData}}){
            context.login(userData);
            props.history.push('/');
        },
        onError(err){
            console.log(err.graphQLErrors[0].extensions.exception.errors)
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables:values
    })

    function loginUser(){
        login();
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
                <h1>Login</h1>
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
                    label="Password"
                    placeholder="Password.."
                    name="password"
                    type="password"
                    value={values.password}
                    error={errors.password}
                    onChange={onChange}
                    />

                    <Button type="submit" primary >
                        Login
                    </Button>
            </Form>
        </div>
    )
}

const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ){
        login(
            username: $username
            password: $password
        ){
            email
            token
            username
        }
    }
`


export default Login;