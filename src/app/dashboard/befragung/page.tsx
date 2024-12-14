import { Suspense } from 'react'
import BefragungClient from './befragung-client'

export default function BefragungPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BefragungClient />
    </Suspense>
  )
} 