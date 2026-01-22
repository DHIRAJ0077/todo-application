import React from "react";

export default function HeroSection() {
  return (
    <section className="relative h-[1200px] overflow-hidden bg-gradient-to-b from-[#0A2043] to-[#00050F]">

      {/* Glow Effects */}
      <div className="absolute left-[50px] top-[60px] h-40 w-40 rounded-full bg-[radial-gradient(closest-side,rgba(71,180,235,1),transparent)] opacity-10" />
      <div className="absolute left-[62%] top-[34%] h-[20%] w-[13%] rounded-full bg-[radial-gradient(closest-side,rgba(19,102,236,1),transparent)]" />
      <div className="absolute left-[33%] bottom-[170px] h-32 w-[6.6%] rounded-full bg-[radial-gradient(closest-side,rgba(38,187,217,1),transparent)] opacity-10" />

      {/* Logo */}
      <div className="absolute left-6 top-6">
        <img
          src="/clo.png"
          alt="Cloudastra Logo"
          className="h-12 w-auto"
        />
      </div>

      {/* Left Content */}
      <div className="absolute left-[276px] top-[447px] max-w-xl">

         <div className="absolute left-6 top-6">
        <img
          src="/logo2.svg"
          alt="Cloudastra Logo"
          className="h-12 w-auto"
        />
      </div> 


        <h1 className="text-4xl font-bold leading-tight text-white">
          Cloud Infrastructure That Scales,<br />
          Secures, and Optimizes Your<br />
          Business
        </h1>

        <p className="mt-6 text-lg leading-7 text-white/70">
          Cloudastra helps companies migrate, modernize, and manage cloud
          environments with performance, security, and cost efficiency
          at the core.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex gap-4">
          <button className="flex h-12 w-[324px] items-center justify-center rounded-xl bg-gradient-to-r from-[#115CD4] to-[#0D48A5] text-white font-bold shadow-lg">
            Schedule a Cloud Consultation
          </button>

          <button className="flex h-12 w-[278px] items-center justify-center rounded-xl border border-white/30 bg-white/5 text-white font-bold backdrop-blur">
            Talk to a Cloud Architect
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-10 flex items-center gap-6">
          <img src="/SOC.svg" alt="Clutch" className="h-12" />
          <img src="/Clutch.svg" alt="ISO 27001" className="h-12" />
          <img src="/ISO.svg" alt="SOC 2" className="h-12" />
        </div>
      </div>

      {/* Right Form Card */}
      <div className="absolute right-[488px] top-28 h-[606px] w-[420px] rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl">
        <h3 className="text-xl font-bold text-white">
          Schedule Your Consultation
        </h3>

        <form className="mt-6 space-y-4">
          <input
            className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40"
            placeholder="Full Name *"
          />

          <input
            className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40"
            placeholder="Work Email *"
          />

          <div className="flex gap-3">
            <div className="w-24 rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white">
              🇺🇸 +1
            </div>
            <input
              className="flex-1 rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40"
              placeholder="Phone Number *"
            />
          </div>

          <input
            className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40"
            placeholder="Company Name *"
          />

          <textarea
            className="h-24 w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40"
            placeholder="Tell us about your cloud needs *"
          />

          <label className="flex items-start gap-3 text-xs text-white/60">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-white/30 bg-transparent"
            />
            I consent to Cloudastra processing my data in accordance with GDPR
            and the Privacy Policy.
          </label>

          <button className="mt-4 flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#115CD4] to-[#0D48A5] text-white font-bold shadow-lg">
            Schedule Consultation
          </button>
        </form>
      </div>
    </section>
  );
}
