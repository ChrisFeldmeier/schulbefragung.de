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

const categoryData = {
  labels: ['Unterrichtsqualität', 'Infrastruktur', 'Betreuung', 'Kommunikation', 'Gesamtzufriedenheit'],
  datasets: [
    {
      label: 'Durchschnittliche Bewertung',
      data: [4.2, 3.9, 4.1, 3.8, 4.0],
      backgroundColor: [
        'rgba(54, 162, 235, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 99, 132, 0.6)',
      ],
      borderColor: [
        'rgb(54, 162, 235)',
        'rgb(75, 192, 192)',
        'rgb(255, 159, 64)',
        'rgb(153, 102, 255)',
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
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function(context: any) {
          return `Bewertung: ${context.raw.toFixed(1)}`
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

export function CategorySatisfaction() {
  return (
    <div className="h-[300px]">
      <Bar data={categoryData} options={options} />
    </div>
  )
} 