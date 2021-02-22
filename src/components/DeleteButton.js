import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, {useState} from 'react';
import {Button, Icon, Confirm} from 'semantic-ui-react';

const DeleteButton = ({postId, callback}) =>{
    const [confirmOpen, setConfirmOpen] = useState(false);

    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        update(){
            setConfirmOpen(false);
            callback !== undefined ?? callback();
        },
        variables: {
            postId: postId
        },
        onError(error){
            console.log(error);
        },
        refetchQueries: [
            {
              query: FETCH_POSTS,
            },
          ]
    })

    return(
        <>
        <Button as="div" color="red" onClick={() => setConfirmOpen(true)} floated="right">
            <Icon name="trash" style={{margin: 0}}/>
          </Button>
          <Confirm
            open={confirmOpen}
            onCancel={() => setConfirmOpen(false)}
            onConfirm={deletePost}
            />
        </>
    )
}




const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`;

const FETCH_POSTS = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default DeleteButton;