import React, { useContext } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { FiLogOut } from "react-icons/fi";
import { AuthContext } from "../../context/authContext";
import { useAuthModal } from "../../context/AuthModalContext";
import AuthModal from "../../components/auth/Auth";
import { AcmeLogo } from "./AcmeLogo.jsx";

function NavBar() {
  const { openAuthModal } = useAuthModal();
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <>
      <Navbar>
        <NavbarBrand>
          <Link href="/#">
            {" "}
            {/* Redirect to home page */}
            <p className="font-bold text-inherit">Delivery YA</p>
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="/#/quienes-somos">
              Quienes Somos
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="/#/productos" aria-current="page">
              Productos
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Consultar Pedido
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex items-center">
            {user ? (
              <>
                <span className="page-link text-1xl">{user.email}</span>
                <Button onClick={handleLogout} className="ml-4">
                  <FiLogOut size={24} />
                </Button>
              </>
            ) : (
              <a
                href="#"
                className="page-link text-1xl"
                onClick={(e) => {
                  e.preventDefault();
                  openAuthModal();
                }}
              >
                Iniciar Sesión
              </a>
            )}
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <AuthModal />
    </>
  );
}
export default NavBar;
