'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowRight, Search, MapPin, ChevronLeft, ChevronRight,
  CheckCircle2, ClipboardList, Users, FileText, UserCheck,
  Zap, HardHat, Cog, Wrench, FlaskConical, Mountain,
  Star, Building2, Clock, Eye, BookOpen,
} from 'lucide-react'
import { PublicNav } from '@/components/landing/public-nav'
import { useReveal } from '@/components/landing/use-reveal'

// ── Data ──────────────────────────────────────────────────────────────────────

const PHOTOS = {
  hero:        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&h=1100&fit=crop&auto=format&q=85',
  studentWork: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&h=1000&fit=crop&auto=format&q=85',
}

const LOGOS = [
  'Downer Group', 'John Holland', 'CPB Contractors', 'Ventia',
  'UGL Limited', 'Lendlease', 'BlueScope Steel', 'Ausgrid',
  'Bechtel', "Laing O'Rourke",
]

const INDUSTRIES = [
  { label: 'Construction', icon: HardHat,     count: '420+', cardTop: 'bg-orange-50',  iconBg: 'bg-orange-100', iconColor: 'text-orange-600', hoverBorder: 'hover:border-orange-300' },
  { label: 'Electrical',   icon: Zap,          count: '310+', cardTop: 'bg-yellow-50',  iconBg: 'bg-yellow-100', iconColor: 'text-yellow-600', hoverBorder: 'hover:border-yellow-300' },
  { label: 'Mechanical',   icon: Cog,          count: '280+', cardTop: 'bg-blue-50',    iconBg: 'bg-blue-100',   iconColor: 'text-blue-600',   hoverBorder: 'hover:border-blue-300'   },
  { label: 'Fabrication',  icon: Wrench,       count: '190+', cardTop: 'bg-purple-50',  iconBg: 'bg-purple-100', iconColor: 'text-purple-600', hoverBorder: 'hover:border-purple-300' },
  { label: 'Engineering',  icon: FlaskConical, count: '240+', cardTop: 'bg-teal-50',    iconBg: 'bg-teal-100',   iconColor: 'text-teal-600',   hoverBorder: 'hover:border-teal-300'   },
  { label: 'Mining',       icon: Mountain,     count: '160+', cardTop: 'bg-red-50',     iconBg: 'bg-red-100',    iconColor: 'text-red-600',    hoverBorder: 'hover:border-red-300'    },
]

const PROFILE_CARDS = [
  { initials: 'LR', color: 'bg-navy-600',  name: 'Liam R.',   title: 'Electrical Graduate',  campus: 'TAFE NSW – Ultimo',         skills: ['Electrical', 'Fault Finding']  },
  { initials: 'SM', color: 'bg-teal-700',  name: 'Sarah M.',  title: 'Civil Construction',   campus: 'TAFE NSW – Norwise',        skills: ['Site Safety', 'Set Out']       },
  { initials: 'JT', color: 'bg-ochre-700', name: 'Jordan T.', title: 'Welder (Fabrication)', campus: 'TAFE NSW – Wetherill Park', skills: ['MIG Welding', 'Blueprints']    },
  { initials: 'AK', color: 'bg-navy-500',  name: 'Aisha K.',  title: 'Automotive Fitter',    campus: 'TAFE NSW – Hamilton',       skills: ['Maintenance', 'Fitting']       },
]

const FEATURED_JOBS = [
  { id: 1, title: 'Electrical Apprentice (Certificate III)', company: 'Ausgrid',         companyInitials: 'AG',  companyBg: 'bg-yellow-500', location: 'Sydney, NSW',    type: 'Apprenticeship', salary: '$18–$24/hr',     daysAgo: 1, hot: true  },
  { id: 2, title: 'Site Supervisor – Civil Construction',    company: 'CPB Contractors', companyInitials: 'CPB', companyBg: 'bg-orange-500', location: 'Newcastle, NSW', type: 'Full-time',      salary: '$95k–$115k/yr', daysAgo: 2, hot: false },
  { id: 3, title: 'Graduate Civil Engineer',                 company: 'John Holland',    companyInitials: 'JH',  companyBg: 'bg-red-700',    location: 'Brisbane, QLD',  type: 'Full-time',      salary: '$68k–$78k/yr',  daysAgo: 3, hot: false },
]

