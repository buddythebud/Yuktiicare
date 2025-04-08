
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Yukti Vyas",
    role: "Founder & CEO",
    bio: "Leading YuktiCare's mission to create inclusive opportunities and innovative solutions for differently-abled individuals.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: 2,
    name: "Ujjwall Sharma",
    role: "Backend Lead & Data Server",
    bio: "Architecting robust backend systems and managing data infrastructure to power YuktiCare's inclusive platform.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: 3,
    name: "Harshul Baluni",
    role: "Frontend Lead",
    bio: "Creating intuitive and accessible user interfaces to ensure a seamless experience for all YuktiCare users.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: 4,
    name: "Ayush",
    role: "AI/ML Lead",
    bio: "Developing intelligent solutions and algorithms to enhance YuktiCare's services through artificial intelligence and machine learning.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: 5,
    name: "Khushboo",
    role: "Backend Developer",
    bio: "Contributing to YuktiCare's backend development and ensuring robust system performance.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3"
  }
];

export default function Team() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24">
        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                Meet Our Team
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The passionate individuals behind YuktiCare's mission to create inclusive opportunities and support for differently-abled and elderly individuals.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className="bg-background border border-border/50 rounded-xl overflow-hidden hover:shadow-md transition-all hover:border-primary/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground mb-4">{member.bio}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    Contact
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 max-w-4xl mx-auto bg-secondary/30 p-8 rounded-xl border border-border">
            <h2 className="text-2xl font-bold mb-4 text-center">Join Our Team</h2>
            <p className="text-center text-muted-foreground mb-6">
              We're always looking for passionate individuals who share our mission of creating inclusive opportunities for all.
            </p>
            <div className="flex justify-center">
              <Button className="px-8">View Open Positions</Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
