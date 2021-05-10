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




function App({ token }) {

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
    const { token } = state.authentication;

    return {
        token
    }
}

export default connect(mapStateToProps)(App);
