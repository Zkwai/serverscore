import { Search, Star, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StarRating from "@/components/StarRating";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 bg-gradient-to-b from-accent/50 to-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300b67a' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center hero-fade-in">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-8">
            <Shield className="w-4 h-4" />
            <span>La plateforme d'avis n°1 en France</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground text-trust-heading mb-6">
            Trouvez des entreprises
            <br />
            <span className="gradient-text">dignes de confiance</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Lisez des millions d'avis vérifiés et partagez votre expérience pour aider les autres consommateurs à faire les bons choix.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex flex-col sm:flex-row gap-3 p-2 bg-card rounded-xl shadow-elevated border border-border">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  type="text"
                  placeholder="Rechercher une entreprise..."
                  className="pl-12 h-12 border-0 bg-transparent focus-visible:ring-0 text-base"
                />
              </div>
              <Button size="lg" className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground">
                Rechercher
              </Button>
            </div>
          </div>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-6 h-6 fill-primary text-primary" />
                <span className="text-3xl font-bold text-foreground">4.8</span>
              </div>
              <p className="text-sm text-muted-foreground">Note moyenne</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="w-6 h-6 text-primary" />
                <span className="text-3xl font-bold text-foreground">2.5M+</span>
              </div>
              <p className="text-sm text-muted-foreground">Avis vérifiés</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="w-6 h-6 text-primary" />
                <span className="text-3xl font-bold text-foreground">150K+</span>
              </div>
              <p className="text-sm text-muted-foreground">Entreprises</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
