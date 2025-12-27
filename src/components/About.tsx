import { Shield, Eye, Users, Award } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Avis vérifiés",
      description: "Chaque avis est authentifié pour garantir des retours d'expérience réels et fiables."
    },
    {
      icon: Eye,
      title: "Transparence totale",
      description: "Nous affichons tous les avis, positifs comme négatifs, sans aucune censure."
    },
    {
      icon: Users,
      title: "Communauté active",
      description: "Des millions d'utilisateurs partagent leurs expériences chaque mois."
    },
    {
      icon: Award,
      title: "Reconnaissance",
      description: "Les entreprises excellentes reçoivent nos badges de confiance prestigieux."
    }
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-trust-label text-primary mb-4 block">À PROPOS</span>
              <h2 className="text-3xl md:text-4xl font-bold text-trust-heading text-foreground mb-6">
                Pourquoi nous faire confiance ?
              </h2>
              
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  ConfianScore est la plateforme d'avis de référence en France. Nous aidons 
                  les consommateurs à prendre des décisions éclairées grâce à des avis 
                  authentiques et vérifiés.
                </p>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Fondée en 2018, notre mission est de créer un environnement de confiance 
                  entre les entreprises et leurs clients. Nous croyons que la transparence 
                  est la clé d'un commerce équitable.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mt-10">
                <div className="p-4 bg-card rounded-xl border border-border">
                  <div className="text-3xl font-bold text-primary mb-1">98%</div>
                  <p className="text-sm text-muted-foreground">Taux de satisfaction</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <div className="text-3xl font-bold text-primary mb-1">24h</div>
                  <p className="text-sm text-muted-foreground">Délai de vérification</p>
                </div>
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <div 
                  key={index}
                  className="p-6 bg-card rounded-xl border border-border card-hover"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
