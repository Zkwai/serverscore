import Navigation from "@/components/Navigation";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <section className="pt-32 pb-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <div>
                <h1 className="text-minimal text-muted-foreground mb-4">À PROPOS</h1>
                <h2 className="text-4xl md:text-6xl font-light text-architectural mb-12">
                  Pourquoi nous faire confiance ?
                </h2>
                
                <div className="space-y-8">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                     ServerScore est la plateforme d'avis de référence en France. Nous aidons 
                  les consommateurs à prendre des décisions éclairées grâce à des avis 
                  authentiques et vérifiés.
                  </p>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed">
                     Fondée en 2025, notre mission est de créer un environnement de confiance 
                  entre les entreprises virtuel et leurs clients. Nous croyons que la transparence 
                  est la clé d'un commerce équitable.
                  </p>
                </div>
              </div>
              
              <div className="space-y-12">
                <div>
                  <h3 className="text-minimal text-muted-foreground mb-6">APPROACH</h3>
                  <div className="space-y-6">
                    <div className="border-l-2 border-architectural pl-6">
                      <h4 className="text-lg font-medium mb-2">Research</h4>
                      <p className="text-muted-foreground">Deep understanding of context, culture, and climate</p>
                    </div>
                    <div className="border-l-2 border-architectural pl-6">
                      <h4 className="text-lg font-medium mb-2">Collaboration</h4>
                      <p className="text-muted-foreground">Close partnership with clients, engineers, and craftspeople</p>
                    </div>
                    <div className="border-l-2 border-architectural pl-6">
                      <h4 className="text-lg font-medium mb-2">Innovation</h4>
                      <p className="text-muted-foreground">Sustainable materials and forward-thinking design solutions</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-8 border-t border-border">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-minimal text-muted-foreground mb-2">FOUNDED</h3>
                      <p className="text-xl">2025</p>
                    </div>
                    <div>
                      <h3 className="text-minimal text-muted-foreground mb-2">PROJECTS</h3>
                      <p className="text-xl">200+</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
