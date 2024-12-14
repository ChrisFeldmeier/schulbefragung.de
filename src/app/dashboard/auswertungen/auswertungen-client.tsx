'use client'

import { useState } from 'react'
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'

// Import data
import chartData from '@/app/data/chart.json'
import abteilungenData from '@/app/data/tbl_Abteilung.json'
import klassenData from '@/app/data/tbl_Klasse.json'
import lehrerData from '@/app/data/tbl_Lehrer.json'
import fragenData from '@/app/data/tbl_Frage.json'

interface FilterState {
  schuljahr: string
  abteilung: string
  klasse: string
  lehrer: string
  chartType: 'bar' | 'line' | 'pie' | 'area' | 'stacked-area'
}

const DATA_SERIES = [
  { key: 'trifft mehr als zu', color: '#90caf9' },
  { key: 'Durchschnitt', color: '#e91e63' },
  { key: 'trifft voll zu', color: '#4caf50' },
  { key: 'trifft eher zu', color: '#2196f3' },
  { key: 'teils teils', color: '#ff9800' },
  { key: 'trifft eher nicht zu', color: '#f44336' },
  { key: 'trifft nicht zu', color: '#ffeb3b' },
]

const AVAILABLE_SCHULJAHRE = [
  { id: '2017/2018', name: '2017/2018' },
  { id: '2018/2019', name: '2018/2019' },
  { id: '2019/2020', name: '2019/2020' },
]

const CHART_TYPES = [
  { id: 'bar', name: 'Balkendiagramm' },
  { id: 'line', name: 'Liniendiagramm' },
  { id: 'pie', name: 'Kreisdiagramm' },
  { id: 'area', name: 'Flächendiagramm' },
  { id: 'stacked-area', name: 'Flächenstufendiagramm' },
]

