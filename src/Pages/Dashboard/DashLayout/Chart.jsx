import React from 'react'
import './Chart.css'
import {
    LineChart, Line,
    XAxis, CartesianGrid, Tooltip,
    ResponsiveContainer
} from 'recharts';


export default function Chart({ data }) {
    return (
        <div className="chart">
            <h3 className="chartTitle">User Analytics</h3>
            <ResponsiveContainer width="100%" aspect={4 / 1}>
                <LineChart data={data} >
                    <XAxis dataKey="name" stroke="#5550bd" />
                    <Line type="monotone" dataKey="Users" />
                    <Tooltip />
                    <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
