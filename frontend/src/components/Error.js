import React from "react";
import {connect} from "react-redux"

/**
 * displays the posts and top navigation.
 */
class Error extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <h3>Error. Where ytou going!?</h3>
        );
    }
}

function mapStateToProps(state){
    return {

    }
}
export default connect(mapStateToProps)(Error)