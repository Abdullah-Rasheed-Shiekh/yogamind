"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, ImageIcon, Video, Brain, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { predictPose, predictPoseVideo, type PosePredictionResponse } from "@/lib/api"

export default function PosePredictionPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [prediction, setPrediction] = useState<PosePredictionResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
        setSelectedFile(file)
        setError(null)
      } else {
        setError("Please upload an image or video file")
      }
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
        setSelectedFile(file)
        setError(null)
      } else {
        setError("Please upload an image or video file")
      }
    }
  }

  const handlePredict = async () => {
    if (!selectedFile) return

    setIsLoading(true)
    setError(null)

    try {
      let result: PosePredictionResponse

      try {
        // Check if the selected file is a video or image
        const fileType = selectedFile.type
        if (fileType.startsWith("video/")) {
          // Call predictPoseVideo for video files
          result = await predictPoseVideo(selectedFile)
        } else if (fileType.startsWith("image/")) {
          // Call predictPose for image files
          result = await predictPose(selectedFile)
        } else {
          throw new Error("Unsupported file type. Please upload an image or video file.")
        }
      } catch (error) {
        console.error("Prediction failed:", error)
        setError("Prediction failed. Please try again.")
        return
      }

      // Handle the prediction result
      console.log("Prediction result:", result)
      setPrediction(result)
    } finally {
      setIsLoading(false)
    }
  }

  const resetUpload = () => {
    setSelectedFile(null)
    setPrediction(null)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#000035] via-[#7879FF] to-[#000035]">
      <Navigation />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gradient mb-4">Yoga Pose Detection</h1>
            <p className="text-lg text-gradient font-bold max-w-2xl mx-auto">
              Upload an image or video and let our AI predict your yoga pose with detailed analysis.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <Card className="bg-gradient-to-b from-[#000035] via-[#7879FF] to-[#000035]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gradient font-extrabold text-2xl">
                  <Upload className="w-5 h-5 text-white" />
                  Upload Media
                </CardTitle>
                <CardDescription className="text-gradient font-extrabold text-sm">Drag and drop or click to select an image or video file</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={cn(
                    "border-2 border-dashed rounded-lg p-8 text-center bg-gradient-to-b from-[#000035] via-[#7879FF] to-[#9292fc] cursor-pointer",
                    dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 text-white",
                    selectedFile && "border-primary bg-primary/5 text-white",
                  )}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById("file-upload")?.click()}
                >
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileSelect}
                    className="text-white hidden"
                  />

                  {selectedFile ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-center">
                        {selectedFile.type.startsWith("image/") ? (
                          <ImageIcon className="w-12 h-12 text-white" />
                        ) : (
                          <Video className="w-12 h-12 text-white" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-white">{selectedFile.name}</p>
                        <p className="text-sm text-white">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <Button variant="outline" size="sm" onClick={resetUpload} className="font-extrabold text-gradient">
                        Choose Different File
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="w-12 h-12 text-white mx-auto" />
                      <div>
                        <p className="text-gradient font-extrabold">Drop your file here</p>
                        <p className="text-sm text-gradient font-extrabold">or click to browse</p>
                      </div>
                      <p className="text-sm text-gradient font-extrabold">Supports: JPG, PNG, MP4, MOV</p>
                    </div>
                  )}
                </div>

                {error && <p className="text-destructive text-sm mt-2">{error}</p>}

                <Button onClick={handlePredict} disabled={!selectedFile || isLoading} className="w-full mt-4 bg-gradient-to-b from-[#000035] via-[#121277] to-[#000035]" size="lg">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin text-white" />
                      Analyzing Pose...
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4 mr-2 text-gradient" />
                      Predict Pose
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="bg-gradient-to-b from-[#000035] via-[#7879FF] to-[#000035]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl text-white">
                  <Brain className="w-5 h-5 text-white" />
                  Prediction Results
                </CardTitle>
                <CardDescription className="text-gradient font-extrabold text-md">AI analysis of your uploaded media</CardDescription>
              </CardHeader>
              <CardContent>
                {prediction ? (
                  <div className="space-y-6">
                    <div className="text-center p-6 bg-primary/5 rounded-lg border border-primary/20">
                      <h3 className="text-2xl font-bold text-gradient mb-2">{prediction.pose}</h3>
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="text-2xl font-bold text-gradient">Confidence:</span>
                        <span className="font-semibold text-gradient text-2xl">
                          {(prediction.confidence * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${prediction.confidence * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-extrabold text-white">Pose Description</h4>
                      <p className="text-white font-semibold leading-relaxed">{prediction.description}</p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-white font-extrabold">Benefits</h4>
                      {prediction.benefits && prediction.benefits.length > 0 ? (
                        <ul className="text-white font-semibold space-y-1 text-sm">
                          {prediction.benefits.map((benefit, index) => (
                            <li key={index}>• {benefit}</li>
                          ))}
                        </ul>
                      ) : (
                        <ul className="text-white space-y-1 text-sm">
                          <li>• Improves flexibility and strength</li>
                          <li>• Enhances balance and coordination</li>
                          <li>• Promotes mindfulness and relaxation</li>
                        </ul>
                      )}
                    </div>

                    <Button onClick={resetUpload} className="w-full bg-gradient-to-b from-[#000035] via-[#121277] to-[#000035] text-white">
                      Analyze Another Pose
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Brain className="w-16 h-16 text-white mx-auto mb-4" />
                    <p className="text-white">Upload a file and click "Predict Pose" to see AI analysis</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
