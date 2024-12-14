'use client'

import React from 'react'
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

const facilityData = {
  labels: [
    'Lernmittel & Geräte',
    'Sauberkeit',
    'Aufenthaltsbereiche',
    'Parkplätze',
    'Klassenräume'
  ],
  datasets: [
    {
      label: 'Zufriedenheit',
      data: [3.8, 4.2, 3.9, 3.5, 4.0],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgb(75, 192, 192)',
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
    tooltip: {
      callbacks: {
        label: function(context: any) {
          return `Zufriedenheit: ${context.raw.toFixed(1)}`
        }
      }
    }
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

export function FacilityFeedback() {
  return (
    <div className="h-[300px]">
      <Bar data={facilityData} options={options} />
    </div>
  )
} 