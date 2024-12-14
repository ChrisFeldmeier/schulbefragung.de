'use client'

import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const departmentData = {
  labels: ['IT', 'Metall I', 'Metall II', 'KFZ', 'Elektro', 'Friseure', 'Ernährung I', 'Ernährung II', 'Landwirtschaft'],
  datasets: [
    {
      label: 'Durchschnittliche Zufriedenheit',
      data: [4.2, 3.8, 3.9, 4.1, 3.7, 4.0, 3.9, 3.8, 3.6],
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      borderColor: 'rgb(59, 130, 246)',
      borderWidth: 1,
    },
  ],
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 5,
      ticks: {
        stepSize: 1,
      },
    },
  },
}

export function DepartmentOverview() {
  return (
    <div className="h-[300px]">
      <Bar data={departmentData} options={options} />
    </div>
  )
} 