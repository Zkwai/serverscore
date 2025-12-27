import { ShoppingBag, Plane, Home, Car, Laptop, Utensils, Heart, GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Services = () => {
  const categories = [
    {
      icon: ShoppingBag,
      title: "E-commerce",
      count: "45 230 entreprises",
      color: "bg-blue-500/10 text-blue-600"
    },
    {
      icon: Plane,
      title: "Voyages",
      count: "12 450 entreprises",
      color: "bg-orange-500/10 text-orange-600"
    },
    {
      icon: Home,
      title: "Immobilier",
      count: "8 920 entreprises",
      color: "bg-green-500/10 text-green-600"
    },
    {
      icon: Car,
      title: "Automobile",
      count: "15 680 entreprises",
      color: "bg-red-500/10 text-red-600"
    },
    {
      icon: Laptop,
      title: "Tech & Électronique",
      count: "22 150 entreprises",
      color: "bg-purple-500/10 text-purple-600"
    },
    {
      icon: Utensils,
      title: "Restauration",
      count: "31 890 entreprises",
      color: "bg-amber-500/10 text-amber-600"
    },
    {
      icon: Heart,
      title: "Santé & Bien-être",
      count: "9 540 entreprises",
      color: "bg-pink-500/10 text-pink-600"
    },
    {
      icon: GraduationCap,
      title: "Formation",
      count: "6 780 entreprises",
      color: "bg-teal-500/10 text-teal-600"
    }
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-trust-label text-primary mb-4 block">CATÉGORIES</span>
            <h2 className="text-3xl md:text-4xl font-bold text-trust-heading text-foreground mb-4">
              Explorez par secteur d'activité
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Trouvez facilement les avis qui vous intéressent parmi nos nombreuses catégories
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <Card 
                key={index} 
                className="group cursor-pointer card-hover border-border hover:border-primary/30"
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-14 h-14 rounded-xl ${category.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {category.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.count}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
