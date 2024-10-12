import React from 'react';
import { Button } from "../../../untitled/src/components/ui/button"
import { Input } from "../../../untitled/src/components/ui/input"
import { Card, CardContent } from "./ui/card"
import { BrainCircuit, FileType, Image, Mail, Mic, PenTool, Sparkles, Youtube } from "lucide-react"
import Link from "next/link"

export function LandingPageComponent() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-gray-900 dark:text-white">
                  Transform Any Content into Smart Notes
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 mt-4">
                  Moshi Notes uses advanced AI to convert and organize content from various sources. Turn videos, PDFs,
                  presentations, images, and voice recordings into intelligent, actionable notes.
                </p>
              </div>
              <div className="space-x-4 mt-8">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-lg">Get Started</Button>
                <Button variant="outline" className="border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-6 py-2 rounded-full text-lg">Learn More</Button>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-gray-900 dark:text-white">
              Powerful Features
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Sparkles, title: "AI-Powered Insights", description: "Our advanced AI analyzes your notes, providing summaries, action items, and connections you might have missed." },
                { icon: Youtube, title: "Video to Notes", description: "Convert YouTube videos and other video content into structured notes, complete with timestamps and key points." },
                { icon: FileType, title: "PDF & PPT Conversion", description: "Transform PDFs and PowerPoint presentations into editable, searchable notes with preserved formatting." },
                { icon: Image, title: "Image to Note Conversion", description: "Instantly convert images of handwritten notes, whiteboards, or documents into editable, searchable text." },
                { icon: Mic, title: "Voice to Notes", description: "Turn voice recordings into text notes, perfect for capturing ideas on-the-go or transcribing meetings." },
                { icon: Mail, title: "Email Integration", description: "Seamlessly turn important emails into notes and tasks, keeping all your information in one place." },
              ].map((feature, index) => (
                <Card key={index} className="border-0 shadow-lg dark:bg-gray-700">
                  <CardContent className="p-6">
                    <feature.icon className="w-10 h-10 mb-4 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-gray-900 dark:text-white">
              How Moshi Notes Solves Your Problems
            </h2>
            <div className="grid gap-8 lg:grid-cols-2">
              {[
                { title: "Information Overload", description: "Moshi Notes uses AI to summarize and organize content from various sources, helping you quickly find and understand key information without getting overwhelmed." },
                { title: "Time-Consuming Content Processing", description: "Our AI automatically converts videos, PDFs, presentations, and voice recordings into structured notes, saving you hours of manual transcription and organization." },
                { title: "Disconnected Ideas Across Platforms", description: "Moshi Notes brings together content from various sources, allowing you to see connections between ideas from videos, documents, images, and more in one unified platform." },
                { title: "Difficulty in Capturing and Organizing Thoughts", description: "With voice-to-text and image-to-text features, Moshi Notes makes it easy to capture ideas anytime, anywhere, and automatically organizes them for easy retrieval." },
              ].map((item, index) => (
                <div key={index} className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-white">
                  Ready to Revolutionize Your Note-Taking?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400 mt-4">
                  Join thousands of professionals who have transformed their productivity with Moshi Notes.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2 mt-8">
                <form className="flex space-x-2">
                  <Input className="flex-1 rounded-full" placeholder="Enter your email" type="email" />
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full">Get Started</Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Start your free 14-day trial. No credit card required.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}