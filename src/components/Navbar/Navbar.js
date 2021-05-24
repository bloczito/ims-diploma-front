import React, { useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
    AppBar,
    Button,
    Drawer,
    IconButton, List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    Container,
    Menu,
    MenuItem, LinearProgress,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../_actions";

import styles from "./Navbar.module.scss"



const Navbar = ({ dispatch, username }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [drawer, setDrawer] = useState(false);
    const [userMenu, setUserMenu] = useState(null);


    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setDrawer(!drawer);
    };

    const handleUserMenuOpen = event => {
        setUserMenu(event.currentTarget);
    }

    const handleUserMenuClose = () => {
        setUserMenu(null);
    }

    const handleLogoutClick = () => {
        handleUserMenuClose();
        dispatch(userActions.logout());
    }

    const list = () => (
        <div
            role="presentation"
            onClick={ toggleDrawer(false) }
            onKeyDown={ toggleDrawer(false) }
        >
            <List>
                <Link to="/orders" className={ styles.drawerLink }>
                    <ListItem button key={ "orders" }>
                        <ListItemText primary={ "Zamówienia" }/>
                    </ListItem>
                </Link>
                <Link to="/products" className={ styles.drawerLink }>
                    <ListItem button key={ "products" }>
                        <ListItemText primary={ "Produkty" } />
                    </ListItem>
                </Link>
                <Link to="/customers" className={ styles.drawerLink }>
                    <ListItem button key={ "customers" }>
                        <ListItemText primary={ "Klienci" }/>
                    </ListItem>
                </Link>
                <Link to="/account" className={ styles.drawerLink }>
                    <ListItem button key={ "account" }>
                        <ListItemIcon>
                            <AccountCircleIcon/>
                        </ListItemIcon>
                        <ListItemText primary={ "Konto" }/>
                    </ListItem>
                </Link>
            </List>
        </div>
    );


    return (
        <>
            {/*<LinearProgress color="secondary" />*/}
            <div style={{width: "100%", height: 4, backgroundColor: "#3f51b5"}}></div>

            <AppBar position="static" elevation={3} className={styles.wrapper}>
                <Container maxWidth="lg">
                    <Toolbar >
                        <Typography align="left" variant="h6" className={ styles.logo }>
                            IMS
                        </Typography>
                        { isMobile ? (
                            <React.Fragment key="sideNav">
                                <IconButton
                                    edge="start"
                                    className={ styles.menuButton }
                                    color="inherit"
                                    aria-label="menu"
                                    onClick={ toggleDrawer(true) }
                                >
                                    <MenuIcon/>
                                </IconButton>

                                <Drawer
                                    anchor={ "left" }
                                    open={ drawer }
                                    onClose={ toggleDrawer(false) }
                                >
                                    { list() }
                                </Drawer>
                            </React.Fragment>
                        ) : (
                            <>
                                <Link to="/orders" className={ styles.navbarLink }>
                                    <Button type="button" variant={"text"} color="inherit">
                                        Zamówienia
                                    </Button>
                                </Link>
                                <Link to="/products" className={ styles.navbarLink }>
                                    <Button color="inherit"> Produkty </Button>
                                </Link>
                                <Link to="/customers" className={ styles.navbarLink }>
                                    <Button color="inherit"> Klienci </Button>
                                </Link>

                                <Link to="/admin_panel" className={styles.navbarLink}>
                                    <Button color="inherit">
                                        <SettingsIcon/>
                                    </Button>
                                </Link>

                                <Button
                                    style={{fontWeight: "bold", color: "yellow"}}
                                    aria-controls="user-menu"
                                    aria-haspopup="true"
                                    onClick={ handleUserMenuOpen }
                                    startIcon={<AccountCircleIcon/>}
                                > {username} </Button>
                                <Menu
                                    id="user-menu"
                                    anchorEl={ userMenu }
                                    keepMounted
                                    open={ Boolean(userMenu) }
                                    onClose={ handleUserMenuClose }
                                >
                                    <MenuItem onClick={ handleLogoutClick }>Wyloguj</MenuItem>
                                </Menu>
                            </>
                        ) }
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}

function mapStateToProps(state) {
    const {username, roles} = state.authentication;
    return {
        username, roles
    };
}

export default connect(mapStateToProps)(Navbar);