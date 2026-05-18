import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenTexts?: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  texts,
  typingSpeed = 80,
  deletingSpeed = 50,
  delayBetweenTexts = 2000,
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const type = () => {
      const fullText = texts[currentTextIndex];

      if (isDeleting) {
        setCurrentText((prev) => prev.substring(0, prev.length - 1));
      } else {
        setCurrentText((prev) => fullText.substring(0, prev.length + 1));
      }

      let speed = isDeleting ? deletingSpeed : typingSpeed;

      if (!isDeleting && currentText === fullText) {
        speed = delayBetweenTexts;
        setIsDeleting(true);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        speed = 500; // Small pause before starting next word
      }

      timeout = setTimeout(type, speed);
    };

    timeout = setTimeout(type, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentTextIndex, texts, typingSpeed, deletingSpeed, delayBetweenTexts]);

  return (
    <span className="inline-flex items-center">
      <span className="text-accent-cyan mr-2">{'>'}</span>
      <span className="text-accent-cyan font-code">{currentText}</span>
      <span className="w-[2px] h-[1em] bg-accent-cyan ml-1 animate-pulse" />
    </span>
  );
};

export default TypewriterText;
