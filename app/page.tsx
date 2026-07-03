'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowRight,
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  ClipboardList,
  Users,
  FileText,
  UserCheck,
  Circle,
} from 'lucide-react'
import { PublicNav } from '@/components/landing/public-nav'
import { useReveal } from '@/components/landing/use-reveal'

const PHOTOS = {
  hero:        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&h=1100&fit=crop&auto=format&q=85',
  studentWork: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&h=1000&fit=crop&auto=format&q=85',
  g1: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&h=400&fit=crop&auto=format&q=80',
  g2: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=500&h=400&fit=crop&auto=format&q=80',
  g3: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=500&h=400&fit=crop&auto=format&q=80',
  g4: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=500&h=400&fit=crop&auto=format&q=80',
  g5: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=400&fit=crop&auto=format&q=80',
  g6: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500&h=400&fit=crop&auto=format&q=80',
}

const EMPLOYER_LOGOS = ['Downer', 'John Holland', 'CPB', 'Ventia', 'UGL']

const STATS = [
  { value: '2,400+', label: 'Graduates placed',       sub: 'Across 12 NSW campuses' },
  { value: '500+',   label: 'Verified employers',     sub: 'Infrastructure, Trades, Construction & more' },
  { value: '89%',    label: 'Placed within 6 months', sub: 'Of graduates who complete their profile' },
]

const BULLET_POINTS = [
  { label: 'Real skills',        desc: 'Show what you can do with evidence, not just words.' },
  { label: 'Real employers',     desc: 'Connect with verified businesses actively hiring.' },
  { label: 'Real opportunities', desc: 'Find roles that match your skills and career goals.' },
]

const PROFILE_CARDS = [
  {
    initials: 'LR', color: 'bg-navy-600',
    name: 'Liam R.',    title: 'Electrical Graduate',    campus: 'TAFE NSW – Ultimo',
    skills: ['Electrical', 'Fault Finding'],
  },
  {
    initials: 'SM', color: 'bg-teal-700',
    name: 'Sarah M.',   title: 'Civil Construction',     campus: 'TAFE NSW – Norwise',
    skills: ['Site Safety', 'Set Out'],
  },
  {
    initials: 'JT', color: 'bg-ochre-700',
    name: 'Jordan T.',  title: 'Welder (Fabrication)',   campus: 'TAFE NSW – Wetherill Park',
    skills: ['MIG Welding', 'Blueprints'],
  },
  {
    initials: 'AK', color: 'bg-navy-500',
    name: 'Aisha K.',   title: 'Automotive Fitter',      campus: 'TAFE NSW – Hamilton',
    skills: ['Maintenance', 'Fitting'],
  },
]

const JOURNEY_STEPS = [
  { n: '1', title: 'Create your profile',   desc: 'Tell us about your skills, qualifications and goals.',                                         Icon: ClipboardList },
  { n: '2', title: 'Get matched',           desc: 'We connect you with employers looking for your skills.',                                       Icon: Users },
  { n: '3', title: 'Show your evidence',    desc: 'Upload certificates, projects and experience that prove what you can do.',                     Icon: FileText },
  { n: '4', title: 'Get hired',             desc: 'Apply with confidence and land opportunities that move your career forward.',                  Icon: UserCheck },
]

const TESTIMONIALS = [
  {
    quote: 'CyberMil helped me showcase my skills beyond a resume. I landed my first role two weeks after my profile went live.',
    name: 'Liam R.',  role: 'Electrical Graduate',           initials: 'LR', color: 'bg-navy-600',
  },
  {
    quote: "We found the right candidate faster because we could see real evidence of their work. It's a game changer.",
    name: 'Sarah H.', role: 'HR Manager, BuildTech',         initials: 'SH', color: 'bg-teal-700',
  },
  {
    quote: 'The platform is easy to use and connects us with motivated graduates who are job-ready.',
    name: 'Mark B.',  role: 'Operations Manager, InfraWorks', initials: 'MB', color: 'bg-ochre-700',
  },
]

