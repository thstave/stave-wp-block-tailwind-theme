import { useRef } from 'react';
import { useEventListener } from './useEventListener';

/**
 * useThrottleEvent
 * Adds a throttled event listener.
 *
 * @param {EventTarget | React.RefObject} target - target for the event
 * @param {string} event - event name (e.g., 'resize')
 * @param {number} delay - throttle delay in milliseconds
 * @param {Function} callback - handler function
 */
export function useThrottleEvent(target, event, delay, callback) {
  const throttleTimeout = useRef(null);

  useEventListener(target, event, (...args) => {
    if (throttleTimeout.current === null) {
      throttleTimeout.current = setTimeout(() => {
        callback(...args);
        throttleTimeout.current = null;
      }, delay);
    }
  });
}
