import { Navigation } from "@/components/navigation"
import { ProcessCards } from "@/components/process-cards"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Sparkles, Zap, Brain, Target } from "lucide-react"
import { NetworkParticles } from "@/components/networkparticles"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <NetworkParticles/>
      <Navigation />

      <section className="overflow-hidden bg-gradient-to-b from-[#000035] via-[#7879FF] to-[#000035]">
        <div className="absolute inset-0"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="fade-in">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-balance tracking-tight">
                <span className="text-gradient">YogaMind</span>
              </h1>
            </div>
            <div className="slide-up" style={{ animationDelay: "0.2s" }}>
              <p className="text-xl lg:text-2xl text-gradient mb-12 text-pretty max-w-3xl mx-auto leading-relaxed font-extrabold">
                Experience the future of yoga with AI-powered pose detection and personalized wellness journeys crafted
                just for you
              </p>
            </div>
            <div className="slide-up flex flex-col sm:flex-row gap-6 justify-center" style={{ animationDelay: "0.4s" }}>
              <Button asChild size="lg" className="text-lg px-8 py-6 gradient-blue text-white hover-lift">
                <Link href="/pose-prediction">
                  <Zap className="mr-3 w-5 h-5" />
                  Try Pose Detection
                  <ArrowRight className="ml-3 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-gradient-to-b from-[#6767dd] via-[#7879FF] to-[#8a8af8] text-lg px-8 py-6 text-white hover-lift">
                <Link href="/plan-generator">
                  <Sparkles className="mr-3 w-5 h-5" />
                  Generate Plan
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-[#000035] via-[#7879FF] to-[#000035]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gradient">
              Powered by <span className="text-gradient">Advanced AI</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-gradient font-extrabold">
              Our cutting-edge technology analyzes your poses and creates personalized yoga routines
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-b from-[#9b9bf0] via-[#7879FF] to-[#8a8af8] rounded-2xl p-8 hover-lift">
              <div className="w-12 h-12 bg-gradient-to-b from-[#000035] via-[#7879FF] to-[#000035] rounded-xl flex items-center justify-center mb-6">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-gradient text-xl font-extrabold mb-4">Smart Pose Detection</h3>
              <p className="text-gradient leading-relaxed font-extrabold">
                Upload your yoga pose images and get instant AI-powered analysis with detailed feedback and corrections
              </p>
            </div>

            <div className="bg-gradient-to-b from-[#9b9bf0] via-[#7879FF] to-[#8a8af8] rounded-2xl p-8 hover-lift">
              <div className="w-12 h-12 bg-gradient-to-b from-[#000035] via-[#7879FF] to-[#000035] rounded-xl flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-gradient text-xl font-extrabold mb-4">Personalized Plans</h3>
              <p className="text-gradient leading-relaxed font-extrabold">
                Generate custom yoga routines based on your experience level, goals, and available time
              </p>
            </div>
          </div>
        </div>
      </section>

      <ProcessCards />

      <section className="py-24 bg-gradient-to-b from-[#000035] via-[#7879FF] to-[#4949FF]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-gradient text-3xl lg:text-4xl font-extrabold mb-6">Ready to Transform Your Practice?</h2>
            <p className="text-lg text-gradient font-extrabold mb-12 leading-relaxed">
              Join thousands of yogis who have discovered their perfect practice with YogaMind's AI-powered guidance
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6 gradient-blue text-white hover-lift">
                <Link href="/pose-prediction">
                  Start with Pose Detection
                  <ArrowRight className="ml-3 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-gradient-to-b from-[#6767dd] via-[#7879FF] to-[#8a8af8] text-lg text-white px-8 py-6 hover-lift">
                <Link href="/plan-generator">Create Your Plan</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
