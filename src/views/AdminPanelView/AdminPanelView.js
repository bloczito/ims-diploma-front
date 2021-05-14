import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AppBar, Box, Button, Container, Grid, Paper, Tab, Tabs, Typography } from "@material-ui/core";
import { roleService } from "../../_service/role.service";
import { userService } from "../../_service";

import styles from "./AdminPanelView.module.scss";

import NewUserModal from "../../components/NewUserModal/NewUserModal";
import NewRoleModal from "../../components/NewRoleModal/NewRoleModal";

const tabs = {
    USERS_TAB: "USERS_TAB",
    ROLES_TAB: "ROLES_TAB",
}

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const AdminPanelView = () => {

    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
    const [reload, setReload] = useState(0);
    const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
    const [isNewRoleModalOpen, setIsNewRoleModalOpen] = useState(false);

    const loadInitData = async () => {
        const rolesResponse = await roleService.getAll();
        const usersResponse = await userService.getAll();

        setUsers(usersResponse.resource);
        setRoles(rolesResponse.resource);
    }

    useEffect(async () => {
       loadInitData();

    }, [reload]);

    const reloadData = () => setReload(prevState => prevState + 1);

    // const handleOpenNewUserModal = () => setIsNewUserModalOpen(true)

    return (
        <>
            <Container>
               <Grid container className={styles.row}>
                   {
                       activeTab ? (
                           <Button color="primary" variant="contained" onClick={() => setIsNewRoleModalOpen(true)}>
                               Dodaj role
                           </Button>
                       ) : (
                           <Button color="primary" variant="contained" onClick={() => setIsNewUserModalOpen(true)}>
                               Dodaj użytnownika
                           </Button>
                       )
                   }
               </Grid>


                <AppBar position="relative" color="inherit" elevation={0} component={Paper}>
                    <Tabs value={activeTab} onChange={((event, value) => setActiveTab(value))}>
                        <Tab
                            label="Użytkownicy"
                            tabIndex={0}
                        />
                        <Tab
                            label="Role"
                            tabIndex={1}
                        />
                    </Tabs>
                </AppBar>

                <TabPanel value={activeTab} index={0}>
                    <ul>
                        {users.map(user => <li key={user.id}>{user.firstName}</li>)}
                    </ul>
                </TabPanel>
                <TabPanel value={activeTab} index={1}>
                    <ul>
                        {roles.map(role => <li key={role.id}>{role.name}</li>)}
                    </ul>
                </TabPanel>
            </Container>

            <NewUserModal
                isOpen={isNewUserModalOpen}
                handleModalClose={() => setIsNewUserModalOpen(false)}
                handleNewUserSubmit={data => console.log(data)}
            />

            <NewRoleModal
                handleNewRoleSubmit={data => console.log(data)}
                handleModalClose={() => setIsNewRoleModalOpen(false)}
                isOpen={isNewRoleModalOpen}
            />
        </>
    )
}


export default AdminPanelView;