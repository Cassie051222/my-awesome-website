import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // "smooth" scrolling is nice for same-page navigation,
    // but for page changes, instant is better UX
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" // or "auto" for older browsers
    });
  }, [pathname]); // Scroll to top whenever pathname changes

  return null; // This component doesn't render anything
}

export default ScrollToTop; 