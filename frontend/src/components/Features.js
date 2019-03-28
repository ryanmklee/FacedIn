import React from "react";
import {connect} from "react-redux"

import Navigator from "./Navigator";
import store from '../store/index'
import {getFriendLocations, getMostJoined} from "../actions/features";
import ListGroup from "react-bootstrap/ListGroup";
import User from "./User";
import Group from "./Group";
import Container from "react-bootstrap/Container";

class Features extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getMostJoined();
        this.props.getFriendLocations();
    }

    render() {
        return (
            <div>
                <Navigator/>
                <h4 className="mt-4 mb-4" style={{textAlign: 'center'}}>Features</h4>
                <Container className="mb-4">
                    <h5>Users In Every Group</h5>
                    <hr/>
                    {<ListGroup className="ml-3 mr-3">
                        {
                            this.props.mostJoined.map((user) =>
                                <ListGroup.Item>
                                    <User user={user}/>
                                </ListGroup.Item>
                            )
                        }
                    </ListGroup>}
                    <h5 className="mt-3">Friend Locations</h5>
                    <hr/>
                    <ListGroup className="ml-3 mr-3">
                        {
                            this.props.friendLocations.map((location) =>
                                <ListGroup.Item>
                                    <h2>{location[0].city}</h2>
                                    {
                                        location[1].map((user) =>
                                            <User user={user}/>
                                        )
                                    }
                                </ListGroup.Item>
                            )
                        }
                    </ListGroup>
                </Container>

            </div>

        );
    }
}

function mapStateToProps(state){
    return {
        mostJoined: state.features.mostJoined,
        friendLocations: state.features.friendLocations

    }
}

const mapDispatchToProps = (dispatch) => ({
    getMostJoined: () => {
        dispatch(getMostJoined())
    },
    getFriendLocations: () => {
        let userId = store.getState().login.user_id
        dispatch(getFriendLocations(userId))
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(Features)