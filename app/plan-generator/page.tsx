"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Sparkles, Clock, User, Target, Loader2, Play } from "lucide-react"
import { generateYogaPlan, type YogaPlanRequest, type YogaPlanResponse } from "@/lib/api"

export default function PlanGeneratorPage() {
  const [level, setLevel] = useState<string>("")
  const [goal, setGoal] = useState<string>("")
  const [duration, setDuration] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [plan, setPlan] = useState<YogaPlanResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const levels = ["Beginner", "Intermediate", "Advanced"]
  const goals = ["Relaxation", "Flexibility", "Strength", "Weight Loss", "Back Pain Relief"]

  const handleGeneratePlan = async () => {
    if (!level || !goal || !duration) {
      setError("Please fill in all fields")
      return
    }

    const durationNum = Number.parseInt(duration)
    if (isNaN(durationNum) || durationNum < 5 || durationNum > 90) {
      setError("Duration must be between 5 and 90 minutes")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const request: YogaPlanRequest = {
        level,
        goal,
        duration: durationNum,
      }

      let result: YogaPlanResponse

      try {
        result = await generateYogaPlan(request)
        setPlan(result)
      } catch (apiError) {
        console.log("[v0] API not available, using mock data:", apiError)
        // Fallback to mock data if API is not available
        await new Promise((resolve) => setTimeout(resolve, 30)) // Simulate loading
      }

      
    } catch (err) {
      console.error("[v0] Plan generation error:", err)
      setError("Failed to generate plan. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setLevel("")
    setGoal("")
    setDuration("")
    setPlan(null)
    setError(null)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return secs === 0 ? `${mins} min` : `${mins} min ${secs} sec`
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#000035] via-[#7879FF] to-[#000035]">
      <Navigation />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gradient mb-4">Personalized Yoga Plans</h1>
            <p className="text-lg text-gradient font-semibold max-w-2xl mx-auto">
              Select your level and desired session length to get a customized yoga routine tailored to your goals.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <Card className="bg-gradient-to-b from-[#000035] via-[#7879FF] to-[#000035]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white text-2xl">
                  <User className="w-5 h-5 text-white" />
                  Your Preferences
                </CardTitle>
                <CardDescription className="text-white text-md font-semibold">Tell us about your yoga experience and goals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-white">
                <div className="space-y-2 text-white">
                  <Label htmlFor="level">Skill Level</Label>
                  <Select value={level} onValueChange={setLevel}>
                    <SelectTrigger className="text-white">
                      <SelectValue placeholder="Select your skill level" className="text-white"/>
                    </SelectTrigger>
                    <SelectContent className="">
                      {levels.map((l) => (
                        <SelectItem key={l} value={l}>
                          {l}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 text-white">
                  <Label htmlFor="goal">Primary Goal</Label>
                  <Select value={goal} onValueChange={setGoal}>
                    <SelectTrigger>
                      <SelectValue placeholder="What's your main focus?" />
                    </SelectTrigger>
                    <SelectContent>
                      {goals.map((g) => (
                        <SelectItem key={g} value={g}>
                          {g}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 text-white">
                  <Label htmlFor="duration">Session Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    placeholder="e.g., 20"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    min="5"
                    max="90"
                  />
                  <p className="text-xs text-white">Between 5 and 90 minutes</p>
                </div>

                {error && <p className="text-destructive text-sm">{error}</p>}

                <Button onClick={handleGeneratePlan} disabled={isLoading} className="w-full bg-gradient-to-b from-[#000035] via-[#020227] to-[#000035]" size="lg">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin text-white" />
                      Generating Plan...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate My Plan
                    </>
                  )}
                </Button>

                {plan && (
                  <Button onClick={resetForm} className="w-full bg-gradient-to-b from-[#b2b2d4] via-[#8989d6] to-[#6161d6]">
                    Create New Plan
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-b from-[#000035] via-[#7879FF] to-[#000035]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl text-white">
                  <Target className="w-5 h-5" />
                  Your Yoga Plan
                </CardTitle>
                <CardDescription className="text-md text-white font-semibold">Personalized routine based on your preferences</CardDescription>
              </CardHeader>
              <CardContent>
                {plan ? (
                  <div className="space-y-6">
                    {/* Plan Summary */}
                    <div className="p-4 bg-gradient-to-b from-[#1f1f36] via-[#8989d6] to-[#6161d6] rounded-lg border border-primary/20">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-white">
                          {plan.level} {plan.goal} Session
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-white">
                          <Clock className="w-4 h-4" />
                          {formatTime(plan.totalTime)}
                        </div>
                      </div>
                      <p className="text-sm text-white">
                        {plan.poses.length} poses • Designed for {plan.duration} minutes
                      </p>
                    </div>

                    {/* Poses List */}
                    <div className="space-y-4 ">
                      <h4 className="font-semibold text-white text-md">Routine Breakdown</h4>
                      {plan.poses.map((pose, index) => (
                        <div
                          key={index}
                          className="flex gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors bg-gradient-to-b from-[#1f1f36] via-[#8989d6] to-[#6161d6]"
                        >
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-gradient-to-b from-[#1f1f36] via-[#8989d6] to-[#6161d6] rounded-lg flex items-center justify-center">
                              <span className="text-white font-semibold">{index + 1}</span>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h5 className="font-medium text-white">{pose.name}</h5>
                              <div className="flex items-center gap-2">
                                <span className="text-xs bg-secondary text-black px-2 py-1 rounded-full">
                                  {pose.type}
                                </span>
                                <span className="text-sm text-white">{formatTime(pose.duration)}</span>
                              </div>
                            </div>
                            <p className="text-sm text-white leading-relaxed">{pose.description}</p>
                            <div className="flex gap-1 mt-2">
                              {pose.focus.map((f) => (
                                <span
                                  key={f}
                                  className="text-xs bg-accent/20 text-white px-2 py-1 rounded-full"
                                >
                                  {f}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Sparkles className="w-16 h-16 text-white mx-auto mb-4" />
                    <p className="text-white">
                      Fill out your preferences and generate a personalized yoga plan
                    </p>
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
