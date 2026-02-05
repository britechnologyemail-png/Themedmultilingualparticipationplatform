import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';

/**
 * ScrollRestoration Component
 * 
 * Intelligently manages scroll position during navigation:
 * - ALWAYS scrolls to top (0, 0) when navigating forward to a new page
 * - Saves scroll position when leaving a page
 * - Restores scroll position when returning via browser back button
 * 
 * This component provides better UX by preserving context when users
 * navigate back, while ensuring new pages always start at the top.
 * 
 * Must be placed inside BrowserRouter but before/outside Routes.
 */

// Storage for scroll positions by pathname
interface ScrollPosition {
  pathname: string;
  scrollY: number;
  timestamp: number;
}

const scrollHistory: ScrollPosition[] = [];
const MAX_HISTORY_SIZE = 50; // Limit history to prevent memory issues

export function ScrollRestoration() {
  const location = useLocation();
  const previousPathnameRef = useRef<string>('');
  const isNavigatingBackRef = useRef<boolean>(false);

  // Detect navigation type using popstate event
  useEffect(() => {
    const handlePopState = () => {
      isNavigatingBackRef.current = true;
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Main scroll management effect
  useEffect(() => {
    const currentPathname = location.pathname;
    const previousPathname = previousPathnameRef.current;

    // Save scroll position of the previous page before navigating away
    if (previousPathname && previousPathname !== currentPathname) {
      const scrollY = window.scrollY;
      
      // Add to history
      scrollHistory.push({
        pathname: previousPathname,
        scrollY: scrollY,
        timestamp: Date.now()
      });

      // Limit history size
      if (scrollHistory.length > MAX_HISTORY_SIZE) {
        scrollHistory.shift();
      }
    }

    // Determine whether to restore scroll or scroll to top
    const shouldRestore = isNavigatingBackRef.current;
    
    // Use setTimeout to ensure DOM is fully ready
    const timeoutId = setTimeout(() => {
      if (shouldRestore) {
        // Back/forward navigation - try to restore position
        const savedPosition = findScrollPosition(currentPathname);
        
        if (savedPosition !== null) {
          window.scrollTo(0, savedPosition);
        } else {
          // No saved position, scroll to top
          window.scrollTo(0, 0);
        }
        
        // Reset the flag
        isNavigatingBackRef.current = false;
      } else {
        // Forward navigation - always scroll to top
        window.scrollTo(0, 0);
      }
    }, 0);

    // Update previous pathname
    previousPathnameRef.current = currentPathname;

    return () => {
      clearTimeout(timeoutId);
    };
  }, [location.pathname]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Save current scroll position before unmount
      const currentPathname = previousPathnameRef.current;
      if (currentPathname) {
        const scrollY = window.scrollY;
        scrollHistory.push({
          pathname: currentPathname,
          scrollY: scrollY,
          timestamp: Date.now()
        });
      }
    };
  }, []);

  return null;
}

/**
 * Find the most recent scroll position for a given pathname
 */
function findScrollPosition(pathname: string): number | null {
  // Search from the end (most recent) to find matching pathname
  for (let i = scrollHistory.length - 1; i >= 0; i--) {
    if (scrollHistory[i].pathname === pathname) {
      return scrollHistory[i].scrollY;
    }
  }
  return null;
}
