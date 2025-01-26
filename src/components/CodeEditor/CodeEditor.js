import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { FiPlay, FiCheck, FiAlertCircle } from 'react-icons/fi';
import './CodeEditor.css';

const CodeEditor = ({ onCodeSubmit, initialLanguage = 'javascript', theme = 'vs-dark' }) => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState(initialLanguage);
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState('idle'); // idle, running, success, error

  const languages = [
    { id: 'javascript', name: 'JavaScript' },
    { id: 'python', name: 'Python' },
    { id: 'java', name: 'Java' },
    { id: 'cpp', name: 'C++' },
    { id: 'csharp', name: 'C#' }
  ];

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    setOutput('');
    setStatus('idle');
  };

  const handleEditorChange = (value) => {
    setCode(value);
    if (status !== 'idle') {
      setStatus('idle');
    }
  };

  const handleSubmit = async () => {
    setStatus('running');
    try {
      // Here you would typically send the code to a backend service for verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      const sampleOutput = `Code execution successful!\nLanguage: ${language}\nOutput: Program compiled successfully`;
      setOutput(sampleOutput);
      setStatus('success');
    } catch (error) {
      setOutput('Error executing code: ' + error.message);
      setStatus('error');
    }
  };

  const getRunButtonContent = () => {
    switch (status) {
      case 'running':
        return <>Running...</>;
      case 'success':
        return <><FiCheck /> Run Code</>;
      case 'error':
        return <><FiAlertCircle /> Run Code</>;
      default:
        return <><FiPlay /> Run Code</>;
    }
  };

  return (
    <div className="code-editor-container">
      <div className="editor-header">
        <select 
          value={language} 
          onChange={handleLanguageChange}
          className="language-selector"
        >
          {languages.map(lang => (
            <option key={lang.id} value={lang.id}>
              {lang.name}
            </option>
          ))}
        </select>
        <button 
          onClick={handleSubmit} 
          className={`run-button ${status}`}
          disabled={status === 'running' || !code.trim()}
        >
          {getRunButtonContent()}
        </button>
      </div>
      
      <div className="editor-wrapper">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={handleEditorChange}
          theme={theme}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            padding: { top: 16 },
            automaticLayout: true,
            scrollBeyondLastLine: false,
            lineNumbers: 'on',
            roundedSelection: true,
            renderLineHighlight: 'all',
          }}
        />
      </div>
      
      {output && (
        <div className="output-container">
          <h3>
            {status === 'success' && <FiCheck color="#4ade80" />}
            {status === 'error' && <FiAlertCircle color="#f87171" />}
            Output
          </h3>
          <pre className={`output ${status}`}>{output}</pre>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
