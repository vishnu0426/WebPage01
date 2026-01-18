"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Navigation from "../../components/Navigation";


const blogPosts = [
  {
    title: "The Future of Enterprise Voice AI",
    excerpt:
      "How multi-modal AI is transforming customer service and contact centers in 2026.",
    date: "January 4, 2026",
    readTime: "5 min read",
    category: "AI Technology",
    gradient: "from-purple-600 to-blue-600",
  },
  {
    title: "Building Resilient AI Systems at Scale",
    excerpt:
      "Our approach to achieving 99.9% uptime with automatic failover and model switching.",
    date: "January 2, 2026",
    readTime: "8 min read",
    category: "Engineering",
    gradient: "from-blue-600 to-cyan-600",
  },
  {
    title: "PII Protection in Voice AI",
    excerpt:
      "How we ensure enterprise-grade security and compliance with GDPR, HIPAA, and PCI-DSS.",
    date: "December 28, 2025",
    readTime: "6 min read",
    category: "Security",
    gradient: "from-cyan-600 to-teal-600",
  },
  {
    title: "Sentiment Detection: The Silent Superpower",
    excerpt:
      "Understanding customer emotions in real-time to improve satisfaction and retention.",
    date: "December 25, 2025",
    readTime: "7 min read",
    category: "Product",
    gradient: "from-teal-600 to-green-600",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Blog
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Insights on AI, enterprise technology, and the future of customer
              experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative bg-gradient-to-br from-gray-900/80 to-black/80 border border-white/10 rounded-2xl p-8 backdrop-blur-xl cursor-pointer overflow-hidden"
              >
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${post.gradient}`}
                />

                <div className="mb-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${post.gradient} text-white`}
                  >
                    {post.category}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all">
                  {post.title}
                </h2>

                <p className="text-gray-400 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </div>
                  </div>

                  <motion.div className="flex items-center gap-2 text-purple-400 font-semibold group-hover:gap-4 transition-all">
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>

                <motion.div
                  className={`absolute -inset-1 bg-gradient-to-r ${post.gradient} opacity-0 group-hover:opacity-20 blur-xl -z-10 transition-opacity`}
                />
              </motion.article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
