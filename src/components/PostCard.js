import React, { useContext } from "react";
import { Card, Icon, Label, Button, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import Avatar from './Avatar.js';

import { AuthContext } from "../context/auth";

const PostCard = ({
  post: { body, createdAt, id, username, avatar, likeCount, commentCount, likes },
}) => {
  //const {body, createdAt, id, username, likeCount, commentCount, likes} = props.post;
  const { user } = useContext(AuthContext);

  return (
    <Card fluid>
      <Card.Content>
        <Avatar float="right" size="mini" content={{createdAt, username, avatar}}/>
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(new Date(parseInt(createdAt))).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <Popup
          content="Comment on post"
          inverted
          trigger={
            <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
              <Button color="blue" basic>
                <Icon name="comments" />
              </Button>
              <Label basic color="blue" pointing="left">
                {commentCount}
              </Label>
            </Button>
          }
        />
        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
};

export default PostCard;
