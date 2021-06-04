import './App.scss';
import { StylesProvider } from "@material-ui/core/styles"
import LoginView from "./views/LoginView/LoginView";
import OrdersView from "./views/OrdersView/OrdersView"
import ProductsView from "./views/ProductsView/ProductsView";
import CustomersView from "./views/CustomersView/CustomersView";
import AdminPanelView from "./views/AdminPanelView/AdminPanelView";
import OrderDetailsView from "./views/OrderDetailsView/OrderDetailsView";
import ProductDetailsView from "./views/ProductDetailsView/ProductDetailsView";

import Navbar from "./components/Navbar/Navbar";
import TestView from "./components/TestView/TestView"
import { connect } from "react-redux";
import {
    Route,
    Switch,
    BrowserRouter as Router
} from "react-router-dom";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { NOTIFICATION_TYPE } from "./_constants";
import { notificationActions } from "./_actions";
import NewCustomerModal from "./components/NewCustomerModal/NewCustomerModal";




function App({ token, isNotificationOpen, notificationMsg, notificationType, closeNotification}) {

    return (
        <StylesProvider injectFirst>
            { !token ? <LoginView/> :
                <>
                    <Router>
                        <Navbar/>
                        <Switch>
                            <Route exact path="/orders"  component={OrdersView}/>
                            <Route path="/orders/:id"  component={OrderDetailsView}/>
                            <Route exact path="/products" component={ProductsView}/>
                            <Route path="/products/:id" render={NewCustomerModal}/>
                            <Route exact path="/customers" component={CustomersView}/>
                            <Route path="/customers/:id" component={CustomersView}/>
                            <Route path="/admin_panel" component={AdminPanelView}/>
                            <Route path="/test" component={TestView}/>
                        </Switch>
                    </Router>
                    <Snackbar
                        open={isNotificationOpen}
                        anchorOrigin={{horizontal: "left", vertical: "bottom"}}
                        autoHideDuration={6000}
                        onClose={closeNotification}
                    >
                        <Alert
                            style={{maxWidth: "20vw"}}
                            severity={notificationType === NOTIFICATION_TYPE.SUCCESS ? "success" : "error"}
                            onClose={closeNotification}
                        >
                            {notificationMsg}
                        </Alert>
                    </Snackbar>
                </>

            }
        </StylesProvider>
    );
}

function mapStateToProps(state) {
    const { token, roles, username } = state.authentication;
    const {isNotificationOpen, notificationMsg, notificationType} = state.notification;

    return {
        token, roles, username, isNotificationOpen, notificationMsg, notificationType
    }
}

const mapDispatchToProps = dispatch => ({
    closeNotification: () => dispatch(notificationActions.close())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
