"use client";

import { Users, Zap, TrendingUp } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import {
  DoodleSquiggle,
  DoodleDots,
  DoodleLine,
} from "@/components/DoodleAccents";

const focusPoints = [
  {
    title: "Connect",
    description:
      "Meet local developers and technologists. All are welcome, including those with diverse backgrounds and from various companies and industries.",
    icon: Users,
    color: "google-blue",
  },
  {
    title: "Learn",
    description:
      "Learn about a range of technical topics and gain new skills through hands-on workshops, training, events, talks, and meet ups — both online and in-person.",
    icon: Zap,
    color: "google-yellow",
  },
  {
    title: "Grow",
    description:
      "Apply your knowledge and connections to build great products and advance your skills, career, and network. Give back to your community by helping others learn, too.",
    icon: TrendingUp,
    color: "google-green",
  },
];

const bgColors: Record<string, string> = {
  "google-blue": "bg-google-blue",
  "google-red": "bg-google-red",
  "google-green": "bg-google-green",
  "google-yellow": "bg-google-yellow",
};

const About = () => {
  return (
    <section className="pt-24 pb-24 border-t border-border relative">
      <DoodleSquiggle className="absolute top-20 left-1/3 w-32 opacity-8 text-google-green" />
      <DoodleDots className="absolute bottom-24 right-[8%] w-16 h-16 opacity-8 text-google-yellow" />
      <DoodleLine className="absolute top-1/2 right-[20%] w-24 opacity-8 text-google-red" />

      <div className="container-narrow">
        <AnimatedSection>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-google-green mb-8">
            About Us
          </p>
          <h2 className="heading-lg max-w-3xl">
            Empowering the next
            <br />
            generation of developers
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <p className="body-lg text-muted-foreground max-w-xl mt-8">
            GDG Campus is a student-led community supported by Google, dedicated
            to bridging the gap between academic learning and real-world
            technology.
          </p>
        </AnimatedSection>

        <div className="mt-24 grid md:grid-cols-3 gap-8">
          {focusPoints.map((point, i) => (
            <AnimatedSection key={point.title} delay={0.1 * i}>
              <div className="group relative h-full p-8 rounded-[2.5rem] bg-secondary/30 hover:bg-white border border-transparent hover:border-black/5 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] overflow-hidden">
                {/* Large Number Watermark */}
                <span className="absolute -right-2 -top-2 text-[8rem] leading-none font-bold text-black/[0.02] group-hover:text-black/[0.04] transition-colors select-none pointer-events-none">
                  0{i + 1}
                </span>

                {/* Icon */}
                <div
                  className={`relative w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-white shadow-lg transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 ${bgColors[point.color]}`}
                >
                  <point.icon size={28} strokeWidth={2} />
                </div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:translate-x-1 transition-transform duration-300">
                    {point.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
