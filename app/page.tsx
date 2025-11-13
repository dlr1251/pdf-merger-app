'use client'

import { useState } from 'react'
import { PDFMerger } from '@/components/PDFMerger'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Unir PDF en Una Página
          </h1>
          <p className="text-lg text-gray-600">
            Sube un PDF multipágina y únelo en una sola página larga
          </p>
        </div>
        <PDFMerger />
      </div>
    </main>
  )
}

