'use client'

/**
 * Design-system-compliant checklist row.
 *
 * Done   → filled navy-700 square with white check mark
 * Undone → gray-200 outlined square, no fill
 *
 * Deliberately NOT a circle so it can never be confused with a
 * native radio/checkbox input at small sizes (DS §8 icon rule).
 */

import { cn } from '@/lib/utils'

interface ChecklistItemProps {
  done: boolean
  label: string
  className?: string
}

export function ChecklistItem({ done, label, className }: ChecklistItemProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {/* Custom square indicator — 16×16px, rounded-sm, never ambiguous */}
      <span
        aria-hidden="true"
        className={cn(
          'inline-flex items-center justify-center size-4 rounded-sm shrink-0 transition-colors',
          done
            ? 'bg-navy-700'          // filled navy when done
            : 'border-2 border-gray-300 bg-white',  // outlined square when undone
        )}
      >
        {done && (
          // Inline SVG tick — 10×8px, white stroke, no fill
          <svg
            width="10"
            height="8"
            viewBox="0 0 10 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M1 4L3.5 6.5L9 1"
              stroke="white"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>

      <span
        className={cn(
          'text-sm leading-snug',
          done ? 'text-gray-400 line-through decoration-gray-300' : 'text-gray-700',
        )}
      >
        {label}
      </span>
    </div>
  )
}
