"use client"

import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  ExternalLink,
  Calendar,
  GraduationCap,
  Menu,
  X,
  Moon,
  Sun,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useCallback, useRef, type ReactNode, type KeyboardEvent } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { posts } from "@/lib/posts"

type TermEntry = { cmd: string; output: ReactNode }

const navItems = [
  { name: "about", href: "#about" },
  { name: "experience", href: "#experience" },
  { name: "skills", href: "#skills" },
  { name: "education", href: "#education" },
  { name: "projects", href: "#projects" },
  { name: "writing", href: "#writing" },
  { name: "publications", href: "#publications" },
  { name: "reading", href: "#resources" },
  { name: "contact", href: "#contact" },
]

const experience: {
  role: string
  company: string
  period?: string
  location: string
  points: ReactNode[]
}[] = [
  {
    role: "Senior Software Engineer",
    company: "Credit Acceptance Corporation",
    period: "Dec 2025 — Present",
    location: "Phoenix, USA (Remote)",
    points: [
      <>
        Led end-to-end architecture of a high-traffic used-car marketplace, scaling it to{" "}
        <strong className="text-tk-text font-semibold">1M+ users</strong>; owned system design for
        credit-application workflows across 12+ microservices.
      </>,
      <>
        Built an <strong className="text-tk-text font-semibold">LLM-powered research agent</strong>, exposed as an MCP
        server, performing cross-source research across Jira, Confluence, and internal knowledge bases — adopted by 50
        engineers across 4 teams.
      </>,
      <>
        Drove org-wide adoption of event-driven messaging (AWS SQS, ActiveMQ) over synchronous REST for dealer
        integrations — now standard across 3 teams — maintaining{" "}
        <strong className="text-tk-text font-semibold">99.9% uptime</strong> with SLO-driven monitoring.
      </>,
      <>
        Cut <strong className="text-tk-text font-semibold">P95 API latency ~35%</strong> with a Redis cache-aside
        strategy and TTL invalidation across high-traffic read paths serving 12+ microservices.
      </>,
      <>
        Designed and delivered asynchronous notification services on AWS handling{" "}
        <strong className="text-tk-text font-semibold">1M+ daily deliveries</strong> with ~40% latency reduction;
        owned incident response and capacity planning.
      </>,
    ],
  },
  {
    role: "Software Engineer II",
    company: "Credit Acceptance Corporation",
    period: "Jan 2024 — Nov 2025",
    location: "Phoenix, USA (Remote)",
    points: [
      <>
        Led a <strong className="text-tk-text font-semibold">zero-downtime migration</strong> from gRPC + Micronaut to
        REST + Spring Boot WebFlux across 8 interdependent services under live transaction traffic, including rollback
        strategy and canary deployment — improving throughput 30% and cutting P50 latency 20%.
      </>,
      <>
        Reduced deployment cycles 25% by building CI/CD automation for 12+ services on AWS EKS with Helm, sustaining{" "}
        <strong className="text-tk-text font-semibold">99.9% uptime</strong>.
      </>,
      <>
        Shipped a dealer-specific custom subdomain framework, an AWS SQS-powered SMS notification system, and a
        Dealer-Center integration — cutting manual dealer processing time 40%, adopted by{" "}
        <strong className="text-tk-text font-semibold">5K dealers across the US</strong>.
      </>,
      <>
        Built an end-to-end payment platform with Apollo GraphQL federation (NestJS) and designed an OAuth 2.0 token
        flow for guest payments, supporting thousands of daily transactions with zero auth downtime.
      </>,
      <>
        Mentored and onboarded 4+ engineers; drove cross-functional collaboration across 3 teams during a high-growth
        product phase.
      </>,
    ],
  },
  {
    role: "Software Engineer II",
    company: "Micro Focus (now OpenText)",
    period: "Apr 2020 — Dec 2021",
    location: "Bengaluru, India",
    points: [
      <>
        Architected reusable data streaming pipelines with Apache Kafka and Apache Pulsar across 5 products, improving
        throughput <strong className="text-tk-text font-semibold">30%</strong>.
      </>,
      <>
        Developed high-performance REST APIs for the Network Node Manager (NNMi) backend processing data from 100+
        network devices, powering monitoring dashboards for{" "}
        <strong className="text-tk-text font-semibold">500+ enterprise customers</strong>.
      </>,
    ],
  },
  {
    role: "Software Engineer I",
    company: "Micro Focus (now OpenText)",
    period: "Aug 2018 — Mar 2020",
    location: "Bengaluru, India",
    points: [
      <>
        Led AWS cloud migration of network operations products from on-premises to{" "}
        <strong className="text-tk-text font-semibold">multi-tenant SaaS</strong> within 3 months with a 7-member
        team.
      </>,
      <>
        Diagnosed and resolved critical production incidents for global customers within 24-hour SLAs, reducing
        downtime by <strong className="text-tk-text font-semibold">50%</strong>.
      </>,
    ],
  },
]

