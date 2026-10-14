import Link from 'next/link';
import { ArrowRight, ArrowUpRight, BadgeCheck, BusFront, Clock3, MapPin, ShieldCheck, UsersRound } from 'lucide-react';

const benefits = [
  { icon: ShieldCheck, title: 'Travel with confidence', text: 'Find rides from trusted student travel providers.' },
  { icon: Clock3, title: 'Plans that fit your day', text: 'Compare departure times and pick a trip that works.' },
  { icon: UsersRound, title: 'Made for student journeys', text: 'A simpler way to get home, back to campus, and beyond.' },
];

export default function Home() {
  return (
    <div className="overflow-hidden bg-[#f8fafc]">
      <section className="relative isolate bg-[#071a38] text-white">
        <div className="absolute inset-0 -z-10 opacity-25" aria-hidden="true">
          <div className="absolute -right-24 -top-40 h-[34rem] w-[34rem] rounded-full border border-cyan-200/40" />
          <div className="absolute -right-6 -top-20 h-[25rem] w-[25rem] rounded-full border border-cyan-200/30" />
          <div className="absolute right-24 top-14 h-[15rem] w-[15rem] rounded-full border border-cyan-200/25" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#071a38] to-transparent" />
        </div>
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.1fr_.9fr] lg:gap-8 lg:py-32">
          <div className="max-w-2xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-cyan-100">
              <span className="h-2 w-2 rounded-full bg-emerald-400" /> Student travel, made easy
            </div>
            <h1 className="text-5xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              Your next journey starts <span className="text-cyan-300">here.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300 sm:text-xl">
              Find a comfortable, affordable ride between campus and home. Browse trips, choose your seat, and get moving.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/student/trips" className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-300 px-6 py-3.5 font-semibold text-[#071a38] shadow-lg shadow-cyan-950/20 transition hover:bg-cyan-200">
                Explore available trips <ArrowRight size={18} />
              </Link>
              <Link href="/register" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10">
                Join StudExpress <ArrowUpRight size={17} />
              </Link>
            </div>
            <div className="mt-9 flex items-center gap-3 text-sm text-slate-300">
              <div className="flex -space-x-2" aria-hidden="true">
                <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-[#071a38] bg-amber-200 text-xs">🎓</span>
                <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-[#071a38] bg-cyan-200 text-xs">🚌</span>
                <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-[#071a38] bg-emerald-200 text-xs">✨</span>
              </div>
              <span>A smoother way to get where you&apos;re going</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:ml-auto">
            <div className="absolute -inset-5 rounded-[2rem] bg-cyan-300/10 blur-2xl" />
            <div className="relative rounded-[1.75rem] border border-white/15 bg-white/[0.08] p-5 shadow-2xl shadow-black/30 backdrop-blur-sm sm:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-cyan-200">A better way to travel</p>
                  <h2 className="mt-1 text-xl font-semibold">Campus to anywhere</h2>
                </div>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-300 text-[#071a38]"><BusFront size={24} /></div>
              </div>
              <div className="mt-7 rounded-2xl bg-white p-5 text-slate-900 sm:p-6">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center pt-1">
                    <span className="h-3 w-3 rounded-full border-[3px] border-blue-600" />
                    <span className="my-1 h-12 border-l-2 border-dashed border-slate-300" />
                    <MapPin size={17} className="text-cyan-600" />
                  </div>
                  <div className="flex-1">
                    <div className="pb-4">
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Leaving from</p>
                      <p className="mt-1 font-semibold">Your campus</p>
                    </div>
                    <div className="border-t border-slate-100 pt-4">
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Heading to</p>
                      <p className="mt-1 font-semibold">Home, and beyond</p>
                    </div>
                  </div>
                </div>
                <Link href="/student/trips" className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3 font-semibold text-white transition hover:bg-blue-800">
                  Find your ride <ArrowRight size={17} />
                </Link>
              </div>
              <div className="mt-5 flex items-center gap-3 px-1 text-sm text-slate-300">
                <BadgeCheck size={19} className="shrink-0 text-emerald-300" /> Clear trip details, simple booking
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[.18em] text-blue-700">Travel, minus the stress</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">More time for what matters.</h2>
          <p className="mt-4 text-lg leading-7 text-slate-600">Whether it&apos;s a weekend at home or the start of a new adventure, getting there should feel easy.</p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {benefits.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm shadow-slate-900/[.03] transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/[.06]">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-blue-50 text-blue-700"><Icon size={23} /></div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 leading-6 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-5 mb-16 rounded-3xl bg-blue-700 px-6 py-12 text-center text-white sm:mx-8 sm:px-12 sm:py-14 lg:mx-auto lg:max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-[.18em] text-blue-200">Ready when you are</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Let&apos;s get you on your way.</h2>
        <p className="mx-auto mt-3 max-w-xl text-blue-100">Explore upcoming trips and find the ride that fits your plans.</p>
        <Link href="/student/trips" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-blue-800 transition hover:bg-blue-50">Browse trips <ArrowRight size={17} /></Link>
      </section>
    </div>
  );
}
