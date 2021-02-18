import React, {useContext} from 'react';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import { Button, Card, Grid, Icon, Image, Label} from 'semantic-ui-react';
import moment from 'moment';


import {AuthContext} from '../context/auth'
const SinglePost = (props) =>{
    const postId = props.match.params.postId;
    const {user} = useContext(AuthContext);

    const {loading, data: {getPost}} = useQuery(FETCH_POST_QUERY, {
        variables:{
            postId
        },
        onError(error){
            console.log(error);
        }
    })


    let postMarkup;

    if(loading){
        postMarkup = <p>Loading post...</p>
    }else{
        const { id, body, createdAt, username, comments, likes, likeCount, commentCount} = getPost;

        postMarkup = (
            <Grid>
                    <Grid.Row>
                        <Grid.Column width={2}>
                        <Image
                            src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                            size="small"
                            float="right"/>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>{moment(new Date(parseInt(createdAt))).fromNow(true)}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <hr/>
                            <Card.Content extra>
                                <likeButton user={user} post={{id, likeCount, likes}}/>
                                <Button
                                    as="div"
                                    labelPosition="right"
                                    onClick={()=> console.log("comment creation here")}>
                                        <Button basic color="blue">
                                            <Icon name="comments"/>
                                        </Button>
                                        <Label basic color="blue" pointing="left">
                                            {commentCount}
                                        </Label>
                                    </Button>
                            </Card.Content>
                        </Grid.Column>
                    </Grid.Row>
            </Grid>
        )
    }

    return(
        postMarkup
    )
}


const FETCH_POST_QUERY  = gql`
    query($postId: ID!){
        getPost(postId: $postId){
            id body createdAt username likeCount
            commentCount
            comments{
                id username createdAt
            }
        }
    }
`

export default SinglePost;