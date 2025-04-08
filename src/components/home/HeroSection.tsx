
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-background/80" />
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        </motion.div>
      </div>

      <div className="section-container relative z-10 pb-0 md:min-h-[85vh] flex flex-col justify-center">
        <div className="max-w-3xl mx-auto text-center mb-6 md:mb-12 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4 md:mb-6">
              Empowering Communities Together
            </span>
          </motion.div>

          <motion.h1
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Transforming Lives Through
            <span className="text-primary"> Community Support</span>
          </motion.h1>

          <motion.p
            className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8 px-2 md:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Yuktiicare connects differently-abled individuals and the elderly with jobs, housing, and 
            a supportive community. Join us in creating an inclusive future where everyone thrives.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <Button size={isMobile ? "default" : "lg"} className="font-medium" asChild>
              <Link to="/jobs">
                Find Opportunities
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size={isMobile ? "default" : "lg"} variant="outline" className="font-medium" asChild>
              <Link to="/donate">Support Us</Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto max-w-5xl w-full mt-6 md:mt-8 px-4 md:px-0"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="aspect-[16/9] overflow-hidden rounded-t-xl glass-panel border border-primary/10 shadow-lg">
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
              <div className="text-center p-4 md:p-10">
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 md:mb-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/30 flex items-center justify-center">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary flex items-center justify-center">
                      <svg 
                        width="18" 
                        height="18" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-white md:w-6 md:h-6"
                      >
                        <path d="M5 3L19 12L5 21V3Z" fill="currentColor" />
                      </svg>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-medium mb-1 md:mb-2">Watch How We Make a Difference</h3>
                <p className="text-sm md:text-base text-muted-foreground">See the impact of our community efforts</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </div>
    </section>
  );
}
