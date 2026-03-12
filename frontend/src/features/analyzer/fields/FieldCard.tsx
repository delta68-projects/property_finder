interface FieldCardProps {
  label: string
  hint: string
  name: string
  value: number
  onChange: (value: number) => void
  error?: string
  min?: number
  step?: number
  suffix?: string
}

export function FieldCard({
  label,
  hint,
  name,
  value,
  onChange,
  error,
  min = 0,
  step = 1,
  suffix,
}: FieldCardProps) {
  return (
    <label className="field-card" htmlFor={name}>
      <span className="field-row">
        <span className="field-label">{label}</span>
        {suffix ? <span className="field-suffix">{suffix}</span> : null}
      </span>
      <span className="field-hint">{hint}</span>
      <input
        id={name}
        name={name}
        type="number"
        min={min}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.currentTarget.value))}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error ? (
        <span className="field-error" id={`${name}-error`}>
          {error}
        </span>
      ) : null}
    </label>
  )
}
