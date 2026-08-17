import React from 'react';
import { motion } from 'framer-motion';

export const SplitText = ({ text, className = '', delay = 0, highlightWords = [] }) => {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay * 0.001 },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 18,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 24,
      filter: 'blur(8px)',
    },
  };

  return (
    <motion.span
      className={`split-text-wrapper ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
    >
      {words.map((word, index) => {
        const cleanWord = word.replace(/[^a-zA-Z]/g, '').toLowerCase();
        const isHighlight = highlightWords.some((h) =>
          cleanWord.includes(h.toLowerCase())
        );

        return (
          <motion.span
            variants={child}
            key={index}
            className={`split-word ${isHighlight ? 'text-highlight-word' : ''}`}
            style={{ display: 'inline-block', marginRight: '0.28em' }}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.span>
  );
};