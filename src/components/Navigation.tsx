import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Star, Menu, X } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="w-6 h-6 fill-primary text-primary" />
            <span className="text-xl font-bold text-foreground">ServerScore</span>
          </div>
        </a>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
            Catégories
          </a>
          <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
            À propos
          </a>
          <a href="/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
            Blog
          </a>
          <a href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
            Contact
          </a>
          <a href="#pitch" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
            Pitch
          </a>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <Button variant="outline" size="sm">
            Se connecter
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            Écrire un avis
          </Button>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="container mx-auto px-6 py-6 space-y-4">
            <a href="#services" className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
              Catégories
            </a>
            <a href="#about" className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
              À propos
            </a>
            <a href="/blog" className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
              Blog
            </a>
            <a href="#contact" className="block text-sm font-medium text-muted-foreground hover:tex
