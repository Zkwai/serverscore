import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Star, Rocket, LayoutGrid, Mail, Gem } from "lucide-react";

const Services = () => {
  const services = [
    {
      number: "01",
      title: "Avis Certifiés",
      description: "Nous proposons un service premium garantissant une certification rapide de vos avis."
    },
    {
      number: "02", 
      title: "Commercial",
      description: "Des serveurs d'excellence et une promotion ciblée pour une communauté active et engagée."
    },
    {
      number: "03",
      title: "Innovation",
      description: "Nous croyons en l'innovation et aidons les serveurs à se réinventer grâce à des sondages personnalisés qui révèlent les attentes de votre communauté."
    },
    {
      number: "04",
      title: "Exportation",
      description: "Nous collaborons à l'international pour propulser votre serveur vers de nouveaux horizons."
    }
  ];

  const pubServices = [
    {
      icon: Target,
      title: "Bannière Premium",
      description: "Positionnez votre serveur en tête de page avec une bannière haute visibilité qui capte immédiatement l'attention des visiteurs.",
      features: [
        "Position premium en page d'accueil",
        "Format 728x90 pixels",
        "Rotation toutes les 10 secondes",
        "Statistiques détaillées en temps réel"
      ],
      price: "À partir de 49€ / semaine",
      popular: false,
      bestValue: false
    },
    {
      icon: Star,
      title: "Top 3 Mise en Avant",
      description: "Apparaissez dans le top 3 des serveurs recommandés sur toutes les pages de catégories pertinentes avec badge exclusif.",
      features: [
        "Badge \"Recommandé\" exclusif",
        "Position garantie top 3",
        "Présence sur page d'accueil",
        "Boost de +300% de visibilité"
      ],
      price: "À partir de 89€ / mois",
      popular: true,
      bestValue: false
    },
    {
      icon: Rocket,
      title: "Campagne Sponsorisée",
      description: "Diffusez votre message ciblé auprès de notre communauté avec des posts sponsorisés sur notre blog et réseaux sociaux.",
      features: [
        "Article dédié sur notre blog",
        "Posts sur nos réseaux sociaux",
        "Ciblage par catégorie",
        "Rédaction par notre équipe"
      ],
      price: "À partir de 149€ / campagne",
      popular: false,
      bestValue: false
    },
    {
      icon: LayoutGrid,
      title: "Widget Sidebar",
      description: "Présence permanente dans la barre latérale de toutes les pages avec un format compact et attractif.",
      features: [
        "Visible sur toutes les pages",
        "Format carré 250x250 pixels",
        "Position fixe garantie",
        "Design personnalisable"
      ],
      price: "À partir de 69€ / mois",
      popular: false,
      bestValue: false
    },
    {
      icon: Mail,
      title: "Newsletter Exclusive",
      description: "Touchez directement notre base d'abonnés actifs avec une promotion dédiée dans notre newsletter hebdomadaire.",
      features: [
        "+10,000 abonnés actifs",
        "Taux d'ouverture moyen 35%",
        "Placement exclusif",
        "Analytics complets"
      ],
      price: "À partir de 199€ / envoi",
      popular: false,
      bestValue: false
    },
    {
      icon: Gem,
      title: "Pack Visibilité 360°",
      description: "La solution complète combinant tous nos formats publicitaires pour une visibilité maximale et des résultats exceptionnels.",
      features: [
        "Tous les formats inclus",
        "Support prioritaire dédié",
        "Reporting mensuel détaillé",
        "Économie de -25% sur le tarif"
      ],
      price: "À partir de 449€ / mois",
      popular: false,
      bestValue: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section - Pourquoi Nous Choisir */}
      <section className="pt-32 pb-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <span className="text-sm font-semibold tracking-widest text-muted-foreground uppercase mb-4 block">
                SERVICES
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Pourquoi Nous Choisir
              </h1>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="bg-card border-border hover:border-primary/30 transition-colors duration-300">
                  <CardContent className="p-8">
                    <span className="text-sm font-semibold text-muted-foreground mb-4 block">
                      {service.number}
                    </span>
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Publicity Section - Nos Offres */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-sm font-semibold tracking-widest text-muted-foreground uppercase mb-4 block">
                NOS OFFRES
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Services Publicitaires
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Boostez la visibilité de votre serveur avec nos solutions publicitaires sur mesure. 
                Atteignez des milliers de membres actifs et développez votre communauté rapidement.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pubServices.map((service, index) => (
                <Card 
                  key={index} 
                  className={`relative bg-card border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    service.popular || service.bestValue 
                      ? 'border-primary hover:border-primary' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <CardContent className="p-8">
                    {service.popular && (
                      <Badge className="absolute -top-3 left-8 bg-destructive text-destructive-foreground">
                        POPULAIRE
                      </Badge>
                    )}
                    {service.bestValue && (
                      <Badge className="absolute -top-3 left-8 bg-primary text-primary-foreground">
                        MEILLEURE VALEUR
                      </Badge>
                    )}
                    
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mb-6">
                      <service.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-4">
                      {service.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-foreground/80">
                          <span className="text-primary font-bold mr-3">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <p className="text-sm font-semibold text-primary mb-6">
                      {service.price}
                    </p>
                    
                    <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold">
                      Commander maintenant
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
