import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "./hooks/Auth";

const PrivateRoute = ({ Component, requiredPermissions, fallbackPath }) => {
  const { user } = useAuth();

  const isAuthenticated = user !== null;
  const hasRequiredPermissions =
    user &&
    user.permisos &&
    user.permisos.some((permiso) => requiredPermissions.includes(permiso));

  if (isAuthenticated && hasRequiredPermissions) {
    return <Component />;
  } else {
    return <Navigate to={fallbackPath} replace />;
  }
};

PrivateRoute.propTypes = {
  Component: PropTypes.elementType.isRequired,
  requiredPermissions: PropTypes.arrayOf(PropTypes.string).isRequired,
  fallbackPath: PropTypes.string.isRequired,
};

export default PrivateRoute;
