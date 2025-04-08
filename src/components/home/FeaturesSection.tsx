
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Briefcase, Home, Calendar, Heart, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: <Briefcase className="h-6 w-6 text-primary" />,
    title: "Job Portal",
    description: "Find inclusive employment opportunities specifically designed for differently-abled individuals.",
    link: "/jobs"
  },
  {
    icon: <Home className="h-6 w-6 text-primary" />,
    title: "Old-Age Homes",
    description: "Discover comfortable and trusted old-age homes that provide quality care, warmth, and dignity for your loved ones in their golden years.",
    link: "/housing"
  },
  {
    icon: <Calendar className="h-6 w-6 text-primary" />,
    title: "Community Events",
    description: "YuktiiCare is more than just a platform — it's a place where every person is accepted for who they are. We create safe spaces where voices are heard, stories are shared, and hearts are connected.",
    link: "/events"
  },
  {
    icon: <Heart className="h-6 w-6 text-primary" />,
    title: "Support Network",
    description: "YuktiiCare thrives on kindness and community. Your support can help us grow faster, reach more lives, and create better systems. Join us through donations, partnerships, or volunteering.",
    link: "/donate"
  },
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    title: "Corporate Partnerships",
    description: "Companies can engage in meaningful CSR initiatives and support diversity in the workplace.",
    link: "/partner"
  },
  {
    icon: <Zap className="h-6 w-6 text-primary" />,
    title: "AI-Powered Matching",
    description: "Our advanced technology connects individuals with the perfect opportunities based on their needs.",
    link: "/matchmaking"
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function FeaturesSection() {
  return (
    <section className="section-container" id="features">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-secondary text-foreground/80 mb-6">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Comprehensive Support for Every Need
          </h2>
          <p className="text-muted-foreground text-lg">
            We provide a holistic approach to community support, offering services
            designed to empower differently-abled individuals and the elderly.
          </p>
        </motion.div>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {features.map((feature, index) => (
          <motion.div key={index} variants={item}>
            <Link to={feature.link} className="block h-full transition-transform hover:scale-105">
              <Card className="glass-card h-full border border-border/50 hover:border-primary/20 hover:shadow-lg transition-all cursor-pointer">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
