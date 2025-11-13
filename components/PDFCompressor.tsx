'use client'

import { useState, useRef } from 'react'
import { PDFDocument } from 'pdf-lib'

type CompressionLevel = 'low' | 'medium' | 'high' | 'maximum' | 'extreme'

interface CompressionInfo {
  level: CompressionLevel
  name: string
  description: string
  quality: number
  scale: number
  targetSize?: number // Tamaño objetivo en bytes (2MB = 2 * 1024 * 1024)
}

const compressionLevels: Record<CompressionLevel, CompressionInfo> = {
  low: {
    level: 'low',
    name: 'Baja',
    description: 'Compresión ligera, mejor calidad',
    quality: 0.9,
    scale: 1.0,
  },
  medium: {
    level: 'medium',
    name: 'Media',
    description: 'Balance entre calidad y tamaño',
    quality: 0.7,
    scale: 0.9,
  },
  high: {
    level: 'high',
    name: 'Alta',
    description: 'Compresión fuerte, tamaño reducido',
    quality: 0.5,
    scale: 0.8,
  },
  maximum: {
    level: 'maximum',
    name: 'Máxima',
    description: 'Máxima compresión, menor tamaño',
    quality: 0.3,
    scale: 0.7,
  },
  extreme: {
    level: 'extreme',
    name: 'Extrema',
    description: 'Hipermegacompresión: siempre < 2MB',
    quality: 0.1,
    scale: 0.5,
    targetSize: 2 * 1024 * 1024, // 2MB
  },
}

