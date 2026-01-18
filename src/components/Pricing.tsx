"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Zap, Building2, Rocket } from "lucide-react";

const pricingPlans = [
  {
    name: "Starter",
    icon: Zap,
    description: "Perfect for small teams getting started",
    monthlyPrice: 499,
    annualPrice: 4990,
    features: [
      "Up to 20 agents",
      "10,000 minutes/month",
      "Basic voice AI",
      "Email support",
      "Standard integrations",
      "Call analytics",
    ],
    gradient: "from-purple-600 to-blue-600",
    popular: false,
  },
  {
    name: "Professional",
    icon: Building2,
    description: "For growing contact centers",
    monthlyPrice: 1499,
    annualPrice: 14990,
    features: [
      "Up to 100 agents",
      "50,000 minutes/month",
      "Advanced voice AI",
      "Priority support",
      "Custom integrations",
      "Advanced analytics",
      "Sentiment analysis",
      "API access",
    ],
    gradient: "from-blue-600 to-cyan-600",
    popular: true,
  },
  {
    name: "Enterprise",
    icon: Rocket,
    description: "Unlimited scale for large organizations",
    monthlyPrice: null,
    annualPrice: null,
    features: [
      "Unlimited agents",
      "Unlimited minutes",
      "Full AI capabilities",
      "Dedicated support",
      "White-label options",
      "Custom AI training",
      "SLA guarantee",
      "On-premise deployment",
    ],
    gradient: "from-cyan-600 to-teal-600",
    popular: false,
  },
];

function PricingCard({ plan, isAnnual, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative ${plan.popular ? "md:-mt-8" : ""}`}
    >
      {plan.popular && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-5 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white text-sm font-semibold"
        >
          Most Popular
        </motion.div>
      )}

      <div
        className={`relative h-full p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-black/80 border backdrop-blur-xl ${plan.popular ? "border-purple-500/50 md:scale-105" : "border-white/10"
          }`}
      >
        {/* Icon */}
        <motion.div
          animate={{
            rotate: isHovered ? 360 : 0,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.6 }}
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.gradient} p-3 mb-6`}
        >
          <plan.icon className="w-full h-full text-white" />
        </motion.div>

        {/* Plan Name */}
        <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
        <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

        {/* Price */}
        <div className="mb-8">
          {plan.monthlyPrice ? (
            <>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-white">
                  $
                  {isAnnual
                    ? Math.floor(plan.annualPrice / 12)
                    : plan.monthlyPrice}
                </span>
                <span className="text-gray-400">/month</span>
              </div>
              {isAnnual && (
                <p className="text-sm text-green-400 mt-2">
                  Save $
                  {(plan.monthlyPrice * 12 - plan.annualPrice).toLocaleString()}{" "}
                  annually
                </p>
              )}
            </>
          ) : (
            <div className="text-4xl font-bold text-white">Custom</div>
          )}
        </div>

        {/* Features */}
        <ul className="space-y-4 mb-8">
          {plan.features.map((feature, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="flex items-start gap-3"
            >
              <div
                className={`w-5 h-5 rounded-full bg-gradient-to-br ${plan.gradient} p-1 flex-shrink-0 mt-0.5`}
              >
                <Check className="w-full h-full text-white" />
              </div>
              <span className="text-gray-300 text-sm">{feature}</span>
            </motion.li>
          ))}
        </ul>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full py-4 rounded-xl font-semibold transition-all ${plan.popular
            ? `bg-gradient-to-r ${plan.gradient} text-white shadow-lg shadow-purple-500/50`
            : "bg-white/10 text-white hover:bg-white/20"
            }`}
        >
          {plan.monthlyPrice ? "Get Started" : "Contact Sales"}
        </motion.button>

        {/* Glow effect */}
        <motion.div
          className={`absolute -inset-1 bg-gradient-to-r ${plan.gradient} opacity-0 blur-xl -z-10`}
          animate={{
            opacity: isHovered ? (plan.popular ? 0.4 : 0.2) : 0,
          }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.div>
  );
}

export default function Pricing(): React.JSX.Element {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="relative py-32 px-6 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Choose the plan that fits your needs. All plans include core AI
            features.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 p-2 bg-gray-900/50 rounded-full border border-white/10 backdrop-blur-xl">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${!isAnnual
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                : "text-gray-400"
                }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${isAnnual
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                : "text-gray-400"
                }`}
            >
              Annual
              <span className="ml-2 text-xs text-green-400">Save 17%</span>
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={index}
              plan={plan}
              isAnnual={isAnnual}
              index={index}
            />
          ))}
        </div>

        {/* Feature Comparison Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <p className="text-gray-400 mb-4">
            Need a detailed feature comparison?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 border-2 border-purple-500 rounded-full text-white font-medium hover:bg-purple-500/10 transition-colors"
          >
            View Full Comparison
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
