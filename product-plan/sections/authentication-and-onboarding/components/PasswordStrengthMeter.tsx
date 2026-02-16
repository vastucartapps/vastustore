import { useMemo } from 'react'
import { Check, X } from 'lucide-react'
import type { PasswordRequirement, PasswordStrength } from '../types'

interface PasswordStrengthMeterProps {
  password: string
  requirements: PasswordRequirement[]
}

const requirementChecks: Record<string, (pw: string) => boolean> = {
  minLength: (pw) => pw.length >= 8,
  uppercase: (pw) => /[A-Z]/.test(pw),
  lowercase: (pw) => /[a-z]/.test(pw),
  number: (pw) => /[0-9]/.test(pw),
  special: (pw) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pw),
}

export function PasswordStrengthMeter({ password, requirements }: PasswordStrengthMeterProps) {
  const results = useMemo(() => {
    return requirements.map((req) => ({
      ...req,
      met: requirementChecks[req.key]?.(password) ?? false,
    }))
  }, [password, requirements])

  const metCount = results.filter((r) => r.met).length
  const total = results.length

  const strength: PasswordStrength =
    metCount === total ? 'strong' : metCount >= 3 ? 'medium' : 'weak'

  const strengthConfig = {
    weak: { color: '#EF4444', bg: '#FEE2E2', label: 'Weak', width: '33%' },
    medium: { color: '#F59E0B', bg: '#FEF3C7', label: 'Medium', width: '66%' },
    strong: { color: '#10B981', bg: '#D1FAE5', label: 'Strong', width: '100%' },
  }

  const cfg = strengthConfig[strength]

  if (!password) return null

  return (
    <div className="mt-3 space-y-2.5">
      {/* Strength bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: '#f0ebe4' }}>
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: cfg.width, background: cfg.color }}
          />
        </div>
        <span
          className="text-xs font-semibold tracking-wide uppercase"
          style={{ color: cfg.color, fontFamily: "'Open Sans', sans-serif", minWidth: 52 }}
        >
          {cfg.label}
        </span>
      </div>

      {/* Requirements checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
        {results.map((req) => (
          <div key={req.key} className="flex items-center gap-2">
            {req.met ? (
              <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#10B981' }} />
            ) : (
              <X className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#a39585' }} />
            )}
            <span
              className="text-xs transition-colors"
              style={{
                color: req.met ? '#10B981' : '#a39585',
                fontFamily: "'Open Sans', sans-serif",
              }}
            >
              {req.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
