"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  ExternalLink,
  Calendar,
  GraduationCap,
  Award,
  Code,
  Database,
  Cloud,
  Globe,
  Menu,
  X,
  Moon,
  Sun,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const lastScrollTime = useRef(0)

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Education", href: "#education" },
    { name: "Projects", href: "#projects" },
    { name: "Publications", href: "#publications" },
    { name: "Reading", href: "#resources" },
    { name: "Contact", href: "#contact" },
  ]

  const books = [
    { title: "The Library of Borrowed Hearts", author: "Lucy Gilmore" },
    { title: "How to Stop Time", author: "Matt Haig" },
    { title: "Atomic Habits", author: "James Clear" },
    { title: "The Kite Runner", author: "Khaled Hosseini" },
  ]

  // Mount check for theme hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // Throttled scroll handler for better performance
  const handleScroll = useCallback(() => {
    const now = Date.now()
    if (now - lastScrollTime.current < 50) return // Throttle to 50ms
    lastScrollTime.current = now

    setIsScrolled(window.scrollY > 50)

    // Update active section based on scroll position
    const sections = navItems.map((item) => item.href.substring(1))
    const currentSection = sections.find((section) => {
      const element = document.getElementById(section)
      if (element) {
        const rect = element.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom >= 100
      }
      return false
    })

    if (currentSection) {
      setActiveSection(currentSection)
    }
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.substring(1))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation Header */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className={`font-bold text-xl ${isScrolled ? "text-gray-900 dark:text-white" : "text-white"}`}>Vivek Keshava</div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-sm font-medium transition-colors ${
                    isScrolled
                      ? activeSection === item.href.substring(1)
                        ? "text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white font-semibold"
                        : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                      : activeSection === item.href.substring(1)
                        ? "text-white border-b-2 border-white font-semibold"
                        : "text-white/80 hover:text-white"
                  }`}
                >
                  {item.name}
                </button>
              ))}
              {/* Theme Toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                  className={`p-2 rounded-full transition-colors ${
                    isScrolled
                      ? "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              {/* Mobile Theme Toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                  className={`p-2 rounded-full transition-colors ${
                    isScrolled
                      ? "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              )}
              <button
                className="p-2"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className={`w-6 h-6 ${isScrolled ? "text-gray-900 dark:text-white" : "text-white"}`} />
                ) : (
                  <Menu className={`w-6 h-6 ${isScrolled ? "text-gray-900 dark:text-white" : "text-white"}`} />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  {item.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 md:py-24 pt-28 md:pt-36 overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient orbs */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
              {/* Profile Image - Left Side */}
              <div className="animate-fade-in-up delay-300 flex-shrink-0">
                <div className="relative">
                  <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl backdrop-blur-sm">
                    <Image
                      src="/images/vivek-profile.jpg"
                      alt="Vivek Keshava - Software Engineer"
                      width={350}
                      height={350}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      priority
                    />
                  </div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-xl -z-10"></div>
                </div>
              </div>

              {/* Content - Right Side */}
              <div className="flex-1 text-center lg:text-left">
                <div className="animate-fade-in-up">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">Vivek Keshava</h1>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/30">
                      Senior Software Engineer
                    </span>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/30">
                      Distributed Systems
                    </span>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/30">
                      AI Tooling
                    </span>
                  </div>
                </div>

                <div className="animate-fade-in-up delay-200">
                  <p className="text-lg mb-8 max-w-2xl mx-auto lg:mx-0 text-gray-200 leading-relaxed">
                    I build high-throughput backend systems. Recently scaled a used-car marketplace from{" "}
                    <strong className="text-white">2K to 1M daily users</strong>, and I'm building AI developer tooling
                    with LLMs and the Model Context Protocol.
                  </p>
                </div>

                <div className="animate-fade-in-up delay-400">
                  <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
                    <Button
                      asChild
                      variant="outline"
                      className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white hover:text-gray-900 transition-all duration-200 hover:scale-[1.02]"
                    >
                      <Link href="https://github.com/vivekkeshava" target="_blank">
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white hover:text-gray-900 transition-all duration-200 hover:scale-[1.02]"
                    >
                      <Link href="http://www.linkedin.com/in/vivekkeshava" target="_blank">
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white hover:text-gray-900 transition-all duration-200 hover:scale-[1.02]"
                    >
                      <Link href="mailto:vivek.keshava1@gmail.com">
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white dark:bg-gray-900/50 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="animate-fade-in-up">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">About</h2>
          </div>
          <div className="max-w-3xl mx-auto animate-fade-in-up delay-100 space-y-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            <p>
              I'm a senior software engineer with 5+ years designing high-throughput backend systems, with a focus on
              system design, reliability, and performance at scale. Most of my work lives in event-driven microservices
              and distributed platforms built with reactive Java, Apache Kafka, AWS, and Kubernetes.
            </p>
            <p>
              At Credit Acceptance I led the architecture of a used-car marketplace that grew from 2,000 to over a
              million daily users, owning everything from credit-application workflows to async notification
              infrastructure handling 1M+ daily deliveries. Lately I've been building AI-powered developer tooling using
              LLMs and the Model Context Protocol.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="animate-fade-in-up">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Work Experience</h2>
          </div>
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Current Role */}
            <div className="animate-slide-in-left">
              <Card className="border-l-4 border-l-blue-500 hover:shadow-xl dark:hover:shadow-gray-900/50 hover:-translate-y-1 transition-all duration-200 dark:bg-gray-800/50 dark:border-gray-700">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <CardTitle className="text-xl">Senior Software Engineer</CardTitle>
                      <CardDescription className="text-lg font-medium text-gray-700 dark:text-gray-300">
                        Credit Acceptance Corporation
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>December 2025 - Current</span>
                      <MapPin className="w-4 h-4 ml-2" />
                      <span>Phoenix, USA (Remote)</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>
                      • Led end-to-end architecture of a high-traffic used-car marketplace, scaling from 2,000 to{" "}
                      <strong>1,000,000 daily users</strong> across credit-application workflows.
                    </li>
                    <li>
                      • Designed a Redis cache-aside strategy with TTL-based invalidation across high-traffic read paths,
                      cutting <strong>P95 API latency by ~35%</strong>; built concurrent, non-blocking services with
                      Spring WebFlux across 12+ microservices.
                    </li>
                    <li>
                      • Designed and delivered asynchronous notification services on AWS handling{" "}
                      <strong>1M+ daily deliveries</strong> with ~40% latency reduction.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Previous Credit Acceptance Role */}
            <div className="animate-slide-in-right">
              <Card className="hover:shadow-xl dark:hover:shadow-gray-900/50 hover:-translate-y-1 transition-all duration-200 dark:bg-gray-800/50 dark:border-gray-700">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <CardTitle className="text-xl">Software Engineer II</CardTitle>
                      <CardDescription className="text-lg font-medium text-gray-700 dark:text-gray-300">
                        Credit Acceptance Corporation
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>January 2024 - December 2025</span>
                      <MapPin className="w-4 h-4 ml-2" />
                      <span>Phoenix, USA (Remote)</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>
                      • Led a <strong>zero-downtime migration</strong> from gRPC + Micronaut to REST + Spring Boot
                      WebFlux across 8 interdependent services under live traffic, improving throughput 30% and cutting
                      P50 latency 20%.
                    </li>
                    <li>
                      • Architected cloud-native microservices on Kubernetes & Helm (AWS EKS, S3, Lambda), achieving{" "}
                      <strong>99.9% uptime</strong> and reducing deployment cycles 25% through CI/CD automation.
                    </li>
                    <li>
                      • Built an end-to-end payment platform with Apollo GraphQL federation (NestJS) and a custom OAuth
                      2.0 token system for guest payments, supporting thousands of daily transactions with zero auth
                      downtime.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Micro Focus Roles */}
            <div className="animate-slide-in-left">
              <Card className="hover:shadow-xl dark:hover:shadow-gray-900/50 hover:-translate-y-1 transition-all duration-200 dark:bg-gray-800/50 dark:border-gray-700">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <CardTitle className="text-xl">Software Engineer II</CardTitle>
                      <CardDescription className="text-lg font-medium text-gray-700 dark:text-gray-300">Micro Focus</CardDescription>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>Bengaluru, India</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>
                      • Architected reusable data streaming pipelines with Apache Kafka and Apache Pulsar across 5
                      products, improving throughput <strong>30%</strong> and reducing development cycle time 20%.
                    </li>
                    <li>
                      • Developed high-performance REST APIs for the NNMi backend processing data from 100+ network
                      devices, powering monitoring dashboards for <strong>500+ enterprise customers</strong>.
                    </li>
                    <li>
                      • Architected and migrated the on-premises NOM product to AWS with a 7-member team in 3 months,
                      resulting in a <strong>40% reduction in operational costs</strong>.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="animate-slide-in-right">
              <Card className="hover:shadow-xl dark:hover:shadow-gray-900/50 hover:-translate-y-1 transition-all duration-200 dark:bg-gray-800/50 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl">Software Engineer I</CardTitle>
                  <CardDescription className="text-lg font-medium text-gray-700 dark:text-gray-300">Micro Focus</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>
                      • Designed reusable data streaming components and distributed system frameworks used across 5
                      products, improving data processing speed <strong>30%</strong>.
                    </li>
                    <li>
                      • Developed multiple REST APIs for the NNMi backend framework, enabling analytics on network data
                      from 100+ devices.
                    </li>
                    <li>
                      • Built web applications and services used by <strong>500+ customers worldwide</strong>, increasing
                      customer satisfaction 40%.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 bg-white dark:bg-gray-900/50 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="animate-fade-in-up">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Technical Skills</h2>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              <div className="animate-fade-in-up delay-100">
                <Card className="text-center hover:shadow-xl dark:hover:shadow-gray-900/50 hover:-translate-y-1 transition-all duration-200 dark:bg-gray-800/50 dark:border-gray-700">
                  <CardHeader>
                    <Code className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                    <CardTitle className="text-lg">Languages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {["Java", "Python", "C++", "JavaScript", "TypeScript", "C"].map((skill) => (
                        <Badge key={skill} variant="secondary" className="hover:bg-orange-100 transition-colors">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="animate-fade-in-up delay-200">
                <Card className="text-center hover:shadow-xl dark:hover:shadow-gray-900/50 hover:-translate-y-1 transition-all duration-200 dark:bg-gray-800/50 dark:border-gray-700">
                  <CardHeader>
                    <Database className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <CardTitle className="text-lg">Databases</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {["Vertica", "MySQL", "PostgreSQL", "Neo4j", "Oracle DB"].map((skill) => (
                        <Badge key={skill} variant="secondary" className="hover:bg-green-100 transition-colors">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="animate-fade-in-up delay-300">
                <Card className="text-center hover:shadow-xl dark:hover:shadow-gray-900/50 hover:-translate-y-1 transition-all duration-200 dark:bg-gray-800/50 dark:border-gray-700">
                  <CardHeader>
                    <Cloud className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <CardTitle className="text-lg">Cloud & DevOps</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {["AWS", "Kubernetes", "Docker", "CI/CD", "EKS", "S3", "Lambda"].map((skill) => (
                        <Badge key={skill} variant="secondary" className="hover:bg-purple-100 transition-colors">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="animate-fade-in-up delay-400">
                <Card className="text-center hover:shadow-xl dark:hover:shadow-gray-900/50 hover:-translate-y-1 transition-all duration-200 dark:bg-gray-800/50 dark:border-gray-700">
                  <CardHeader>
                    <Globe className="w-8 h-8 mx-auto mb-2 text-red-600" />
                    <CardTitle className="text-lg">Web & Frameworks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {["React.js", "Spring Boot", "GraphQL", "REST API", "Node.js", "NestJS"].map((skill) => (
                        <Badge key={skill} variant="secondary" className="hover:bg-red-100 transition-colors">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-16 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="animate-fade-in-up">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Education</h2>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="animate-slide-in-left">
              <Card className="border-l-4 border-l-blue-500 hover:shadow-xl dark:hover:shadow-gray-900/50 hover:-translate-y-1 transition-all duration-200 dark:bg-gray-800/50 dark:border-gray-700">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <CardTitle className="text-xl">Master of Science in Computer Science</CardTitle>
                      <CardDescription className="text-lg font-medium text-gray-700 dark:text-gray-300">
                        Arizona State University - Tempe, Arizona
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <GraduationCap className="w-4 h-4" />
                      <span>December 2023</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-3">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      GPA: 4.0/4.0
                    </Badge>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Courses:</strong> Foundation of Algorithms, Database Management and System Implementation,
                    Statistical Machine Learning, Mobile Computing, Data Mining, Data Processing at Scale, Data
                    Visualization
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="animate-slide-in-right">
              <Card className="hover:shadow-xl dark:hover:shadow-gray-900/50 hover:-translate-y-1 transition-all duration-200 dark:bg-gray-800/50 dark:border-gray-700">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <CardTitle className="text-xl">Bachelor of Engineering, Electronics and Communication</CardTitle>
                      <CardDescription className="text-lg font-medium text-gray-700 dark:text-gray-300">
                        Sri Jayachamarajendra College of Engineering - Karnataka, India
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <GraduationCap className="w-4 h-4" />
                      <span>May 2018</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-3">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      GPA: 9.08/10
                    </Badge>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Courses:</strong> Data Structures and Algorithms, Computer Concepts and C Programming,
                    Networking, Embedded Systems, Operating Systems
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 bg-white dark:bg-gray-900/50 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="animate-fade-in-up">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Featured Projects</h2>
          </div>
          <div className="max-w-6xl mx-auto grid sm:grid-cols-1 md:grid-cols-2 auto-rows-fr gap-6 md:gap-8">
            <div className="animate-fade-in-up delay-100">
              <Card className="h-full hover:shadow-xl dark:hover:shadow-gray-900/50 hover:-translate-y-1 transition-all duration-200 dark:bg-gray-800/50 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl">GitHub Engineering Intelligence MCP Server</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="outline">TypeScript</Badge>
                    <Badge variant="outline">MCP</Badge>
                    <Badge variant="outline">LLMs</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Production-ready MCP server built with the TypeScript MCP SDK, Zod validation, and the GitHub REST
                    API, exposing repository intelligence as structured tools for AI agents and LLMs. Implements repo
                    health scoring, PR risk classification, and workflow bottleneck detection — deployed as a live
                    integration in Claude's ecosystem.
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <strong>Technologies:</strong> MCP SDK, GitHub REST API, Zod, TypeScript, Python
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="hover:scale-105 transition-transform bg-transparent"
                  >
                    <Link href="https://github.com/vivekkeshava" target="_blank">
                      <Github className="w-4 h-4 mr-2" />
                      View on GitHub
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="animate-fade-in-up delay-200">
              <Card className="h-full hover:shadow-xl dark:hover:shadow-gray-900/50 hover:-translate-y-1 transition-all duration-200 dark:bg-gray-800/50 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl">LLM-based Document Parser &amp; Authenticator</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="outline">Python</Badge>
                    <Badge variant="outline">LLMs</Badge>
                    <Badge variant="outline">React</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    LLM-powered parser that extracts structured data from unstructured text, validates authenticity, and
                    flags anomalies with over 90% accuracy. Integrated open-source models (Llama, DeepSeek) for
                    extraction and accuracy scoring, cutting manual verification by 60%.
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Technologies:</strong> Llama, DeepSeek, Python, TypeScript, React
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="animate-fade-in-up delay-300">
              <Card className="h-full hover:shadow-xl dark:hover:shadow-gray-900/50 hover:-translate-y-1 transition-all duration-200 dark:bg-gray-800/50 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl">Stance Detection on Twitter Data</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="outline">Python</Badge>
                    <Badge variant="outline">Machine Learning</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Engineered and trained ML models for stance detection on Twitter data using SVM, RNN, and LSTM to
                    classify a reply's position relative to the source tweet. Achieved a 10% accuracy improvement through
                    hyperparameter tuning.
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Technologies:</strong> Scikit-Learn, NumPy, Pandas, SVM, RNN, LSTM
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="animate-fade-in-up delay-400">
              <Card className="h-full hover:shadow-xl dark:hover:shadow-gray-900/50 hover:-translate-y-1 transition-all duration-200 dark:bg-gray-800/50 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl">Bi-directional Stock Prediction</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="outline">Python</Badge>
                    <Badge variant="outline">Deep Learning</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Binary classifiers that predict stock trends from sentiment analysis of finance news and time-series
                    market data. Benchmarked traditional ML (SVM, random forest, logistic regression) against deep
                    learning (LSTM, XGBoost) with feature selection and grid-search tuning.
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Technologies:</strong> Keras, XGBoost, LSTM, Scikit-Learn
                  </p>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </section>

      {/* Publications & Achievements */}
      <section id="publications" className="py-16 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="animate-fade-in-up">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Publications</h2>
            </div>

            <div className="space-y-8">
              <div className="animate-slide-in-left">
                <Card className="border-l-4 border-l-blue-500 hover:shadow-xl dark:hover:shadow-gray-900/50 hover:-translate-y-1 transition-all duration-200 dark:bg-gray-800/50 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Award className="w-5 h-5 text-orange-600" />
                      Research Publication
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold text-lg mb-2">Robotic Mapping Using Autonomous Vehicle</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      Keshava, Vivek, et al. "Robotic Mapping Using Autonomous Vehicle." SN Computer Science, vol. 1,
                      no. 3, May 2020
                    </p>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="hover:scale-105 transition-transform bg-transparent"
                    >
                      <Link href="https://doi.org/10.1007/s42979-020-00190-3" target="_blank">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Publication
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reading Section */}
      <section id="resources" className="py-16 bg-white dark:bg-gray-900/50 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="animate-fade-in-up">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-gray-900 dark:text-white">2025 Reading List</h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12">A few books I enjoyed this year</p>
          </div>
          <div className="max-w-xl mx-auto animate-fade-in-up delay-100">
            <ul className="space-y-3">
              {books.map((book) => (
                <li key={book.title} className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium text-gray-900 dark:text-white">{book.title}</span>
                  <span className="text-gray-500 dark:text-gray-400"> — {book.author}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-900 text-white scroll-mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="animate-fade-in-up">
              <h2 className="text-3xl font-bold mb-8 text-white">Let's Connect</h2>
              <p className="text-xl mb-8 text-gray-300">
                I'm always interested in discussing new opportunities, innovative projects, and collaborations.
              </p>
            </div>
            <div className="animate-fade-in-up delay-200">
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-white text-gray-900 hover:bg-gray-100 transition-all duration-200 hover:scale-[1.02]"
                >
                  <Link href="mailto:vivek.keshava1@gmail.com">
                    <Mail className="w-5 h-5 mr-2" />
                    vivek.keshava1@gmail.com
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Vivek Keshava. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
