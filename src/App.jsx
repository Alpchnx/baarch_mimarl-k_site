import React, { useMemo, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Hero from "./components/Hero.jsx";
import Home from "./pages/Home.jsx";
import Projects from "./pages/Projects.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Services from "./pages/Services.jsx";
import Products from "./pages/Products.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Quiz from "./pages/Quiz.jsx";
import Survey from "./pages/Survey.jsx";

export default function App() {
  const [route, setRoute] = useState(window.location.pathname);

  React.useEffect(() => {
    const onPop = () => setRoute(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = (path) => {
    if (path !== route) {
      window.history.pushState({}, "", path);
      setRoute(path);
    }
  };

  const content = useMemo(() => {
    if (route.startsWith("/projects/")) {
      const slug = route.replace("/projects/", "");
      return <ProjectDetail slug={slug} onNavigate={navigate} />;
    }
    if (route.startsWith("/products/")) {
      const slug = route.replace("/products/", "");
      return <ProductDetail slug={slug} onNavigate={navigate} />;
    }
    switch (route) {
      case "/projects":
        return <Projects onNavigate={navigate} />;
      case "/services":
        return <Services />;
      case "/products":
        return <Products onNavigate={navigate} />;
      case "/about":
        return <About />;
      case "/contact":
        return <Contact />;
      case "/quiz":
        return <Quiz onNavigate={navigate} />;
      case "/survey":
        return <Survey onNavigate={navigate} />;
      case "/":
      default:
        return (
          <>
            <Hero onNavigate={navigate} />
            <Home onNavigate={navigate} />
          </>
        );
    }
  }, [route]);

  return (
    <div className="app">
      <Navbar currentPath={route} onNavigate={navigate} />
      <main>{content}</main>
      <Footer />
    </div>
  );
}
