import React from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import {connect} from "react-redux"

import Navigator from './Navigator';
import Group from './Group';
import {getAllGroups} from "../actions/groupPage";

class GroupPage extends React.Component {
    componentWillMount() {
        this.props.getAllGroups()
    }

    render() {
        return (
            <div>
                <Navigator/>
                <Row className="ml-3 mt-3 mr-3">
                    <h5 md="auto" >Browse groups</h5>
                    <Button href="/create-group" className="ml-auto">Create Group</Button>
                </Row>
                <hr className="ml-3 mr-3 mb-3"/>
                <ListGroup className="ml-3 mr-3">
                        {
                            this.props.groups.map((group) =>
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
        groups: state.groupPage.groups
    }
}
const mapDispatchToProps = (dispatch) => ({
    getAllGroups: (groupId, userId) => {
        dispatch(getAllGroups(groupId, userId))
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(GroupPage)