import React, { useState, useEffect } from 'react';
import { Router } from 'react-router-dom';

const defaultLocation = {
  pathname: '/',
  search: '',
  hash: '',
  state: null,
  key: 'default',
};

/**
 * Wraps React Router's HistoryRouter behavior with a stable location state
 * so that location is never undefined during navigation (avoids
 * "Cannot read properties of undefined (reading 'pathname')" when
 * navigating e.g. from login to register).
 */
export function StableHistoryRouter({ history, basename, children }) {
  const [state, setState] = useState(() => {
    const loc = history.location;
    return {
      location: loc && typeof loc.pathname === 'string' ? loc : defaultLocation,
      action: history.action || 'POP',
    };
  });

  useEffect(() => {
    // history v4 passes (location, action) to the listener
    const unlisten = history.listen((nextLocation, nextAction) => {
      setState((prev) => {
        const loc = nextLocation && typeof nextLocation.pathname === 'string'
          ? nextLocation
          : prev.location;
        return {
          location: loc,
          action: nextAction ?? prev.action,
        };
      });
    });
    return unlisten;
  }, [history]);

  const navigator = {
    createHref: history.createHref.bind(history),
    encodeLocation: history.encodeLocation?.bind(history),
    go: history.go.bind(history),
    push(to, stateOpt, opts) {
      if (typeof to === 'string') {
        history.push(to, stateOpt);
      } else if (to && typeof to === 'object') {
        history.push({ pathname: to.pathname ?? '', search: to.search ?? '', hash: to.hash ?? '', state: to.state ?? stateOpt });
      }
    },
    replace(to, stateOpt, opts) {
      if (typeof to === 'string') {
        history.replace(to, stateOpt);
      } else if (to && typeof to === 'object') {
        history.replace({ pathname: to.pathname ?? '', search: to.search ?? '', hash: to.hash ?? '', state: to.state ?? stateOpt });
      }
    },
  };

  return (
    <Router
      basename={basename}
      location={state.location}
      navigationType={state.action}
      navigator={navigator}
    >
      {children}
    </Router>
  );
}

export default StableHistoryRouter;
