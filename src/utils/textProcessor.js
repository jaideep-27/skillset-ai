// Utility functions to process and format text from language model responses

export const processLearningPathText = (text) => {
  if (!text) return '';
  
  // Remove hashtags
  let processed = text.replace(/#/g, '');
  
  // Convert asterisk emphasis to HTML
  processed = processed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  processed = processed.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Convert paragraphs (double newlines)
  processed = processed.replace(/\n\n/g, '</p><p>');
  processed = `<p>${processed}</p>`;
  
  return processed;
};

export const processChatResponse = (text) => {
  if (!text) return '';
  
  // Remove hashtags
  let processed = text.replace(/#/g, '');
  
  // Convert asterisk emphasis to HTML
  processed = processed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  processed = processed.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Convert newlines to <br> tags
  processed = processed.replace(/\n/g, '<br>');
  
  return processed;
};
