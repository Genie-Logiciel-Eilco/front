import React from 'react'
import "./DashHome.css"
import FeaturedInfo from './FeaturedInfo'
import Chart from './Chart'


export default function DashHome() {
    const data = [
        {
            name: 'Jan',
            "Users": 4241,
        },
        {
            name: 'Feb',
            "Users": 1234,
        },
        {
            name: 'Mars',
            "Users": 2314,
        },
        {
            name: 'Avr',
            "Users": 3214,
        },
        {
            name: 'Mai',
            "Users": 3213,
        },
        {
            name: 'Jun',
            "Users": 6343,
        },
        {
            name: 'Jul',
            "Users": 2346,
        },
        {
            name: 'Aug',
            "Users": 1256,
        },
        {
            name: 'Sept',
            "Users": 1231,
        },
        {
            name: 'Oct',
            "Users": 3254,
        },
        {
            name: 'Nov',
            "Users": 3125,
        },
        {
            name: 'Dec',
            "Users": 2789,
        },
    ];

    return (
        <div className="home">
            <FeaturedInfo />
            <Chart data={data} />
        </div>
    )
}
