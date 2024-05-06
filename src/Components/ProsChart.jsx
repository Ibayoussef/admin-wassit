import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProsChart = ({ data, first }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            {first && <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="email" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="projects_count" fill="#8884d8" name="Projects Worked" />
            </BarChart>}
            {!first && <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="email" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total_earned" fill="#82ca9d" name="Total Earned (dhs)" />
            </BarChart>}
        </ResponsiveContainer>
    );
};

export default ProsChart;
