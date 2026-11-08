import { useEffect, useRef, useState } from 'react'
import { MotionConfig, motion, useScroll, useSpring } from 'framer-motion'
import {
  DownloadSimple,
  EnvelopeSimple,
  WhatsappLogo,
  MapPin,
  GraduationCap,
  Certificate
} from '@phosphor-icons/react'
import { CV_FILE, profile, fourSkills, experience, education, skills, certificates } from './data'

const spring = { type: 'spring', stiffness: 100, damping: 20 }

function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ ...spring, delay }}
    >
      {children}
    </motion.div>
  )
}

function Button({ href, children, variant = 'solid', download }) {
  const base =
    'inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition active:translate-y-px active:scale-[0.98]'
  const styles = {
    solid: 'bg-teal-700 text-white hover:bg-teal-800',
    outline: 'border border-slate-300 bg-white text-slate-900 hover:border-teal-700 hover:text-teal-800',
    light: 'bg-white text-teal-800 hover:bg-teal-50',
    ghost: 'border border-white/50 text-white hover:bg-white/10'
  }
  return (
    <a href={href} download={download} className={`${base} ${styles[variant]}`}>
      {children}
    </a>
  )
}

function Heading({ children, sub }) {
  return (
    <div className="max-w-[65ch]">
      <h2 className="text-3xl font-semibold tracking-tighter md:text-5xl">{children}</h2>
      {sub && <p className="mt-3 text-slate-600">{sub}</p>}
    </div>
  )
}

function Navbar() {
  const links = [
    ['Experience', '#experience'],
    ['Education', '#education'],
    ['Skills', '#skills'],
    ['Certificates', '#certificates']
  ]
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="#top" className="font-display text-lg font-semibold tracking-tight">
          Alita Iras
        </a>
        <nav className="hidden gap-7 text-sm text-slate-600 md:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="hover:text-teal-800">
              {label}
            </a>
          ))}
        </nav>
        <a
          href={CV_FILE}
          download
          className="inline-flex items-center gap-2 rounded-full bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-800 active:scale-[0.98]"
        >
          <DownloadSimple size={18} weight="bold" /> Download CV
        </a>
      </div>
    </header>
  )
}

function SkillBoard() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setActive((v) => (v + 1) % fourSkills.length), 2200)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_40px_-15px_rgba(15,118,110,0.2)] sm:p-8">
      <p className="text-sm text-slate-500">Every lesson I plan covers four skills</p>
      <ul className="mt-5 space-y-2">
        {fourSkills.map((s, i) => (
          <li key={s.name} className="relative rounded-2xl px-4 py-3">
            {active === i && (
              <motion.span
                layoutId="skill-highlight"
                className="absolute inset-0 rounded-2xl bg-teal-50 ring-1 ring-teal-200"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative block font-display text-xl font-semibold">{s.name}</span>
            <span className="relative block text-sm text-slate-600">{s.line}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Hero() {
  return (
    <section id="top" className="mx-auto grid min-h-[100dvh] max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.2fr_0.8fr]">
      <div>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring}
          className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-sm text-teal-900"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-600" />
          </span>
          Teaching at SMP Swasta IT Adabiyah
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.1 }}
          className="mt-6 text-5xl font-semibold leading-none tracking-tighter md:text-7xl"
        >
          Alita Iras
          <br />
          Kusumastuti
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.2 }}
          className="mt-3 text-xl font-medium text-teal-800"
        >
          {profile.role}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.3 }}
          className="mt-5 max-w-[60ch] text-lg leading-relaxed text-slate-600"
        >
          {profile.intro}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <Button href={CV_FILE} download>
            <DownloadSimple size={18} weight="bold" /> Download CV
          </Button>
          <Button href={`mailto:${profile.email}`} variant="outline">
            <EnvelopeSimple size={18} /> Email me
          </Button>
          <span className="inline-flex items-center gap-1.5 px-2 text-sm text-slate-500">
            <MapPin size={18} /> {profile.location}
          </span>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ ...spring, delay: 0.3 }}>
        <SkillBoard />
      </motion.div>
    </section>
  )
}