const JOURNEY_STEPS = [
  { n: '01', title: 'Create your profile',  desc: 'Tell us about your skills, qualifications and goals.',                Icon: ClipboardList },
  { n: '02', title: 'Get matched',          desc: 'We connect you with employers looking for your skills.',              Icon: Users         },
  { n: '03', title: 'Show your evidence',   desc: 'Upload certificates, projects and on-the-job experience.',            Icon: FileText      },
  { n: '04', title: 'Get hired',            desc: 'Apply with confidence and land opportunities that move your career.', Icon: UserCheck     },
]

const TESTIMONIALS = [
  { quote: 'CyberMil helped me showcase my skills beyond a resume. I landed my first role two weeks after my profile went live.',            name: 'Liam R.',  role: 'Electrical Graduate',            initials: 'LR', color: 'bg-navy-600',  stars: 5 },
  { quote: "We found the right candidate faster because we could see real evidence of their work. It's a complete game changer for hiring.", name: 'Sarah H.', role: 'HR Manager, BuildTech',          initials: 'SH', color: 'bg-teal-700',  stars: 5 },
  { quote: 'The platform connects us with motivated graduates who are job-ready. Far better than posting on generic job boards.',            name: 'Mark B.',  role: 'Operations Manager, InfraWorks', initials: 'MB', color: 'bg-ochre-700', stars: 5 },
]

const BULLET_POINTS = [
  { label: 'Real skills',        desc: 'Show what you can do with evidence, not just words.' },
  { label: 'Real employers',     desc: 'Connect with verified businesses actively hiring.' },
  { label: 'Real opportunities', desc: 'Find roles that match your skills and career goals.' },
]

