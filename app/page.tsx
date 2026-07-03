'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, CheckCircle2, Shield, Search, FileCheck } from 'lucide-react'
import { PublicNav } from '@/components/landing/public-nav'
import { useReveal } from '@/components/landing/use-reveal'

// ── Photography: documentary-style Unsplash images (trade / vocational environments)
const PHOTOS = {
  hero:        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&h=1100&fit=crop&auto=format&q=85',
  studentWork: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&h=1000&fit=crop&auto=format&q=85',
  trade1:      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=700&h=530&fit=crop&auto=format&q=85',
  trade2:      'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=500&h=530&fit=crop&auto=format&q=85',
  trade3:      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&h=500&fit=crop&auto=format&q=85',
}

const STUDENT_STEPS = [
  { n: '01', title: 'Build your verified profile', desc: 'Upload your TAFE transcript, units studied, and practical evidence — not just a CV.' },
  { n: '02', title: 'Add proof of work',           desc: 'Attach photos of completed projects, assessments, and real workplace evidence.' },
  { n: '03', title: 'Get discovered',              desc: 'Employers search by qualification, campus, and skill — not by word count on a resume.' },
  { n: '04', title: 'Apply with confidence',       desc: 'Your profile replaces the cover letter. Your work speaks for itself.' },
]

const EMPLOYER_POINTS = [
  { icon: Search,    label: 'Search by qualification', desc: 'Filter by TAFE campus, course, units completed, and practical skills. Not job titles.' },
  { icon: Shield,    label: 'Verified credentials',    desc: 'Profiles reference actual TAFE records. No inflated claims, no ambiguous experience.' },
  { icon: FileCheck, label: 'Evidence, not claims',    desc: 'See what graduates have actually built, completed, and demonstrated — before you interview.' },
]

const GALLERY = [
  { src: PHOTOS.trade1, alt: 'Electrician working on wiring in an industrial panel',  caption: 'Electrical Installation — Cert III, 2024' },
  { src: PHOTOS.trade2, alt: 'IT technician at server rack in a data centre',          caption: 'IT Infrastructure — Cert IV, 2024' },
  { src: PHOTOS.trade3, alt: 'Active construction site with workers in hi-vis vests',  caption: 'Civil Construction — Cert III, 2024' },
]

