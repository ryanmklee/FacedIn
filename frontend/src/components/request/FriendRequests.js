import React, { Component } from "react";

import ListGroup from 'react-bootstrap/ListGroup';
import Popover from 'react-bootstrap/Popover';

import FriendRequest from './FriendRequest';

// TODO: replace mockdata
import mockFriendRequests from '../../mockData/mockFriendRequests';
import {setLogout} from "../../actions/login";
import {getUserPosts} from "../../actions/home";
import connect from "react-redux/es/connect/connect";
import {getFriendRequests} from "../../actions/friendRequests";
import store from "../../store";

class FriendRequests extends Component {

  componentWillMount() {
    this.props.getFriendRequests(store.getState().login.user_id)
  }

  render() {
    return (
      <ListGroup className="mb-3">
          {
            this.props.requests.map((request, i) =>
              <ListGroup.Item key={i}>
                <FriendRequest request={request}/>
              </ListGroup.Item>
            )
          }
      </ListGroup>
    );
  }
}

function mapStateToProps(state){
  return {
    requests: state.friendRequests.requests,
  }
}

const mapDispatchToProps = (dispatch) => ({
  getFriendRequests: (userId) => {
    dispatch(getFriendRequests(userId))
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(FriendRequests)