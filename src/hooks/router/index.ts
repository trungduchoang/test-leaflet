// libs
import { useMemo } from "react";
import {
  useParams,
  useLocation,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import queryString from "query-string";

/**
 * useRouter
 */
export const useRouter = () => {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();

  const { pathname } = location;

  // Return our custom router object
  // Memoize so that a new object is only returned if something changes
  return useMemo(
    () => ({
      // For convenience add push(), replace(), pathname, state at top level
      push: history.push,
      replace: history.replace,
      pathname,
      state: (location.state || {}) as TObject,
      // Merge params and parsed query string into single "params" object
      // so that they can be used interchangeably.
      // Example: /:topic?sort=popular -> { topic: "react", sort: "popular" }
      params: {
        ...queryString.parse(location.search), // Convert string to object
        ...params,
      } as TObject,
      // Include match, location, history objects so we have
      // access to extra React Router functionality if needed.
      match,
      location,
      history,
    }),
    [params, match, location, history, pathname],
  );
};
