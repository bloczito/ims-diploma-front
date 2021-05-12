import './App.css';
import { StylesProvider } from "@material-ui/core/styles"
import LoginView from "./views/LoginView/LoginView";
import OrdersView from "./views/OrdersView/OrdersView"
import ProductsView from "./views/ProductsView/ProductsView";
import CustomersView from "./views/CustomersView/CustomersView";

import Navbar from "./components/Navbar/Navbar";
import TestView from "./components/TestView/TestView"
import { connect } from "react-redux";
import {
    Route,
    Switch,
    BrowserRouter as Router
} from "react-router-dom";




function App({ token, username, roles }) {

    console.log("APKA", username, roles);

    return (
        <StylesProvider injectFirst>
            { !token ? <LoginView/> :
                <>
                    <Router>
                        <Navbar/>
                        <Switch>
                            <Route path="/orders"  component={OrdersView}/>
                            <Route path="/products" component={ProductsView}/>
                            <Route path="/clients" component={CustomersView}/>
                            <Route path="/test" component={TestView}/>
                        </Switch>
                    </Router>

                </>

            }
        </StylesProvider>
    );
}

function mapStateToProps(state) {
    const { token, roles, username } = state.authentication;

    return {
        token, roles, username
    }
}

export default connect(mapStateToProps)(App);
