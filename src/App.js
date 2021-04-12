import './App.css';
import { LoginView, OrdersView } from "./views";
import Navbar from "./components/Navbar/Navbar";
import { connect } from "react-redux";
import {
    Route,
    Switch,
    BrowserRouter as Router
} from "react-router-dom";



function App({ token }) {

    return (
        <div className="App">
            { !token ? <LoginView/> :
                <>
                    <Router>
                        <Navbar/>
                        <Switch>
                            <Route path="/orders"  component={OrdersView}/>
                            <Route path="/products">Produkty</Route>
                            <Route path="/clients">Klienci</Route>
                        </Switch>
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
