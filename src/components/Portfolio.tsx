import { Star, ThumbsUp, Calendar, Verified } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import StarRating from "@/components/StarRating";

const Portfolio = () => {
  const reviews = [
    {
      author: "Marie L.",
      company: "TechStore France",
      rating: 5,
      date: "Il y a 2 jours",
      title: "Service client exceptionnel !",
      content: "J'ai eu un problème avec ma commande et l'équipe a été très réactive. Problème résolu en moins de 24h. Je recommande vivement !",
      helpful: 24,
      verified: true
    },
    {
      author: "Pierre D.",
      company: "VoyageExpress",
      rating: 4,
      date: "Il y a 3 jours",
      title: "Très bonne expérience globale",
      content: "Réservation simple et rapide. Le voyage s'est bien passé malgré un petit retard. Prix compétitifs et service correct.",
      helpful: 18,
      verified: true
    },
    {
      author: "Sophie M.",
      company: "BioMarché Online",
      rating: 5,
      date: "Il y a 5 jours",
      title: "Produits de qualité, livraison rapide",
      content: "Excellente sélection de produits bio. La livraison est toujours à l'heure et les produits sont bien emballés. Cliente fidèle depuis 2 ans !",
      helpful: 42,
      verified: true
    },
    {
      author: "Thomas R.",
      company: "FormaPro Academy",
      rating: 5,
      date: "Il y a 1 semaine",
      title: "Formation très complète",
      content: "La formation était exactement ce dont j'avais besoin. Formateurs compétents et contenu à jour. J'ai trouvé un emploi 2 mois après !",
      helpful: 56,
      verified: true
    },
    {
      author: "Julie B.",
      company: "AutoService Plus",
      rating: 4,
      date: "Il y a 1 semaine",
      title: "Bon garage, prix honnêtes",
      content: "Révision effectuée dans les délais annoncés. Les mécaniciens sont professionnels et expliquent bien les réparations nécessaires.",
      helpful: 31,
      verified: true
    },
    {
      author: "Alexandre C.",
      company: "DecoMaison",
      rating: 5,
      date: "Il y a 2 semaines",
      title: "Magnifiques produits déco",
      content: "J'ai commandé plusieurs articles pour mon salon et je suis ravi du résultat. Qualité premium à prix raisonnable. Bravo !",
      helpful: 27,
      verified: true
    }
  ];

  return (
    <section id="reviews" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-trust-label text-primary mb-4 block">AVIS RÉCENTS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-trust-heading text-foreground mb-4">
              Ce que disent nos utilisateurs
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez les derniers avis partagés par notre communauté
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <Card 
                key={index} 
                className="review-card border-border hover:border-primary/30 transition-colors duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-foreground">{review.author}</span>
                        {review.verified && (
                          <Verified className="w-4 h-4 text-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{review.company}</p>
                    </div>
                    <StarRating rating={review.rating} size="sm" />
                  </div>
                  
                  {/* Content */}
                  <h4 className="font-semibold text-foreground mb-2">{review.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {review.content}
                  </p>
                  
                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-1 text-muted-foreground text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{review.date}</span>
                    </div>
                    <button className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors text-sm">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{review.helpful}</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a 
              href="/work" 
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
            >
              Voir tous les avis →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
