import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TweetEmbedProps {
  tweetId: string;
  className?: string;
}

const TweetEmbed = ({ tweetId, className = '' }: TweetEmbedProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Reset loaded state when tweet ID changes
    setIsLoaded(false);
    setIsVisible(false);

    const loadTweet = () => {
      if (window.twttr) {
        window.twttr.widgets.load().then(() => {
          setIsLoaded(true);
          // Add delay before showing the tweet
          setTimeout(() => {
            setIsVisible(true);
          }, 3000); // 1 second delay after loading
        });
      }
    };

    // Load Twitter widget script if it hasn't been loaded yet
    if (!window.twttr) {
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      script.onload = loadTweet;
      document.body.appendChild(script);
    } else {
      loadTweet();
    }
  }, [tweetId]);

  return (
    <motion.div 
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: isLoaded && isVisible ? 1 : 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5 }}
    >
      <blockquote className="twitter-tweet" data-theme="dark">
        <a href={`https://twitter.com/x/status/${tweetId}`}></a>
      </blockquote>
    </motion.div>
  );
};

// Add TypeScript declaration for the Twitter widget
declare global {
  interface Window {
    twttr: any;
  }
}

export default TweetEmbed; 