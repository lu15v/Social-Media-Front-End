import React, { useContext, useState } from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  Button,
  Card,
  Form,
  Grid,
  Icon,
  Label,
  Popup,
} from "semantic-ui-react";
import moment from "moment";

import DeleteButton from "../components/DeleteButton";
import LikeButton from "../components/LikeButton";
import Avatar from '../components/Avatar';

import { AuthContext } from "../context/auth";

const SinglePost = (props) => {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);

  const [comment, setComment] = useState("");

  const { loading, data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
    onError(error) {
      console.log(error);
    },
  });

  const [createComment] = useMutation(CREATE_POST_MUTATION, {
    variables: {
      postId,
      body: comment,
    },
    update() {
      setComment("");
    },
  });

  function deletePostCallback() {
    props.history.push("/");
  }

  let postMarkup;

  if (loading) {
    postMarkup = <p>Loading post...</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      avatar,
      comments,
      likes,
      likeCount,
      commentCount,
    } = data.getPost;
    
    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Avatar size="small" float="right" content={{createdAt, username, avatar}}/>
          </Grid.Column>
          <Grid.Column width={10}>
            <Card.Content>
              <Card.Header>{username}</Card.Header>
              <Card.Meta>
                {moment(new Date(parseInt(createdAt))).fromNow(true)}
              </Card.Meta>
              <Card.Description>{body}</Card.Description>
            </Card.Content>
            <hr />
            <Card>
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <Popup
                  content="Comment Post"
                  inverted
                  trigger={
                    <Button
                      as="div"
                      labelPosition="right"
                      onClick={() => console.log("comment creation here")}
                    >
                      <Button basic color="blue">
                        <Icon name="comments" />
                      </Button>
                      <Label basic color="blue" pointing="left">
                        {commentCount}
                      </Label>
                    </Button>
                  }
                />
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>
            {user && (
              <Card fluid>
                <Card.Content>
                  <p>Post a comment</p>
                  <Form>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="Comment.."
                        name="comment"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                      />
                      <button
                        type="submit"
                        className="ui button teal"
                        disabled={comment.trim() === ""}
                        onClick={createComment}
                      >
                        Create Comment
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
            {comments.map(({id, username, avatar, createdAt,body}) => (

              <Card fluid key={id}>
                <Card.Content>
                  {user && user.username === username && (
                    <DeleteButton postId={id} commentId={id} />
                  )}
                  <Card.Header>
                    <Avatar size="mini" float="left" content={{username, avatar}}/>
                      {username}
                  </Card.Header>
                  <Card.Meta>
                    {moment(new Date(parseInt(createdAt))).fromNow(
                      true
                    )}
                  </Card.Meta>
                  <Card.Description>{body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return postMarkup;
};

const CREATE_POST_MUTATION = gql`
  mutation createComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      avatar
      likeCount
      commentCount
      comments {
        id
        username
        avatar
        createdAt
        body
      }
      likes {
        id
        username
      }
    }
  }
`;

export default SinglePost;
