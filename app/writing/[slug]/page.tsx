import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { posts, getPost } from "@/lib/posts"

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug)
  if (!post) return {}
  return {
    title: `${post.title} — Vivek Keshava`,
    description: post.summary,
  }
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  if (!post) notFound()

  return (
    <div className="min-h-screen bg-tk-bg text-tk-text">
      {/* Top bar */}
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
            <Link
              href="/#writing"
              className="font-mono text-xs text-tk-muted hover:text-tk-green transition-colors"
            >
              $ cd ~/writing
            </Link>
          </div>
        </div>
      </nav>

      <article className="container mx-auto px-4 max-w-3xl py-12 md:py-16">
        <p className="font-mono text-xs text-tk-comment mb-3">
          ~/writing/{post.slug}.md
        </p>
        <h1 className="font-mono text-2xl md:text-4xl font-bold text-tk-text mb-4 leading-tight">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-tk-muted mb-10">
          <span className="text-tk-green">{post.date}</span>
          <span>{post.readTime} read</span>
          <span className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded border border-tk-border bg-tk-surface2">
                {tag}
              </span>
            ))}
          </span>
        </div>

        <div className="prose-term">{post.content}</div>

        <div className="mt-14 pt-8 border-t border-tk-border flex items-center justify-between font-mono text-sm">
          <Link href="/#writing" className="text-tk-muted hover:text-tk-green transition-colors">
            ← all posts
          </Link>
          <Link href="mailto:vivek.keshava1@gmail.com" className="text-tk-blue hover:text-tk-green transition-colors">
            reply via email
          </Link>
        </div>
      </article>

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