// Shared dot-grid background — matches the login/register page texture
const DOT_BG: React.CSSProperties = {
  backgroundColor: '#F7F6F4',
  backgroundImage: 'radial-gradient(circle, #C9C5BC 1px, transparent 1px)',
  backgroundSize: '22px 22px',
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const [activeDot, setActiveDot] = useState(0)

  const industryRef    = useReveal()
  const learningRef    = useReveal()
  const employerRef    = useReveal()
  const jobsRef        = useReveal(0.1)
  const journeyRef     = useReveal(0.1)
  const testimonialRef = useReveal(0.15)
  const ctaRef         = useReveal(0.1)

  return (
    <>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0) }
          to   { transform: translateX(-50%) }
        }
      `}</style>

      <PublicNav />

      {/* ══ §1  HERO ══════════════════════════════════════════════════════ */}
      <section className="relative bg-navy-800 overflow-hidden" aria-label="Hero">

        {/* Glowing orbs */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-ochre-500/25 blur-[120px]" />
          <div className="absolute -bottom-40 -left-20 w-[500px] h-[500px] rounded-full bg-teal-500/20 blur-[100px]" />
          <div className="absolute top-1/4 left-1/3 w-[350px] h-[350px] rounded-full bg-blue-500/10 blur-[90px]" />
        </div>

        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 w-full flex flex-col lg:flex-row items-stretch pt-16 min-h-screen lg:min-h-0 lg:h-[88vh] lg:max-h-[820px]">

          {/* Left: copy */}
          <div className="flex-1 flex flex-col justify-center py-16 lg:py-20 pr-0 lg:pr-16 z-10">

            {/* Live badge */}
            <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-white/10 border border-white/15 mb-7">
              <span className="size-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-medium text-white/80">1,200+ roles active this week</span>
            </div>

            <h1
              className="font-display font-semibold text-white leading-[1.07] tracking-[-0.025em] mb-5"
              style={{ fontSize: 'clamp(2.4rem, 5.2vw, 4rem)' }}
            >
              Land your first role
              <br />with a qualification
              <br />that proves <em className="not-italic text-ochre-400">real</em> capability.
            </h1>

            <p className="text-white/55 text-base lg:text-lg leading-relaxed max-w-[42ch] mb-8">
              CyberMil connects TAFE graduates with verified employers who value what you can actually do — not just what a resume says.
            </p>

            {/* ── Search bar ── */}
            {/* Mobile: single unified white card (Seek/Indeed pattern) */}
            <div className="sm:hidden mb-8">
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
                <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100">
                  <Search className="size-4 text-gray-400 shrink-0" strokeWidth={1.75} />
                  <input
                    type="text"
                    placeholder="Job title or keyword…"
                    className="flex-1 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-3 px-4 py-4">
                  <MapPin className="size-4 text-gray-400 shrink-0" strokeWidth={1.75} />
                  <span className="text-sm text-gray-400">Sydney, NSW</span>
                </div>
                <div className="p-3 border-t border-gray-100">
                  <Link
                    href="/jobs"
                    className="flex items-center justify-center h-12 rounded-xl bg-ochre-500 hover:bg-ochre-600 text-white font-semibold text-sm transition-colors w-full"
                  >
                    Find jobs
                  </Link>
                </div>
              </div>
            </div>
            {/* Desktop: horizontal row */}
            <div className="hidden sm:flex gap-2 mb-8 max-w-xl">
              <div className="flex-1 flex items-center gap-2 h-12 px-4 rounded-xl bg-white border border-transparent">
                <Search className="size-4 text-gray-400 shrink-0" strokeWidth={1.75} />
                <input
                  type="text"
                  placeholder="Job title or keyword…"
                  className="flex-1 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2 h-12 px-4 rounded-xl bg-white/10 border border-white/15">
                <MapPin className="size-4 text-white/40 shrink-0" strokeWidth={1.75} />
                <span className="text-sm text-white/40 whitespace-nowrap">Sydney, NSW</span>
              </div>
              <Link
                href="/jobs"
                className="flex items-center justify-center h-12 px-6 rounded-xl bg-ochre-500 hover:bg-ochre-600 text-white font-semibold text-sm transition-colors shrink-0"
              >
                Find jobs
              </Link>
            </div>

            {/* Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-3 mb-10">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-white text-navy-800 font-semibold text-sm hover:bg-gray-50 transition-colors"
              >
                Create free profile <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-lg border border-white/20 text-white/70 hover:text-white hover:border-white/40 font-medium text-sm transition-colors"
              >
                I'm an employer →
              </Link>
            </div>

            {/* Trusted by */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="text-white/25 text-xs uppercase tracking-widest">Trusted by</span>
              {['Downer', 'John Holland', 'CPB', 'Ventia', 'UGL'].map((name) => (
                <span key={name} className="text-white/35 text-sm font-semibold">{name}</span>
              ))}
            </div>
          </div>

          {/* Right: image + floating cards */}
          <div className="relative lg:w-[42%] shrink-0 self-stretch hidden lg:block">
            <div className="relative h-full overflow-hidden">
              <Image
                src={PHOTOS.hero}
                alt="Construction worker on site"
                fill priority
                sizes="42vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-navy-800/30 mix-blend-multiply" aria-hidden />
              <div
                className="absolute inset-y-0 left-0 w-24"
                style={{ background: 'linear-gradient(to right, #0A182B, transparent)' }}
                aria-hidden
              />

              {/* Floating: new match card */}
              <div className="absolute top-[22%] -left-6 w-56 bg-white rounded-2xl shadow-2xl p-4">
                <div className="flex items-center gap-1.5 mb-3">
                  <span className="size-2 rounded-full bg-green-400" />
                  <span className="text-xs font-semibold text-green-600">New Match</span>
                </div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="size-9 rounded-xl bg-yellow-500 flex items-center justify-center text-white font-bold text-xs shrink-0">AG</div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800 leading-tight">Electrical Apprentice</p>
                    <p className="text-[11px] text-gray-400">Ausgrid · Sydney NSW</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] bg-ochre-50 text-ochre-700 font-medium px-2 py-0.5 rounded-full">Apprenticeship</span>
                  <span className="text-[11px] font-semibold text-navy-800">$18–$24/hr</span>
                </div>
              </div>

              {/* Floating: profile views */}
              <div className="absolute bottom-[28%] -left-6 bg-white rounded-2xl shadow-2xl px-4 py-3 flex items-center gap-3">
                <div className="size-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <Eye className="size-4 text-blue-500" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900 leading-none">48</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Profile views this week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ §2  LOGO MARQUEE ═════════════════════════════════════════════ */}
      <section className="bg-white border-b border-gray-100 py-5 overflow-hidden" aria-label="Employer logos">
        <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest mb-4">
          Trusted by Australia's leading employers
        </p>
        <div className="overflow-hidden">
          <div style={{ animation: 'marquee 28s linear infinite', display: 'flex', width: 'max-content' }}>
            {[...LOGOS, ...LOGOS].map((name, i) => (
              <span
                key={i}
                className="px-8 text-sm font-semibold text-gray-300 whitespace-nowrap border-r border-gray-100"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ §3  INDUSTRY BROWSE ══════════════════════════════════════════ */}
      <section className="py-20 lg:py-24" aria-label="Browse by industry" style={DOT_BG}>
        <div ref={industryRef} className="max-w-[1200px] mx-auto px-6 lg:px-8 reveal">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-ochre-500 text-xs font-semibold uppercase tracking-[0.14em] mb-3">Explore roles</p>
              <h2
                className="font-display font-semibold text-gray-800 leading-tight tracking-tight"
                style={{ fontSize: 'clamp(1.7rem, 3vw, 2.4rem)' }}
              >
                Browse by industry
              </h2>
            </div>
            <Link href="/jobs" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-ochre-500 hover:text-ochre-600 transition-colors">
              View all <ArrowRight className="size-4" />
            </Link>
          </div>

          {/* Mobile: horizontal list rows */}
          <div className="flex flex-col gap-3 sm:hidden">
            {INDUSTRIES.map(({ label, icon: Icon, count, iconBg, iconColor }) => (
              <Link
                key={label}
                href="/jobs"
                className="flex items-center gap-4 bg-white rounded-2xl border border-gray-200/70 p-4 shadow-sm hover:shadow-md hover:border-ochre-200 transition-all group"
              >
                <div className={`size-12 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
                  <Icon className={`size-6 ${iconColor}`} strokeWidth={1.75} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800">{label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{count} open roles</p>
                </div>
                <ArrowRight className="size-4 text-gray-300 group-hover:text-ochre-500 transition-colors shrink-0" />
              </Link>
            ))}
            <div className="flex justify-center mt-2">
              <Link href="/jobs" className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-gray-700 hover:border-gray-300 hover:shadow-sm transition-all">
                View all industries <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          {/* Desktop: cards with coloured top strip + icon */}
          <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {INDUSTRIES.map(({ label, icon: Icon, count, cardTop, iconBg, iconColor, hoverBorder }) => (
              <Link
                key={label}
                href="/jobs"
                className={`group flex flex-col rounded-2xl border border-gray-200/70 bg-white overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all ${hoverBorder}`}
              >
                {/* Coloured top */}
                <div className={`${cardTop} flex items-center justify-center py-7`}>
                  <div className={`size-14 rounded-2xl ${iconBg} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                    <Icon className={`size-7 ${iconColor}`} strokeWidth={1.75} />
                  </div>
                </div>
                {/* White bottom */}
                <div className="flex flex-col items-center text-center px-3 py-4">
                  <p className="text-sm font-semibold text-gray-800 leading-tight">{label}</p>
                  <p className="text-xs text-gray-400 mt-1">{count} jobs</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ §4  LEARNING TO EARNING ══════════════════════════════════════ */}
      <section className="bg-gray-50 py-20 lg:py-28 overflow-hidden" aria-label="Value proposition">
        <div
          ref={learningRef}
          className="max-w-[1200px] mx-auto px-6 lg:px-8 lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center reveal"
        >
          {/* Left: text */}
          <div className="mb-12 lg:mb-0 order-2 lg:order-1">
            <p className="text-ochre-500 text-xs font-semibold uppercase tracking-[0.14em] mb-4">Built for TAFE graduates</p>
            <h2
              className="font-display font-semibold text-gray-800 leading-[1.15] tracking-[-0.015em] mb-5"
              style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)' }}
            >
              From learning<br />to earning —<br />we make the connection.
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-[44ch]">
              Every skill you've built has value. CyberMil helps you prove it with verified evidence and connects you with employers actively looking for your qualification.
            </p>
            <div className="space-y-4 mb-10">
              {BULLET_POINTS.map(({ label, desc }) => (
                <div key={label} className="flex items-start gap-3">
                  <CheckCircle2 className="size-5 text-ochre-500 mt-0.5 shrink-0" strokeWidth={2} />
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">{label}</span> — {desc}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-navy-800 hover:bg-navy-700 text-white font-semibold text-sm transition-colors"
              >
                Get started free <ArrowRight className="size-4" />
              </Link>
              <Link href="/jobs" className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">
                Browse jobs →
              </Link>
            </div>
          </div>

          {/* Right: image + floating card */}
          <div className="relative overflow-hidden rounded-2xl order-1 lg:order-2" style={{ aspectRatio: '4/5' }}>
            <Image
              src={PHOTOS.studentWork}
              alt="Students in a vocational training workshop"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-navy-800/15 mix-blend-multiply" aria-hidden />
            {/* Floating profile card */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%] bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-navy-600 flex items-center justify-center text-white font-bold text-sm shrink-0">JT</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">Jordan T. — Boilermaker</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full w-[78%] bg-ochre-500 rounded-full" />
                    </div>
                    <span className="text-[11px] font-semibold text-ochre-600 shrink-0">78%</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-50">
                <CheckCircle2 className="size-3.5 text-green-500 shrink-0" strokeWidth={2} />
                <span className="text-[11px] text-gray-500">Profile visible to 500+ verified employers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ §5  EMPLOYER SECTION ═════════════════════════════════════════ */}
      <section className="bg-navy-800 py-20 lg:py-28" aria-label="For employers">
        <div
          ref={employerRef}
          className="max-w-[1200px] mx-auto px-6 lg:px-8 lg:grid lg:grid-cols-[1fr_1.3fr] lg:gap-16 lg:items-center reveal"
        >
          {/* Left: copy */}
          <div className="mb-12 lg:mb-0">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-widest text-ochre-400 bg-ochre-400/10 border border-ochre-400/20 px-3 py-1 rounded-full mb-5">
              For employers
            </span>
            <h2
              className="font-display font-semibold text-white leading-[1.15] tracking-[-0.015em] mb-5"
              style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)' }}
            >
              Find verified graduates<br />ready to work.
            </h2>
            <p className="text-white/55 text-base leading-relaxed mb-8 max-w-[40ch]">
              Search by qualification, skills or campus. Every profile is backed by verified TAFE credentials.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-ochre-500 hover:bg-ochre-600 text-white font-semibold text-sm transition-colors"
            >
              Post a role for free <ArrowRight className="size-4" />
            </Link>
            <div className="flex items-center gap-6 mt-8 pt-8 border-t border-white/8">
              {[['500+', 'Verified graduates'], ['2 min', 'To post a role'], ['Free', 'Forever']].map(([val, lbl]) => (
                <div key={lbl}>
                  <p className="text-white font-bold text-xl">{val}</p>
                  <p className="text-white/40 text-xs mt-0.5">{lbl}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: search mock */}
          <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 lg:p-5 space-y-3">
            <div className="flex gap-2">
              <div className="flex-1 flex items-center gap-2 h-10 px-3 rounded-xl bg-white/10 border border-white/10">
                <Search className="size-3.5 text-white/30 shrink-0" />
                <span className="text-white/30 text-xs">Search by qualification, skill or campus</span>
              </div>
              <div className="flex items-center h-10 px-3 rounded-xl bg-ochre-500/20 border border-ochre-400/30 text-ochre-300 text-xs shrink-0">
                Filter
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {PROFILE_CARDS.map(({ initials, color, name, title, campus, skills }) => (
                <div key={name} className="rounded-xl bg-white/5 border border-white/8 p-3 space-y-2.5 hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className={`size-8 rounded-full ${color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-white text-xs font-semibold truncate">{name}</p>
                      <p className="text-white/40 text-[10px] truncate">{title}</p>
                    </div>
                  </div>
                  <p className="text-white/30 text-[10px]">{campus}</p>
                  <div className="flex flex-wrap gap-1">
                    {skills.map((s) => (
                      <span key={s} className="px-1.5 py-0.5 rounded-md bg-white/10 text-white/50 text-[10px]">{s}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="size-1.5 rounded-full bg-green-400" />
                    <span className="text-green-400 text-[10px] font-medium">Available now</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ §6  FEATURED JOBS ════════════════════════════════════════════ */}
      <section className="bg-white py-20 lg:py-24" aria-label="Featured jobs">
        <div ref={jobsRef} className="max-w-[1200px] mx-auto px-6 lg:px-8 reveal">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-ochre-500 text-xs font-semibold uppercase tracking-[0.14em] mb-3">Latest roles</p>
              <h2
                className="font-display font-semibold text-gray-800 leading-tight tracking-tight"
                style={{ fontSize: 'clamp(1.7rem, 3vw, 2.4rem)' }}
              >
                Jobs posted this week
              </h2>
            </div>
            <Link href="/jobs" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-ochre-500 hover:text-ochre-600 transition-colors">
              See all 1,200+ jobs <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {FEATURED_JOBS.map((job) => (
              <Link
                key={job.id}
                href="/jobs"
                className="flex items-center gap-4 sm:gap-5 p-4 sm:p-5 bg-white rounded-2xl border border-gray-100 hover:shadow-md hover:-translate-y-0.5 hover:border-gray-200 transition-all group"
              >
                <div className={`size-12 sm:size-14 rounded-2xl ${job.companyBg} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                  {job.companyInitials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-navy-800 transition-colors">{job.title}</h3>
                    {job.hot && (
                      <span className="text-[10px] font-bold uppercase tracking-wide text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">Hot</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Building2 className="size-3" strokeWidth={1.75} />{job.company}</span>
                    <span className="flex items-center gap-1"><MapPin className="size-3" strokeWidth={1.75} />{job.location}</span>
                    <span className="flex items-center gap-1"><Clock className="size-3" strokeWidth={1.75} />{job.daysAgo}d ago</span>
                  </div>
                </div>
                <div className="hidden sm:flex flex-col items-end gap-2 shrink-0">
                  <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full">{job.type}</span>
                  <span className="text-sm font-semibold text-gray-800">{job.salary}</span>
                </div>
                <ArrowRight className="size-4 text-gray-300 group-hover:text-ochre-500 group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors"
            >
              Browse all jobs <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ §7  HOW IT WORKS ═════════════════════════════════════════════ */}
      <section id="how-it-works" className="py-20 lg:py-28" aria-label="How it works" style={DOT_BG}>
        <div ref={journeyRef} className="max-w-[1200px] mx-auto px-6 lg:px-8 reveal">
          <div className="text-center mb-14">
            <p className="text-ochre-500 text-xs font-semibold uppercase tracking-[0.14em] mb-3">How it works</p>
            <h2
              className="font-display font-semibold text-gray-800 leading-[1.15] tracking-[-0.015em]"
              style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)' }}
            >
              Your journey. Simplified.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {JOURNEY_STEPS.map(({ n, title, desc, Icon }, i) => (
              <div key={n} className="relative bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="flex items-start justify-between mb-5">
                  <div className="size-12 rounded-2xl bg-navy-800 flex items-center justify-center">
                    <Icon className="size-5 text-white" strokeWidth={1.5} />
                  </div>
                  <span className="font-mono text-2xl font-bold text-gray-100">{n}</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-base mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                {i < 3 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 size-6 rounded-full bg-white border border-gray-100 items-center justify-center shadow-sm z-10">
                    <ArrowRight className="size-3 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ §8  TESTIMONIALS ═════════════════════════════════════════════ */}
      <section className="bg-white py-20 lg:py-28" aria-label="Testimonials">
        <div ref={testimonialRef} className="max-w-[1200px] mx-auto px-6 lg:px-8 reveal">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-ochre-500 text-xs font-semibold uppercase tracking-[0.14em] mb-3">Community</p>
              <h2
                className="font-display font-semibold text-gray-800 leading-[1.15] tracking-[-0.015em]"
                style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)' }}
              >
                Real people.<br />Real outcomes.
              </h2>
            </div>
            <div className="hidden lg:flex items-center gap-2">
              <button className="size-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:border-gray-300 transition-colors" aria-label="Previous">
                <ChevronLeft className="size-4" />
              </button>
              <button className="size-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:border-gray-300 transition-colors" aria-label="Next">
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ quote, name, role, initials, color, stars }) => (
              <div key={name} className="flex flex-col bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: stars }).map((_, i) => (
                    <Star key={i} className="size-4 fill-ochre-400 text-ochre-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed flex-1 mb-5">{quote}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                  <div className={`size-10 rounded-full ${color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
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

          <div className="flex items-center justify-center gap-2 mt-10">
            {[0, 1, 2, 3].map((dot) => (
              <button
                key={dot}
                onClick={() => setActiveDot(dot)}
                aria-label={`Page ${dot + 1}`}
                className={['rounded-full transition-all', activeDot === dot ? 'size-2.5 bg-ochre-500' : 'size-2 bg-gray-200 hover:bg-gray-300'].join(' ')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══ §9  DUAL CTA ════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-24" aria-label="Get started" style={DOT_BG}>
        <div ref={ctaRef} className="max-w-[1200px] mx-auto px-6 lg:px-8 reveal">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Students */}
            <div className="relative overflow-hidden rounded-3xl bg-navy-800 p-8 lg:p-10">
              <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-ochre-500/20 blur-[80px]" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-teal-500/15 blur-[80px]" />
              </div>
              <div className="relative">
                <div className="size-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                  <BookOpen className="size-6 text-white" strokeWidth={1.75} />
                </div>
                <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-3">For students</p>
                <h3 className="font-display font-semibold text-white text-2xl lg:text-3xl leading-tight tracking-tight mb-4">
                  Turn your TAFE<br />qualification into<br />a career.
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-[34ch]">
                  Build a verified profile, get matched with employers and land your first role — all for free.
                </p>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-ochre-500 hover:bg-ochre-600 text-white font-semibold text-sm transition-colors"
                >
                  Create free profile <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>

            {/* Employers */}
            <div className="relative overflow-hidden rounded-3xl bg-ochre-500 p-8 lg:p-10">
              <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/15 blur-[80px]" />
              </div>
              <div className="relative">
                <div className="size-12 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                  <Building2 className="size-6 text-white" strokeWidth={1.75} />
                </div>
                <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-3">For employers</p>
                <h3 className="font-display font-semibold text-white text-2xl lg:text-3xl leading-tight tracking-tight mb-4">
                  Hire verified TAFE<br />graduates faster<br />than ever.
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-8 max-w-[34ch]">
                  Post a role in 2 minutes and get matched with job-ready candidates from across Australia.
                </p>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-white hover:bg-gray-50 text-ochre-600 font-semibold text-sm transition-colors"
                >
                  Post a role for free <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════════════════════════ */}
      <footer className="bg-navy-900 border-t border-white/5 pt-14 pb-8">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 md:col-span-4 lg:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="size-8 rounded-lg bg-ochre-500 flex items-center justify-center">
                  <BookOpen className="size-4 text-white" strokeWidth={2} />
                </div>
                <span className="font-display font-semibold text-white tracking-tight">CyberMil</span>
              </div>
              <p className="text-white/35 text-sm leading-relaxed max-w-[30ch]">
                Connecting TAFE graduates with verified employers across Australia.
              </p>
            </div>
            {[
              { heading: 'For students',  links: ['Find jobs', 'Create profile', 'Browse industries', 'Career tips'] },
              { heading: 'For employers', links: ['Post a role', 'Search graduates', 'Pricing', 'Enterprise'] },
              { heading: 'Company',       links: ['About', 'Blog', 'Privacy', 'Terms'] },
            ].map(({ heading, links }) => (
              <div key={heading}>
                <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-4">{heading}</p>
                <ul className="space-y-2.5">
                  {links.map((l) => (
                    <li key={l}>
                      <Link href="#" className="text-white/30 hover:text-white/60 text-sm transition-colors">{l}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/20 text-xs font-mono">© 2026 CyberMil Pty Ltd. All rights reserved.</p>
            <p className="text-white/15 text-xs font-mono">Made in Australia</p>
          </div>
        </div>
      </footer>
    </>
  )
}
