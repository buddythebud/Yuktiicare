import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { getRecentDonations, getMonthlyDonations, submitSupport as submitDonation } from "@/services/donationService";
import { toast } from "@/hooks/use-toast";

export default function SupportSection() {
  const [donationAmount, setDonationAmount] = useState<string>("500");
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [recentDonors, setRecentDonors] = useState<Array<{name: string, amount: string, time: string}>>([]);
  const [monthlyProgress, setMonthlyProgress] = useState<{current: number, target: number}>({
    current: 0,
    target: 100000
  });

  // Fetch recent donations and monthly progress
  useEffect(() => {
    const loadDonationData = async () => {
      const donors = await getRecentDonations(3);
      setRecentDonors(donors);
      
      const { total, target } = await getMonthlyDonations();
      setMonthlyProgress({
        current: total,
        target: target
      });
    };
    
    loadDonationData();
  }, []);

  const handleAmountSelect = (amount: string) => {
    setDonationAmount(amount);
  };

  const handleDonateSubmit = async () => {
    // Basic validation
    if (!donationAmount || !fullName || !email) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const numericAmount = donationAmount === "Custom" 
        ? "500" // Default to 500 if "Custom" is selected but no value is provided
        : donationAmount;

      const result = await submitDonation({
        amount: numericAmount,
        donor_name: fullName,
        donor_email: email,
        is_monthly: false,
        message: ""
      });

      if (result.success) {
        toast({
          title: "Thank you for your support!",
          description: `Your contribution of ₹${numericAmount} will help us make a difference.`,
        });
        
        // Reset form
        setFullName("");
        setEmail("");
        setDonationAmount("500");
        setIsAnonymous(false);
        
        // Refresh donation data
        const donors = await getRecentDonations(3);
        setRecentDonors(donors);
        
        const { total, target } = await getMonthlyDonations();
        setMonthlyProgress({
          current: total,
          target: target
        });
      }
    } catch (error) {
      console.error("Donation submission error:", error);
      toast({
        title: "Donation failed",
        description: "There was an error processing your support. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate the progress percentage
  const progressPercentage = Math.min(
    Math.round((monthlyProgress.current / monthlyProgress.target) * 100),
    100
  );

  return (
    <section className="section-container">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
            Make a Difference
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Your Support Empowers Our Community
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Every contribution helps us provide essential services, create opportunities, 
            and build a more inclusive world for differently-abled individuals and the elderly.
          </p>

          <div className="space-y-6 mb-8">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Monthly Goal</span>
                <span className="text-primary font-medium">
                  ₹{monthlyProgress.current.toLocaleString()} / ₹{monthlyProgress.target.toLocaleString()}
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
            
            <div className="bg-secondary/50 rounded-lg p-4 border border-border">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Recent Donors</span>
                <span className="text-muted-foreground">Last 24 hours</span>
              </div>
              <div className="space-y-3 mt-4">
                {recentDonors.length > 0 ? (
                  recentDonors.map((donor, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                      <div>
                        <p className="font-medium">{donor.name}</p>
                        <p className="text-sm text-muted-foreground">{donor.time}</p>
                      </div>
                      <p className="font-medium text-primary">{donor.amount}</p>
                    </div>
                  ))
                ) : (
                  <div className="py-4 text-center text-muted-foreground">
                    Be the first to donate today!
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass-panel border border-primary/10 p-8 rounded-xl">
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Support Our Mission</h3>
              <p className="text-muted-foreground">
                Choose an amount to donate or enter a custom value
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {["₹100", "₹500", "₹1,000", "₹2,500", "₹5,000", "Custom"].map((amount, i) => (
                <Button 
                  key={i} 
                  variant={donationAmount === amount.replace("₹", "") || (i === 1 && donationAmount === "500") ? "default" : "outline"}
                  className="w-full"
                  onClick={() => handleAmountSelect(amount.replace("₹", ""))}
                >
                  {amount}
                </Button>
              ))}
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  placeholder="Your name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="anonymous"
                  className="mr-2"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                />
                <label htmlFor="anonymous" className="text-sm">
                  Make my donation anonymous
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Button 
                className="w-full" 
                size="lg" 
                onClick={handleDonateSubmit} 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Donate Now"}
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                All donations are tax deductible. You will receive a receipt via email.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
