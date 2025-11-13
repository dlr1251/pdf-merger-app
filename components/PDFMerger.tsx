'use client'

import { useState, useRef } from 'react'
import { PDFDocument } from 'pdf-lib'

export function PDFMerger() {
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile)
      setError(null)
      setSuccess(false)
    } else {
      setError('Por favor, selecciona un archivo PDF válido')
      setFile(null)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const droppedFile = e.dataTransfer.files?.[0]
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile)
      setError(null)
      setSuccess(false)
    } else {
      setError('Por favor, arrastra un archivo PDF válido')
      setFile(null)
    }
  }

  const processPDF = async () => {
    if (!file) {
      setError('Por favor, selecciona un archivo PDF')
      return
    }

    setIsProcessing(true)
    setError(null)
    setSuccess(false)

    try {
      // Leer el archivo PDF
      const arrayBuffer = await file.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      const pageCount = pdfDoc.getPageCount()
      
      if (pageCount === 0) {
        throw new Error('El PDF no contiene páginas')
      }

      // Crear un nuevo PDF
      const mergedPdf = await PDFDocument.create()

      // Calcular el ancho máximo y la altura total
      let maxWidth = 0
      let totalHeight = 0

      // Primera pasada: calcular dimensiones
      for (let i = 0; i < pageCount; i++) {
        const page = pdfDoc.getPage(i)
        const { width, height } = page.getSize()
        maxWidth = Math.max(maxWidth, width)
        totalHeight += height
      }

      // Crear una nueva página con las dimensiones calculadas
      const mergedPage = mergedPdf.addPage([maxWidth, totalHeight])

      // Segunda pasada: incrustar y dibujar cada página
      let currentY = totalHeight

      for (let i = 0; i < pageCount; i++) {
        const page = pdfDoc.getPage(i)
        const { width, height } = page.getSize()
        
        // Crear un PDF temporal solo con esta página
        const tempPdf = await PDFDocument.create()
        const [copiedPage] = await tempPdf.copyPages(pdfDoc, [i])
        tempPdf.addPage(copiedPage)
        
        // Guardar el PDF temporal
        const tempPdfBytes = await tempPdf.save()
        
        // Incrustar el PDF temporal en el PDF principal
        const embeddedPdfPages = await mergedPdf.embedPdf(tempPdfBytes)
        
        // Ajustar la posición Y (empezar desde arriba)
        currentY -= height
        
        // Dibujar la primera página del PDF incrustado
        mergedPage.drawPage(embeddedPdfPages[0], {
          x: 0,
          y: currentY,
          xScale: 1,
          yScale: 1,
        })
      }

      // Generar el PDF final
      const mergedPdfBytes = await mergedPdf.save()

      // Crear un blob y descargar
      const blob = new Blob([mergedPdfBytes as BlobPart], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `pdf-unido-${Date.now()}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      setSuccess(true)
      setFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al procesar el PDF')
      console.error('Error:', err)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
      <div className="space-y-6">
        {/* Área de carga de archivo */}
        <div>
          <label
            htmlFor="pdf-upload"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Seleccionar archivo PDF
          </label>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg transition-colors ${
              isDragging
                ? 'border-primary bg-secondary'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="pdf-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                >
                  <span>Sube un archivo</span>
                  <input
                    id="pdf-upload"
                    name="pdf-upload"
                    type="file"
                    accept=".pdf"
                    className="sr-only"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    disabled={isProcessing}
                  />
                </label>
                <p className="pl-1">o arrastra y suelta</p>
              </div>
              <p className="text-xs text-gray-500">PDF hasta 10MB</p>
            </div>
          </div>
          {file && (
            <div className="mt-4 p-3 bg-secondary rounded-md">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Archivo seleccionado:</span>{' '}
                {file.name}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Tamaño: {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          )}
        </div>

        {/* Mensajes de error y éxito */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {success && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-sm text-green-800">
              ¡PDF procesado exitosamente! El archivo se ha descargado.
            </p>
          </div>
        )}

        {/* Botón de procesar */}
        <button
          onClick={processPDF}
          disabled={!file || isProcessing}
          className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isProcessing ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Procesando...
            </>
          ) : (
            'Unir Páginas en Una'
          )}
        </button>
      </div>
    </div>
  )
}

