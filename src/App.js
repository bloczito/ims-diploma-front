import './App.css';
import LoginView from "./views/LoginView/LoginView";
import {connect} from "react-redux";

function App({ token }) {
    console.log("APP token :", token)
    return (
        <div className="App">
            {token ? (
                "ZALOGOWANY BYKU"
            ) : (
                <LoginView />
                )
            }


        </div>
    );
}

function mapStateToProps(state) {
    const { token } = state.authentication;

    return {
        token
    }
}

export default connect(mapStateToProps)(App);