const skillGroups = [
  {
    file: "languages.ts",
    accent: "text-tk-blue",
    skills: ["Java", "Python", "TypeScript", "JavaScript", "SQL"],
  },
  {
    file: "frameworks.ts",
    accent: "text-tk-orange",
    skills: ["Spring Boot", "Spring WebFlux", "NestJS", "Node.js", "React", "JUnit"],
  },
  {
    file: "databases.ts",
    accent: "text-tk-green",
    skills: ["PostgreSQL", "MySQL", "Redis"],
  },
  {
    file: "cloud-devops.ts",
    accent: "text-tk-purple",
    skills: ["AWS", "EKS", "S3", "Lambda", "SQS", "Kubernetes", "Helm", "Docker", "CI/CD"],
  },
  {
    file: "distributed-systems.ts",
    accent: "text-tk-red",
    skills: ["Apache Kafka", "Apache Pulsar", "gRPC", "REST APIs", "GraphQL", "Apollo Federation"],
  },
  {
    file: "ai-observability.ts",
    accent: "text-tk-blue",
    skills: ["LLMs", "Model Context Protocol", "Grafana", "Distributed Tracing", "TDD"],
  },
]

const projects: {
  title: string
  tags: string[]
  description: string
  tech: string
  link?: string
}[] = [
  {
    title: "github-engineering-intelligence-mcp",
    tags: ["TypeScript", "MCP", "LLMs"],
    description:
      "Production-ready MCP server built with the TypeScript MCP SDK, Zod validation, and the GitHub REST API, exposing repository intelligence as structured tools for AI agents and LLMs. Implements repo health scoring, PR risk classification, and workflow bottleneck detection — deployed as a live integration in Claude's ecosystem.",
    tech: "MCP SDK, GitHub REST API, Zod, TypeScript, Python",
    link: "https://github.com/vivekkeshava/github-intel-mcp",
  },
  {
    title: "llm-based-ocr",
    tags: ["Python", "LLMs", "Gradio"],
    description:
      "LLM-powered document parser and authenticator: extracts structured fields from document images (licenses, passports) as JSON with per-field confidence scores, validates authenticity, and flags anomalies with over 90% accuracy — cutting manual verification by 60%. Ships a Gradio UI and a one-shot CLI with defensive JSON parsing and env-based key management.",
    tech: "Gemini API, Llama, DeepSeek, Python, Gradio",
    link: "https://github.com/vivekkeshava/LLMBasedOCR",
  },
  {
    title: "twitter-stance-detection",
    tags: ["Python", "Machine Learning"],
    description:
      "Engineered and trained ML models for stance detection on Twitter data using SVM, RNN, and LSTM to classify a reply's position relative to the source tweet. Achieved a 10% accuracy improvement through hyperparameter tuning.",
    tech: "Scikit-Learn, NumPy, Pandas, SVM, RNN, LSTM",
  },
  {
    title: "stock-trend-prediction",
    tags: ["Python", "Deep Learning"],
    description:
      "Binary classifiers that predict stock trends from sentiment analysis of finance news and time-series market data. Benchmarked traditional ML (SVM, random forest, logistic regression) against deep learning (LSTM, XGBoost) with feature selection and grid-search tuning.",
    tech: "Keras, XGBoost, LSTM, Scikit-Learn",
  },
]

const books = [
  { title: "The Library of Borrowed Hearts", author: "Lucy Gilmore" },
  { title: "How to Stop Time", author: "Matt Haig" },
  { title: "Atomic Habits", author: "James Clear" },
  { title: "The Kite Runner", author: "Khaled Hosseini" },
]

function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-10 animate-fade-in-up">
      <h2 className="font-mono text-lg md:text-xl font-semibold whitespace-nowrap">
        <span className="text-tk-comment">{"// "}</span>
        <span className="text-tk-green">{index}.</span> <span className="text-tk-text">{title}</span>
      </h2>
      <div className="h-px flex-1 bg-tk-border" aria-hidden="true" />
    </div>
  )
}

