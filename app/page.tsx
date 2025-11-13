'use client'

import { useState } from 'react'
import { PDFMerger } from '@/components/PDFMerger'
import { PDFCompressor } from '@/components/PDFCompressor'

type TabType = 'merge' | 'compress'

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('merge')

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Herramientas PDF
          </h1>
          <p className="text-lg text-gray-600">
            Une páginas o comprime tus archivos PDF
          </p>
        </div>

        {/* Pestañas */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('merge')}
                className={`${
                  activeTab === 'merge'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
              >
                <span className="flex items-center">
                  <svg
                    className="mr-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Unir Páginas
                </span>
              </button>
              <button
                onClick={() => setActiveTab('compress')}
                className={`${
                  activeTab === 'compress'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
              >
                <span className="flex items-center">
                  <svg
                    className="mr-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                  Comprimir PDF
                </span>
              </button>
            </nav>
          </div>
        </div>

        {/* Contenido de las pestañas */}
        <div>
          {activeTab === 'merge' && (
            <div>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Unir PDF en Una Página
                </h2>
                <p className="text-gray-600">
                  Sube un PDF multipágina y únelo en una sola página larga
                </p>
              </div>
              <PDFMerger />
            </div>
          )}

          {activeTab === 'compress' && (
            <div>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Comprimir PDF
                </h2>
                <p className="text-gray-600">
                  Reduce el tamaño de tu PDF eligiendo el nivel de compresión
                </p>
              </div>
              <PDFCompressor />
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

