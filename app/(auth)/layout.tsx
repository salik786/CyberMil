import { GraduationCap } from 'lucide-react'

const stats = [
  { value: '500+', label: 'employers' },
  { value: '2,400+', label: 'students' },
  { value: '89%', label: 'placement rate' },
]

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/*
        LEFT PANEL — navy-700 brand panel.
        Uses flex-col with an independently centered middle section so the
        quote position never shifts regardless of right-panel content height.
      */}
      <div className="hidden lg:flex flex-col bg-navy-700 p-12">
        {/* ── Logo ───────────────────────────────────────────── */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center justify-center size-9 rounded-lg bg-ochre-500">
            <GraduationCap className="size-5 text-white" strokeWidth={2} />
          </div>
          <span className="font-display font-semibold text-xl text-white tracking-tight">
            CyberMil
          </span>
        </div>

        {/* ── Quote — centered in the remaining space ─────────── */}
        <div className="flex-1 flex flex-col justify-center py-16">
          <p className="text-ochre-400 text-xs font-semibold uppercase tracking-[0.1em] mb-5">
            Where TAFE NSW skill meets industry demand
          </p>

          <blockquote className="font-display text-[2rem] font-medium leading-[1.25] text-white mb-8">
            &#x201C;Your qualification is proof of real capability. We make sure the right employers see it.&#x201D;
          </blockquote>

          {/* Testimonial */}
          <div className="flex items-center gap-3 mb-12">
            <div className="size-10 rounded-full bg-navy-600 flex items-center justify-center text-white/60 text-sm font-semibold font-display shrink-0">
              JL
            </div>
            <div>
              <p className="text-white text-sm font-medium">Jamie Liu</p>
              <p className="text-white/40 text-xs">Cert IV in IT · Placed at Atlassian, 2024</p>
            </div>
          </div>

          {/* Stat row */}
          <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <p className="font-mono text-2xl font-medium text-white tracking-tight">{value}</p>
                <p className="text-white/40 text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Footer ──────────────────────────────────────────── */}
        <p className="text-white/25 text-xs shrink-0">
          © {new Date().getFullYear()} CyberMil Pty Ltd. All rights reserved.
        </p>
      </div>

      {/*
        RIGHT PANEL — gray-50 with a subtle dot-grid texture so it doesn't
        read as an unstyled template background. Form is always vertically
        centred via flex items-center on a min-h-screen container.
      */}
      <div
        className="flex items-center justify-center min-h-screen p-6 sm:p-12"
        style={{
          backgroundColor: '#F7F6F4',
          backgroundImage:
            'radial-gradient(circle, #C9C5BC 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      >
        {/* White card lifts form off the texture */}
        <div className="w-full max-w-sm bg-white rounded-xl shadow-md px-8 py-10">
          {/* Mobile logo */}
          <div className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="flex items-center justify-center size-8 rounded-lg bg-ochre-500">
              <GraduationCap className="size-4 text-white" strokeWidth={2} />
            </div>
            <span className="font-display font-semibold text-navy-700 tracking-tight">
              CyberMil
            </span>
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}
