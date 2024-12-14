'use client'

import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const trendData = {
  labels: ['2017/18', '2018/19', '2019/20', '2020/21', '2021/22', '2022/23', '2023/24'],
  datasets: [
    {
      label: 'Gesamtzufriedenheit',
      data: [3.8, 3.9, 3.7, 3.9, 4.0, 4.1, 4.2],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      tension: 0.3,
    },
    {
      label: 'Unterrichtsqualität',
      data: [3.9, 4.0, 3.8, 4.0, 4.1, 4.2, 4.3],
      borderColor: 'rgb(34, 197, 94)',
      backgroundColor: 'rgba(34, 197, 94, 0.5)',
      tension: 0.3,
    },
  ],
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
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

export function SatisfactionTrends() {
  return (
    <div className="h-[300px]">
      <Line data={trendData} options={options} />
    </div>
  )
}