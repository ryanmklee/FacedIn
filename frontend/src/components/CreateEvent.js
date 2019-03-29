import React from "react";
import {connect} from "react-redux"
class CreateEvent extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <h3>Create Event</h3>
        );
    }
}

function mapStateToProps(state){
    return {

    }
}
export default connect(mapStateToProps)(CreateEvent)