"use client";

import React, { useEffect, useRef } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  as?: React.ElementType;
}

// Content is visible in the server HTML and without JavaScript. Animate only on entry.
export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 24,
  duration = 700,
  threshold = 0.1,
  once = true,
  as: Component = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const element = ref.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || !("IntersectionObserver" in window) || !element.animate)
      return;
    let animation: Animation | undefined;
    const transforms = {
      up: `translateY(${distance}px)`,
      down: `translateY(-${distance}px)`,
      left: `translateX(${distance}px)`,
      right: `translateX(-${distance}px)`,
      none: "none",
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (!preference.matches) {
            animation?.cancel();
            animation = element.animate(
              [
                { opacity: 0.15, transform: transforms[direction] },
                { opacity: 1, transform: "none" },
              ],
              {
                duration,
                delay,
                easing: "cubic-bezier(.16,1,.3,1)",
                fill: "backwards",
              },
            );
          }
          if (once) observer.unobserve(element);
        });
      },
      { threshold },
    );
    const onPreference = () => {
      if (preference.matches) animation?.cancel();
    };
    observer.observe(element);
    preference.addEventListener("change", onPreference);
    return () => {
      observer.disconnect();
      animation?.cancel();
      preference.removeEventListener("change", onPreference);
    };
  }, [delay, direction, distance, duration, threshold, once]);
  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  );
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 80,
  as: Component = "div",
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  as?: React.ElementType;
}) {
  return (
    <Component className={className}>
      {React.Children.map(children, (child, index) =>
        React.isValidElement(child) ? (
          <ScrollReveal delay={index * staggerDelay}>{child}</ScrollReveal>
        ) : (
          child
        ),
      )}
    </Component>
  );
}
