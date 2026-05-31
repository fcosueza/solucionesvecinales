"use client";

import { useEffect } from "react";

/**
 * This component makes sure that a page has the full scroll to the top
 * to prevent there from being elements that see us correctly when navigating between pages.
 * 
 * @returns null, since this component does not render anything visually.
 */
const ScrollToTopOnMount = (): null => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return null;
};

export default ScrollToTopOnMount;
