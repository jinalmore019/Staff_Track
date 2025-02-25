import { Navigate } from "react-router-dom";
import WithoutLayout from "./WithLayout";
import LoggedInLayout from "./LoggedInLayout";
import { jwtDecode } from "jwt-decode";
import { useMemo } from "react";

const PrivateRoute = ({ component, withLayout = false }: any) => {
    const checkUserRole = "Employee";
    const token = sessionStorage.getItem("token") || "";
    //  const checkUserRole = useMemo(() => {
    //      const decodedToken: any = jwtDecode(sessionStorage.getItem("token") ?? "");
    //      return (decodedToken?.role as string) ?? "";
    //  }, []);

    const RenderComponent = () => {
        if (token && checkUserRole === "Employee") {
            if (withLayout) {
                return <WithoutLayout Children={component} />;
            } else {
                return <LoggedInLayout Children={component} />;
            }
        } else {
            return <Navigate to="/" />;
        }
    };
    return RenderComponent();
};

export default PrivateRoute;