export default function AuswertungenClient() {
  const [filters, setFilters] = useState<FilterState>({
    schuljahr: '2017/2018',
    abteilung: '',
    klasse: '',
    lehrer: '',
    chartType: 'bar'
  })

  // State für sichtbare Datenreihen
  const [visibleSeries, setVisibleSeries] = useState<{ [key: string]: boolean }>(
    Object.fromEntries(DATA_SERIES.map(series => [series.key, true]))
  )

  // Toggle Funktion für Datenreihen
  const handleSeriesClick = (dataKey: string) => {
    setVisibleSeries(prev => ({
      ...prev,
      [dataKey]: !prev[dataKey]
    }))
  }

  // Get data from JSON files
  const abteilungen = abteilungenData.resource
  const klassen = klassenData.resource
  const lehrer = lehrerData.resource
  const fragen = fragenData.resource

  // Filter klassen based on selected abteilung
  const filteredKlassen = filters.abteilung
    ? klassen.filter(k => k.abt_AbteilungID === parseInt(filters.abteilung))
    : klassen

  // Filter lehrer based on selected abteilung
  const filteredLehrer = filters.abteilung
    ? lehrer.filter(l => l.abt_AbteilungID === parseInt(filters.abteilung) || l.abt_AbteilungID === null)
    : lehrer

  // Transform chart data
  const transformedData = chartData.resource.columns[0].slice(1).map((value, index) => ({
    name: `${index + 1}`,
    'trifft nicht zu': value,
    'trifft eher nicht zu': chartData.resource.columns[1][index + 1],
    'teils teils': chartData.resource.columns[2][index + 1],
    'trifft eher zu': chartData.resource.columns[3][index + 1],
    'trifft voll zu': chartData.resource.columns[4][index + 1],
    'Durchschnitt': chartData.resource.columns[5][index + 1],
  }))

  const renderChart = () => {
    const commonProps = {
      margin: {
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      },
      data: transformedData
    }

    // Gemeinsame Eigenschaften für die Legende
    const legendProps = {
      onClick: (e: any) => handleSeriesClick(e.dataKey || e.value),
      formatter: (value: string) => (
        <span style={{ 
          color: visibleSeries[value] ? '#000' : '#999',
          cursor: 'pointer'
        }}>
          {value}
        </span>
      )
    }

    switch (filters.chartType) {
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend {...legendProps} />
            {DATA_SERIES.map(series => (
              <Bar 
                key={series.key}
                dataKey={series.key} 
                stackId="a" 
                fill={series.color}
                hide={!visibleSeries[series.key]}
              />
            ))}
          </BarChart>
        )
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend {...legendProps} />
            {DATA_SERIES.map(series => (
              <Line 
                key={series.key}
                type="monotone" 
                dataKey={series.key} 
                stroke={series.color}
                hide={!visibleSeries[series.key]}
              />
            ))}
          </LineChart>
        )
      case 'area':
      case 'stacked-area':
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend {...legendProps} />
            {DATA_SERIES.map(series => (
              <Area 
                key={series.key}
                type="monotone" 
                dataKey={series.key} 
                stackId={filters.chartType === 'stacked-area' ? "1" : undefined}
                fill={series.color} 
                stroke={series.color}
                hide={!visibleSeries[series.key]}
              />
            ))}
          </AreaChart>
        )
      case 'pie':
        // Für das Kreisdiagramm müssen wir die Daten anders filtern
        const pieData = Object.entries(transformedData[0])
          .filter(([key]) => key !== 'name' && key !== 'Durchschnitt')
          .map(([key, value]) => ({
            name: key,
            value: visibleSeries[key] ? (value as number) : 0
          }))
        return (
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => {
                const series = DATA_SERIES.find(s => s.key === entry.name)
                return <Cell key={`cell-${index}`} fill={series?.color || '#000000'} />
              })}
            </Pie>
            <Tooltip />
            <Legend {...legendProps} />
          </PieChart>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">QmbS Auswertung</h1>
      
      <div className="grid grid-cols-4 gap-6">
        {/* Left sidebar with filters */}
        <div className="col-span-1">
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">Auswahl</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Schuljahr</label>
                <Select
                  value={filters.schuljahr}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, schuljahr: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Schuljahr wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {AVAILABLE_SCHULJAHRE.map((jahr) => (
                      <SelectItem key={jahr.id} value={jahr.id}>
                        {jahr.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Abteilung</label>
                <Select
                  value={filters.abteilung}
                  onValueChange={(value) => setFilters(prev => ({ 
                    ...prev, 
                    abteilung: value,
                    klasse: '', // Reset dependent filters
                    lehrer: ''
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Abteilung wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {abteilungen.map((abt) => (
                      <SelectItem key={abt.abt_AbteilungID} value={abt.abt_AbteilungID.toString()}>
                        {abt.abt_Bezeichnung}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Klasse</label>
                <Select
                  value={filters.klasse}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, klasse: value }))}
                  disabled={!filters.abteilung}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Klasse wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredKlassen.map((klasse) => (
                      <SelectItem key={klasse.kla_KlasseID} value={klasse.kla_Bezeichnung}>
                        {klasse.kla_Bezeichnung}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Lehrer</label>
                <Select
                  value={filters.lehrer}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, lehrer: value }))}
                  disabled={!filters.abteilung}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Lehrer wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredLehrer.map((lehrer) => (
                      <SelectItem key={lehrer.leh_LehrerID} value={lehrer.leh_LehrerID.toString()}>
                        {`${lehrer.leh_Vorname} ${lehrer.leh_Name}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </div>

        {/* Main content with chart */}
        <div className="col-span-3">
          <Card className="p-6">
            {/* Chart type selector */}
            <div className="flex justify-end mb-4">
              <Select
                value={filters.chartType}
                onValueChange={(value: FilterState['chartType']) => 
                  setFilters(prev => ({ ...prev, chartType: value }))
                }
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Diagrammtyp wählen" />
                </SelectTrigger>
                <SelectContent>
                  {CHART_TYPES.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="h-[600px]">
              <ResponsiveContainer width="100%" height="100%">
                {renderChart()}
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
} 