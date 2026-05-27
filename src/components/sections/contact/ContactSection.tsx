import { SectionHeading } from '../../ui/SectionHeading'

const links = [
  { label: 'Email', value: 'lttin144@gmail.com', href: 'mailto:lttin144@gmail.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/le-tin1404', href: 'https://linkedin.com/in/le-tin1404' },
  { label: 'Phone', value: '(+84) 909 212 434', href: 'tel:+84909212434' },
]

export function ContactSection() {
  return (
    <div>
      <SectionHeading title="Contact" subtitle="Get in touch" className="mx-auto mb-12 max-w-3xl text-center" />

      <div className="mx-auto max-w-3xl text-center">
        <p className="text-lg leading-9 text-slate-700">
          I am open to backend and full-stack opportunities. If you are working on product systems,
          integrations, booking flows, or operational platforms, email is the best way to reach me.
        </p>

        <div className="mt-10 space-y-6">
          {links.map((link) => (
            <div key={link.label} className="border-b border-black/8 pb-6">
              <p className="text-sm text-slate-500">{link.label}</p>
              <a
                href={link.href}
                target={link.href.startsWith('https') ? '_blank' : undefined}
                rel={link.href.startsWith('https') ? 'noreferrer' : undefined}
                className="mt-3 inline-block text-2xl text-slate-950 transition-opacity hover:opacity-70"
              >
                {link.value}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
