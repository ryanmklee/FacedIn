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
const users = [user, user];

export default class SearchResult extends Component {
  render() {
    let usersResult, groupsResult, eventsResult;
    if (users) {
      usersResult = <ListGroup className="ml-3 mr-3">
                      {
                        users.map((user) =>
                            <ListGroup.Item>
                                <User user={user}/>
                            </ListGroup.Item>
                        )
                      }
                    </ListGroup>
    } else {
      usersResult = <label>There are no users that match the query</label>
    }
    if (groups) {
      groupsResult = <ListGroup className="ml-3 mr-3">
                        {
                          groups.map((group) =>
                              <ListGroup.Item>
                                  <Group group={group}/>
                              </ListGroup.Item>
                          )
                        }
                      </ListGroup>
    } else {
      groupsResult = <label>There are no groups that match the query</label>
    }
    if (events) {
      eventsResult = <ListGroup>
                        {
                          events.map((event) =>
                            <ListGroup.Item>
                              <Event event={event}/>
                            </ListGroup.Item>
                          )
                        }
                      </ListGroup>
    } else {
      eventsResult = <label>There are no events that match the query</label>
    }

    return (
      <div>
        <Navigator/>
        <h4 className="mt-4 mb-4" style={{textAlign: 'center'}}>Search result</h4>
        <Container className="mb-4">
          <h5>Users</h5>
          <hr/>
          {usersResult}
          <h5 className="mt-3">Groups</h5>
          <hr/>
          {groupsResult}
          <h5 className="mt-3">Events</h5>
          <hr/>
          {eventsResult}
        </Container>
      </div>
    );
  }
}