function Timeline() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  return (
    <div ref={ref} className="relative mt-12 pl-9 sm:pl-12">
      <div className="absolute bottom-2 left-[11px] top-2 w-px bg-slate-200" />
      <motion.div
        style={{ scaleY, transformOrigin: 'top' }}
        className="absolute bottom-2 left-[11px] top-2 w-px bg-teal-600"
      />
      <div className="space-y-12">
        {experience.map((job) => (
          <Reveal key={job.role + job.period} className="relative">
            <span className="absolute -left-9 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-teal-600 bg-white sm:-left-12">
              {job.current && <span className="h-2 w-2 animate-pulse rounded-full bg-teal-600" />}
            </span>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-2xl font-semibold tracking-tight">{job.role}</h3>
              {job.current && (
                <span className="rounded-full bg-teal-50 px-3 py-0.5 text-xs font-semibold text-teal-800 ring-1 ring-teal-200">
                  Current
                </span>
              )}
            </div>
            <p className="mt-1 text-slate-500">
              {job.org}, {job.period}
            </p>
            <ul className="mt-4 max-w-[65ch] space-y-2 text-slate-700">
              {job.points.map((p) => (
                <li key={p} className="flex gap-3">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600" />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

function Chips({ items }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((s) => (
        <li
          key={s}
          className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm text-slate-700 transition hover:-translate-y-0.5 hover:border-teal-600 hover:text-teal-800"
        >
          {s}
        </li>
      ))}
    </ul>
  )
}

function Education() {
  return (
    <section id="education" className="mx-auto max-w-6xl px-5 py-20">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <Heading>Education</Heading>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_40px_-15px_rgba(15,118,110,0.12)]">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal-50 text-teal-800">
                <GraduationCap size={26} />
              </span>
              <div>
                <h3 className="text-2xl font-semibold tracking-tight">{education.degree}</h3>
                <p className="text-slate-500">
                  {education.school}, {education.period}, GPA {education.gpa}
                </p>
              </div>
            </div>
            <h4 className="mt-7 font-semibold">Project</h4>
            <p className="mt-2 max-w-[65ch] text-slate-600">{education.project}</p>
            <h4 className="mt-7 font-semibold">Relevant coursework</h4>
            <div className="mt-3">
              <Chips items={education.coursework} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="border-y border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <Reveal>
          <Heading>Skills</Heading>
        </Reveal>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <Reveal delay={0.05}>
            <h3 className="mb-4 text-xl font-semibold">Teaching</h3>
            <Chips items={skills.teaching} />
          </Reveal>
          <Reveal delay={0.15}>
            <h3 className="mb-4 text-xl font-semibold">Working with people</h3>
            <Chips items={skills.people} />
          </Reveal>
        </div>
        <Reveal delay={0.1} className="mt-10 text-slate-600">
          <span className="font-semibold text-slate-900">Language:</span> {skills.language}
        </Reveal>
      </div>
    </section>
  )
}

function Certificates() {
  return (
    <section id="certificates" className="mx-auto max-w-6xl px-5 py-20">
      <Reveal>
        <Heading>Certificates</Heading>
      </Reveal>
      <ul className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
        {certificates.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.08}>
            <li className="group flex items-start gap-4 py-6">
              <Certificate size={26} className="mt-1 shrink-0 text-teal-700" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold tracking-tight transition group-hover:text-teal-800">{c.title}</h3>
                <p className="text-sm text-slate-500">{c.org}</p>
              </div>
              <span className="shrink-0 text-sm text-slate-500">{c.date}</span>
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 pb-16">
      <Reveal>
        <div className="rounded-[2.5rem] bg-teal-700 p-8 text-white md:p-14">
          <h2 className="max-w-[18ch] text-3xl font-semibold tracking-tighter md:text-5xl">
            Need an English teacher or tutor?
          </h2>
          <p className="mt-4 max-w-[55ch] text-teal-50">
            Send me a message and I will reply as soon as I can. My CV has the full details.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={`mailto:${profile.email}`} variant="light">
              <EnvelopeSimple size={18} /> {profile.email}
            </Button>
            <Button href={profile.whatsapp} variant="ghost">
              <WhatsappLogo size={18} /> WhatsApp
            </Button>
            <Button href={CV_FILE} variant="ghost" download>
              <DownloadSimple size={18} weight="bold" /> Download CV
            </Button>
          </div>
        </div>
      </Reveal>
      <p className="mt-8 text-sm text-slate-500">© 2026 {profile.name}</p>
    </section>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main>
        <Hero />
        <section id="experience" className="mx-auto max-w-6xl px-5 py-20">
          <Reveal>
            <Heading sub="Three roles, all in English teaching.">Experience</Heading>
          </Reveal>
          <Timeline />
        </section>
        <Education />
        <Skills />
        <Certificates />
        <Contact />
      </main>
    </MotionConfig>
  )
}
