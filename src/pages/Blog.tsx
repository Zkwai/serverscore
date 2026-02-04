import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { blogPosts } from "@/data/blogPosts";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db } from "@/config/firebase";

type FirestorePost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
};

const Blog = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [firestorePosts, setFirestorePosts] = useState<FirestorePost[]>([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("COMMUNAUTÉ");

  const categories = ["ALL", "DURABILITÉ", "DESIGN", "URBANISME", "COMMUNAUTÉ"];

  useEffect(() => {
    const postsQuery = query(collection(db, "blogPosts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      const posts = snapshot.docs.map((docSnap) => {
        const data = docSnap.data() as {
          title?: string;
          description?: string;
          image?: string;
          author?: string;
          category?: string;
          createdAt?: { toDate: () => Date };
        };

        const content = data.description || "";
        const readTime = `${Math.max(1, Math.ceil(content.length / 600))} min de lecture`;

        return {
          id: docSnap.id,
          title: data.title || "Sans titre",
          excerpt: content,
          content,
          author: data.author || "Utilisateur",
          date: data.createdAt ? data.createdAt.toDate().toLocaleDateString("fr-FR") : "—",
          readTime,
          category: data.category || "COMMUNAUTÉ",
          image: data.image || "",
        };
      });

      setFirestorePosts(posts);
    });

    return () => unsubscribe();
  }, []);

  const allPosts = useMemo(() => {
    return [...firestorePosts, ...blogPosts];
  }, [firestorePosts]);

  const filteredPosts = activeCategory === "ALL"
    ? allPosts
    : allPosts.filter(post => post.category === activeCategory);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      toast({
        title: "Connexion requise",
        description: "Connectez-vous pour créer un article.",
        variant: "destructive",
      });
      return;
    }

    if (!title.trim() || !description.trim() || !imageUrl.trim()) {
      toast({
        title: "Erreur",
        description: "Titre, description et image sont requis.",
        variant: "destructive",
      });
      return;
    }

    setCreating(true);
    try {
      await addDoc(collection(db, "blogPosts"), {
        userId: currentUser.uid,
        title: title.trim(),
        description: description.trim(),
        image: imageUrl.trim(),
        author: currentUser.displayName || currentUser.email || "Utilisateur",
        category,
        createdAt: serverTimestamp(),
      });

      setTitle("");
      setDescription("");
      setImageUrl("");
      setCategory("COMMUNAUTÉ");
      setCreateOpen(false);
      toast({
        title: "Article créé",
        description: "Votre article est en ligne.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer l'article.",
        variant: "destructive",
      });
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h1 className="text-6xl md:text-8xl font-light text-architectural mb-8">
                Blog
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl">
                Explorer le point de rencontre entre le Serveurs , le design et l'expérience humaine
à travers une analyse approfondie et des perspectives contemporaines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-8 justify-center md:justify-start">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`text-minimal transition-colors duration-300 relative group ${
                    activeCategory === category 
                      ? "text-foreground" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {category}
                  <span className={`absolute bottom-0 left-0 w-full h-px bg-foreground transition-transform duration-300 origin-left ${
                    activeCategory === category 
                      ? "scale-x-100" 
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}></span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="pb-32">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
              {filteredPosts.map((post) => (
                <article key={post.id} className="group">
                  <Link to={`/blog/${post.id}`} className="block">
                    <div className="relative overflow-hidden mb-6">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1">
                        <span className="text-xs text-foreground font-medium">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center text-xs text-muted-foreground space-x-4">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                        <span>•</span>
                        <span>{post.author}</span>
                      </div>
                      
                      <h2 className="text-xl lg:text-2xl font-light text-architectural group-hover:text-muted-foreground transition-colors duration-500">
                        {post.title}
                      </h2>
                      
                      <p className="text-muted-foreground leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="pt-4">
                        <span className="text-minimal text-foreground hover:text-muted-foreground transition-colors duration-300 relative group-hover:underline">
                          READ MORE
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Floating create button */}
      {currentUser && (
        <button
          type="button"
          onClick={() => setCreateOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
          aria-label="Créer un article"
        >
          <Plus className="h-6 w-6" />
        </button>
      )}

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Créer un article</DialogTitle>
            <DialogDescription>
              Ajoutez un titre, une description et une image.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreatePost} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="postTitle">Titre</Label>
              <Input
                id="postTitle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Titre de l'article"
                disabled={creating}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postDescription">Description</Label>
              <textarea
                id="postDescription"
                className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Décrivez votre article..."
                disabled={creating}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postImage">Image (URL)</Label>
              <Input
                id="postImage"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://..."
                disabled={creating}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postCategory">Catégorie</Label>
              <select
                id="postCategory"
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={creating}
              >
                <option value="DURABILITÉ">DURABILITÉ</option>
                <option value="DESIGN">DESIGN</option>
                <option value="URBANISME">URBANISME</option>
                <option value="COMMUNAUTÉ">COMMUNAUTÉ</option>
              </select>
            </div>
            <Button type="submit" className="w-full" disabled={creating}>
              {creating ? "Publication..." : "Publier"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Newsletter Section */}
      <section className="py-32 bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-light text-architectural mb-8">
              Rester Informer
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
             Inscrit toi au actualité pour etre au courants de nouveau projet
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-background border border-border text-foreground placeholder:text-muted-foreground"
              />
              <button className="px-8 py-4 bg-foreground text-background hover:bg-muted-foreground transition-colors duration-300">
                Inscrit Toi
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
