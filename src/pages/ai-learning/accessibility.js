import { useEffect, useRef, useState } from 'react';

// Text-to-Speech Utilities
export const useSpeechQueue = () => {
  const queue = useRef([]);
  const speaking = useRef(false);

  const speak = (text, options = {}) => {
    const utterance = new SpeechSynthesisUtterance(text);
    Object.assign(utterance, options);
    queue.current.push(utterance);
    processQueue();
  };

  const processQueue = () => {
    if (!speaking.current && queue.current.length > 0) {
      speaking.current = true;
      const utterance = queue.current.shift();
      utterance.onend = () => {
        speaking.current = false;
        processQueue();
      };
      window.speechSynthesis.speak(utterance);
    }
  };

  const cancel = () => {
    window.speechSynthesis.cancel();
    queue.current = [];
    speaking.current = false;
  };

  useEffect(() => {
    return () => cancel();
  }, []);

  return { speak, cancel };
};

// Visual Processing Utilities
export const processVisualContent = async (content, type) => {
  switch (type) {
    case 'diagram':
      return await generateDiagram(content);
    case 'infographic':
      return await generateInfographic(content);
    case 'mindmap':
      return await generateMindMap(content);
    default:
      return content;
  }
};

const generateDiagram = async (content) => {
  // Placeholder for diagram generation logic
  // This would integrate with a diagramming library like Mermaid.js
  return {
    type: 'diagram',
    data: content,
    format: 'svg'
  };
};

const generateInfographic = async (content) => {
  // Placeholder for infographic generation logic
  return {
    type: 'infographic',
    data: content,
    format: 'html'
  };
};

const generateMindMap = async (content) => {
  // Placeholder for mind map generation logic
  return {
    type: 'mindmap',
    data: content,
    format: 'svg'
  };
};

// Accessibility Settings Hook
export const useAccessibilitySettings = (initialSettings = {}) => {
  const defaultSettings = {
    textToSpeech: false,
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false,
    ...initialSettings
  };

  const [settings, setSettings] = useState(defaultSettings);

  const updateSettings = (newSettings) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings
    }));

    // Apply settings to document
    document.documentElement.style.setProperty(
      '--font-size-base', 
      settings.largeText ? '18px' : '16px'
    );
    
    document.documentElement.style.setProperty(
      '--contrast-multiplier',
      settings.highContrast ? '1.2' : '1'
    );

    if (settings.reducedMotion) {
      document.body.classList.add('reduced-motion');
    } else {
      document.body.classList.remove('reduced-motion');
    }
  };

  useEffect(() => {
    // Initialize settings
    updateSettings(settings);
  }, []);

  return [settings, updateSettings];
};

// Visual Processing Components
export const AccessibleImage = ({ src, alt, description }) => {
  const { speak } = useSpeechQueue();
  
  return (
    <div className="accessible-image">
      <img src={src} alt={alt} />
      <button 
        className="description-button"
        onClick={() => speak(description)}
        aria-label="Read image description"
      >
        📢
      </button>
      <div className="image-description" aria-hidden="true">
        {description}
      </div>
    </div>
  );
};

export const AccessibleDiagram = ({ data, description }) => {
  const { speak } = useSpeechQueue();
  
  return (
    <div className="accessible-diagram">
      <div className="diagram-container" dangerouslySetInnerHTML={{ __html: data }} />
      <button 
        className="description-button"
        onClick={() => speak(description)}
        aria-label="Read diagram description"
      >
        📢
      </button>
      <div className="diagram-description" aria-hidden="true">
        {description}
      </div>
    </div>
  );
};

// Keyboard Navigation
export const useKeyboardNavigation = (refs) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Tab') {
        const currentIndex = refs.findIndex(ref => ref.current === document.activeElement);
        if (currentIndex !== -1) {
          e.preventDefault();
          const nextIndex = e.shiftKey ? 
            (currentIndex - 1 + refs.length) % refs.length : 
            (currentIndex + 1) % refs.length;
          refs[nextIndex].current?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [refs]);
};
