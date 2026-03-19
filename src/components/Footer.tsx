"use client";

import { Github, Instagram, Linkedin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  DoodleDots,
  DoodleCircle,
  DoodleSpark,
} from "@/components/DoodleAccents";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/30 border-t border-black/5 relative overflow-hidden">
      {/* Fun Doodle Accents */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 right-10 md:right-32 opacity-20 pointer-events-none"
      >
        <DoodleDots className="w-24 h-24 text-google-yellow" />
      </motion.div>

      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/4 opacity-20 pointer-events-none"
      >
        <DoodleSpark className="w-12 h-12 text-google-red" />
      </motion.div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-16 relative z-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-8">
          {/* Left CTA Area */}
          <div className="md:col-span-7 lg:col-span-8 flex flex-col items-start justify-between">
            <div className="max-w-2xl z-10">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-[1.1] text-foreground">
                Shape the future of tech with{" "}
                <motion.span className="text-black inline-block font-black">
                  GDG Campus
                </motion.span>
                .
              </h3>

              <p className="text-muted-foreground text-base md:text-lg mb-8 max-w-xl leading-relaxed">
                Access exclusive workshops, hackathons, and a global network of
                student developers.
              </p>

              <motion.a
                href="https://gdg.community.dev/gdg-on-campus-cvr-college-of-engineering-hyderabad-india/"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-medium hover:bg-foreground/90 transition-all group shadow-lg hover:shadow-xl"
              >
                Join the Chapter
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.a>
            </div>
          </div>

          {/* Right Links Area */}
          <motion.div
            whileHover={{ y: -5 }}
            className="md:col-span-6 lg:col-span-4 p-6 md:p-8 relative bg-white flex flex-col justify-center rounded-2xl border border-black/5 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <p className="font-mono text-xs font-bold text-black mb-6 uppercase tracking-widest flex items-center gap-2">
              / SOCIAL <span className="animate-pulse">✨</span>
            </p>

            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  icon: Linkedin,
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/company/gdsc-cvr/",
                  color: "text-[#0077b5]",
                },
                {
                  icon: Github,
                  label: "GitHub",
                  href: "https://www.github.com/gdgcvr/",
                  color: "text-[#333]",
                },
                {
                  icon: Instagram,
                  label: "Instagram",
                  href: "https://www.instagram.com/gdgccvr/",
                  color: "text-[#E1306C]",
                },
                {
                  icon: () => (
                    <Image
                      src="https://img.icons8.com/?size=100&id=fJp7hepMryiw&format=png&color=000000"
                      width={20}
                      height={20}
                      className="opacity-80 group-hover:opacity-100 transition-opacity"
                      alt="X"
                    />
                  ),
                  label: "X",
                  href: "https://x.com/gdsccvr",
                  color: "text-black",
                },
              ].map(({ icon: Icon, label, href, color }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-3 group p-2 hover:bg-secondary/50 rounded-lg transition-colors"
                >
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/50 group-hover:bg-white group-hover:shadow-sm transition-all duration-300"
                  >
                    <Icon
                      size={16}
                      className={`text-foreground/80 group-hover:opacity-100 transition-colors ${color ? `group-hover:${color}` : ""}`}
                    />
                  </motion.div>

                  <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                    {label}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Info Bar */}
        <div className="mt-12 pt-8 border-t border-black/5 flex items-center gap-4">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-10 h-10 bg-white rounded-xl border border-black/5 flex items-center justify-center shadow-sm cursor-pointer relative"
          >
            <Image
              src="/logo.png"
              width={24}
              height={24}
              className="object-contain"
              alt="GDG Logo"
              priority
            />
          </motion.div>

          <div className="flex flex-col">
            <span className="font-semibold text-sm tracking-tight text-foreground">
              GDG Campus CVR
            </span>
            <span className="text-xs text-muted-foreground">
              © {currentYear} All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
