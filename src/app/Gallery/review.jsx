'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Review({ title, text }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      title={expanded ? 'Skrýt' : 'Ukaž více'}
      className="cursor-pointer p-4 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors duration-200"
    >
      <h3 className="font-semibold text-gray-800">{title}</h3>

      <AnimatePresence mode="wait">
        {expanded ? (
          <motion.div
            key="expanded"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-sm text-gray-600 mt-2">{text}</p>
          </motion.div>
        ) : (
          <motion.p
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-sm text-gray-600 mt-2 line-clamp-2"
          >
            {text}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}