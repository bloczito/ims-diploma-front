import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { connect } from "react-redux";
import {
    Button,
    Card, CardActions,
    CardContent,
    CardHeader,
    Container,
    Grid,
    IconButton,
    TextField,
    Typography
} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';

import { notificationActions } from "../../_actions";
import { customerObjectService, customerService } from "../../_service";
import { useFormik } from "formik";
import TextDivider from "../../components/TextDivider/TextDivider";
import NewObjectForm from "../../components/NewObjectForm/NewObjectForm";
import EditObjectModal from "../../components/EditObjectModal/EditObjectModal";
import Input from "../../components/Input/Input";


const CustomerDetailsView = ({showSuccess, showFailure}) => {
    const {id: customerId} = useParams();

    const [isEditingName, setIsEditingName] = useState(false);
    const [editingObjectIdx, setEditingObjectIdx] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const history = useHistory();

    const formik = useFormik({
        initialValues: {},
        enableReinitialize: true,
        onSubmit: values => {
            console.log("SUBMIT FORMIK", values);
            saveCustomer(values)
            // setSubmitting(false);
        }
    });
    const {values, isSubmitting} = formik;

    useEffect(() => {
        loadCustomer();
    }, []);

    const loadCustomer = () => {
        customerService.getById(customerId)
            .then(res => {
                if (res.success) {
                    formik.setValues({...res.resource})
                } else {
                    showFailure(`Nie udało się pobrać danych. Błąd: ${res.error}`)
                }
            })
    }

    const saveCustomer = customer => {
        customerService.updateCustomer(customer)
            .then(res => {
                if (res.success) {
                    showSuccess("Zapisano")
                } else {
                    showFailure("Nie udało się zapisać. Błąd: " + res.error)
                }
            })
            .finally(() => {
                formik.setSubmitting(false);
                loadCustomer();
            })

    }

    const handleSubmitNewObject = newObject => {
        formik.setFieldValue("customerObjects", [
            ...values.customerObjects,
            newObject
        ]);
    }

    const handleOpenModal = idx => {
        setEditingObjectIdx(idx);
        setIsModalOpen(true);
    }

    const handleUpdateObject = (idx, newObject) => {
        formik.setFieldValue(
            "customerObjects",
            (values.customerObjects || []).map((obj, currIdx) => {
                if (currIdx === idx) return newObject;
                return obj;
            })
        )
    }

    const handleDeleteCustomer = () => {
        customerService.deleteById(customerId)
            .then(res => {
                if (res?.success) {
                    history.push("/customers");
                    showSuccess("Usunięto klienta");
                } else {
                    showFailure("Nie udało się usunąć. Błąd: " + res?.error)
                }
            })
    }

    const handleDeleteObject = id => {
        customerObjectService.deleteCustomerObject(id)
            .then(res => {
                if (res?.success) {
                    showSuccess("Usunięto obiekt");
                    loadCustomer();
                } else {
                    showFailure("Nie udało się usunąć obiektu. Błąd: " + res?.error)
                }
            })
    }

    const EditButton = () => (
        <IconButton onClick={() => setIsEditingName(prevState => !prevState)}>
            <EditIcon/>
        </IconButton>
    )

    return (
        <>
            <Container>
                <Card elevation={0}>
                    <form onSubmit={formik.handleSubmit} autoComplete="off">
                        <CardHeader
                            title={
                                isEditingName ? (
                                    <>
                                        <Grid container spacing={2}>
                                            <Grid item>
                                                <TextField
                                                    variant="outlined"
                                                    label="Nazwa"
                                                    name="name"
                                                    value={values.name}
                                                    onChange={formik.handleChange}
                                                    size="small"
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    disabled={!values.name.length}
                                                    onClick={() => setIsEditingName(prevState => !prevState)}
                                                >
                                                    Zapisz
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </>
                                ) : (
                                    <Typography variant="h4" style={{fontWeight: "bold"}}>
                                        {values.name} <EditButton/>
                                    </Typography>
                                )}

                            action={
                                <Grid container spacing={1}>
                                    <Grid item>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            disableElevation
                                            disabled={isSubmitting}
                                            onClick={handleDeleteCustomer}
                                        >
                                            Usuń
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disableElevation
                                            disabled={isSubmitting}
                                            onClick={formik.submitForm}
                                        >
                                            Zapisz
                                        </Button>
                                    </Grid>
                                </Grid>
                            }
                        />
                        <CardContent>
                            <TextDivider label="Informacje ogólne"/>

                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <Input
                                        label="Email"
                                        value={values.email}
                                        name="email"
                                        type="email"
                                        onChange={formik.handleChange}
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <Input
                                        label="Nip"
                                        value={values.nip}
                                        name="nip"
                                        onChange={formik.handleChange}
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <Input
                                        label="Telefon"
                                        value={values.phone}
                                        name="phone"
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                            </Grid>

                            <TextDivider label="Adres"/>

                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <Input
                                        label="Ulica"
                                        value={values?.address?.street}
                                        name="address.street"
                                        onChange={formik.handleChange}
                                    />
                                </Grid>

                                <Grid item xs={2}>
                                    <Input
                                        label="Nr domu"
                                        value={values?.address?.houseNumber}
                                        name="address.houseNumber"
                                        onChange={formik.handleChange}
                                    />
                                </Grid>

                                <Grid item xs={2}>
                                    <Input
                                        label="Nr miesz."
                                        value={values?.address?.apartmentNumber}
                                        name="address.apartmentNumber"
                                        onChange={formik.handleChange}
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <Input
                                        label="Miasto"
                                        value={values?.address?.city}
                                        name="address.city"
                                        onChange={formik.handleChange}
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <Input
                                        label="Kod pocztowy"
                                        value={values?.address?.postcode}
                                        name="address.postcode"
                                        onChange={formik.handleChange}
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <Input
                                        label="Województwo"
                                        value={values?.address?.voivodeship}
                                        name="address.voivodeship"
                                        onChange={formik.handleChange}
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <Input
                                        label="Kraj"
                                        value={values?.address?.country}
                                        name="address.country"
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                            </Grid>

                            <TextDivider label="Obiekty"/>

                            <NewObjectForm submitNewObject={handleSubmitNewObject}/>

                            <Grid container spacing={2} style={{marginTop: 20}}>
                                {(values.customerObjects || []).map(({
                                                                        id,
                                                                         contactTitle,
                                                                         contactName,
                                                                         contactSurname,
                                                                         address
                                                                     }, index) => (
                                    <Grid item xs={4} key={id}>
                                        <Card variant="outlined" style={{width: "100%"}}>
                                            <CardContent>
                                                <Typography style={{fontWeight: "bold"}}>
                                                    {contactTitle} {contactName} {contactSurname}
                                                </Typography>
                                                <Typography>
                                                    {`ul. ${address?.street} ${address?.houseNumber + (address.apartmentNumber ? ("/" + address.apartmentNumber) : "")}`}
                                                </Typography>
                                                <Typography>
                                                    {`${address.postcode ? address.postcode : ""} ${address?.city}`}
                                                </Typography>
                                                <Typography>
                                                    {address.voivodeship ? address.voivodeship : ""}
                                                    {(address.voivodeship && address.country) && ", "}
                                                    {address?.country}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    size="small"
                                                    onClick={() => handleOpenModal(index)}
                                                >
                                                    Edytuj
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    color="secondary"
                                                    size="small"
                                                    onClick={() => handleDeleteObject(id)}
                                                >
                                                    Usuń
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </CardContent>
                    </form>
                </Card>
            </Container>
            <EditObjectModal
                onClose={() => setIsModalOpen(false)}
                objectIndex={editingObjectIdx}
                submitFn={handleUpdateObject}
                isOpen={isModalOpen}
                obj={editingObjectIdx != null ? values.customerObjects[editingObjectIdx] : {}}
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
)(CustomerDetailsView);
