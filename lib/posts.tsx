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
    slug: "scaling-to-1m-users",
    title: "Scaling a used-car marketplace to 1M+ users",
    date: "Sep 2026",
    readTime: "7 min",
    tags: ["distributed-systems", "java", "aws"],
    summary:
      "What actually mattered when traffic grew 500x over two years: a reactive migration under live traffic, honest caching, and going async by default.",
    content: (
      <>
        <p>
          Over two years, the marketplace I work on grew from roughly 2,000 to over a million daily requests. Nothing
          about that sentence is unusual — plenty of systems grow. What I want to write down is which investments
          actually mattered, because in hindsight it was a short list, and almost none of it was glamorous.
        </p>
        <p>
          For context: the platform is a set of 12+ microservices handling credit-application workflows — the path a
          customer takes from browsing a car to submitting a financing application. That path touches identity,
          inventory, credit, payments, and notifications, so a slow or flaky service anywhere in the chain shows up as
          a lost customer.
        </p>

        <h2>Migrate under live traffic, or don&apos;t bother</h2>
        <p>
          The biggest single change was migrating eight interdependent services from gRPC + Micronaut to REST + Spring
          Boot WebFlux — while live transaction traffic kept flowing. The rule we set early: no big-bang cutover, no
          maintenance window. Every step had a rollback path and every service went through canary deployment before
          taking full traffic.
        </p>
        <p>
          That discipline sounds slow. It was actually what made the migration possible at all, because it removed the
          fear from each step. When rolling back is cheap, you ship more often and learn faster. The migration landed
          with zero downtime, ~30% better throughput, and ~20% lower P50 latency — but the durable win was the
          playbook: canary, observe, promote or roll back.
        </p>

        <h2>Cache-aside, with honest invalidation</h2>
        <p>
          High-traffic read paths were the next bottleneck. We put Redis in front of them with a cache-aside strategy:
        </p>
        <pre>
          <code>{`value = cache.get(key)
if (value == null) {
  value = db.load(key)
  cache.set(key, value, ttl)   // TTL is the contract
}
return value`}</code>
        </pre>
        <p>
          The part teams get wrong is invalidation. We deliberately leaned on TTLs as the primary contract instead of
          trying to invalidate perfectly on every write. Perfect invalidation across 12+ services is a distributed
          systems research project; a well-chosen TTL is a config value. Knowing which data can be seconds stale (most
          of it) versus what genuinely cannot (payment state) is the actual design work. This cut P95 API latency by
          about 35%.
        </p>

        <h2>Async by default</h2>
        <p>
          The pattern that scaled best was also the oldest one: stop making synchronous calls between services when
          the caller doesn&apos;t need an immediate answer. We moved dealer integrations from synchronous REST to
          event-driven messaging on AWS SQS and ActiveMQ, and rebuilt notifications as an asynchronous pipeline that
          now handles over a million deliveries a day at ~40% lower latency.
        </p>
        <ul>
          <li>Producers don&apos;t wait on consumers, so one slow integration can&apos;t stall the request path.</li>
          <li>Queues absorb traffic spikes that would otherwise cascade as timeouts.</li>
          <li>Retries become a queue policy instead of bespoke code in every caller.</li>
        </ul>
        <p>
          This started as one team&apos;s pattern and became the org-wide standard across three teams — not because of
          a mandate, but because on-call weeks were visibly quieter for services behind queues.
        </p>

        <h2>The boring layer is the load-bearing one</h2>
        <p>
          None of the above survives contact with production without the unglamorous layer: CI/CD automation across
          the services on EKS with Helm (deployment cycles down ~25%), SLO-driven monitoring, and clear ownership of
          incident response and capacity planning. 99.9% uptime isn&apos;t an architecture property — it&apos;s an
          operations habit.
        </p>
        <p>
          If I had to compress two years into one sentence: <strong>make rollback cheap, make staleness explicit,
          make slowness asynchronous, and automate the path to production.</strong> Everything else was detail.
        </p>
      </>
    ),
  },
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
