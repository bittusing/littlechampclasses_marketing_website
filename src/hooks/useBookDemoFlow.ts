"use client";

import { useCallback, useState } from "react";
import type { ApiCourse } from "@/lib/api/types";

/** Lightweight controller for opening the Book Demo modal from program cards. */
export function useBookDemoFlow() {
  const [course, setCourse] = useState<ApiCourse | null>(null);

  const open = useCallback((c: ApiCourse) => {
    setCourse(c);
  }, []);

  const close = useCallback(() => {
    setCourse(null);
  }, []);

  return { selectedCourse: course, openBookDemo: open, closeBookDemo: close };
}
