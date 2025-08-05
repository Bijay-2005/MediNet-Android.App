import { useState, useRef } from "react"
import { Upload, FileText, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function UploadPrescription() {
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      console.log('File dropped:', files[0].name)
    }
  }

  const handleBrowseFiles = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      console.log('File selected:', file.name)
    }
  }

  const handleTakePhoto = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          console.log('Camera access granted')
        })
        .catch(err => {
          console.error('Camera access denied:', err)
        })
    }
  }

  return (
    <Card className="bg-gradient-to-br from-orange-50 via-white to-orange-100 shadow-lg border-orange-200 animate-fade-in-up hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="text-lg sm:text-xl font-bold text-center flex items-center justify-center gap-2 text-orange-600">
          <Upload className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600 animate-bounce" />
          Upload Your Prescription
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={`
            border-2 border-dashed rounded-xl p-4 sm:p-6 lg:p-8 text-center transition-all duration-300
            ${isDragOver 
              ? 'border-orange-500 bg-orange-100 scale-105 shadow-lg' 
              : 'border-orange-300 hover:border-orange-500 hover:bg-orange-50'
            }
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="space-y-3 sm:space-y-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">Drag & Drop Your Prescription</h3>
              <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4">
                Or click to browse and upload your prescription image
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
              <Button variant="default" size="sm" className="gap-2 bg-orange-600 hover:bg-orange-700 text-white transition-all duration-200 hover:scale-105 shadow-md" onClick={handleBrowseFiles}>
                <Upload className="h-4 w-4" />
                Browse Files
              </Button>
              <Button variant="default" size="sm" className="gap-2 bg-orange-600 hover:bg-orange-700 text-white transition-all duration-200 hover:scale-105 shadow-md" onClick={handleTakePhoto}>
                <Camera className="h-4 w-4" />
                Take Photo
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Supported formats: JPG, PNG, PDF (Max size: 10MB)
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}