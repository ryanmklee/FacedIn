import React, { Component } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';

import Navigator from './Navigator';
import Group from './Group';
import Event from './Event';
import User from './User';

// TODO: replace mock data with API
import events from '../mockData/mockEvents';
import groups from '../mockData/mockGroups';
import user from '../mockData/mockUser';
import {tryLogin} from "../actions/login";
import connect from "react-redux/es/connect/connect";
import {searchPhrase} from "../actions/searchResult";
const users = [user, user];

class SearchResult extends React.Component {
    constructor(props) {
        super(props);
        this.searchText = "g"//this.props.location.state.searchText
    }

    componentWillMount() {
        this.props.lookupSearchText(this.searchText)
    }

    render() {
        // console.log(this.props.users)
    return (
      <div>
        <Navigator/>
        <h4 className="mt-4 mb-4" style={{textAlign: 'center'}}>Search result</h4>
        <Container className="mb-4">
          <h5>Users</h5>
          <hr/>
            {<ListGroup className="ml-3 mr-3">
                {
                    this.props.users.map((user) =>
                        <ListGroup.Item>
                            <User user={user}/>
                        </ListGroup.Item>
                    )
                }
            </ListGroup>}
          <h5 className="mt-3">Groups</h5>
          <hr/>
            <ListGroup className="ml-3 mr-3">
                {
                    this.props.groups.map((group) =>
                        <ListGroup.Item>
                            <Group group={group}/>
                        </ListGroup.Item>
                    )
                }
            </ListGroup>
          <h5 className="mt-3">Events</h5>
          <hr/>
            <ListGroup>
                {
                    this.props.events.map((event) =>
                        <ListGroup.Item>
                            <Event event={event}/>
                        </ListGroup.Item>
                    )
                }
            </ListGroup>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = state => ({
    results: state.searchResult.results,
    events: state.searchResult.results.events,
    groups: state.searchResult.results.groups,
    users: state.searchResult.results.users
});

const mapDispatchToProps = (dispatch) => ({
    lookupSearchText: (searchText) => {
        dispatch(searchPhrase(searchText))
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchResult)