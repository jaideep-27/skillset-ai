import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpeechQueue } from '../accessibility';

export const AccessibleImage = ({ src, alt, description, isHighContrast }) => {
  const { speak } = useSpeechQueue();

  return (
    <div className="accessible-image">
      <img 
        src={src} 
        alt={alt}
        className={isHighContrast ? 'high-contrast' : ''}
        loading="lazy"
      />
      <button
        className="description-button"
        onClick={() => speak(description)}
        aria-label="Read image description"
      >
        <span className="sr-only">Read description</span>
        <i className="fas fa-volume-up" aria-hidden="true" />
      </button>
      <div className="image-description sr-only">
        {description}
      </div>
    </div>
  );
};

export const AccessibleDiagram = ({ data, description, isInteractive, hasAudioDescription }) => {
  const { speak } = useSpeechQueue();

  return (
    <div className="accessible-diagram">
      <div 
        className="diagram-container"
        dangerouslySetInnerHTML={{ __html: data }}
        role="img"
        aria-label={description}
      />
      {hasAudioDescription && (
        <button
          className="description-button"
          onClick={() => speak(description)}
          aria-label="Read diagram description"
        >
          <span className="sr-only">Read description</span>
          <i className="fas fa-volume-up" aria-hidden="true" />
        </button>
      )}
      {isInteractive && (
        <div className="diagram-controls" role="toolbar">
          <button aria-label="Zoom in">+</button>
          <button aria-label="Zoom out">-</button>
          <button aria-label="Reset view">↺</button>
        </div>
      )}
    </div>
  );
};

export const AccessibleAnimation = ({ 
  data, 
  description, 
  isInteractive, 
  hasAudioDescription,
  reducedMotion 
}) => {
  const { speak } = useSpeechQueue();
  const [isPlaying, setIsPlaying] = React.useState(!reducedMotion);

  return (
    <div className="accessible-animation">
      <motion.div
        className="animation-container"
        animate={isPlaying ? data.animation : "paused"}
        transition={{ duration: reducedMotion ? 0 : data.duration }}
      >
        {data.content}
      </motion.div>
      <div className="animation-controls">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? "Pause animation" : "Play animation"}
        >
          <i className={`fas fa-${isPlaying ? 'pause' : 'play'}`} aria-hidden="true" />
        </button>
        {hasAudioDescription && (
          <button
            onClick={() => speak(description)}
            aria-label="Read animation description"
          >
            <i className="fas fa-volume-up" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
};

export const AccessibleMindMap = ({
  data,
  image,
  format,
  description,
  isInteractive,
  hasAudioDescription,
  highContrast
}) => {
  const { speak } = useSpeechQueue();
  const [selectedNode, setSelectedNode] = React.useState(null);

  const handleNodeClick = (node) => {
    setSelectedNode(node);
    if (hasAudioDescription) {
      speak(node.description);
    }
  };

  return (
    <div className="accessible-mind-map">
      <div className={`mind-map-container ${highContrast ? 'high-contrast' : ''}`}>
        {format === 'png' ? (
          <img src={`data:image/png;base64,${image}`} alt={description} />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: image }} />
        )}
        {isInteractive && data.map((node, index) => (
          <motion.button
            key={index}
            className={`mind-map-node ${selectedNode === node ? 'selected' : ''}`}
            onClick={() => handleNodeClick(node)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={node.title}
          >
            {node.title}
          </motion.button>
        ))}
      </div>
      {selectedNode && (
        <div className="node-details" role="region" aria-live="polite">
          <h3>{selectedNode.title}</h3>
          <p>{selectedNode.description}</p>
        </div>
      )}
    </div>
  );
};

export const AudioSegment = ({
  audio,
  transcript,
  visualIndicators,
  hasVisualFeedback
}) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = React.useRef(null);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="audio-segment">
      <audio
        ref={audioRef}
        src={audio}
        onEnded={() => setIsPlaying(false)}
      />
      <div className="audio-controls">
        <button
          onClick={handlePlayPause}
          aria-label={isPlaying ? "Pause audio" : "Play audio"}
        >
          <i className={`fas fa-${isPlaying ? 'pause' : 'play'}`} aria-hidden="true" />
        </button>
        {visualIndicators && (
          <div className="visual-indicator" aria-hidden="true">
            <motion.div
              animate={isPlaying ? "playing" : "paused"}
              variants={{
                playing: { scale: [1, 1.2, 1], transition: { repeat: Infinity } },
                paused: { scale: 1 }
              }}
            />
          </div>
        )}
      </div>
      {hasVisualFeedback && (
        <div className="transcript" aria-live="polite">
          {transcript}
        </div>
      )}
    </div>
  );
};

