import React from "react";
import {connect} from "react-redux"
import constant, {PASSWORD_INPUT, USERNAME_INPUT} from "../constants/actionTypes";
import store from "../store/index"
import axios from 'axios'
import {tryLogin} from "../actions/login";
import {getUserInfo, setUserInfo} from "../actions/userProfile";
const tempUserId = 1;
const exampleUserData = [{
    address: "2325 West Mall",
    age: 18,
    city: "Vancouver",
    location_id: 1,
    location_name: "Depression School",
    name: "Dr. Strange",
    occupation: "Auditor",
    postal_code: "V6T1Z4",
    province: "BC",
    sex: "Male",
    user_id: 1
}]
class Profile extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getUserInfo(tempUserId)
    }
    render() {
        return (
            <div>
                <h3>Profile</h3>
                <h2>{this.props.userInfo.address}</h2>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        userInfo: state.userProfile.userData,
        userId: state.login.user_id
    }
}

const mapDispatchToProps = (dispatch) => ({
    getUserInfo: (userId) => {
        dispatch(getUserInfo(userId))
    },
    setUserInfo: (age, name, occupation, sex, userId, locationName, address, postalCode, city, province) => {
        dispatch(setUserInfo(age, name, occupation, sex, userId, locationName, address, postalCode, city, province))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Profile)