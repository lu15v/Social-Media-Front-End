import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition } from "semantic-ui-react";
import gql from "graphql-tag";

import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";

import { AuthContext } from "../context/auth";

const Home = () => {
  //const {loading, data: {getPosts: posts}} = useQuery(FETCH_POSTS);
  const { loading, data } = useQuery(FETCH_POSTS);

  const { user } = useContext(AuthContext);
  return (
    <Grid columns={3} divided>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <p>loading...</p>
        ) : (
          <Transition.Group>
            {data.getPosts && data.getPosts.map(post =>(
            <Grid.Column key={post.id} style={{ marginBotton: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
            ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
};

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
export default Home;
