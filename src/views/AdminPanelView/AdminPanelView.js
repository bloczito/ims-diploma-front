import React, { useEffect, useState } from "react";
import { AppBar, Box, Button, Container, Grid, Paper, Tab, Tabs, Typography } from "@material-ui/core";
import { roleService } from "../../_service/role.service";
import { userService } from "../../_service";

import styles from "./AdminPanelView.module.scss";

import UserModal from "../../components/UserModal/UserModal";
import RoleModal from "../../components/NewRoleModal/RoleModal";
import DefaultTable from "../../components/DefaultTable/DefaultTable";
import TabPanel from "../../components/TabPanel/TabPanel";
import { connect } from "react-redux";
import { notificationActions } from "../../_actions";

const rolesColumnsDefs = ["Nazwa", "Info"];

const usersColumnsDefs = [
    "Nazwa użytkownika",
    "Imię",
    "Nazwisko",
    "Skrót",
    "Email",
    "Telefon",
    "Stanowisko",
    "Uprawnienia",
]


const mapRolesToRows = (roles) =>
    roles.map(role => ({
        id: role.id,
        cells: [
            role.name,
            role.info,
        ]
    }));


const mapUsersToRows = (users) =>
    users.map(user => ({
        id: user.id,
        cells: [
            user.username,
            user.firstName,
            user.lastName,
            user.shortcut,
            user.email,
            user.phone,
            user.job,
            user.roles.map(role => role.name).join(", ")
        ]
    }))


const AdminPanelView = ({showSuccess, showFailure}) => {

    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
    const [reload, setReload] = useState(0);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedRoleId, setSelectedRoleId] = useState(null);


    const loadInitData = async () => {
        const rolesResponse = await roleService.getAll();
        const usersResponse = await userService.getAll();

        setUsers(usersResponse.resource);
        setRoles(rolesResponse.resource);
    }

    useEffect( () => {
       loadInitData();

    }, [reload]);

    const reloadData = () => setReload(prevState => prevState + 1);

    const handleOpenUserModal = id => {
        setSelectedUserId(id);
        setIsUserModalOpen(true);
    }

    const handleOpenRoleModal = id => {
        setSelectedRoleId(id);
        setIsRoleModalOpen(true);
    }

    const handleCloseUserModal = () => {
        setSelectedUserId(null);
        setIsUserModalOpen(false);
    }

    const handleCloseRoleModal = () => {
        setSelectedRoleId(null);
        setIsRoleModalOpen(false);
    }

    const handleRoleSubmit = formData => {
        const isCreated = selectedRoleId != null;

        roleService.save(formData)
            .then(res => {
                if (res.success) {
                    showSuccess(isCreated ? "Zaktualizowano rolę" : "Dodano rolę");
                    reloadData();
                } else {
                    showFailure(res.error);
                }
            })

        handleCloseRoleModal();
    }

    const handleUserSubmit = formData => {
        const isCreated = selectedUserId != null;
        userService.save(formData)
            .then(res => {
                if (res.success) {
                    showSuccess(isCreated ? "Zaktualizowano użytkownika" : "Dodano użytkownika");
                    // showSuccess("Lorem ipsum at dolores \nLorem ipsum at dolores Lorem \n ipsum at dolores Lorem ipsum at dolores\n Lorem ipsum at dolores Lorem ipsum at dolores Lorem ipsum at dolores Lorem ipsum at dolores ");

                    reloadData();
                } else {
                    showFailure(res.error);
                }
            })
        handleCloseUserModal();
    }

    return (
        <>
            <Container>
               <Grid container className={styles.row}>
                   {
                       activeTab ? (
                           <Button color="primary" variant="contained" onClick={() => setIsRoleModalOpen(true)}>
                               Dodaj role
                           </Button>
                       ) : (
                           <Button color="primary" variant="contained" onClick={() => setIsUserModalOpen(true)}>
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

                <TabPanel activeTab={activeTab} index={0}>
                    {/*<UsersTable users={users} />*/}
                    <DefaultTable
                        route="/users"
                        rows={mapUsersToRows(users)}
                        headerCells={usersColumnsDefs}
                        onClick={handleOpenUserModal}
                    />
                </TabPanel>
                <TabPanel activeTab={activeTab} index={1}>
                    <DefaultTable
                        route="/roles"
                        rows={mapRolesToRows(roles)}
                        headerCells={rolesColumnsDefs}
                        onClick={handleOpenRoleModal}
                    />
                </TabPanel>
            </Container>

            <UserModal
                isOpen={isUserModalOpen}
                onClose={handleCloseUserModal}
                submitFn={handleUserSubmit}
                id={selectedUserId}
            />

            <RoleModal
                submitFn={handleRoleSubmit}
                onCancel={handleCloseRoleModal}
                isOpen={isRoleModalOpen}
                id={selectedRoleId}
            />
        </>
    )
}

const mapDispatchToProps = dispatch => ({
    showSuccess: (message) => dispatch(notificationActions.showSuccess(message)),
    showFailure: (message) => dispatch(notificationActions.showFailure(message)),
})

export default connect(
    null,
    mapDispatchToProps
)(AdminPanelView);