import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Services />
      <About />
      <Portfolio />
      <Contact />
      <footer className="mt-12 border-t border-border/60 py-6 text-center text-sm text-muted-foreground">
        <Link
          to="/professionel"
          className="font-medium text-primary hover:underline"
        >
          Professionel
        </Link>
      </footer>
    </div>
  );
};

export default Index;
