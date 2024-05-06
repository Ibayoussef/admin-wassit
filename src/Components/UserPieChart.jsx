import React from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';

const UserPieChart = ({ data }) => {
    const pieData = [
        { name: "Users", value: data.reduce((acc, cur) => acc + cur.user_count, 0) },
        { name: "Pro Users", value: data.reduce((acc, cur) => acc + cur.pro_user_count, 0) }
    ];

    const COLORS = ['#0088FE', '#00C49F'];

    return (
        <PieChart width={400} height={300}>
            <Pie
                data={pieData}
                cx={200}
                cy={150}
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
            >
                {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
        </PieChart>
    );
};

export default UserPieChart;