function WindowBar({ title, right }: { title: string; right?: ReactNode }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-tk-border bg-tk-surface2 rounded-t-lg">
      <span className="w-3 h-3 rounded-full bg-tk-red" aria-hidden="true" />
      <span className="w-3 h-3 rounded-full bg-tk-orange" aria-hidden="true" />
      <span className="w-3 h-3 rounded-full bg-tk-green" aria-hidden="true" />
      <span className="ml-2 font-mono text-xs text-tk-muted truncate">{title}</span>
      {right && <span className="ml-auto flex-shrink-0">{right}</span>}
    </div>
  )
}

const helpCommands: [string, string][] = [
  ["whoami", "who am i"],
  ["ls", "list sections"],
  ["ls projects", "list projects"],
  ["ls writing", "list blog posts"],
  ["cat skills.txt", "print skills"],
  ["open github", "open a profile (github | linkedin)"],
  ["contact", "get in touch"],
  ["theme", "toggle light/dark"],
  ["clear", "clear the terminal"],
  ["help", "toggle this panel"],
]

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-xs px-2 py-0.5 rounded border border-tk-border bg-tk-surface2 text-tk-muted">
      {children}
    </span>
  )
}

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [typed, setTyped] = useState("")
  const [termEntries, setTermEntries] = useState<TermEntry[]>([])
  const [termInput, setTermInput] = useState("")
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const [showHelp, setShowHelp] = useState(false)
  const [helpEntries, setHelpEntries] = useState<TermEntry[]>([])
  const [helpInput, setHelpInput] = useState("")
  const { theme, setTheme } = useTheme()
  const lastScrollTime = useRef(0)
  const termInputRef = useRef<HTMLInputElement>(null)
  const termScrollRef = useRef<HTMLDivElement>(null)
  const helpInputRef = useRef<HTMLInputElement>(null)
  const helpScrollRef = useRef<HTMLDivElement>(null)

  const heroCommand = "whoami"
  const typingDone = typed === heroCommand

  // Keep the newest terminal line in view
  useEffect(() => {
    const el = termScrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [termEntries])

  useEffect(() => {
    const el = helpScrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [helpEntries])

  // Focus the help terminal's prompt when it opens
  useEffect(() => {
    if (showHelp) helpInputRef.current?.focus()
  }, [showHelp])

  const runCommand = (raw: string, inHelp = false) => {
    const cmd = raw.trim()
    if (!cmd) return
    setCmdHistory((h) => [...h, cmd])
    setHistIdx(-1)
    const [name, ...rest] = cmd.split(/\s+/)
    const arg = rest.join(" ")
    const appendEntry = inHelp ? setHelpEntries : setTermEntries
    let output: ReactNode

    switch (name.toLowerCase()) {
      case "help":
        if (inHelp) {
          output = <p className="text-tk-comment">you&apos;re already here — try a command from the list above.</p>
          break
        }
        // Opens a separate terminal window below; nothing is logged here
        setShowHelp(true)
        return
      case "whoami":
        output = <p>Vivek Keshava — Senior Software Engineer. Distributed systems &amp; AI tooling.</p>
        break
      case "pwd":
        output = <p>/home/vivek</p>
        break
      case "date":
        output = <p>{new Date().toString()}</p>
        break
      case "ls": {
        const target = arg.replace(/\/$/, "")
        if (target === "") {
          output = (
            <p>
              <span className="text-tk-blue">about/ experience/ projects/ writing/</span> skills.txt
            </p>
          )
        } else if (target === "projects") {
          output = (
            <div>
              {projects.map((p) => (
                <p key={p.title} className="text-tk-blue">
                  {p.title}/
                </p>
              ))}
            </div>
          )
        } else if (target === "writing") {
          output = (
            <div>
              {posts.map((p) => (
                <p key={p.slug}>
                  <Link href={`/writing/${p.slug}/`} className="text-tk-blue underline hover:text-tk-green">
                    {p.slug}.md
                  </Link>
                  <span className="text-tk-comment"> — {p.title}</span>
                </p>
              ))}
            </div>
          )
        } else if (target === "about" || target === "experience") {
          scrollToSection(`#${target}`)
          output = <p>opening {target}/ …</p>
        } else if (target === "skills.txt") {
          output = (
            <p className="text-tk-red">
              ls: {arg}: Not a directory <span className="text-tk-comment">— try &apos;cat skills.txt&apos;</span>
            </p>
          )
        } else {
          output = (
            <p className="text-tk-red">
              ls: cannot access &apos;{arg}&apos;: No such file or directory
            </p>
          )
        }
        break
      }
      case "cat":
        if (arg === "skills.txt" || arg === "skills") {
          output = (
            <div>
              {skillGroups.map((g) => (
                <p key={g.file}>
                  <span className="text-tk-purple">{g.file.replace(".ts", "")}</span>
                  <span className="text-tk-comment">: </span>
                  {g.skills.join(", ")}
                </p>
              ))}
            </div>
          )
        } else {
          output = (
            <p className="text-tk-red">
              cat: {arg || "<file>"}: No such file <span className="text-tk-comment">— try &apos;cat skills.txt&apos;</span>
            </p>
          )
        }
        break
      case "open":
        if (arg === "github") {
          window.open("https://github.com/vivekkeshava", "_blank")
          output = <p>opening github.com/vivekkeshava…</p>
        } else if (arg === "linkedin") {
          window.open("https://www.linkedin.com/in/vivekkeshava", "_blank")
          output = <p>opening linkedin.com/in/vivekkeshava…</p>
        } else {
          output = (
            <p className="text-tk-red">
              open: unknown target <span className="text-tk-comment">— try &apos;open github&apos;</span>
            </p>
          )
        }
        break
      case "contact":
      case "email":
        output = (
          <p>
            <a href="mailto:vivek.keshava1@gmail.com" className="text-tk-blue underline hover:text-tk-green">
              vivek.keshava1@gmail.com
            </a>{" "}
            — always happy to talk.
          </p>
        )
        break
      case "theme":
        setTheme(theme === "dark" ? "light" : "dark")
        output = <p>theme toggled ✓</p>
        break
      case "echo":
        output = <p>{arg}</p>
        break
      case "sudo":
        if (arg === "hire-me" || arg === "hire me") {
          output = (
            <div>
              <p className="text-tk-green">Permission granted ✓</p>
              <p>
                Excellent choice. →{" "}
                <a
                  href="mailto:vivek.keshava1@gmail.com?subject=Let%27s%20talk"
                  className="text-tk-blue underline hover:text-tk-green"
                >
                  vivek.keshava1@gmail.com
                </a>
              </p>
            </div>
          )
        } else {
          output = <p className="text-tk-red">user is not in the sudoers file. This incident will be reported.</p>
        }
        break
      case "clear":
        if (inHelp) setHelpEntries([])
        else setTermEntries([])
        return
      case "exit":
        if (inHelp) {
          // exit closes the help terminal
          setShowHelp(false)
          setHelpEntries([])
          return
        }
        output = <p className="text-tk-comment">nice try. you&apos;re staying.</p>
        break
      default:
        output = (
          <p className="text-tk-red">
            zsh: command not found: {name} <span className="text-tk-comment">— try &apos;help&apos;</span>
          </p>
        )
    }
    appendEntry((e) => [...e, { cmd, output }])
  }

  const makeTermKeyDown =
    (setInput: (v: string) => void) => (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowUp") {
        e.preventDefault()
        if (cmdHistory.length === 0) return
        const idx = histIdx === -1 ? cmdHistory.length - 1 : Math.max(0, histIdx - 1)
        setHistIdx(idx)
        setInput(cmdHistory[idx])
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        if (histIdx === -1) return
        const idx = histIdx + 1
        if (idx >= cmdHistory.length) {
          setHistIdx(-1)
          setInput("")
        } else {
          setHistIdx(idx)
          setInput(cmdHistory[idx])
        }
      }
    }

  const handleTermKeyDown = makeTermKeyDown(setTermInput)
  const handleHelpKeyDown = makeTermKeyDown(setHelpInput)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Typewriter effect for the hero prompt
  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      i += 1
      setTyped(heroCommand.slice(0, i))
      if (i >= heroCommand.length) clearInterval(id)
    }, 110)
    return () => clearInterval(id)
  }, [])

  const handleScroll = useCallback(() => {
    const now = Date.now()
    if (now - lastScrollTime.current < 50) return
    lastScrollTime.current = now

    setIsScrolled(window.scrollY > 50)

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
    <div className="min-h-screen bg-tk-bg text-tk-text">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
          isScrolled
            ? "nav-blur backdrop-blur-md border-tk-border"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="font-mono text-sm font-semibold text-tk-text hover:text-tk-green transition-colors"
            >
              <span className="text-tk-green">vivek</span>
              <span className="text-tk-muted">@</span>
              <span className="text-tk-blue">keshava</span>
              <span className="text-tk-muted">:~$</span>
              <span className="cursor-blink text-tk-green ml-1">▊</span>
            </button>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-6">
              {navItems.map((item, i) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`font-mono text-xs transition-colors ${
                    activeSection === item.href.substring(1)
                      ? "text-tk-green"
                      : "text-tk-muted hover:text-tk-text"
                  }`}
                >
                  <span className="text-tk-green">{String(i + 1).padStart(2, "0")}.</span>
                  {item.name}
                </button>
              ))}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                  className="p-2 rounded-md text-tk-muted hover:text-tk-text hover:bg-tk-surface2 transition-colors"
                >
                  {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              )}
            </div>

            {/* Mobile controls */}
            <div className="flex items-center gap-1 lg:hidden">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                  className="p-2 rounded-md text-tk-muted hover:text-tk-text transition-colors"
                >
                  {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              )}
              <button
                className="p-2 text-tk-text"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile nav */}
          {isMenuOpen && (
            <div className="lg:hidden bg-tk-surface border border-tk-border rounded-lg mb-3 py-2">
              {navItems.map((item, i) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-4 py-2 font-mono text-sm text-tk-muted hover:text-tk-green hover:bg-tk-surface2 transition-colors"
                >
                  <span className="text-tk-green">{String(i + 1).padStart(2, "0")}.</span> {item.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="relative grid-backdrop pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 30%, var(--t-glow), transparent)" }}
          aria-hidden="true"
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Terminal window */}
            <div className="w-full flex-1 animate-fade-in-up">
              <div className="rounded-lg border border-tk-border bg-tk-surface shadow-2xl shadow-black/10 dark:shadow-black/40">
                <WindowBar
                  title="vivek@keshava: ~"
                  right={
                    <button
                      onClick={() => setShowHelp((v) => !v)}
                      aria-expanded={showHelp}
                      aria-label={showHelp ? "Close help panel" : "Open help panel"}
                      className="font-mono text-xs text-tk-muted hover:text-tk-green transition-colors"
                    >
                      [help]
                    </button>
                  }
                />
                <div
                  ref={termScrollRef}
                  onClick={() => termInputRef.current?.focus()}
                  className="p-5 md:p-7 font-mono text-sm md:text-base leading-relaxed max-h-[30rem] overflow-y-auto cursor-text"
                >
                  <p>
                    <span className="text-tk-green">$</span> <span className="text-tk-text">{typed}</span>
                    {!typingDone && <span className="cursor-blink text-tk-green">▊</span>}
                  </p>
                  <div className={`transition-opacity duration-500 ${typingDone ? "opacity-100" : "opacity-0"}`}>
                    <h1 className="text-2xl md:text-4xl font-bold mt-4 mb-2 text-tk-text">Vivek Keshava</h1>
                    <p className="text-tk-blue mb-4">Senior Software Engineer</p>
                    <p className="font-sans text-tk-muted text-sm md:text-base leading-relaxed mb-5 max-w-xl">
                      I build high-throughput backend systems. Recently built and scaled a used-car marketplace, and
                      I&apos;m building AI developer tooling with LLMs and the Model Context Protocol.
                    </p>
                    <p className="text-xs md:text-sm text-tk-muted mb-5">
                      <span className="text-tk-purple">const</span> <span className="text-tk-blue">focus</span> = [
                      <span className="text-tk-green">&quot;distributed-systems&quot;</span>,{" "}
                      <span className="text-tk-green">&quot;ai-tooling&quot;</span>,{" "}
                      <span className="text-tk-green">&quot;event-driven&quot;</span>]
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href="https://github.com/vivekkeshava"
                        target="_blank"
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md border border-tk-border bg-tk-surface2 text-xs md:text-sm text-tk-text hover:border-tk-green hover:text-tk-green transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        github
                      </Link>
                      <Link
                        href="http://www.linkedin.com/in/vivekkeshava"
                        target="_blank"
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md border border-tk-border bg-tk-surface2 text-xs md:text-sm text-tk-text hover:border-tk-blue hover:text-tk-blue transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                        linkedin
                      </Link>
                      <Link
                        href="mailto:vivek.keshava1@gmail.com"
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md border border-tk-border bg-tk-surface2 text-xs md:text-sm text-tk-text hover:border-tk-purple hover:text-tk-purple transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        email
                      </Link>
                    </div>

                    {/* Interactive command log */}
                    {termEntries.map((entry, i) => (
                      <div key={i} className="mt-4">
                        <p>
                          <span className="text-tk-green">$</span>{" "}
                          <span className="text-tk-text">{entry.cmd}</span>
                        </p>
                        <div className="mt-1 text-tk-muted text-xs md:text-sm leading-relaxed">{entry.output}</div>
                      </div>
                    ))}

                    {/* Prompt */}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        runCommand(termInput)
                        setTermInput("")
                      }}
                      className="mt-5 flex items-center gap-2"
                    >
                      <span className="text-tk-green">$</span>
                      <input
                        ref={termInputRef}
                        value={termInput}
                        onChange={(e) => setTermInput(e.target.value)}
                        onKeyDown={handleTermKeyDown}
                        placeholder="type 'help'"
                        aria-label="Terminal command input"
                        autoComplete="off"
                        autoCapitalize="off"
                        spellCheck={false}
                        className="flex-1 min-w-0 bg-transparent outline-none font-mono text-sm md:text-base text-tk-text placeholder:text-tk-comment"
                        style={{ caretColor: "var(--t-green)" }}
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile image */}
            <div className="animate-fade-in-up delay-200 flex-shrink-0">
              <div className="relative group">
                <div className="absolute -inset-1.5 rounded-xl border border-tk-green opacity-40 translate-x-2 translate-y-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
                <div className="relative w-44 h-44 sm:w-52 sm:h-52 lg:w-60 lg:h-60 rounded-xl overflow-hidden border border-tk-border">
                  <Image
                    src="/images/vivek-profile.jpg"
                    alt="Vivek Keshava - Software Engineer"
                    width={350}
                    height={350}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Help terminal — spawned below the hero row so the layout above never shifts */}
          {showHelp && (
            <div className="max-w-5xl mx-auto mt-6 animate-fade-in-up">
              <div className="rounded-lg border border-tk-border bg-tk-surface shadow-2xl shadow-black/10 dark:shadow-black/40">
                <WindowBar
                  title="vivek@keshava: ~/help"
                  right={
                    <button
                      onClick={() => {
                        setShowHelp(false)
                        setHelpEntries([])
                      }}
                      aria-label="Close help terminal"
                      className="font-mono text-xs text-tk-muted hover:text-tk-red transition-colors"
                    >
                      [x]
                    </button>
                  }
                />
                <div
                  ref={helpScrollRef}
                  onClick={() => helpInputRef.current?.focus()}
                  className="p-5 md:p-6 font-mono text-xs md:text-sm leading-relaxed max-h-[22rem] overflow-y-auto cursor-text"
                >
                  <p className="mb-3">
                    <span className="text-tk-green">$</span> <span className="text-tk-text">help</span>
                  </p>
                  <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1.5">
                    {helpCommands.map(([c, d]) => (
                      <p key={c}>
                        <span className="text-tk-green">{c}</span>
                        <span className="text-tk-comment"> — {d}</span>
                      </p>
                    ))}
                    <p className="sm:col-span-2 text-tk-comment mt-2">
                      hint: some commands are undocumented… (<span className="text-tk-green">exit</span> closes this
                      terminal)
                    </p>
                  </div>

                  {/* Interactive command log */}
                  {helpEntries.map((entry, i) => (
                    <div key={i} className="mt-3">
                      <p>
                        <span className="text-tk-green">$</span> <span className="text-tk-text">{entry.cmd}</span>
                      </p>
                      <div className="mt-1 text-tk-muted leading-relaxed">{entry.output}</div>
                    </div>
                  ))}

                  {/* Prompt */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      runCommand(helpInput, true)
                      setHelpInput("")
                    }}
                    className="mt-3 flex items-center gap-2"
                  >
                    <span className="text-tk-green">$</span>
                    <input
                      ref={helpInputRef}
                      value={helpInput}
                      onChange={(e) => setHelpInput(e.target.value)}
                      onKeyDown={handleHelpKeyDown}
                      placeholder="type a command"
                      aria-label="Help terminal command input"
                      autoComplete="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      className="flex-1 min-w-0 bg-transparent outline-none font-mono text-xs md:text-sm text-tk-text placeholder:text-tk-comment"
                      style={{ caretColor: "var(--t-green)" }}
                    />
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 scroll-mt-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionHeading index="01" title="about" />
          <div className="animate-fade-in-up delay-100 space-y-4 text-base md:text-lg leading-relaxed text-tk-muted">
            <p>
              I&apos;m a senior software engineer with 5+ years designing high-throughput backend systems, with a focus
              on system design, reliability, and performance at scale. Most of my work lives in event-driven
              microservices and distributed platforms built with reactive Java, Apache Kafka, AWS, and Kubernetes.
            </p>
            <p>
              At Credit Acceptance I led the architecture of a used-car marketplace, scaling it to 1M+ users — owning
              everything from credit-application workflows to async notification infrastructure handling 1M+ daily
              deliveries. Lately I&apos;ve been building AI-powered developer tooling using LLMs and the Model Context
              Protocol.
            </p>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-16 scroll-mt-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionHeading index="02" title="experience" />
          <div className="relative border-l border-tk-border ml-1.5 space-y-10">
            {experience.map((job, i) => (
              <div key={`${job.role}-${job.company}-${i}`} className="relative pl-8 animate-fade-in-up">
                <span
                  className="absolute -left-[5px] top-2 w-[9px] h-[9px] rounded-full bg-tk-green ring-4 ring-tk-bg"
                  aria-hidden="true"
                />
                <div className="rounded-lg border border-tk-border bg-tk-surface p-5 md:p-6 transition-colors hover:border-tk-green">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-mono font-semibold text-lg text-tk-text">{job.role}</h3>
                      <p className="text-tk-blue font-medium">{job.company}</p>
                    </div>
                    <div className="font-mono text-xs text-tk-muted space-y-1 sm:text-right">
                      {job.period && (
                        <p className="flex items-center gap-1.5 sm:justify-end">
                          <Calendar className="w-3.5 h-3.5" />
                          {job.period}
                        </p>
                      )}
                      <p className="flex items-center gap-1.5 sm:justify-end">
                        <MapPin className="w-3.5 h-3.5" />
                        {job.location}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2.5 text-sm md:text-base text-tk-muted leading-relaxed">
                    {job.points.map((point, j) => (
                      <li key={j} className="flex gap-2.5">
                        <span className="text-tk-green font-mono flex-shrink-0 mt-0.5">▹</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-16 scroll-mt-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <SectionHeading index="03" title="skills" />
          <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
            {skillGroups.map((group, i) => (
              <div key={group.file} className={`animate-fade-in-up delay-${Math.min((i + 1) * 100, 400)}`}>
                <div className="rounded-lg border border-tk-border bg-tk-surface h-full transition-colors hover:border-tk-green">
                  <WindowBar title={group.file} />
                  <div className="p-5 font-mono text-sm leading-loose">
                    <span className="text-tk-purple">export const</span>{" "}
                    <span className={group.accent}>{group.file.replace(".ts", "").replace("-", "_")}</span>{" "}
                    <span className="text-tk-muted">= [</span>
                    <div className="pl-5 flex flex-wrap gap-x-1.5">
                      {group.skills.map((skill, j) => (
                        <span key={skill}>
                          <span className="text-tk-green">&quot;{skill}&quot;</span>
                          {j < group.skills.length - 1 && <span className="text-tk-muted">,</span>}
                        </span>
                      ))}
                    </div>
                    <span className="text-tk-muted">]</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="py-16 scroll-mt-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionHeading index="04" title="education" />
          <div className="space-y-6">
            <div className="animate-fade-in-up rounded-lg border border-tk-border bg-tk-surface p-5 md:p-6 transition-colors hover:border-tk-blue">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                <div>
                  <h3 className="font-mono font-semibold text-lg text-tk-text">M.S. Computer Science</h3>
                  <p className="text-tk-blue font-medium">Arizona State University — Tempe, Arizona</p>
                </div>
                <p className="font-mono text-xs text-tk-muted flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" />
                  Jan 2022 — Dec 2023
                </p>
              </div>
              <p className="font-mono text-xs text-tk-green mb-3">gpa: 4.0 / 4.0</p>
              <p className="text-sm text-tk-muted leading-relaxed">
                <span className="text-tk-comment font-mono">{"// "}</span>
                Foundation of Algorithms, Database Management and System Implementation, Statistical Machine Learning,
                Mobile Computing, Data Mining, Data Processing at Scale, Data Visualization
              </p>
            </div>

            <div className="animate-fade-in-up delay-100 rounded-lg border border-tk-border bg-tk-surface p-5 md:p-6 transition-colors hover:border-tk-blue">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                <div>
                  <h3 className="font-mono font-semibold text-lg text-tk-text">
                    B.E. Electronics and Communication
                  </h3>
                  <p className="text-tk-blue font-medium">
                    Sri Jayachamarajendra College of Engineering — Karnataka, India
                  </p>
                </div>
                <p className="font-mono text-xs text-tk-muted flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" />
                  May 2018
                </p>
              </div>
              <p className="font-mono text-xs text-tk-green mb-3">gpa: 9.08 / 10</p>
              <p className="text-sm text-tk-muted leading-relaxed">
                <span className="text-tk-comment font-mono">{"// "}</span>
                Data Structures and Algorithms, Computer Concepts and C Programming, Networking, Embedded Systems,
                Operating Systems
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-16 scroll-mt-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <SectionHeading index="05" title="projects" />
          <div className="grid md:grid-cols-2 auto-rows-fr gap-5 md:gap-6">
            {projects.map((project, i) => (
              <div key={project.title} className={`animate-fade-in-up delay-${Math.min((i + 1) * 100, 400)}`}>
                <div className="flex flex-col h-full rounded-lg border border-tk-border bg-tk-surface p-5 md:p-6 transition-all duration-200 hover:border-tk-green hover:-translate-y-1">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-mono font-semibold text-base md:text-lg text-tk-text break-all">
                      <span className="text-tk-muted">~/</span>
                      {project.title}
                    </h3>
                    {project.link && (
                      <Link
                        href={project.link}
                        target="_blank"
                        aria-label={`${project.title} on GitHub`}
                        className="text-tk-muted hover:text-tk-green transition-colors flex-shrink-0 mt-1"
                      >
                        <Github className="w-5 h-5" />
                      </Link>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                  <p className="text-sm text-tk-muted leading-relaxed mb-4 flex-1">{project.description}</p>
                  <p className="font-mono text-xs text-tk-comment">
                    {"// "}
                    {project.tech}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Writing */}
      <section id="writing" className="py-16 scroll-mt-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionHeading index="06" title="writing" />
          <div className="space-y-5">
            {posts.map((post, i) => (
              <div key={post.slug} className={`animate-fade-in-up delay-${Math.min((i + 1) * 100, 400)}`}>
                <Link
                  href={`/writing/${post.slug}/`}
                  className="block rounded-lg border border-tk-border bg-tk-surface p-5 md:p-6 transition-all duration-200 hover:border-tk-green hover:-translate-y-0.5"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                    <h3 className="font-mono font-semibold text-base md:text-lg text-tk-text break-all">
                      <span className="text-tk-muted">~/writing/</span>
                      {post.slug}.md
                    </h3>
                    <span className="font-mono text-xs text-tk-muted">
                      {post.date} · {post.readTime}
                    </span>
                  </div>
                  <p className="font-medium text-tk-text mb-1.5">{post.title}</p>
                  <p className="text-sm text-tk-muted leading-relaxed">{post.summary}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications */}
      <section id="publications" className="py-16 scroll-mt-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionHeading index="07" title="publications" />
          <div className="animate-fade-in-up rounded-lg border border-tk-border bg-tk-surface p-5 md:p-6 transition-colors hover:border-tk-purple">
            <h3 className="font-mono font-semibold text-lg text-tk-text mb-2">
              Robotic Mapping Using Autonomous Vehicle
            </h3>
            <p className="text-sm text-tk-muted leading-relaxed mb-4">
              Keshava, Vivek, et al. &quot;Robotic Mapping Using Autonomous Vehicle.&quot; SN Computer Science, vol. 1,
              no. 3, May 2020
            </p>
            <Link
              href="https://doi.org/10.1007/s42979-020-00190-3"
              target="_blank"
              className="inline-flex items-center gap-2 font-mono text-sm text-tk-blue hover:text-tk-green transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              doi.org/10.1007/s42979-020-00190-3
            </Link>
          </div>
        </div>
      </section>

      {/* Reading */}
      <section id="resources" className="py-16 scroll-mt-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionHeading index="08" title="reading" />
          <div className="animate-fade-in-up delay-100 max-w-xl">
            <div className="rounded-lg border border-tk-border bg-tk-surface">
              <WindowBar title="~/reading/2025.txt" />
              <div className="p-5 font-mono text-sm space-y-2.5">
                <p className="text-tk-muted">
                  <span className="text-tk-green">$</span> cat ~/reading/2025.txt
                </p>
                {books.map((book) => (
                  <p key={book.title}>
                    <span className="text-tk-text">{book.title}</span>
                    <span className="text-tk-comment"> — {book.author}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 scroll-mt-16">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="animate-fade-in-up">
            <p className="font-mono text-sm text-tk-green mb-3">
              $ ./connect.sh<span className="cursor-blink">▊</span>
            </p>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-tk-text">Let&apos;s Connect</h2>
            <p className="text-tk-muted mb-8 leading-relaxed">
              I&apos;m always interested in discussing new opportunities, innovative projects, and collaborations.
            </p>
          </div>
          <div className="animate-fade-in-up delay-200 flex flex-wrap justify-center gap-4">
            <Link
              href="mailto:vivek.keshava1@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-tk-green font-mono text-sm text-tk-green hover:bg-tk-green hover:text-tk-bg transition-colors"
            >
              <Mail className="w-4 h-4" />
              vivek.keshava1@gmail.com
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-tk-border py-8">
        <div className="container mx-auto px-4 text-center font-mono text-xs text-tk-muted space-y-1">
          <p>
            <span className="text-tk-comment">{"/* "}</span>© 2025 Vivek Keshava
            <span className="text-tk-comment">{" */"}</span>
          </p>
          <p className="text-tk-comment">exit 0</p>
        </div>
      </footer>
    </div>
  )
}
