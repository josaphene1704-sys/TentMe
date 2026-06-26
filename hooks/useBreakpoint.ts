"use client";

import { useEffect, useState } from "react";

// Breakpoints (pixels) — Mobile < 768 ≤ Tablet < 1024 ≤ Desktop
const BP = { tablet: 768, desktop: 1024 } as const;

export type DeviceType = "mobile" | "tablet" | "desktop";

function resolve(width: number): DeviceType {
  if (width >= BP.desktop) return "desktop";
  if (width >= BP.tablet) return "tablet";
  return "mobile";
}

/**
 * Returns the current device type and convenience booleans.
 * Starts as "mobile" on the server (SSR-safe), updates after mount.
 *
 * Usage:
 *   const { isMobile, isTablet, isDesktop, isTabletOrAbove } = useBreakpoint();
 */
export function useBreakpoint() {
  const [device, setDevice] = useState<DeviceType>("mobile");

  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${BP.tablet}px)`);
    const update = () => setDevice(resolve(window.innerWidth));

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return {
    device,
    isMobile: device === "mobile",
    isTablet: device === "tablet",
    isDesktop: device === "desktop",
    isTabletOrAbove: device !== "mobile",
    isDesktopOrAbove: device === "desktop",
  };
}
