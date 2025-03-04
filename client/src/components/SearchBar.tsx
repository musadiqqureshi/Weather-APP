import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useLocation } from "wouter";

export function SearchBar() {
  const [search, setSearch] = useState("");
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      setLocation(`/city/${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto"
    >
      <form 
        onSubmit={handleSubmit} 
        className="relative group"
      >
        <div className="flex gap-2 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-200 hover:border-primary/30 transition-colors">
          <Input
            type="text"
            placeholder="Try searching for 'London' or 'Manchester'..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-lg placeholder:text-gray-400 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button 
            type="submit" 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white shadow-md"
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </form>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1 }}
        className="text-sm text-gray-500 mt-2 text-center"
      >
        Search for any UK city to explore its twin cities and attractions
      </motion.p>
    </motion.div>
  );
}