export const InteractiveSimulation = ({
  simulation,
  adaptiveControls,
  audioFeedback,
  visualFeedback
}) => {
  const { speak } = useSpeechQueue();
  const [step, setStep] = React.useState(0);

  const handleNext = () => {
    if (step < simulation.steps.length - 1) {
      setStep(step + 1);
      if (audioFeedback) {
        speak(simulation.steps[step + 1].description);
      }
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
      if (audioFeedback) {
        speak(simulation.steps[step - 1].description);
      }
    }
  };

  return (
    <div className="interactive-simulation">
      <div className="simulation-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="simulation-step"
          >
            {simulation.steps[step].content}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="simulation-controls" role="toolbar">
        <button
          onClick={handlePrevious}
          disabled={step === 0}
          aria-label="Previous step"
        >
          Previous
        </button>
        <div className="step-indicator">
          Step {step + 1} of {simulation.steps.length}
        </div>
        <button
          onClick={handleNext}
          disabled={step === simulation.steps.length - 1}
          aria-label="Next step"
        >
          Next
        </button>
      </div>
      {visualFeedback && (
        <div className="visual-feedback" aria-live="polite">
          {simulation.steps[step].feedback}
        </div>
      )}
    </div>
  );
};

export const RealWorldTask = ({
  task,
  adaptiveInstructions,
  progressTracking,
  audioFeedback,
  visualFeedback,
  multiModalSupport
}) => {
  const { speak } = useSpeechQueue();
  const [progress, setProgress] = React.useState(0);
  const [currentStep, setCurrentStep] = React.useState(0);

  const handleStepComplete = () => {
    if (currentStep < task.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setProgress((currentStep + 1) / task.steps.length * 100);
      
      if (audioFeedback) {
        speak(`Step ${currentStep + 2}: ${task.steps[currentStep + 1].instruction}`);
      }
    }
  };

  return (
    <div className="real-world-task">
      <h3>{task.title}</h3>
      {progressTracking && (
        <div className="progress-bar" role="progressbar" aria-valuenow={progress}>
          <div className="progress" style={{ width: `${progress}%` }} />
        </div>
      )}
      <div className="task-content">
        <div className="current-step">
          <h4>Step {currentStep + 1}</h4>
          {adaptiveInstructions ? (
            <div className="adaptive-instructions">
              {multiModalSupport && (
                <button onClick={() => speak(task.steps[currentStep].instruction)}>
                  <i className="fas fa-volume-up" aria-hidden="true" />
                </button>
              )}
              <div className="instruction-text">
                {task.steps[currentStep].instruction}
              </div>
              {task.steps[currentStep].visualAid && (
                <img
                  src={task.steps[currentStep].visualAid}
                  alt={task.steps[currentStep].visualAidDescription}
                />
              )}
            </div>
          ) : (
            <p>{task.steps[currentStep].instruction}</p>
          )}
        </div>
        <button
          onClick={handleStepComplete}
          disabled={currentStep === task.steps.length - 1}
          className="complete-step-button"
        >
          Complete Step
        </button>
      </div>
      {visualFeedback && task.steps[currentStep].feedback && (
        <div className="step-feedback" aria-live="polite">
          {task.steps[currentStep].feedback}
        </div>
      )}
    </div>
  );
};