export default function LandingPage() {
  const [activeDot, setActiveDot] = useState(0)

  const statsRef       = useReveal()
  const learningRef    = useReveal()
  const employerRef    = useReveal()
  const galleryRef     = useReveal(0.1)
  const journeyRef     = useReveal(0.1)
  const testimonialRef = useReveal(0.15)
  const ctaRef         = useReveal(0.1)

  return (
    <>
      <PublicNav />

      {/* ══════════════════════════════════════════════════════
          §1  HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative bg-navy-800 overflow-hidden min-h-screen flex" aria-label="Hero">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 w-full flex flex-col lg:flex-row items-stretch pt-16">

          {/* Left: copy */}
          <div className="flex-1 flex flex-col justify-center py-16 lg:py-24 pr-0 lg:pr-14 z-10">
            <p className="text-ochre-400 text-xs font-semibold uppercase tracking-[0.14em] mb-6">
              Where skills meet opportunity
            </p>

            <h1
              className="font-display font-semibold text-white leading-[1.06] tracking-[-0.02em] mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.25rem)' }}
            >
              Your qualification
              <br />is proof of
              <br /><em className="not-italic text-ochre-400">real</em> capability.
            </h1>

            <p className="text-white/60 text-lg leading-relaxed max-w-[40ch] mb-10">
              CyberMil connects vocational graduates with verified employers who value what you can actually do.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-14">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-md bg-ochre-500 hover:bg-ochre-600 active:bg-ochre-700 text-white font-semibold text-sm transition-colors"
              >
                Get started <ArrowRight className="size-4" />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-md border border-white/20 text-white/75 hover:text-white hover:border-white/40 font-medium text-sm transition-colors"
              >
                Explore how it works <Circle className="size-3.5" />
              </Link>
            </div>

            {/* Trusted by logos */}
            <div>
              <p className="text-white/30 text-xs uppercase tracking-[0.1em] mb-4">
                Trusted by employers across Australia
              </p>
              <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
                {EMPLOYER_LOGOS.map((logo) => (
                  <span key={logo} className="text-white/35 text-sm font-semibold tracking-wide">
                    {logo}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: hero image */}
          <div className="relative lg:w-[44%] shrink-0 self-stretch">
            <div className="relative h-[55vw] max-h-[680px] lg:h-full lg:max-h-none overflow-hidden">
              <Image
                src={PHOTOS.hero}
                alt="Construction worker on an active building site"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 44vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-navy-800/25 mix-blend-multiply" aria-hidden />
              <div
                className="absolute inset-y-0 left-0 w-28 hidden lg:block"
                style={{ background: 'linear-gradient(to right, #0A182B, transparent)' }}
                aria-hidden
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          §2  STATS
      ══════════════════════════════════════════════════════ */}
      <section className="bg-white border-b border-gray-100 py-16 lg:py-20" aria-label="Platform metrics">
        <div ref={statsRef} className="max-w-[1200px] mx-auto px-6 lg:px-8 reveal">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            {STATS.map(({ value, label, sub }, i) => (
              <div
                key={value}
                className={[
                  'py-10 sm:py-0 text-center sm:text-left',
                  i > 0 ? 'sm:pl-10 lg:pl-16' : '',
                  i < 2 ? 'sm:pr-10 lg:pr-16' : '',
                ].join(' ')}
              >
                <p
                  className="font-mono font-semibold text-navy-800 tracking-tight leading-none"
                  style={{ fontSize: 'clamp(2.8rem, 5vw, 4rem)' }}
                >
                  {value}
                </p>
                <p className="text-ochre-500 font-semibold text-sm mt-3">{label}</p>
                <p className="text-gray-400 text-xs mt-1 leading-snug">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          §3  FROM LEARNING TO EARNING
      ══════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 lg:py-28 overflow-hidden" aria-label="Value proposition">
        <div
          ref={learningRef}
          className="max-w-[1200px] mx-auto px-6 lg:px-8 lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center reveal"
        >
          {/* Left: text */}
          <div className="mb-12 lg:mb-0 order-2 lg:order-1">
            <p className="text-ochre-500 text-xs font-semibold uppercase tracking-[0.14em] mb-4">
              Built for vocational graduates
            </p>
            <h2
              className="font-display font-semibold text-gray-800 leading-[1.15] tracking-[-0.015em] mb-5"
              style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)' }}
            >
              From learning<br />to earning.<br />We make the connection.
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-[44ch]">
              Every skill you've learned has value. CyberMil helps you show it with verified evidence and connects you with employers who are actively hiring.
            </p>
            <div className="space-y-4">
              {BULLET_POINTS.map(({ label, desc }) => (
                <div key={label} className="flex items-start gap-3">
                  <CheckCircle2 className="size-5 text-ochre-500 mt-0.5 shrink-0" strokeWidth={2} />
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">{label}</span>
                    {' '}— {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image */}
          <div className="relative overflow-hidden rounded-xl order-1 lg:order-2" style={{ aspectRatio: '4/5' }}>
            <Image
              src={PHOTOS.studentWork}
              alt="Students working in a vocational training workshop"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-navy-800/15 mix-blend-multiply" aria-hidden />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          §4  FIND VERIFIED GRADUATES  (dark)
      ══════════════════════════════════════════════════════ */}
      <section className="bg-navy-800 py-20 lg:py-28" aria-label="Employer graduate search">
        <div
          ref={employerRef}
          className="max-w-[1200px] mx-auto px-6 lg:px-8 lg:grid lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:items-center reveal"
        >
          {/* Left: copy */}
          <div className="mb-12 lg:mb-0">
            <p className="text-ochre-400 text-xs font-semibold uppercase tracking-[0.14em] mb-4">For employers</p>
            <h2
              className="font-display font-semibold text-white leading-[1.15] tracking-[-0.015em] mb-5"
              style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)' }}
            >
              Find verified graduates who are ready to work.
            </h2>
            <p className="text-white/55 text-base leading-relaxed mb-8 max-w-[40ch]">
              Search by qualification, skills or campus to find the right people faster.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-1.5 text-ochre-400 hover:text-ochre-300 font-semibold text-sm transition-colors"
            >
              Post a role for free <ArrowRight className="size-4" />
            </Link>
          </div>

          {/* Right: search UI mock */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-4 lg:p-5 space-y-3">
            {/* Search bar */}
            <div className="flex gap-2">
              <div className="flex-1 flex items-center gap-2 h-10 px-3 rounded-lg bg-navy-900/60 border border-white/10">
                <Search className="size-3.5 text-white/30 shrink-0" />
                <span className="text-white/30 text-xs">Search by qualification, skill or campus</span>
              </div>
              <div className="flex items-center gap-1.5 h-10 px-3 rounded-lg bg-navy-900/60 border border-white/10 text-white/35 text-xs shrink-0">
                <SlidersHorizontal className="size-3.5" />
                Filters
              </div>
            </div>

            {/* Profile cards grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {PROFILE_CARDS.map(({ initials, color, name, title, campus, skills }) => (
                <div
                  key={name}
                  className="rounded-xl bg-navy-900/50 border border-white/8 p-3 space-y-2.5"
                >
                  <div className="flex items-center gap-2">
                    <div className={`size-8 rounded-full ${color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-white text-xs font-semibold truncate">{name}</p>
                      <p className="text-white/40 text-[10px] truncate">{title}</p>
                    </div>
                  </div>
                  <p className="text-white/30 text-[10px] leading-snug">{campus}</p>
                  <div className="flex flex-wrap gap-1">
                    {skills.map((s) => (
                      <span key={s} className="px-1.5 py-0.5 rounded bg-white/8 text-white/50 text-[10px]">
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="size-1.5 rounded-full bg-green-400" />
                    <span className="text-green-400 text-[10px] font-medium">Available</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          §5  PROOF OF WORK GALLERY
      ══════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 lg:py-28 overflow-hidden" aria-label="Proof of work gallery">
        <div
          ref={galleryRef}
          className="max-w-[1200px] mx-auto px-6 lg:px-8 lg:grid lg:grid-cols-[1fr_1.4fr] lg:gap-12 lg:items-start reveal"
        >
          {/* Left: text */}
          <div className="mb-10 lg:mb-0 lg:pt-2">
            <p className="text-ochre-500 text-xs font-semibold uppercase tracking-[0.14em] mb-4">Proof of work</p>
            <h2
              className="font-display font-semibold text-gray-800 leading-[1.15] tracking-[-0.015em] mb-5"
              style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)' }}
            >
              Real work.<br />Verified evidence.
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-7 max-w-[40ch]">
              Employers trust what they can see. CyberMil helps you showcase your training, projects and on-the-job experience.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-1.5 text-ochre-500 hover:text-ochre-600 font-semibold text-sm transition-colors"
            >
              Explore qualifications <ArrowRight className="size-4" />
            </Link>
          </div>

          {/* Right: 3×2 photo grid */}
          <div className="grid grid-cols-3 gap-2">
            {[PHOTOS.g1, PHOTOS.g2, PHOTOS.g3, PHOTOS.g4, PHOTOS.g5, PHOTOS.g6].map((src, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-lg bg-gray-100"
                style={{ aspectRatio: '4/3' }}
              >
                <Image
                  src={src}
                  alt="Vocational work evidence"
                  fill
                  sizes="(max-width: 640px) 33vw, 180px"
                  className="object-cover transition-transform duration-500 hover:scale-[1.04]"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          §6  YOUR JOURNEY. SIMPLIFIED.
      ══════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="bg-gray-50 py-20 lg:py-28" aria-label="How it works">
        <div ref={journeyRef} className="max-w-[1200px] mx-auto px-6 lg:px-8 reveal">
          <p className="text-ochre-500 text-xs font-semibold uppercase tracking-[0.14em] mb-4">How it works</p>
          <h2
            className="font-display font-semibold text-gray-800 leading-[1.15] tracking-[-0.015em] mb-14"
            style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)' }}
          >
            Your journey.<br />Simplified.
          </h2>

          {/* Steps with connector */}
          <div className="relative">
            {/* Dashed connector line (desktop) */}
            <div
              className="absolute top-[30px] left-[calc(12.5%-8px)] right-[calc(12.5%-8px)] h-px border-t-2 border-dashed border-gray-200 hidden lg:block"
              aria-hidden
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
              {JOURNEY_STEPS.map(({ n, title, desc, Icon }) => (
                <div key={n} className="flex flex-col items-start">
                  <div className="relative z-10 size-[60px] rounded-full bg-navy-800 flex items-center justify-center mb-6 shrink-0">
                    <Icon className="size-6 text-white" strokeWidth={1.5} />
                  </div>
                  <p className="font-mono text-sm font-semibold text-gray-300 mb-2">{n}</p>
                  <p className="font-semibold text-gray-800 text-base mb-2">{title}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          §7  TESTIMONIALS
      ══════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 lg:py-28" aria-label="Testimonials">
        <div ref={testimonialRef} className="max-w-[1200px] mx-auto px-6 lg:px-8 reveal">

          {/* Header row */}
          <div className="flex items-end justify-between mb-12 lg:mb-14">
            <div>
              <p className="text-ochre-500 text-xs font-semibold uppercase tracking-[0.14em] mb-4">
                Hear from our community
              </p>
              <h2
                className="font-display font-semibold text-gray-800 leading-[1.15] tracking-[-0.015em]"
                style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)' }}
              >
                Real people.<br />Real outcomes.
              </h2>
            </div>
            <div className="hidden lg:flex items-center gap-2 mb-1">
              <button
                className="size-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:border-gray-300 transition-colors"
                aria-label="Previous testimonials"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                className="size-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:border-gray-300 transition-colors"
                aria-label="Next testimonials"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>

          {/* Testimonial cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map(({ quote, name, role, initials, color }) => (
              <div key={name} className="space-y-5">
                <div className="font-display text-ochre-200 text-5xl leading-none select-none" aria-hidden>
                  &#x201C;
                </div>
                <p className="text-gray-700 text-base leading-relaxed">{quote}</p>
                <div className="flex items-center gap-3">
                  <div className={`size-9 rounded-full ${color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                    {initials}
                  </div>
                  <div>
                    <p className="text-gray-800 text-sm font-semibold">{name}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dot pagination */}
          <div className="flex items-center justify-center gap-2 mt-12" role="tablist" aria-label="Testimonial pages">
            {[0, 1, 2, 3].map((dot) => (
              <button
                key={dot}
                role="tab"
                aria-selected={activeDot === dot}
                aria-label={`Page ${dot + 1}`}
                onClick={() => setActiveDot(dot)}
                className={[
                  'rounded-full transition-all',
                  activeDot === dot
                    ? 'size-2.5 bg-ochre-500'
                    : 'size-2 bg-gray-200 hover:bg-gray-300',
                ].join(' ')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          §8  FINAL CTA
      ══════════════════════════════════════════════════════ */}
      <section className="relative bg-navy-800 py-28 lg:py-40 overflow-hidden" aria-label="Get started">
        {/* Dot-grid network texture */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
          aria-hidden
        />
        {/* Warm amber glow from bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-56"
          style={{ background: 'linear-gradient(to top, rgba(217,123,41,0.25), transparent)' }}
          aria-hidden
        />

        <div ref={ctaRef} className="relative max-w-[1200px] mx-auto px-6 lg:px-8 text-center reveal">
          <h2
            className="font-display font-semibold text-white leading-[1.1] tracking-[-0.02em] mb-5"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Your future starts now.
          </h2>
          <p className="text-white/50 text-base lg:text-lg leading-relaxed max-w-[46ch] mx-auto mb-10">
            Join thousands of graduates building real careers with real employers.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 h-12 px-8 rounded-md bg-ochre-500 hover:bg-ochre-600 active:bg-ochre-700 text-white font-semibold text-sm transition-colors"
          >
            Start your journey <ArrowRight className="size-4" />
          </Link>
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
