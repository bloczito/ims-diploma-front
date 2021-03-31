import './App.css';
import LoginView from "./views/LoginView/LoginView";
import Navbar from "./components/Navbar/Navbar";
import {connect} from "react-redux";
import {
    Route,
    Switch,
    BrowserRouter as Router
} from "react-router-dom";

function App({ token }) {

    return (
        <div className="App">
            {!token ? <LoginView /> :
                <>
                    <Router>
                        <Navbar />
                        <p>ZALOGOWANY BYKU</p>
                        <Route path="/orders">Zamówienia</Route>
                        <Route path="/products">Produkty</Route>
                        <Route path="/clients">Klienci</Route>
                    </Router>

                </>

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
