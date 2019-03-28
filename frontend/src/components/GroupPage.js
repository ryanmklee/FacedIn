import React from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import {connect} from "react-redux"
import constant, {PASSWORD_INPUT, USERNAME_INPUT} from "../constants/actionTypes";
import store from "../store/index"
import axios from 'axios'
import {tryLogin} from "../actions/login";

import Navigator from './Navigator';
import Group from './Group';

// TODO: replace mock data with API
import groups from '../mockData/mockGroups';

class GroupPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Navigator/>
                <h5 className="ml-3 mt-3">Browse groups</h5>
                <hr className="ml-3 mr-3 mb-3"/>
                <ListGroup className="ml-3 mr-3">
                        {
                            groups.map((group) =>
                                <ListGroup.Item>
                                    <Group group={group}/>
                                </ListGroup.Item>
                            )
                        }
                </ListGroup>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {

    }
}
export default connect(mapStateToProps)(GroupPage)