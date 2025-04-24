import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Offcanvas,
  Dropdown,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import "./NavBar.css";
const NavBar: React.FC = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const { darkMode } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNavbar(currentScrollY <= lastScrollY);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  const handleChangeLanguage = (lang: "ES" | "EN") => {
    if (language !== lang) {
      toggleLanguage(lang);
    }
  };
  const handleNavClick = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setShowMenu(false);
  };
  return (
    <>
      <Navbar
        expand="lg"
        fixed="top"
        className={`custom-navbar shadow navbar-glass ${
          showNavbar ? "navbar-visible" : "navbar-hidden"
        } ${darkMode ? "dark-mode" : ""}`}
        style={{
          transition: "top 0.3s, background-color 0.3s",
          height: "90px",
        }}
      >
        <Container fluid className="custom-container">
          <div className="navbar-content">
            <div className="navbar-left">
              <Navbar.Brand href="#" className="logo-container">
                <img src="logopk.png" alt="Logo" className="logo" />
              </Navbar.Brand>
            </div>

            <div className="navbar-center d-none d-lg-flex">
              <Nav className="mx-auto">
                {["home", "about", "services", "contact"].map((section) => (
                  <Nav.Link
                    key={section}
                    onClick={() => handleNavClick(section)}
                    className="nav-link-custom"
                  >
                    {language === "ES"
                      ? section === "home"
                        ? "Inicio"
                        : section === "about"
                        ? "Sobre mí"
                        : section === "services"
                        ? "Servicios"
                        : "Contacto"
                      : section.charAt(0).toUpperCase() + section.slice(1)}
                  </Nav.Link>
                ))}
              </Nav>
            </div>

            <div className="navbar-right">
              <div className="d-none d-lg-flex align-items-center">
                <Dropdown className="me-3 language-dropdown">
                  <Dropdown.Toggle
                    variant="secondary"
                    className="language-toggle"
                  >
                    {language}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="language-menu">
                    <Dropdown.Item onClick={() => handleChangeLanguage("ES")}>
                      ES
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleChangeLanguage("EN")}>
                      EN
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <ThemeToggle language={language} />
              </div>

              <Button
                variant="outline-secondary"
                onClick={() => setShowMenu(true)}
                className="d-lg-none ms-auto"
                style={{ border: "1px solid #ccc" }}
              >
                ☰
              </Button>
            </div>
          </div>
        </Container>
      </Navbar>

      <Offcanvas
        show={showMenu}
        onHide={() => setShowMenu(false)}
        placement="end"
        style={{
          backgroundColor: darkMode ? "#212529" : "#f8f9fa",
          color: darkMode ? "white" : "black",
        }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="text-center w-100">
            {language === "ES" ? "Menú" : "Menu"}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column align-items-center mt-2">
          <Nav className="flex-column w-100">
            {["home", "about", "services", "contact"].map((section) => (
              <Nav.Link
                key={section}
                onClick={() => handleNavClick(section)}
                className="nav-link-custom text-center"
              >
                {language === "ES"
                  ? section === "home"
                    ? "Inicio"
                    : section === "about"
                    ? "Sobre mí"
                    : section === "services"
                    ? "Servicios"
                    : "Contacto"
                  : section.charAt(0).toUpperCase() + section.slice(1)}
              </Nav.Link>
            ))}
          </Nav>

          <Dropdown className="mt-3 language-dropdown">
            <Dropdown.Toggle variant="secondary" className="language-toggle">
              {language}
            </Dropdown.Toggle>
            <Dropdown.Menu className="language-menu">
              <Dropdown.Item onClick={() => handleChangeLanguage("ES")}>
                ES
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleChangeLanguage("EN")}>
                EN
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <div className="mt-4">
            <ThemeToggle language={language} />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default NavBar;
