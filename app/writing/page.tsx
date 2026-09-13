import type { Metadata } from "next"
import Link from "next/link"
import { posts } from "@/lib/posts"

export const metadata: Metadata = {
  title: "Writing — Vivek Keshava",
  description: "Notes on distributed systems, backend engineering, and AI developer tooling.",
}

export default function WritingIndex() {
  return (
    <div className="min-h-screen bg-tk-bg text-tk-text">
      <nav className="border-b border-tk-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="font-mono text-sm font-semibold text-tk-text hover:text-tk-green transition-colors"
            >
              <span className="text-tk-green">vivek</span>
              <span className="text-tk-muted">@</span>
              <span className="text-tk-blue">keshava</span>
              <span className="text-tk-muted">:~$</span>
            </Link>
            <Link href="/" className="font-mono text-xs text-tk-muted hover:text-tk-green transition-colors">
              $ cd ~/
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 max-w-3xl py-12 md:py-16">
        <p className="font-mono text-sm text-tk-green mb-2">$ ls ~/writing</p>
        <h1 className="font-mono text-2xl md:text-4xl font-bold text-tk-text mb-10">Writing</h1>
        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/writing/${post.slug}/`}
              className="block rounded-lg border border-tk-border bg-tk-surface p-5 md:p-6 transition-all duration-200 hover:border-tk-green hover:-translate-y-0.5"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                <h2 className="font-mono font-semibold text-lg text-tk-text">{post.title}</h2>
                <span className="font-mono text-xs text-tk-muted">
                  {post.date} · {post.readTime}
                </span>
              </div>
              <p className="text-sm text-tk-muted leading-relaxed">{post.summary}</p>
            </Link>
          ))}
        </div>
      </main>

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