export default function LandingPage() {
  const statsRef       = useReveal()
  const studentRef     = useReveal()
  const employerRef    = useReveal()
  const galleryRef     = useReveal(0.1)
  const testimonialRef = useReveal(0.2)
  const ctaRef         = useReveal(0.1)

  return (
    <>
      <PublicNav />

      {/* ════════════════════════════════════════════════════════
          § 1  HERO
      ════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen bg-navy-800 overflow-hidden flex flex-col" aria-label="Hero">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 w-full flex-1 flex flex-col lg:flex-row items-stretch pt-24 pb-0">

          {/* Left: editorial type block */}
          <div className="flex-1 flex flex-col justify-center py-12 lg:py-20 pr-0 lg:pr-12 z-10">
            <p className="text-ochre-400 text-xs font-semibold uppercase tracking-[0.14em] mb-6 reveal in-view reveal-delay-1">
              Where TAFE NSW skill meets industry demand
            </p>
            <h1
              className="font-display font-semibold text-white leading-[1.06] tracking-[-0.02em] mb-6 reveal in-view reveal-delay-2"
              style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)' }}
            >
              Your qualification
              <br />
              is proof of
              <br />
              <em className="not-italic text-white/50">real</em> capability.
            </h1>
            <p className="text-white/55 text-lg leading-relaxed max-w-[38ch] mb-10 reveal in-view reveal-delay-3">
              CyberMil connects TAFE NSW graduates with employers who understand what a
              vocational qualification actually means — and what the person holding it
              can actually do.
            </p>
            <div className="flex flex-wrap items-center gap-3 reveal in-view reveal-delay-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-md bg-ochre-500 hover:bg-ochre-600 active:bg-ochre-700 text-white font-semibold text-sm transition-colors"
              >
                Get started <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 h-12 px-6 rounded-md border border-white/20 text-white/70 hover:text-white hover:border-white/40 font-medium text-sm transition-colors"
              >
                Sign in <ArrowUpRight className="size-3.5" />
              </Link>
            </div>
          </div>

          {/* Right: documentary photo */}
          <div className="relative lg:w-[45%] shrink-0 mt-8 lg:mt-0 lg:self-stretch">
            <div className="relative h-[52vw] max-h-[680px] lg:h-full lg:max-h-none overflow-hidden">
              <Image
                src={PHOTOS.hero}
                alt="Construction workers on an active building site — hands-on trade work"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-center"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'rgba(10,24,43,0.28)', mixBlendMode: 'multiply' }}
                aria-hidden="true"
              />
              <div
                className="absolute inset-y-0 left-0 w-32 hidden lg:block"
                style={{ background: 'linear-gradient(to right, #0A182B, transparent)' }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Bottom stats strip */}
        <div className="border-t border-white/10 mt-auto">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-3 divide-x divide-white/10 py-6">
              {[
                { value: '2,400+', label: 'graduates placed' },
                { value: '500+',   label: 'verified employers' },
                { value: '89%',    label: 'placed within 6 months' },
              ].map(({ value, label }, i) => (
                <div key={label} className={`${i > 0 ? 'pl-6 lg:pl-10' : ''} ${i < 2 ? 'pr-6 lg:pr-10' : ''}`}>
                  <p className="font-mono text-2xl sm:text-3xl font-medium text-white tracking-tight">{value}</p>
                  <p className="text-white/35 text-xs mt-1 uppercase tracking-[0.07em]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          § 2  PROOF NUMBERS
      ════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-20 lg:py-28 overflow-hidden" aria-label="Platform metrics">
        <div ref={statsRef} className="max-w-[1200px] mx-auto px-6 lg:px-8 reveal">
          <p className="text-gray-400 text-xs uppercase tracking-[0.14em] font-semibold mb-16">
            The numbers behind the network
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
            {[
              { value: '2,400+', label: 'TAFE graduates on the platform', sub: 'Across 12 NSW campuses' },
              { value: '500+',   label: 'Employers actively hiring',       sub: 'Infrastructure, IT, trades, construction' },
              { value: '89%',    label: 'Placed within six months',        sub: 'Of graduates who complete their profile' },
            ].map(({ value, label, sub }, i) => (
              <div
                key={value}
                className={`py-8 ${i > 0 ? 'sm:pl-12 sm:border-l border-gray-200' : ''} ${i < 2 ? 'sm:pr-12' : ''} border-b sm:border-b-0 border-gray-200 reveal reveal-delay-${i + 1}`}
              >
                <p
                  className="font-mono font-medium text-navy-800 tracking-tight leading-none"
                  style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}
                >
                  {value}
                </p>
                <p className="text-gray-700 text-base mt-3 leading-snug">{label}</p>
                <p className="text-gray-400 text-xs mt-1.5 uppercase tracking-[0.06em]">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          § 3  STUDENT JOURNEY
      ════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 lg:py-0 overflow-hidden" aria-label="How it works for students">
        <div ref={studentRef} className="max-w-[1200px] mx-auto lg:grid lg:grid-cols-2 lg:min-h-[640px]">
          {/* Left: full-height photo */}
          <div className="relative lg:h-full aspect-[4/5] lg:aspect-auto overflow-hidden reveal">
            <Image
              src={PHOTOS.studentWork}
              alt="Student working at a technical workbench in a real workshop environment"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'rgba(10,24,43,0.22)', mixBlendMode: 'multiply' }}
              aria-hidden="true"
            />
            <div className="absolute bottom-5 left-5">
              <span className="inline-block px-2.5 py-1 bg-navy-800/80 backdrop-blur-sm text-white/70 text-xs font-mono uppercase tracking-wide rounded">
                Student view
              </span>
            </div>
          </div>

          {/* Right: steps */}
          <div className="px-6 lg:px-12 py-16 lg:py-20 flex flex-col justify-center">
            <p className="text-ochre-600 text-xs font-semibold uppercase tracking-[0.12em] mb-4 reveal reveal-delay-1">
              For students
            </p>
            <h2
              className="font-display font-semibold text-gray-800 leading-[1.15] tracking-[-0.015em] mb-10 reveal reveal-delay-2"
              style={{ fontSize: 'clamp(1.7rem, 3vw, 2.4rem)' }}
            >
              From qualification
              <br />to your first
              <br />placement.
            </h2>
            <div className="space-y-7">
              {STUDENT_STEPS.map(({ n, title, desc }, i) => (
                <div key={n} className={`flex gap-5 reveal reveal-delay-${i + 2}`}>
                  <span className="font-mono text-xs font-medium text-gray-300 pt-0.5 w-7 shrink-0 tabular-nums">{n}</span>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm mb-1">{title}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/register"
              className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-navy-700 hover:text-navy-500 transition-colors group reveal reveal-delay-5"
            >
              Create your profile
              <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          § 4  EMPLOYER JOURNEY
      ════════════════════════════════════════════════════════ */}
      <section className="bg-navy-800 py-20 lg:py-28" aria-label="How it works for employers">
        <div ref={employerRef} className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start">
            <div className="mb-14 lg:mb-0">
              <p className="text-white/35 text-xs font-semibold uppercase tracking-[0.12em] mb-4 reveal">For employers</p>
              <h2
                className="font-display font-semibold text-white leading-[1.15] tracking-[-0.015em] mb-6 reveal reveal-delay-1"
                style={{ fontSize: 'clamp(1.7rem, 3vw, 2.4rem)' }}
              >
                Find graduates who
                <br />can prove what
                <br />they know.
              </h2>
              <p className="text-white/50 text-base leading-relaxed mb-10 max-w-[38ch] reveal reveal-delay-2">
                Every CyberMil profile is built around demonstrated capability — not job
                titles or years of experience. Search by what matters. Hire with confidence.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 h-11 px-6 rounded-md border border-white/25 text-white/80 hover:text-white hover:border-white/50 font-medium text-sm transition-colors reveal reveal-delay-3"
              >
                Post a role free <ArrowUpRight className="size-4" />
              </Link>
            </div>

            <div className="space-y-5">
              {EMPLOYER_POINTS.map(({ icon: Icon, label, desc }, i) => (
                <div
                  key={label}
                  className={`rounded-xl border border-white/8 bg-white/5 p-5 flex gap-4 reveal reveal-delay-${i + 2}`}
                >
                  <div className="size-9 rounded-lg bg-navy-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="size-4 text-white/60" strokeWidth={1.75} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm mb-1">{label}</p>
                    <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}

              {/* Hiring pipeline — CSS-drawn */}
              <div className="rounded-xl border border-white/8 bg-white/5 p-5 reveal reveal-delay-5">
                <p className="text-white/35 text-xs font-mono uppercase tracking-[0.08em] mb-4">Hiring pipeline</p>
                <div className="flex items-center gap-0 flex-wrap gap-y-2">
                  {[
                    { step: 'Search', active: true },
                    { step: 'Review evidence', active: false },
                    { step: 'Shortlist', active: false },
                    { step: 'Hire', active: false },
                  ].map(({ step, active }, i, arr) => (
                    <div key={step} className="flex items-center">
                      <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium whitespace-nowrap
                        ${active ? 'bg-ochre-500/20 text-ochre-300 border border-ochre-500/30' : 'text-white/30'}`}
                      >
                        {active && <CheckCircle2 className="size-3 text-ochre-400" strokeWidth={2} />}
                        {step}
                      </div>
                      {i < arr.length - 1 && <div className="w-4 h-px bg-white/15 mx-1 shrink-0" aria-hidden="true" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          § 5  PROOF OF WORK GALLERY
      ════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-20 lg:py-28 overflow-hidden" aria-label="Proof of work gallery">
        <div ref={galleryRef} className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="mb-10 lg:mb-14 reveal">
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-[0.12em] mb-3">Proof of work</p>
            <h2
              className="font-display font-semibold text-gray-800 leading-[1.15] tracking-[-0.015em]"
              style={{ fontSize: 'clamp(1.7rem, 3vw, 2.4rem)' }}
            >
              Real work.
              <br />Verified outcomes.
            </h2>
          </div>

          <div className="space-y-3">
            {/* Top row: asymmetric 55/45 */}
            <div className="grid grid-cols-1 sm:grid-cols-[55fr_45fr] gap-3">
              {GALLERY.slice(0, 2).map(({ src, alt, caption }, i) => (
                <figure key={i} className={`reveal reveal-delay-${i + 1}`}>
                  <div className="relative overflow-hidden rounded-lg bg-navy-100" style={{ aspectRatio: '4/3' }}>
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1200px) 55vw, 660px"
                      className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                      unoptimized
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: 'rgba(10,24,43,0.15)', mixBlendMode: 'multiply' }}
                      aria-hidden="true"
                    />
                  </div>
                  <figcaption className="mt-2 text-xs font-mono text-gray-400 uppercase tracking-[0.06em]">
                    {caption}
                  </figcaption>
                </figure>
              ))}
            </div>

            {/* Full-width landscape */}
            <figure className="reveal reveal-delay-3">
              <div className="relative overflow-hidden rounded-lg bg-navy-100" style={{ aspectRatio: '21/7' }}>
                <Image
                  src={GALLERY[2].src}
                  alt={GALLERY[2].alt}
                  fill
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-cover object-center transition-transform duration-500 hover:scale-[1.01]"
                  unoptimized
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'rgba(10,24,43,0.20)', mixBlendMode: 'multiply' }}
                  aria-hidden="true"
                />
              </div>
              <figcaption className="mt-2 text-xs font-mono text-gray-400 uppercase tracking-[0.06em]">
                {GALLERY[2].caption}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          § 6  TESTIMONIAL
      ════════════════════════════════════════════════════════ */}
      <section className="bg-white py-24 lg:py-36 overflow-hidden" aria-label="Testimonial">
        <div ref={testimonialRef} className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-[900px] reveal">
            <div
              className="font-display text-ochre-200 leading-none mb-2 select-none"
              style={{ fontSize: 'clamp(5rem, 12vw, 9rem)', lineHeight: 0.8 }}
              aria-hidden="true"
            >
              &#x201C;
            </div>
            <blockquote
              className="font-display font-medium text-gray-800 leading-[1.2] tracking-[-0.015em] mb-8 reveal reveal-delay-1"
              style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.6rem)' }}
            >
              I built a full solar system installation in my second year.
              CyberMil let me show that. I had an offer before graduation.
            </blockquote>
            <div className="flex items-center gap-3 reveal reveal-delay-2">
              <div
                className="size-10 rounded-full bg-navy-700 flex items-center justify-center text-white text-sm font-semibold font-display shrink-0"
                aria-hidden="true"
              >
                JL
              </div>
              <div>
                <p className="text-gray-800 text-sm font-medium">Jamie Liu</p>
                <p className="text-gray-400 text-xs font-mono mt-0.5">Cert IV in Electrotechnology · Placed at AGL, 2024</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          § 7  FINAL CTA
      ════════════════════════════════════════════════════════ */}
      <section className="bg-navy-800 py-20 lg:py-28" aria-label="Get started">
        <div ref={ctaRef} className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <p className="text-white/35 text-xs font-semibold uppercase tracking-[0.12em] mb-6 reveal">Ready to begin</p>
          <h2
            className="font-display font-semibold text-white leading-[1.1] tracking-[-0.02em] mb-16 reveal reveal-delay-1"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
          >
            Two paths.
            <br />One platform.
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-8 lg:gap-0">
            {/* Student path */}
            <div className="lg:pr-16 reveal reveal-delay-2">
              <p className="text-white/35 text-xs font-mono uppercase tracking-[0.1em] mb-3">For graduates</p>
              <h3 className="font-display text-white text-2xl font-semibold mb-3">Start as a student</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-7 max-w-[36ch]">
                Build a verified profile, attach evidence of your work, and let employers
                find you based on what you can actually do.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-md bg-ochre-500 hover:bg-ochre-600 active:bg-ochre-700 text-white font-semibold text-sm transition-colors"
              >
                Create your profile <ArrowRight className="size-4" />
              </Link>
            </div>

            {/* Divider */}
            <div className="hidden lg:block bg-white/10" aria-hidden="true" />

            {/* Employer path */}
            <div className="lg:pl-16 reveal reveal-delay-3">
              <p className="text-white/35 text-xs font-mono uppercase tracking-[0.1em] mb-3">For employers</p>
              <h3 className="font-display text-white text-2xl font-semibold mb-3">Hire verified talent</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-7 max-w-[36ch]">
                Search by qualification, campus, and demonstrated skill. Post a role and
                reach graduates who are ready to prove their capability.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-md border border-white/25 text-white/80 hover:text-white hover:border-white/50 font-medium text-sm transition-colors"
              >
                Post a role free <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-navy-900 border-t border-white/5 py-8">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs font-mono">© 2026 CyberMil Pty Ltd. All rights reserved.</p>
          <div className="flex items-center gap-5">
            {['Privacy', 'Terms', 'Contact'].map((label) => (
              <Link key={label} href="#" className="text-white/25 hover:text-white/50 text-xs font-mono transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </>
  )
}
