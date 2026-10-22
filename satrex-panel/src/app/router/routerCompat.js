import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

// سازگاری با withRouter قدیمی برای کلاس‌کامپوننت‌ها
export function withRouterCompat(WrappedComponent) {
  function ComponentWithRouterProp(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    const history = {
      push: (to) => {
        if (typeof to === 'string') {
          navigate(to);
        } else if (to && typeof to === 'object') {
          navigate(to.pathname || '', { state: to.state });
        }
      },
      replace: (to) => {
        if (typeof to === 'string') {
          navigate(to, { replace: true });
        } else if (to && typeof to === 'object') {
          navigate(to.pathname || '', { replace: true, state: to.state });
        }
      },
      // برای سازگاری با history.listen قدیمی
      listen: () => () => {},
      location,
    };

    const match = { params };

    return React.createElement(WrappedComponent, {
      ...props,
      history,
      location,
      match,
    });
  }

  return ComponentWithRouterProp;
}

// سازگاری با useHistory قدیمی برای فانکشن‌کامپوننت‌ها
export function useHistoryCompat() {
  const navigate = useNavigate();
  const location = useLocation();

  return {
    push: (to) => {
      if (typeof to === 'string') {
        navigate(to);
      } else if (to && typeof to === 'object') {
        navigate(to.pathname || '', { state: to.state });
      }
    },
    replace: (to) => {
      if (typeof to === 'string') {
        navigate(to, { replace: true });
      } else if (to && typeof to === 'object') {
        navigate(to.pathname || '', { replace: true, state: to.state });
      }
    },
    location,
  };
}

