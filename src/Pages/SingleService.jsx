import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getService, updateService, getServices, updateServiceImage, createService } from '../store/slices/serviceSlice';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Box, CircularProgress, TextField, Button, FormControl, InputLabel, Select, MenuItem, Typography, Paper,
    OutlinedInput,
    Checkbox,
    ListItemText,
    FormControlLabel,
    Switch
} from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function SingleService({ create }) {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [imageUploading, setImageUploading] = useState(false);
    const { services } = useSelector(state => state.services);
    const [serviceData, setServiceData] = useState({
        ar: '',
        fr: '',
        category: '',
        price: '',
        imageUrl: '',
        optional: false,
        maxChoice: '',
        included_services: [],
        optional_services: []
    });

    const currentService = useMemo(() => services.find(p => p.id == id), [services, id]);
    const allServices = useMemo(() => services.filter(s => s.id != id), [services, id]);
    useEffect(() => {
        if (currentService) {
            setServiceData(currentService);
        } else {
            dispatch(getServices());
        }
    }, [currentService, dispatch]);

    const handleChange = (event) => {
        const { name, value, checked, type } = event.target;
        setServiceData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };
    const handleImageUpload = async () => {
        const formData = new FormData();
        formData.append('imageUrl', image);

        setImageUploading(true);
        try {
            const response = await dispatch(updateServiceImage({ id, formData })).unwrap()

            console.log('Upload successful', response);
            setImageUploading(false);
        } catch (error) {
            console.error('Failed to upload image:', error);
            setImageUploading(false);
        }
    };
    const handleMultiSelectChange = (event, type) => {
        setServiceData(prev => ({
            ...prev,
            [type]: event.target.value
        }));
    };
    useEffect(() => {
        const fetchServices = async () => {
            setLoading(true);
            try {
                await dispatch(getServices()).unwrap();
            } catch (error) {
                console.error('Failed to fetch users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, [dispatch]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(serviceData)
        setLoading(true);
        try {
            create ? await dispatch(createService(serviceData)).unwrap() : await dispatch(updateService({ id, ...serviceData })).unwrap();
            navigate('/services'); // Navigate back to the list or dashboard
        } catch (error) {
            console.error('Failed to update service:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Paper sx={{ p: 4, margin: 'auto', maxWidth: 600, flexGrow: 1 }}>
            {!create && <Typography variant="h6" gutterBottom>
                Edit {currentService?.fr}
            </Typography>}
            {create && <Typography variant="h6" gutterBottom>
                Create Service
            </Typography>}
            {!create && <FormControl fullWidth margin="normal">
                <Button
                    variant="contained"
                    component="label"
                >
                    Upload Image
                    <input
                        type="file"
                        hidden
                        onChange={handleImageChange}
                    />
                </Button>
                {image && <Typography>{image.name}</Typography>}
                <Button
                    onClick={handleImageUpload}
                    sx={{ mt: 2 }}
                    disabled={!image || imageUploading}
                >
                    {imageUploading ? 'Uploading...' : 'Upload Image'}
                </Button>
            </FormControl>}
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"

                    fullWidth
                    id="fr"
                    label="French Name"
                    name="fr"
                    autoComplete="fr"
                    autoFocus
                    value={serviceData.fr}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"

                    fullWidth
                    name="ar"
                    label="Arabic Name"
                    type="text"
                    id="ar"
                    autoComplete="current-ar"
                    value={serviceData.ar}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    name="price"
                    label="Price"
                    type="number"
                    id="price"
                    value={serviceData.price}
                    onChange={handleChange}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                        labelId="category-label"
                        id="category"
                        name="category"
                        value={serviceData.category}
                        label="Category"
                        onChange={handleChange}
                    >
                        <MenuItem value="maid">Maid</MenuItem>
                        <MenuItem value="plombier">Plombier</MenuItem>
                        <MenuItem value="electricien">Electricien</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel id="included-services-label">Included Services</InputLabel>
                    <Select
                        labelId="included-services-label"
                        multiple
                        value={serviceData.included_services.map(p => p?.id ?? p)}
                        onChange={e => handleMultiSelectChange(e, 'included_services')}
                        input={<OutlinedInput label="Included Services" />}
                        renderValue={(selected) => selected?.map(id => allServices.find(s => s.id === parseInt(id))?.fr).join(', ')}
                        MenuProps={MenuProps}
                    >
                        {allServices.map((service) => (
                            <MenuItem key={service.id} value={parseInt(service.id)}>
                                <Checkbox checked={serviceData?.included_services?.some(p => p.id == service.id)} />
                                <ListItemText primary={service.fr} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <FormControlLabel
                        control={
                            <Switch
                                checked={serviceData.optional}
                                onChange={handleChange}
                                name="optional"
                                color="primary"
                            />
                        }
                        label="Optional"
                    />
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel id="optional-services-label">Optional Services</InputLabel>
                    <Select
                        labelId="optional-services-label"
                        multiple
                        value={serviceData?.optional_services.map(p => p?.id ?? p)}
                        onChange={e => handleMultiSelectChange(e, 'optional_services')}
                        input={<OutlinedInput label="Optional Services" />}
                        renderValue={(selected) => selected.map(id => allServices.find(s => s.id == id)?.fr).join(', ')}
                        MenuProps={MenuProps}
                    >
                        {allServices.map((service) => (
                            <MenuItem key={service.id} value={service.id}>
                                <Checkbox checked={serviceData?.optional_services?.some(p => p.id == service.id)} />
                                <ListItemText primary={service.fr} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    {create ? 'Create Service' : 'Update Service'}
                </Button>
            </Box>
        </Paper>
    );
}

export default SingleService;
