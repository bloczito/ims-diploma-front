import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Card, CardActions, CardContent, Collapse, Grid, TextField, Typography } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const initialContactInfo = {
    contactName: null,
    contactSurname: null,
    contactTitle: null,
}

const initialAddress = {
    street: null,
    houseNumber: null,
    apartmentNumber: null,
    postcode: null,
    city: null,
    voivodeship: null,
    country: null,
}

const NewObjectForm = ({submitNewObject}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [contactInfo, setContactInfo] = useState(initialContactInfo)
    const [address, setAddress] = useState(initialAddress);
    const [renderValue, setRenderValue] = useState(0);

    const handleUpdateAddress = evt => {
        const {value, name} = evt.target;

        setAddress(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleUpdateContactInfo = evt => {
        const {value, name} = evt.target;

        setContactInfo(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmitObject = () => {
        const newCustomerObject = {
            ...contactInfo,
            address
        }

        submitNewObject(newCustomerObject);

        setAddress(initialAddress);
        setContactInfo(initialContactInfo);
        reRender();
        setIsExpanded(false);
    }

    const reRender = () => setRenderValue(prevState => prevState + 1);

    return (
        <>
            <Button
                variant={isExpanded ? "outlined" : "contained"}
                color={isExpanded ? "secondary" : "primary"}
                type="button"
                disableElevation
                fullWidth
                onClick={() => setIsExpanded(prevState => !prevState)}
                startIcon={isExpanded ? <CancelIcon/> : <AddCircleIcon/>}
            >
                <Typography variant="button">
                    {isExpanded ? "Anuluj" : "Nowy obiekt"}
                </Typography>
            </Button>
            <Collapse in={isExpanded} style={{width: "100%", marginTop: 10}} timeout="auto" key={renderValue}>
                <Card variant="outlined">
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <TextField
                                    label="Tytuł"
                                    value={contactInfo.contactTitle}
                                    name="contactTitle"
                                    onChange={handleUpdateContactInfo}
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <TextField
                                    label="Imię"
                                    value={contactInfo.contactName}
                                    name="contactName"
                                    onChange={handleUpdateContactInfo}
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <TextField
                                    label="Nazwisko"
                                    value={contactInfo.contactSurname}
                                    name="contactSurname"
                                    onChange={handleUpdateContactInfo}
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <TextField
                                    label="Ulica"
                                    value={address.street}
                                    name="street"
                                    onChange={handleUpdateAddress}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    label="Nr domu"
                                    value={address.houseNumber}
                                    name="houseNumber"
                                    onChange={handleUpdateAddress}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    label="Numer miesz."
                                    value={address.apartmentNumber}
                                    name="apartmentNumber"
                                    onChange={handleUpdateAddress}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Kod pocztowy"
                                    value={address.postcode}
                                    name="postcode"
                                    onChange={handleUpdateAddress}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Miasto"
                                    value={address.city}
                                    name="city"
                                    onChange={handleUpdateAddress}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Województwo"
                                    value={address.voivodeship}
                                    name="voivodeship"
                                    onChange={handleUpdateAddress}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Kraj"
                                    value={address.country}
                                    name="country"
                                    onChange={handleUpdateAddress}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Button
                            variant="contained"
                            color="primary"
                            type="button"
                            onClick={handleSubmitObject}
                            disableElevation
                            fullWidth
                            startIcon={<AddCircleIcon/>}
                            disabled={!address.street || !address.houseNumber || !address.city}
                        >
                            Dodaj obiekt
                        </Button>
                    </CardActions>
                </Card>
            </Collapse>
        </>
    );
}

NewObjectForm.propTypes = {
    submitNewObject: PropTypes.func.isRequired,
}

export default NewObjectForm;