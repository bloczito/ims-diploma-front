import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
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
    MenuItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../_actions";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    },
    linkButton: {
        textDecoration: "none",
        color: "white"
    },
    linkDraw: {
        textDecoration: "none",
        color: "black"
    }
}));

const Navbar = ({ dispatch, username }) => {
    const classes = useStyles();
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
                <Link to="/orders" className={ classes.linkDraw }>
                    <ListItem button key={ "orders" }>
                        <ListItemText primary={ "Zamówienia" }/>
                    </ListItem>
                </Link>
                <Link to="/products" className={ classes.linkDraw }>
                    <ListItem button key={ "products" }>
                        <ListItemText primary={ "Produkty" }/>
                    </ListItem>
                </Link>
                <Link to="clients" className={ classes.linkDraw }>
                    <ListItem button key={ "clients" }>
                        <ListItemText primary={ "Klienci" }/>
                    </ListItem>
                </Link>
                <Link to="/account" className={ classes.linkDraw }>
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
        <div className={ classes.root }>
            <AppBar position="static">
                <Container maxWidth="lg">
                    <Toolbar>
                        <Typography align="left" variant="h6" className={ classes.title }>
                            IMS
                        </Typography>
                        { isMobile ? (
                            <React.Fragment key="sideNav">
                                <IconButton
                                    edge="start"
                                    className={ classes.menuButton }
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
                                <Link to="/orders" className={ classes.linkButton }>
                                    <Button type="button" color="inherit"> Zamówienia </Button>
                                </Link>
                                <Link to="/products" className={ classes.linkButton }>
                                    <Button color="inherit"> Produkty </Button>
                                </Link>
                                <Link to="/clients" className={ classes.linkButton }>
                                    <Button color="inherit"> Klienci </Button>
                                </Link>

                                <Button
                                    style={{fontWeight: "bold", color: "yellow"}}
                                    aria-controls="user-menu"
                                    aria-haspopup="true"
                                    onClick={ handleUserMenuOpen }
                                    endIcon={<AccountCircleIcon/>}
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
        </div>
    );
}

function mapStateToProps(state) {
    const {username} = state.authentication;
    return {
        username
    };
}

export default connect(mapStateToProps)(Navbar);