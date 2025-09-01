import React from 'react'

import {

Chart as ChartJS,

CategoryScale,

LinearScale,

BarElement,

LineElement,

PointElement,

Title,

Tooltip,

Legend,

} from 'chart.js'

import { Bar, Line } from 'react-chartjs-2'

ChartJS.register(

CategoryScale,

LinearScale,

BarElement,

LineElement,

PointElement,

Title,

Tooltip,

Legend

)