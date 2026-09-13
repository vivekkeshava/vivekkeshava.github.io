import type { ReactNode } from "react"

export type Post = {
  slug: string
  title: string
  date: string
  readTime: string
  tags: string[]
  summary: string
  content: ReactNode
}

export const posts: Post[] = [
  {
    slug: "building-mcp-servers",
    title: "Building MCP servers engineers actually use",
    date: "Aug 2026",
    readTime: "6 min",
    tags: ["mcp", "llms", "typescript"],
    summary:
      "Lessons from shipping two MCP servers — an internal research agent adopted by 50 engineers, and an open-source GitHub intelligence server — on designing tools LLMs can actually wield.",
    content: (
      <>
        <p>
          I&apos;ve shipped two MCP (Model Context Protocol) servers in the last year: an internal research agent that
          does cross-source research across Jira, Confluence, and internal knowledge bases — now used by about 50
          engineers across 4 teams — and{" "}
          <a href="https://github.com/vivekkeshava/github-intel-mcp" target="_blank" rel="noreferrer">
            github-intel-mcp
          </a>
          , an open-source server that exposes GitHub repository intelligence to AI agents. Different domains, same
          lesson: the hard part isn&apos;t the protocol. It&apos;s designing tools an LLM can actually wield.
        </p>

        <h2>Design tools around questions, not endpoints</h2>
        <p>
          The first instinct is to wrap your existing API one endpoint per tool. It produces terrible agents. An LLM
          given <code>list_issues</code>, <code>get_issue</code>, and <code>list_comments</code> will burn ten tool
          calls reassembling context a human would get from one page.
        </p>
        <p>
          The tools that work map to the <em>questions people ask</em>. In github-intel-mcp there are three:
          repo health scoring (activity metrics, contributor churn), PR risk classification (file sensitivity, diff
          size, author history, review coverage), and workflow bottleneck detection (stale PRs, reviewer overload).
          Each one does the multi-call aggregation server-side and hands the model a finished answer to reason over.
        </p>

        <h2>Schemas are the UX</h2>
        <p>
          The model reads your schema the way a developer reads docs — it&apos;s the only interface it has. Every
          input in my servers goes through Zod, and the descriptions are written for the model, not for humans:
        </p>
        <pre>
          <code>{`server.tool(
  "classify_pr_risk",
  "Classify a pull request's merge risk (LOW to CRITICAL). " +
  "Use when asked whether a PR is safe to merge or needs review.",
  {
    repo: z.string().describe("owner/name, e.g. 'vercel/next.js'"),
    pr_number: z.number().int().positive(),
  },
  async ({ repo, pr_number }) => { /* ... */ }
)`}</code>
        </pre>
        <ul>
          <li>Say when to use the tool, not just what it does — that&apos;s what tool selection runs on.</li>
          <li>Put format examples in field descriptions; they eliminate an entire class of malformed calls.</li>
          <li>Return structured results with stable keys. Prose responses rot; JSON composes.</li>
        </ul>

        <h2>Adoption is a product problem</h2>
        <p>
          The internal research agent taught me the other half. It got to 50 engineers not because MCP is novel, but
          because it removed a real chore: gathering context for incident triage and design reviews, which used to
          mean fifteen minutes of tab-hopping across Jira and Confluence. The pitch was never &quot;we have an AI
          agent&quot; — it was &quot;ask one question, get the cross-source summary.&quot;
        </p>
        <p>
          What moved adoption: fast first answers (nobody retries a slow tool twice), citations back to source
          documents (trust), and graceful degradation when a backend source is down (a partial answer beats an
          error). None of that is in the MCP spec. All of it decides whether anyone uses your server.
        </p>
        <p>
          If you&apos;re starting one: pick the three questions your users ask most, build one tool per question,
          write the schema like documentation, and measure time-to-first-useful-answer. The protocol is the easy
          20%.
        </p>
      </>
    ),
  },
]

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}