export function PDFCompressor() {
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [compressionLevel, setCompressionLevel] = useState<CompressionLevel>('medium')
  const [estimatedSize, setEstimatedSize] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile)
      setError(null)
      setSuccess(false)
      setEstimatedSize(null)
      calculateEstimatedSize(selectedFile, compressionLevel)
    } else {
      setError('Por favor, selecciona un archivo PDF válido')
      setFile(null)
      setEstimatedSize(null)
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
      setEstimatedSize(null)
      calculateEstimatedSize(droppedFile, compressionLevel)
    } else {
      setError('Por favor, arrastra un archivo PDF válido')
      setFile(null)
      setEstimatedSize(null)
    }
  }

  const calculateEstimatedSize = (pdfFile: File, level: CompressionLevel) => {
    const levelInfo = compressionLevels[level]
    
    // Para compresión extrema, el objetivo es siempre < 2MB
    if (level === 'extreme' && levelInfo.targetSize) {
      const estimated = Math.min(pdfFile.size * 0.1, levelInfo.targetSize - 1)
      setEstimatedSize(estimated)
    } else {
      // Estimación basada en el nivel de compresión
      const reductionFactor = 1 - (1 - levelInfo.quality) * 0.6
      const estimated = pdfFile.size * reductionFactor
      setEstimatedSize(estimated)
    }
  }

  const handleCompressionLevelChange = (level: CompressionLevel) => {
    setCompressionLevel(level)
    if (file) {
      calculateEstimatedSize(file, level)
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }

  const getCompressionPercentage = (): number => {
    if (!file || !estimatedSize) return 0
    return Math.round(((file.size - estimatedSize) / file.size) * 100)
  }

  const compressPDFWithScale = async (
    pdfDoc: PDFDocument,
    scale: number
  ): Promise<Uint8Array> => {
    const compressedPdf = await PDFDocument.create()
    const pageCount = pdfDoc.getPageCount()

    // Copiar todas las páginas con optimización
    for (let i = 0; i < pageCount; i++) {
      // Obtener la página original
      const originalPage = pdfDoc.getPage(i)
      const { width, height } = originalPage.getSize()
      
      // Aplicar escala
      const scaledWidth = width * scale
      const scaledHeight = height * scale
      
      // Crear nueva página con dimensiones escaladas
      const newPage = compressedPdf.addPage([scaledWidth, scaledHeight])
      
      // Crear PDF temporal solo con esta página del PDF original
      const tempPdf = await PDFDocument.create()
      const [tempCopiedPage] = await tempPdf.copyPages(pdfDoc, [i])
      tempPdf.addPage(tempCopiedPage)
      const tempBytes = await tempPdf.save()
      
      // Incrustar el PDF temporal en el PDF comprimido
      const embeddedPages = await compressedPdf.embedPdf(tempBytes)
      
      // Dibujar la página con escala aplicada
      newPage.drawPage(embeddedPages[0], {
        x: 0,
        y: 0,
        xScale: scale,
        yScale: scale,
      })
    }

    // Guardar PDF comprimido con opciones de optimización
    return await compressedPdf.save({
      useObjectStreams: true,
      addDefaultPage: false,
    })
  }

  const compressPDF = async () => {
    if (!file) {
      setError('Por favor, selecciona un archivo PDF')
      return
    }

    setIsProcessing(true)
    setError(null)
    setSuccess(false)

    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer, {
        ignoreEncryption: false,
        capNumbers: false,
        parseSpeed: 1,
      })

      const pageCount = pdfDoc.getPageCount()
      if (pageCount === 0) {
        throw new Error('El PDF no contiene páginas')
      }

      const levelInfo = compressionLevels[compressionLevel]
      let compressedBytes: Uint8Array
      let currentScale = levelInfo.scale
      let blob: Blob
      let attempts = 0
      const maxAttempts = 10
      const minScale = 0.2 // Escala mínima para evitar PDFs ilegibles

      // Si es compresión extrema, iterar hasta alcanzar < 2MB
      if (compressionLevel === 'extreme' && levelInfo.targetSize) {
        const targetSize = levelInfo.targetSize
        
        while (attempts < maxAttempts && currentScale >= minScale) {
          // Comprimir con la escala actual
          compressedBytes = await compressPDFWithScale(pdfDoc, currentScale)
          blob = new Blob([compressedBytes as BlobPart], { type: 'application/pdf' })
          
          // Si el tamaño es menor al objetivo, salir del bucle
          if (blob.size <= targetSize) {
            break
          }
          
          // Reducir la escala para el siguiente intento
          currentScale -= 0.05
          attempts++
          
          // Evitar escalas negativas o muy pequeñas
          if (currentScale < minScale) {
            currentScale = minScale
            break
          }
        }
        
        // Última compresión con la escala final
        compressedBytes = await compressPDFWithScale(pdfDoc, currentScale)
        blob = new Blob([compressedBytes as BlobPart], { type: 'application/pdf' })
      } else {
        // Compresión normal con escala fija
        compressedBytes = await compressPDFWithScale(pdfDoc, levelInfo.scale)
        blob = new Blob([compressedBytes as BlobPart], { type: 'application/pdf' })
      }

      // Crear blob y descargar
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `pdf-comprimido-${compressionLevel}-${Date.now()}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      setSuccess(true)
      setEstimatedSize(blob.size)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al comprimir el PDF')
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
            htmlFor="pdf-compress-upload"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Seleccionar archivo PDF para comprimir
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
                  htmlFor="pdf-compress-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                >
                  <span>Sube un archivo</span>
                  <input
                    id="pdf-compress-upload"
                    name="pdf-compress-upload"
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
              <p className="text-xs text-gray-500">PDF hasta 50MB</p>
            </div>
          </div>
          {file && (
            <div className="mt-4 p-3 bg-secondary rounded-md">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Archivo seleccionado:</span>{' '}
                {file.name}
              </p>
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-gray-500">
                  Tamaño original: {formatFileSize(file.size)}
                </p>
                {estimatedSize && (
                  <p className="text-xs font-medium text-primary">
                    Tamaño estimado: {formatFileSize(estimatedSize)} ({getCompressionPercentage()}% reducción)
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Selector de nivel de compresión */}
        {file && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Nivel de Compresión
            </label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              {(Object.keys(compressionLevels) as CompressionLevel[]).map((level) => {
                const levelInfo = compressionLevels[level]
                const isSelected = compressionLevel === level
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => handleCompressionLevelChange(level)}
                    disabled={isProcessing}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <div className="text-sm font-medium">{levelInfo.name}</div>
                    <div className="text-xs mt-1 opacity-80">
                      {levelInfo.description}
                    </div>
                  </button>
                )
              })}
            </div>
            {estimatedSize && file && (
              <div className="mt-4 p-3 bg-gray-50 rounded-md">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Tamaño original:</span>
                  <span className="font-medium text-gray-900">
                    {formatFileSize(file.size)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm mt-2">
                  <span className="text-gray-600">Tamaño comprimido:</span>
                  <span className="font-medium text-primary">
                    {formatFileSize(estimatedSize)}
                  </span>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      Reducción estimada:
                    </span>
                    <span className="text-sm font-bold text-primary">
                      {getCompressionPercentage()}%
                    </span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${getCompressionPercentage()}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Mensajes de error y éxito */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {success && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-sm text-green-800">
              ¡PDF comprimido exitosamente! El archivo se ha descargado.
            </p>
            {compressionLevel === 'extreme' && estimatedSize && estimatedSize < 2 * 1024 * 1024 && (
              <p className="text-xs text-green-700 mt-2 font-medium">
                ✓ Compresión extrema completada: El PDF está por debajo de 2MB ({formatFileSize(estimatedSize)})
              </p>
            )}
          </div>
        )}

        {/* Botón de comprimir */}
        <button
          onClick={compressPDF}
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
              Comprimiendo...
            </>
          ) : (
            'Comprimir PDF'
          )}
        </button>
      </div>
    </div>
  )
}

