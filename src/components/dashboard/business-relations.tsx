'use client'

import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
)

const businessData = {
  labels: [
    'Sehr zufrieden',
    'Zufrieden',
    'Neutral',
    'Unzufrieden',
    'Sehr unzufrieden'
  ],
  datasets: [
    {
      data: [45, 30, 15, 7, 3],
      backgroundColor: [
        'rgba(75, 192, 192, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(255, 99, 132, 0.6)',
      ],
      borderColor: [
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(255, 206, 86)',
        'rgb(255, 159, 64)',
        'rgb(255, 99, 132)',
      ],
      borderWidth: 1,
    },
  ],
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right' as const,
    },
    tooltip: {
      callbacks: {
        label: function(context: any) {
          return `${context.label}: ${context.raw}%`
        }
      }
    }
  },
}

export function BusinessRelations() {
  return (
    <div className="h-[300px]">
      <Doughnut data={businessData} options={options} />
    </div>
  )
} 