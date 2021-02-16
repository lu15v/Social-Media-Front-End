import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {ApolloClient, InMemoryCache, createHttpLink, ApolloProvider} from '@apollo/client';
import {setContext} from 'apollo-link-context';

const httpLink = createHttpLink({
  uri: 'http://localhost:5000'
});

const authLink = setContext(()=>{
  const token = localStorage.getItem('token');
  return{
    headers:{
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});


ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
