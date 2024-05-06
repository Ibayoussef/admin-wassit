import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAnalytics } from '../store/slices/analyticsSlice';
import { Box, CircularProgress, Grid, Paper, Stack, Typography } from '@mui/material';
import UserPieChart from '../Components/UserPieChart';
import IncomeLineChart from '../Components/IncomLineChart';
import ServicesBarChart from '../Components/ServiceBarChart';
import ClientsChart from '../Components/ClientsChart';
import ProsChart from '../Components/ProsChart';
import { getUsers } from '../store/slices/usersSlice';

function Dashboard() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const { analytics } = useSelector(state => state.analytics)
    const { users } = useSelector((state) => state.users);
    const [clientsData, setClientsData] = useState([]);
    const [prosData, setProsData] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                await dispatch(getAnalytics()).unwrap();
                await dispatch(getUsers()).unwrap();
            } catch (error) {
                console.error('Failed to fetch users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [dispatch]);
    useEffect(() => {
        const parsedClients = [];
        const parsedPros = [];

        analytics.forEach(entry => {
            // Parse client projects
            const clientProjects = JSON.parse(entry.client_projects);
            Object.keys(clientProjects).forEach(clientId => {
                const user = users.find(user => user.id === clientId);
                console.log(clientId)
                const email = user ? user.email : 'Unknown';
                parsedClients.push({
                    email,
                    projects_count: clientProjects[clientId].projects_count,
                    total_spent: clientProjects[clientId].total_spent,
                });
            });

            // Parse pro projects
            const proProjects = JSON.parse(entry.pro_projects);
            Object.keys(proProjects).forEach(proId => {
                const user = users.find(user => user.id === proId);
                const email = user ? user.email : 'Unknown';
                parsedPros.push({
                    email,
                    projects_count: proProjects[proId].projects_count,
                    total_earned: proProjects[proId].total_earned,
                });
            });


        });

        setClientsData(parsedClients);
        setProsData(parsedPros);

    }, [analytics, users]);

    const aggregatedData = {};

    analytics.forEach(entry => {
        const stats = JSON.parse(entry.service_statistics);
        Object.keys(stats).forEach(key => {
            if (!aggregatedData[key]) {
                aggregatedData[key] = { service_name: key, project_count: 0 };
            }
            aggregatedData[key].project_count += stats[key].project_count;
        });
    });

    const chartData = Object.values(aggregatedData);
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
        <Box sx={{ maxWidth: '1200px', mx: 'auto', my: 4 }}>
            <Typography variant="h4" gutterBottom align="center">
                Dashboard
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            User Distribution
                        </Typography>
                        <UserPieChart data={analytics} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Income Over Time
                        </Typography>
                        <IncomeLineChart data={analytics} />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Services Demand
                        </Typography>
                        <ServicesBarChart data={chartData} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Clients Overview
                        </Typography>
                        <ClientsChart first data={clientsData} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Pros Performance
                        </Typography>
                        <ProsChart first data={prosData} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Clients Overview
                        </Typography>
                        <ClientsChart data={clientsData} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Pros Performance
                        </Typography>
                        <ProsChart data={prosData} />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}





export default Dashboard