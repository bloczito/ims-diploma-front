import React, { useEffect, useState } from "react";
import { AppBar, Box, Button, Container, Grid, Paper, Tab, Tabs, Typography } from "@material-ui/core";
import { roleService } from "../../_service/role.service";
import { userService } from "../../_service";

import styles from "./AdminPanelView.module.scss";

import NewUserModal from "../../components/NewUserModal/NewUserModal";
import NewRoleModal from "../../components/NewRoleModal/NewRoleModal";
import DefaultTable from "../../components/DefaultTable/DefaultTable";
import TabPanel from "../../components/TabPanel/TabPanel";

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
        ]
    }))

// const TabPanel = (props) => {
//     const { children, value, index, ...other } = props;
//
//     return (
//         <div
//             role="tabpanel"
//             hidden={value !== index}
//             id={`simple-tabpanel-${index}`}
//             aria-labelledby={`simple-tab-${index}`}
//             {...other}
//         >
//             {value === index && (
//                 <Box pt={3}>
//                     <Typography>{children}</Typography>
//                 </Box>
//             )}
//         </div>
//     );
// }
//
// TabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.any.isRequired,
//     value: PropTypes.any.isRequired,
// };

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

    useEffect( () => {
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

                <TabPanel activeTab={activeTab} index={0}>
                    {/*<UsersTable users={users} />*/}
                    <DefaultTable
                        route="/users"
                        rows={mapUsersToRows(users)}
                        headerCells={usersColumnsDefs}
                    />
                </TabPanel>
                <TabPanel activeTab={activeTab} index={1}>
                    <DefaultTable
                        route="/roles"
                        rows={mapRolesToRows(roles)}
                        headerCells={rolesColumnsDefs}
                    />
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