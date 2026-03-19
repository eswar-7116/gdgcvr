"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { nextEvent } from "@/data/events";

const Hero = () => {
  return (
    <section className="relative min-h-[95vh] pt-28 md:pt-32 pb-10 flex justify-center items-center bg-[#fafafa] selection:bg-black selection:text-white px-4 md:px-8 overflow-hidden">
      {/* Background Grid - VISIBLE & TECHNICAL */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* 1. Base Dot Grid (High Contrast) */}
        <div
          className="absolute inset-0 opacity-[0.2]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1.5'/%3E%3C/g%3E%3C/svg%3E\")",
          }}
        ></div>

        {/* 2. Secondary Linear Grid (Architecture/Graph Paper Feel) */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
            backgroundSize: "100px 100px",
          }}
        ></div>

        {/* 3. Gradient Blobs (Subtle) */}
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-google-blue/10 rounded-full blur-[100px] mix-blend-multiply animate-pulse"></div>
        <div
          className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-google-yellow/10 rounded-full blur-[100px] mix-blend-multiply animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* The Grid Container - Constrained & Aligned (Glass Effect on Cells) */}
      <div className="relative z-10 w-full max-w-[1400px] h-full grid grid-cols-1 md:grid-cols-12 grid-rows-[auto_auto_auto] md:grid-rows-2 gap-4 md:gap-6">
        {/* 1. Main Title Block (Dominant) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="col-span-1 md:col-span-8 row-span-1 md:row-span-2 bg-neutral-50 rounded-[2rem] p-8 md:p-12 border border-neutral-100 relative overflow-hidden group flex flex-col justify-between"
        >
          {/* Background Texture */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          ></div>
          <div className="absolute top-0 right-0 p-6 md:p-8" aria-hidden="true">
            <div className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
              <ArrowRight className="text-neutral-400 group-hover:text-black transition-colors" />
            </div>
          </div>

          <div className="relative z-10 mt-auto">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl md:text-[5rem] lg:text-[7rem] font-bold leading-[0.9] tracking-tight text-neutral-900"
            >
              WHERE <br />
              CAMPUS <br />
              MEETS <br />
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-google-blue via-google-red to-google-yellow bg-[length:200%_auto]"
                animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                GOOGLE
              </motion.span>
            </motion.h1>
            <p className="mt-6 text-neutral-500 font-medium max-w-md text-lg">
              The bridge between theory and impact.{" "}
              <a
                href="https://cvr.ac.in/home4/"
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-nowrap font-semibold text-neutral-800 border-b border-neutral-300 hover:border-black transition-colors"
              >
                CVR College of Engineering
              </a>
              's premier developer ecosystem.
            </p>
          </div>
        </motion.div>

        {/* 2. The Interactive Component Stack (Right Column) */}
        <div className="col-span-1 md:col-span-4 row-span-1 md:row-span-2 flex flex-col gap-4 md:gap-6">
          {/* 2a. Live Terminal (The "Code" Element) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex-1 bg-neutral-900 rounded-[2rem] p-6 relative overflow-hidden group min-h-[200px]"
            aria-labelledby="hero-code-label"
            role="img"
          >
            <span id="hero-code-label" className="sr-only">
              Code snippet illustration showing a future build process
            </span>
            {/* Traffic Lights */}
            <div className="flex gap-2 mb-4" aria-hidden="true">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            {/* Code Content */}
            <div
              className="font-mono text-xs md:text-sm text-neutral-400 space-y-1"
              aria-hidden="true"
            >
              <p>
                <span className="text-purple-400">const</span>{" "}
                <span className="text-blue-400">future</span> ={" "}
                <span className="text-yellow-400">init</span>();
              </p>
              <p>
                <span className="text-purple-400">await</span> future.
                <span className="text-green-400">build</span>();
              </p>
              <div className="flex items-center gap-2 mt-4 text-white">
                <span className="text-green-500">➜</span>
                <span className="animate-pulse">_</span>
              </div>
            </div>
            <div
              className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-hidden="true"
            >
              <div className="px-3 py-1 bg-white/10 rounded-full text-xs text-white backdrop-blur-md">
                Start Building
              </div>
            </div>
          </motion.div>

          {/* 2b. Event Ticker (The "Time" Element) - ACTIVE BLUE */}
          <motion.article
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex-1 bg-google-blue border border-google-blue rounded-[2rem] p-6 relative overflow-hidden group shadow-lg shadow-google-blue/20 min-h-[180px]"
            role="region"
            aria-label="Next Event"
          >
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-google-blue shadow-sm">
                <Zap size={18} fill="currentColor" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-white/80">
                Next Event
              </span>
            </div>
            <div className="mt-2">
              <h2 className="text-2xl font-bold text-white">
                {nextEvent.title}
              </h2>
              <time className="text-white/80 block">{nextEvent.date}</time>
              <p
                className="mt-2 text-white/70 text-sm truncate"
                title={nextEvent.description}
              >
                {nextEvent.description}
              </p>
            </div>
            {/* Decorative Big Icon */}
            <Zap
              className="absolute -bottom-4 -right-4 w-32 h-32 text-white/10 transform -rotate-12 pointer-events-none"
              aria-hidden="true"
            />
          </motion.article>

          {/* 2c. Community & Join (Split) */}
          <div className="flex gap-4 md:gap-6 flex-1 min-h-[140px]">
            {/* Community */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex-1"
            >
              <Link
                href="/events"
                className="h-full w-full bg-[#FED7AA] hover:bg-[#FDBA74] rounded-[2rem] p-5 flex flex-col justify-center items-center text-[#7C2D12] relative overflow-hidden group shadow-sm hover:shadow-md transition-all"
              >
                <div className="absolute inset-0 bg-[#FDBA74] scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300"></div>
                <span className="relative z-10 font-bold text-lg tracking-tight">
                  All Events
                </span>
                <ArrowRight className="relative z-10 w-5 h-5 mt-1 text-[#7C2D12] group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Join Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex-1"
            >
              <Link
                href="/team"
                className="h-full w-full bg-[#CEEAD6] hover:bg-[#B7E1CD] rounded-[2rem] p-5 flex flex-col justify-center items-center text-[#0D652D] relative overflow-hidden group transition-all"
              >
                <div className="absolute inset-0 bg-[#B7E1CD] scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300"></div>
                <span className="relative z-10 font-bold text-lg tracking-tight">
                  Team
                </span>
                <ArrowRight className="relative z-10 w-5 h-5 mt-1 text-[#0D652D] group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
