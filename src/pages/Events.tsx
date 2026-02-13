import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import Layout from "@/components/Layout";
import CalendarView from "@/components/CalendarView";
import { allEvents } from "@/data/events";

const Events = () => {
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");

  const filtered = allEvents.filter((e) => {
    if (filter === "upcoming") return e.upcoming;
    if (filter === "past") return !e.upcoming;
    return true;
  });

  return (
    <Layout>
      {/* Digital Horizon Background (Events Specific) */}
      <div className="absolute inset-0 z-[-1] pointer-events-none">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#fafafa]">
          {/* Top Spotlight Gradient */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[500px] bg-gradient-to-b from-google-blue/5 to-transparent rounded-full blur-[120px]"></div>

          {/* Horizon Lines SVG */}
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.4]"
            preserveAspectRatio="none"
            viewBox="0 0 1440 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Horizontal Timeline Markers */}
            <line
              x1="0"
              y1="200"
              x2="1440"
              y2="200"
              stroke="#E5E5E5"
              strokeWidth="1"
              strokeDasharray="10 10"
            />
            <line
              x1="0"
              y1="400"
              x2="1440"
              y2="400"
              stroke="#E5E5E5"
              strokeWidth="1"
              strokeDasharray="10 10"
            />
            <line
              x1="0"
              y1="600"
              x2="1440"
              y2="600"
              stroke="#E5E5E5"
              strokeWidth="1"
              strokeDasharray="10 10"
            />

            {/* Vertical Data Streams */}
            <line
              x1="200"
              y1="0"
              x2="200"
              y2="800"
              stroke="#E5E5E5"
              strokeWidth="1"
              opacity="0.5"
            />
            <line
              x1="1240"
              y1="0"
              x2="1240"
              y2="800"
              stroke="#E5E5E5"
              strokeWidth="1"
              opacity="0.5"
            />

            {/* Active Event Pulse Lines (Google Colors) */}
            <motion.line
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              x1="0"
              y1="199"
              x2="1440"
              y2="199"
              stroke="#4285F4"
              strokeWidth="2"
              strokeOpacity="0.3"
            />
            <motion.line
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2.5, ease: "easeOut", delay: 0.5 }}
              x1="200"
              y1="0"
              x2="200"
              y2="400"
              stroke="#DB4437"
              strokeWidth="2"
              strokeOpacity="0.3"
            />
          </svg>

          {/* Grain Overlay */}
          <div
            className="absolute inset-0 opacity-[0.2]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
            }}
          ></div>
        </div>
      </div>

      <section className="pt-36 pb-10 relative">
        <div className="container-wide relative z-10">
          <AnimatedSection delay={0.05}>
            <div className="text-center mb-8">
              <h1 className="heading-lg">Upcoming Sessions</h1>
            </div>

            <div className="mb-8 group relative rounded-3xl overflow-hidden border border-border/60 shadow-sm hover:shadow-md transition-all duration-300">
              <Link to="/calendar" className="block relative">
                <div className="h-[450px] pointer-events-none select-none transition-all duration-300">
                  <CalendarView isPreview={true} />
                </div>

                <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                  <span className="px-8 py-3 bg-foreground text-background rounded-full font-semibold shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    Go to Calendar
                  </span>
                </div>
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="flex gap-2 mt-8">
              {(["all", "upcoming", "past"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${filter === f
                    ? "bg-foreground text-background shadow-lift"
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                    }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {filtered.map((event, i) => {
              const bgColors = {
                "google-blue": "bg-google-blue",
                "google-red": "bg-google-red",
                "google-green": "bg-google-green",
                "google-yellow": "bg-google-yellow",
              };

              const borderColors = {
                "google-blue": "border-google-blue",
                "google-red": "border-google-red",
                "google-green": "border-google-green",
                "google-yellow": "border-google-yellow",
              };

              const textColors = {
                "google-blue": "text-google-blue",
                "google-red": "text-google-red",
                "google-green": "text-google-green",
                "google-yellow": "text-google-yellow",
              };

              const bgColor = bgColors[event.color] || "bg-google-blue";
              const borderColor = borderColors[event.color] || "border-google-blue";
              const textColor = textColors[event.color] || "text-google-blue";

              return (
                <AnimatedSection key={event.title + event.date} delay={0.06 * i}>
                  <div className="group relative h-full">
                    {/* Fun Offset Shadow Layer - appears on hover */}
                    <div className={`absolute inset-0 rounded-3xl translate-x-2 translate-y-2 ${bgColor} opacity-0 group-hover:opacity-100 transition-all duration-300`}></div>

                    {/* Main Card Container */}
                    <div className="relative h-full flex flex-col bg-white rounded-3xl border-2 border-black/5 group-hover:border-black transition-all duration-300 group-hover:-translate-y-1 group-hover:-translate-x-1 overflow-hidden">

                      {/* Integrated Image Header */}
                      <div className="relative h-48 w-full overflow-hidden border-b-2 border-black/5 group-hover:border-black/10 transition-colors">
                        {event.image ? (
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
                            loading="lazy"
                          />
                        ) : (
                          <div className={`w-full h-full ${bgColor} opacity-10 flex items-center justify-center`}>
                            <span className="text-4xl font-black opacity-20">GDG</span>
                          </div>
                        )}

                        {/* Sticker Date Badge */}
                        <div className="absolute top-3 right-3 transform rotate-3 group-hover:rotate-0 transition-transform duration-300">
                          <span className={`inline-block px-3 py-1 bg-white border-2 border-black rounded-lg text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                            {event.date}
                          </span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="flex flex-col flex-grow p-6">
                        <div className="mb-2">
                          <span className={`inline-block text-[10px] font-black uppercase tracking-[0.2em] ${textColor}`}>
                            {event.upcoming ? 'UPCOMING' : 'PAST EVENT'}
                          </span>
                        </div>

                        <h3 className="text-2xl font-bold text-black mb-3 leading-tight tracking-tight group-hover:underline decoration-2 underline-offset-2 transition-all">
                          {event.title}
                        </h3>

                        <p className="text-sm font-medium text-neutral-500 leading-relaxed mb-6 line-clamp-3">
                          {event.description}
                        </p>

                        {/* Bottom Action Area */}
                        <div className="mt-auto pt-4 border-t-2 border-black/5 border-dashed flex items-center justify-between group-hover:border-black/20 transition-colors">
                          <span className="text-xs font-bold text-black uppercase tracking-wide">
                            View Details
                          </span>
                          <div className={`w-8 h-8 rounded-full border-2 border-black flex items-center justify-center bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300`}>
                            <ArrowUpRight className="w-4 h-4 text-black" strokeWidth={3} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Events;
