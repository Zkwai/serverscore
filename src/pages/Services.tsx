import Navigation from "@/components/Navigation";

const Services = () => {
  const services = [
    {
      number: "01",
      title: "Avis Certifier",
      description: "Nous proposons un service premium garantissant une certification rapide de vos avis. "
    },
    {
      number: "02", 
      title: "COMMERCIAL",
      description: "Des serveurs d'excellence et une promotion ciblée pour une communauté active et engagée."
    },
    {
      number: "03",
      title: "Innovation",
      description: "Nous croyons en l'innovation et aidons les serveurs à se réinventer grâce à des sondages personnalisés qui révèlent les attentes de votre communauté."
    },
    {
      number: "04",
      title: "EXPORTATION",
      description: "Nous collaborons à l'international pour propulser votre serveur vers de nouveaux horizons."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <section className="pt-32 pb-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20">
              <h1 className="text-minimal text-muted-foreground mb-4">SERVICES</h1>
              <h2 className="text-4xl md:text-6xl font-light text-architectural">
                Pourquoi Nous Choisir
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-x-20 gap-y-16">
              {services.map((service, index) => (
                <div key={index} className="group">
                  <div className="flex items-start space-x-6">
                    <span className="text-minimal text-muted-foreground font-medium">
                      {service.number}
                    </span>
                    <div>
                      <h3 className="text-2xl font-light mb-4 text-architectural group-hover:text-muted-foreground transition-colors duration-500">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
