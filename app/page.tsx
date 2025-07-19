"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Github,
  Linkedin,
  Mail,
  Phone,
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
  ChevronDown,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import Image from "next/image"

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Education", href: "#education" },
    { name: "Projects", href: "#projects" },
    { name: "Publications", href: "#publications" },
    { name: "Contact", href: "#contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
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
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.substring(1))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Navigation Header */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="font-bold text-xl text-gray-900">Vivek Keshava</div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-sm font-medium transition-colors hover:text-gray-900 ${
                    activeSection === item.href.substring(1)
                      ? "text-gray-900 border-b-2 border-gray-900 font-semibold"
                      : "text-gray-700"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-gray-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200 py-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
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
        id="about"
        className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20 pt-32 overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
              {/* Profile Image - Left Side */}
              <div className="animate-fade-in-up delay-300 flex-shrink-0">
                <div className="relative">
                  <div className="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl backdrop-blur-sm">
                    <Image
                      src="/images/vivek-profile.jpg"
                      alt="Vivek Keshava - Software Engineer"
                      width={288}
                      height={288}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      priority
                    />
                  </div>
                  {/* Decorative ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-white/10 animate-pulse"></div>
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
                      Software Engineer II
                    </span>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/30">
                      Full-Stack Developer
                    </span>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/30">
                      Cloud Architect
                    </span>
                  </div>
                </div>

                <div className="animate-fade-in-up delay-200">
                  <p className="text-lg mb-8 max-w-2xl mx-auto lg:mx-0 text-gray-200 leading-relaxed">
                    Passionate software engineer with expertise in microservices, cloud technologies, and scalable
                    applications. Currently building innovative payment solutions at Credit Acceptance Corporation.
                  </p>
                </div>

                <div className="animate-fade-in-up delay-400">
                  <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
                    <Button
                      asChild
                      variant="outline"
                      className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
                    >
                      <Link href="https://github.com/vivekkeshava" target="_blank">
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
                    >
                      <Link href="http://www.linkedin.com/in/vivekkeshava" target="_blank">
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
                    >
                      <Link href="mailto:vivek.keshava1@gmail.com">
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
                    >
                      <Link href="tel:602-815-9913">
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="animate-bounce mt-12 text-center">
              <button
                onClick={() => scrollToSection("#experience")}
                className="text-white/70 hover:text-white transition-colors"
              >
                <ChevronDown className="w-8 h-8 mx-auto" />
                <p className="text-sm mt-2">Scroll to explore</p>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 scroll-mt-16">
        {/* rest of code here */}
        <div className="container mx-auto px-4">
          <div className="animate-fade-in-up">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Work Experience</h2>
          </div>
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Current Role */}
            <div className="animate-slide-in-left">
              <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <CardTitle className="text-xl">Software Engineer II</CardTitle>
                      <CardDescription className="text-lg font-medium text-gray-700">
                        Credit Acceptance Corporation
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>January 2024 - Current</span>
                      <MapPin className="w-4 h-4 ml-2" />
                      <span>Michigan, USA (Remote)</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    <li>
                      • Spearheaded development of scalable, full stack applications using microservices architecture,
                      using Kubernetes & Helm for container orchestration
                    </li>
                    <li>
                      • Engineered and maintained Apollo GraphQL-based microservices with NestJS, including an
                      end-to-end payment service using GraphQL federation
                    </li>
                    <li>
                      • Developed authentication & authorization features & deployed the containerized services on AWS
                      EKS & also used S3, lambda services extensively
                    </li>
                    <li>
                      • Built scalable gRPC and REST API services using GraphQL federation model for payments services
                      to third party vendors
                    </li>
                    <li>
                      • Designed and implemented custom token-based authentication system (OAUTH) for Guest payment
                      which is scalable and secure
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Micro Focus Roles */}
            <div className="animate-slide-in-right">
              <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <CardTitle className="text-xl">Software Engineer II</CardTitle>
                      <CardDescription className="text-lg font-medium text-gray-700">Micro Focus</CardDescription>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>Bengaluru, India</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    <li>
                      • Led the development of 5 features for the team on microservices and cloud-based deployments,
                      resulting in a <strong>15% reduction in development time</strong>
                    </li>
                    <li>
                      • Provided technical support to customer-facing teams worldwide for new features, resulting in a{" "}
                      <strong>20% reduction in total defect escalations</strong>
                    </li>
                    <li>
                      • Resolved critical issues for global customers within 24 hours, resulting in a{" "}
                      <strong>50% reduction in downtime</strong>
                    </li>
                    <li>
                      • Architected and migrated the on-premises NOM product to the AWS cloud platform, involving a team
                      of 7 members and completed within 3 months, resulting in a{" "}
                      <strong>40% reduction in operational costs</strong>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="animate-slide-in-left">
              <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="text-xl">Software Engineer I</CardTitle>
                  <CardDescription className="text-lg font-medium text-gray-700">Micro Focus</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    <li>
                      • Designed and architected reusable data streaming components and distributed system frameworks,
                      used across 5 products, resulting in a <strong>30% improvement in data processing speed</strong>
                    </li>
                    <li>
                      • Developed multiple REST APIs for the backend framework of NNMi product, enabling analytics on
                      network data from 100+ devices
                    </li>
                    <li>
                      • Successfully completed 3 POC projects, including migration to new Hibernate versions and
                      exploring performance monitoring solutions
                    </li>
                    <li>
                      • Built web applications and web services utilized by <strong>500+ customers worldwide</strong>,
                      resulting in a 40% increase in customer satisfaction
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 bg-white scroll-mt-16">
        <div className="container mx-auto px-4">
          <div className="animate-fade-in-up">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Technical Skills</h2>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="animate-fade-in-up delay-100">
                <Card className="text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
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
                <Card className="text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
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
                <Card className="text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
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
                <Card className="text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
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
      <section id="education" className="py-16 scroll-mt-16">
        <div className="container mx-auto px-4">
          <div className="animate-fade-in-up">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Education</h2>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="animate-slide-in-left">
              <Card className="border-l-4 border-l-red-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <CardTitle className="text-xl">Master of Science in Computer Science</CardTitle>
                      <CardDescription className="text-lg font-medium text-gray-700">
                        Arizona State University - Tempe, Arizona
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
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
                  <p className="text-gray-700">
                    <strong>Courses:</strong> Foundation of Algorithms, Database Management and System Implementation,
                    Statistical Machine Learning, Mobile Computing, Data Mining, Data Processing at Scale, Data
                    Visualization
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="animate-slide-in-right">
              <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <CardTitle className="text-xl">Bachelor of Engineering, Electronics and Communication</CardTitle>
                      <CardDescription className="text-lg font-medium text-gray-700">
                        Sri Jayachamarajendra College of Engineering - Karnataka, India
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
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
                  <p className="text-gray-700">
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
      <section id="projects" className="py-16 bg-white scroll-mt-16">
        <div className="container mx-auto px-4">
          <div className="animate-fade-in-up">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Featured Projects</h2>
          </div>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="animate-fade-in-up delay-100">
              <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                <CardHeader>
                  <CardTitle className="text-xl">Stance Detection on Twitter Data</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="outline">Python</Badge>
                    <Badge variant="outline">Machine Learning</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Engineered and trained ML models for stance detection using Twitter data with SVM, RNN, and LSTM
                    algorithms. Achieved 10% improvement in accuracy through hyperparameter optimization.
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Technologies:</strong> Scikit-Learn, NumPy, Pandas, SVM, RNN, LSTM
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="animate-fade-in-up delay-200">
              <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                <CardHeader>
                  <CardTitle className="text-xl">Java Based RDF Database</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="outline">Java</Badge>
                    <Badge variant="outline">Database</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Developed an RDF Database Management System from Minibase codebase for a client with 1 million
                    records. Implemented Hash Oriented Joins for efficient data retrieval.
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Team Size:</strong> 5 members | <strong>Duration:</strong> 4 months
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="animate-fade-in-up delay-300">
              <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                <CardHeader>
                  <CardTitle className="text-xl">Stock Prediction using ML & Sentiment Analysis</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="outline">Python</Badge>
                    <Badge variant="outline">Deep Learning</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Implemented binary classifiers to predict stock trends using sentiment analysis of finance news and
                    time series data. Utilized both traditional ML and deep learning methods.
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Technologies:</strong> SVM, Random Forest, LSTM, Keras, XGBoost
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="animate-fade-in-up delay-400">
              <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                <CardHeader>
                  <CardTitle className="text-xl">Codergo - Interview Preparation Platform</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="outline">Java</Badge>
                    <Badge variant="outline">JavaScript</Badge>
                    <Badge variant="outline">AWS</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Created a dynamic website service that sends daily interview questionnaire mails to coding interview
                    participants. Achieved 99.9% service availability with 50% reduction in downtime.
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Deployment:</strong> AWS ECS, Docker containers
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Publications & Achievements */}
      <section id="publications" className="py-16 scroll-mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="animate-fade-in-up">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Publications & Achievements</h2>
            </div>

            <div className="space-y-8">
              <div className="animate-slide-in-left">
                <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Award className="w-5 h-5 text-orange-600" />
                      Research Publication
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold text-lg mb-2">Robotic Mapping Using Autonomous Vehicle</h3>
                    <p className="text-gray-700 mb-2">
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

              <div className="grid md:grid-cols-2 gap-6">
                <div className="animate-slide-in-left delay-200">
                  <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Award className="w-5 h-5 text-purple-600" />
                        Leadership Achievement
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">
                        Served as Chairman at IEEE-SJCE, driving the highest-ever membership of{" "}
                        <strong>250+ members</strong> since the club's inception in 1992.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="animate-slide-in-right delay-200">
                  <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Award className="w-5 h-5 text-green-600" />
                        Competition Recognition
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">
                        Recognized as a <strong>top 20 finalist</strong> in the Texas Instruments IICDC Challenge held
                        by IIM Bangalore, from a pool of 15,000 ideas from 1,000 engineering colleges.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
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
                  className="bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                >
                  <Link href="mailto:vivek.keshava1@gmail.com">
                    <Mail className="w-5 h-5 mr-2" />
                    vivek.keshava1@gmail.com
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                >
                  <Link href="tel:602-815-9913">
                    <Phone className="w-5 h-5 mr-2" />
                    602-815-9913
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
          <p>&copy; 2024 Vivek Keshava. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
