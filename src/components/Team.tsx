"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Github } from "lucide-react";

const teamMembers = [
  {
    name: "Dr. Sarah Chen",
    role: "Chief AI Architect",
    bio: "Former Google Brain researcher. 15+ years in NLP and voice AI systems.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    gradient: "from-purple-600 to-blue-600",
  },
  {
    name: "Marcus Rivera",
    role: "VP of Engineering",
    bio: "Built enterprise communication systems at Twilio and Amazon Connect.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
    gradient: "from-blue-600 to-cyan-600",
  },
  {
    name: "Priya Sharma",
    role: "Head of Product",
    bio: "Led contact center innovation at Salesforce and Zendesk.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    gradient: "from-cyan-600 to-teal-600",
  },
  {
    name: "James Kim",
    role: "Chief Security Officer",
    bio: "Enterprise security expert. Former CISO at Fortune 500 companies.",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    gradient: "from-teal-600 to-green-600",
  },
];

function TeamCard({ member, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/80 to-black/80 border border-white/10 backdrop-blur-xl">
        {/* Image Container */}
        <div className="relative h-80 overflow-hidden">
          <motion.img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover"
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.6 }}
          />

          {/* Gradient Overlay */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-t ${member.gradient} mix-blend-multiply`}
            animate={{
              opacity: isHovered ? 0.7 : 0.3,
            }}
            transition={{ duration: 0.4 }}
          />

          {/* Social Links - appear on hover */}
          <motion.div
            className="absolute top-4 right-4 flex gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 0 : 20,
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.a
              whileHover={{ scale: 1.2, rotate: 5 }}
              href="#"
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <Linkedin className="w-5 h-5 text-white" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2, rotate: -5 }}
              href="#"
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <Twitter className="w-5 h-5 text-white" />
            </motion.a>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <motion.h3
            className="text-2xl font-bold text-white mb-1"
            animate={{
              x: isHovered ? 5 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            {member.name}
          </motion.h3>

          <motion.p
            className={`text-sm font-semibold mb-3 bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent`}
            animate={{
              x: isHovered ? 5 : 0,
            }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            {member.role}
          </motion.p>

          <motion.p
            className="text-gray-400 text-sm leading-relaxed"
            animate={{
              opacity: isHovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.3 }}
          >
            {member.bio}
          </motion.p>
        </div>

        {/* Glow effect */}
        <motion.div
          className={`absolute -inset-1 bg-gradient-to-r ${member.gradient} opacity-0 blur-xl -z-10`}
          animate={{
            opacity: isHovered ? 0.3 : 0,
          }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.div>
  );
}

export default function Team(): React.JSX.Element {
  return (
    <section id="team" className="relative py-32 px-6 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Built by Industry Veterans
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A world-class team combining AI research, enterprise software, and
            contact center expertise
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <TeamCard key={index} member={member} index={index} />
          ))}
        </div>

        {/* Join Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="inline-block p-8 bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-2xl backdrop-blur-xl">
            <h3 className="text-2xl font-bold text-white mb-4">
              Join Our Mission
            </h3>
            <p className="text-gray-400 mb-6 max-w-md">
              We're looking for exceptional talent to help build the future of
              enterprise AI
            </p>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(139, 92, 246, 0.6)",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-semibold shadow-lg shadow-purple-500/50"
            >
              View Open Positions
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
