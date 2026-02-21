import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <>
      <NavBar />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: "12px",
            padding: "12px",
          },
        }}
      />
      <Outlet />
    </>
  );
};

export default Layout;