import { ArrowRight, GitBranch, Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { prototypes } from '@/prototypes'

function formatDate(iso: string) {
  const [year = 0, month = 1, day = 1] = iso.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function Playground() {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) return savedTheme === 'dark'
    return document.documentElement.classList.contains('dark')
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const sorted = [...prototypes]
    .reverse()
    .sort((a, b) => (b.mergedAt ?? b.createdAt).localeCompare(a.mergedAt ?? a.createdAt))

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div className="sticky top-0 z-50 w-full border-b border-border bg-white dark:bg-neutral-950">
        <div className="relative mx-auto flex max-w-3xl items-center justify-start px-6 py-3">
          <img
            src="https://www.feathr.co/hubfs/Feathr-Lockup-Horizontal-Midnight.svg"
            alt="Feathr logo"
            title="Feathr logo"
            width={120}
            height={35}
            className="block h-auto w-[120px] [filter:var(--logo-filter)]"
            loading="eager"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-6"
            onClick={() => setIsDark((prev) => !prev)}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 pb-16 pt-24">
        <header className="mb-12">
          <h1 className="[font-family:'FK_Screamer','FK_Grotesk',ui-sans-serif,system-ui,sans-serif] text-[72px] leading-none font-semibold uppercase">
            Forked Playground 🛝
          </h1>
          <p className="mt-2 text-muted-foreground">
            A directory of interactive prototypes.
          </p>
        </header>

        <div className="flex flex-col gap-4">
          {sorted.map((p) => (
            <Card
              key={p.slug}
              className="group h-full cursor-pointer border-transparent p-6 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04)] transition-shadow duration-200 hover:shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              role="link"
              tabIndex={0}
              onClick={() => {
                window.location.hash = `/${p.slug}`
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  window.location.hash = `/${p.slug}`
                }
              }}
            >
              <div className="flex h-full flex-col">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold leading-tight">
                      {p.title}
                    </h2>
                    {p.mergedAt ? (
                      <Badge className="border-transparent bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                        Merged
                      </Badge>
                    ) : (
                      <Badge className="border-transparent bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                        In Progress
                      </Badge>
                    )}
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </div>
                <p className="mb-6 text-sm text-muted-foreground">
                  {p.description}
                </p>
                <div className="mt-auto flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <GitBranch className="h-3.5 w-3.5" />
                    <code className="font-mono">{p.branch}</code>
                  </span>
                  {p.prNumber !== undefined && (
                    <>
                      <span className="text-border">·</span>
                      <a
                        href={`https://github.com/andy-weir/Playground/pull/${p.prNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="font-mono hover:text-foreground hover:underline"
                      >
                        #{p.prNumber}
                      </a>
                    </>
                  )}
                  <span className="text-border">·</span>
                  <span>
                    {p.mergedAt
                      ? `Merged ${formatDate(p.mergedAt)}`
                      : `Created ${formatDate(p.createdAt)}`}
                  </span>
                  <span className="text-border">·</span>
                  <span>Created by {p.author}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {prototypes.length === 0 && (
          <Card className="p-12 text-center text-sm text-muted-foreground">
            No prototypes yet. Merge a branch and add an entry to{' '}
            <code className="rounded bg-muted px-1.5 py-0.5">
              src/prototypes.tsx
            </code>
            .
          </Card>
        )}
      </div>
    </div>
  )
}
