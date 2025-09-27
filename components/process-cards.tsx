"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, Brain, Sparkles, ArrowRight, Camera, Zap, Target } from "lucide-react"
import Link from "next/link"

export function ProcessCards() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#000035] via-[#7879FF] to-[#000035]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-gradient text-5xl lg:text-4xl font-extrabold mb-4">
            How <span className="text-gradient">YogaMind</span> Works
          </h2>
          <p className="text-lg text-gradient font-extrabold max-w-3xl mx-auto">
            Experience the future of yoga with our AI-powered platform that understands your body and creates
            personalized wellness journeys
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="bg-gradient-to-b from-[#9b9bf0] via-[#7879FF] to-[#8a8af8] hover-lift">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-gradient-to-b from-[#000035] via-[#7879FF] to-[#000035] w-12 h-12 rounded-xl flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-gradient text-xl font-extrabold">AI Pose Detection</CardTitle>
                  <CardDescription className="text-md text-gradient font-extrabold">
                    Advanced computer vision analyzes your yoga poses
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <div className="flex-1">
                  <h4 className="font-bold text-md">Upload Your Media</h4>
                  <p className="text-sm font-medium">Images or videos of your practice</p>
                </div>
                <Upload className="w-4 h-4 text-blue-500" />
              </div>

              <div className="flex justify-center">
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </div>

              <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <div className="flex-1">
                  <h4 className="font-bold text-md">AI Analysis</h4>
                  <p className="text-sm font-medium">Deep learning processes your poses</p>
                </div>
                <Brain className="w-4 h-4 text-purple-500" />
              </div>

              <div className="flex justify-center">
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </div>

              <div className="flex items-center gap-3 p-3 gradient-blue rounded-lg text-white">
                <div className="w-2 h-2 bg-white rounded-full" />
                <div className="flex-1">
                  <h4 className="font-bold text-md">Instant Results</h4>
                  <p className="text-sm font-medium opacity-90">Pose identification with feedback</p>
                </div>
                <Zap className="w-4 h-4 text-white" />
              </div>

              <Button asChild className="font-bold text-md w-full gradient-blue text-white hover-lift mt-6">
                <Link href="/pose-prediction">
                  Try Pose Detection <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-b from-[#9b9bf0] via-[#7879FF] to-[#8a8af8] hover-lift">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-gradient-to-b from-[#000035] via-[#7879FF] to-[#000035] w-12 h-12 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-gradient text-xl font-extrabold">Personalized Plans</CardTitle>
                  <CardDescription className="text-md text-gradient font-extrabold">Custom yoga routines tailored to your goals</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <div className="flex-1">
                  <h4 className="font-bold text-md">Set Preferences</h4>
                  <p className="text-sm font-medium">Skill level, duration, and goals</p>
                </div>
                <Sparkles className="w-4 h-4 text-blue-500" />
              </div>

              <div className="flex justify-center">
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </div>

              <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <div className="flex-1">
                  <h4 className="font-bold text-md">AI Generation</h4>
                  <p className="text-sm font-medium">Smart routine creation</p>
                </div>
                <Brain className="w-4 h-4 text-purple-500" />
              </div>

              <div className="flex justify-center">
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </div>

              <div className="flex items-center gap-3 p-3 gradient-blue rounded-lg text-white font-bold text-md">
                <div className="w-2 h-2 bg-white rounded-full" />
                <div className="flex-1">
                  <h4 className="font-bold text-md">Your Perfect Routine</h4>
                  <p className="text-medium opacity-90">Step-by-step personalized plan</p>
                </div>
                <Target className="w-4 h-4 text-white" />
              </div>

              <Button asChild className="w-full font-bold text-md gradient-blue text-white hover-lift mt-6">
                <Link href="/plan-generator">
                  Generate Your Plan <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
