import Navigation from "@/components/Navigation";
import { Shield, TrendingUp, Users, Award, Check, Star } from "lucide-react";
import { useState } from "react";

const Pitch = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Le Problème",
      icon: <Shield className="w-16 h-16 text-red-500" />,
      content: [
        "87% des consommateurs se méfient des avis en ligne",
        "Les faux avis détruisent la confiance et votre réputation",
        "Vos concurrents utilisent des avis frauduleux pour vous dépasser",
        "Vous perdez des clients à cause du manque de crédibilité"
      ]
    },
    {
      title: "Notre Solution",
      icon: <Award className="w-16 h-16 text-blue-500" />,
      content: [
        "Avis Certifiés : la garantie d'authenticité pour vos clients",
        "Vérification rigoureuse de chaque avis (achat réel + identité)",
        "Badge de certification visible qui rassure instantanément",
        "Conformité totale avec les réglementations européennes"
      ]
    },
    {
      title: "Comment Ça Marche",
      icon: <Check className="w-16 h-16 text-green-500" />,
      content: [
        "1. Intégration simple en 5 minutes sur votre site",
        "2. Collecte automatique après chaque prestation",
        "3. Vérification approfondie avec systèmes d'analyse de pointe",
        "4. Publication des avis certifiés avec badge de confiance"
      ]
    },
    {
      title: "Les Bénéfices",
      icon: <TrendingUp className="w-16 h-16 text-purple-500" />,
      content: [
        "+42% de taux de conversion en moyenne",
        "+35% d'augmentation du panier moyen",
        "Amélioration du référencement Google (SEO)",
        "Protection juridique contre les avis frauduleux"
      ]
    },
    {
      title: "Pourquoi Nous",
      icon: <Users className="w-16 h-16 text-orange-500" />,
      content: [
        "Technologie d'IA pour détecter les fraudes",
        "Support client dédié en français",
        "Tableau de bord analytique en temps réel",
        "Tarification transparente sans engagement"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <section className="pt-32 pb-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <Shield className="w-12 h-12 text-primary mr-3" />
                <h1 className="text-4xl md:text-6xl font-light">
                  Avis Certifiés
                </h1>
              </div>
              <p className="text-xl text-muted-foreground">
                Transformez la confiance en croissance
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-lg min-h-[500px]">
              <div className="flex flex-col items-center">
                <div className="mb-8">
                  {slides[currentSlide].icon}
                </div>
                
                <h2 className="text-3xl md:text-4xl font-light mb-8 text-center">
                  {slides[currentSlide].title}
                </h2>
                
                <div className="space-y-6 w-full max-w-2xl">
                  {slides[currentSlide].content.map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-start space-x-4 bg-muted/50 p-4 rounded-lg hover:bg-muted transition-all duration-300"
                    >
                      <Star className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <p className="text-lg">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-8">
              <button
                onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                disabled={currentSlide === 0}
                className="px-6 py-3 bg-card border border-border hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-all duration-300 font-semibold"
              >
                ← Précédent
              </button>
              
              <div className="flex space-x-3">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentSlide === index 
                        ? 'bg-primary w-8' 
                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
                disabled={currentSlide === slides.length - 1}
                className="px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-all duration-300 font-semibold"
              >
                Suivant →
              </button>
            </div>

            <div className="mt-12 text-center">
              <div className="bg-primary text-primary-foreground rounded-2xl p-8 shadow-xl">
                <h3 className="text-3xl font-light mb-4">Prêt à booster votre crédibilité ?</h3>
                <p className="text-lg mb-6 opacity-90">
                  Essai gratuit 30 jours • Sans carte bancaire • Configuration en 5 minutes
                </p>
                <button className="px-8 py-4 bg-background text-foreground rounded-lg font-bold text-lg hover:bg-muted transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Démarrer maintenant
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pitch;
