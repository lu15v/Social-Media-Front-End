import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, {useState} from 'react';
import {Button, Icon, Confirm} from 'semantic-ui-react';

const DeleteButton = ({postId, commentId, callback}) =>{
    const [confirmOpen, setConfirmOpen] = useState(false);

    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
    const [deleteMutation] = useMutation(mutation, {
        update(){
            setConfirmOpen(false);
            callback !== undefined ?? callback();
        },
        variables: {
            postId: postId,
            commentId: commentId
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
            onConfirm={deleteMutation}
            />
        </>
    )
}




const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!){
    deleteComment(postId: $postId, commentId: $commentId){
      id
      comments{
        id username body createdAt
      }
      commentCount
    }
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