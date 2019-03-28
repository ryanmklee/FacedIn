import React, {Component} from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';

import AddPostComment from './AddPostComment';
import Comment from './Comment';

export default class CommentSection extends Component {
    render () {
        return (
            <Container>
                <ListGroup className="mb-3">
                    {
                        this.props.post.comments.map((comment) =>
                            <ListGroup.Item>
                                <Comment data={{
                                    commentData: {
                                        post: this.props.post.post,
                                        comment: comment,
                                        type: this.props.type
                                    }
                                }
                                }/>
                            </ListGroup.Item>
                        )
                    }
                </ListGroup>
                <AddPostComment post={this.props.post.post} type={this.props.type}/>
            </Container>
        )
    }
}