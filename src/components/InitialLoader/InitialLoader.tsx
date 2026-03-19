"use client";

import { useState, useEffect } from "react";
import "./InitialLoader.css";

export default function InitialLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="initial-loader">
      <div className="loader-container">
        <div className="particles">
          <div
            className="particle"
            style={{
              bottom: "2.5rem",
              left: "2.5rem",
              width: "0.375rem",
              height: "0.375rem",
              animationDelay: "0s",
            }}
          />
          <div
            className="particle"
            style={{
              bottom: "5rem",
              right: "5rem",
              width: "0.25rem",
              height: "0.25rem",
              animationDelay: "1s",
            }}
          />
          <div
            className="particle"
            style={{
              bottom: "1.25rem",
              left: "50%",
              width: "0.5rem",
              height: "0.5rem",
              animationDelay: "2s",
            }}
          />
        </div>
        <div className="svg-container">
          <svg
            width="100%"
            height="100%"
            viewBox="-40 -30 180 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ overflow: "visible" }}
          >
            <path
              d="M35 38 L15 50 L35 62"
              stroke="black"
              strokeWidth="13"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-draw-black"
              pathLength="100"
            />
            <path
              d="M35 38 L15 50"
              stroke="#EA4235"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-draw-color"
              style={{ animationDelay: "0.8s" }}
              pathLength="100"
            />
            <path
              d="M15 50 L35 62"
              stroke="#4386F4"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-draw-color"
              style={{ animationDelay: "1.0s" }}
              pathLength="100"
            />
            <path
              d="M65 38 L85 50 L65 62"
              stroke="black"
              strokeWidth="13"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-draw-black"
              style={{ animationDelay: "0.4s" }}
              pathLength="100"
            />
            <path
              d="M85 50 L65 62"
              stroke="#F8BA04"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-draw-color"
              style={{ animationDelay: "1.4s" }}
              pathLength="100"
            />
            <path
              d="M65 38 L85 50"
              stroke="#119C58"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-draw-color"
              style={{ animationDelay: "1.2s" }}
              pathLength="100"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
