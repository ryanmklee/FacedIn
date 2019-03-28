import React from "react";
import ListGroup from 'react-bootstrap/ListGroup';
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
                <h5 className="ml-3 mt-3">Browse groups</h5>
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