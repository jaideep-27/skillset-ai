import React, { useState } from 'react';
import './DSAQuiz.css';

const QUIZZES = {
  sorting: {
    title: "Sorting Algorithms",
    description: "Test your knowledge of sorting algorithms and their complexities",
    questions: [
      {
        id: 1,
        question: "What is the time complexity of Bubble Sort in the worst case?",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"],
        correctAnswer: 2,
        explanation: "Bubble Sort has a worst-case time complexity of O(n²) because it uses nested loops to compare and swap adjacent elements."
      },
      {
        id: 2,
        question: "Which sorting algorithm is generally considered the fastest for small datasets?",
        options: ["Merge Sort", "Quick Sort", "Insertion Sort", "Heap Sort"],
        correctAnswer: 2,
        explanation: "Insertion Sort performs well on small datasets due to its low overhead and adaptive nature."
      },
      {
        id: 3,
        question: "What is the space complexity of Merge Sort?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correctAnswer: 2,
        explanation: "Merge Sort requires additional space proportional to the input size to merge the sorted subarrays."
      }
    ]
  },
  bst: {
    title: "Binary Search Trees",
    description: "Challenge yourself with Binary Search Tree concepts",
    questions: [
      {
        id: 1,
        question: "What is the time complexity of searching in a balanced BST?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correctAnswer: 1,
        explanation: "In a balanced BST, each comparison eliminates half of the remaining nodes, resulting in O(log n) time complexity."
      },
      {
        id: 2,
        question: "Which traversal visits the root node between its left and right subtrees?",
        options: ["Preorder", "Inorder", "Postorder", "Level Order"],
        correctAnswer: 1,
        explanation: "Inorder traversal visits nodes in the order: left subtree → root → right subtree."
      },
      {
        id: 3,
        question: "What makes a binary tree a Binary Search Tree?",
        options: [
          "All nodes must have exactly two children",
          "The tree must be perfectly balanced",
          "Left subtree values < node value < right subtree values",
          "The tree must have a maximum height of log n"
        ],
        correctAnswer: 2,
        explanation: "A BST maintains the property that all values in the left subtree are less than the node's value, and all values in the right subtree are greater."
      }
    ]
  },
  pathfinding: {
    title: "Pathfinding Algorithms",
    description: "Test your understanding of graph traversal and pathfinding",
    questions: [
      {
        id: 1,
        question: "Which algorithm is guaranteed to find the shortest path in an unweighted graph?",
        options: ["Depth-First Search", "Breadth-First Search", "A* Search", "Greedy Best-First Search"],
        correctAnswer: 1,
        explanation: "BFS explores all nodes at the current depth before moving to nodes at the next depth level, ensuring the shortest path in unweighted graphs."
      },
      {
        id: 2,
        question: "What is the main advantage of A* over Dijkstra's algorithm?",
        options: [
          "A* uses less memory",
          "A* is always faster",
          "A* uses heuristics to guide the search",
          "A* works with negative weights"
        ],
        correctAnswer: 2,
        explanation: "A* uses a heuristic function to estimate the distance to the goal, which can significantly reduce the number of nodes explored."
      },
      {
        id: 3,
        question: "When is Dijkstra's algorithm not suitable?",
        options: [
          "With weighted graphs",
          "With negative edge weights",
          "With unweighted graphs",
          "With directed graphs"
        ],
        correctAnswer: 1,
        explanation: "Dijkstra's algorithm can fail with negative edge weights as it assumes that adding an edge to a path can never decrease its total weight."
      }
    ]
  },
  dp: {
    title: "Dynamic Programming",
    description: "Master the art of solving complex problems using Dynamic Programming",
    questions: [
      {
        id: 1,
        question: "What are the key components of Dynamic Programming?",
        options: [
          "Optimal Substructure and Overlapping Subproblems",
          "Divide and Conquer and Recursion",
          "Greedy Choice and Local Optimum",
          "Backtracking and Branch & Bound"
        ],
        correctAnswer: 0,
        explanation: "Dynamic Programming relies on problems having optimal substructure (optimal solution built from optimal subsolutions) and overlapping subproblems (same subproblems solved multiple times)."
      },
      {
        id: 2,
        question: "Which problem is NOT typically solved using Dynamic Programming?",
        options: [
          "Longest Common Subsequence",
          "Finding Prime Numbers",
          "Knapsack Problem",
          "Matrix Chain Multiplication"
        ],
        correctAnswer: 1,
        explanation: "Finding prime numbers is not a DP problem as it doesn't have overlapping subproblems or optimal substructure. It's typically solved using sieve methods."
      },
      {
        id: 3,
        question: "What is memoization in Dynamic Programming?",
        options: [
          "A way to sort arrays efficiently",
          "Storing results of expensive function calls",
          "A method to reduce space complexity",
          "A technique for graph traversal"
        ],
        correctAnswer: 1,
        explanation: "Memoization is an optimization technique where we store the results of expensive function calls and return the cached result when the same inputs occur again."
      }
    ]
  },
  heap: {
    title: "Heaps and Priority Queues",
    description: "Learn about heap data structure and its applications",
    questions: [
      {
        id: 1,
        question: "What is the time complexity of inserting an element into a binary heap?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correctAnswer: 1,
        explanation: "Insertion in a binary heap takes O(log n) time as we might need to bubble up the element to maintain the heap property."
      },
      {
        id: 2,
        question: "Which operation in a max heap returns the largest element?",
        options: ["insert()", "extractMax()", "delete()", "search()"],
        correctAnswer: 1,
        explanation: "extractMax() removes and returns the root element, which is the largest element in a max heap."
      },
      {
        id: 3,
        question: "What is the space complexity of a binary heap?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correctAnswer: 2,
        explanation: "A binary heap requires O(n) space to store n elements in an array-based implementation."
      }
    ]
  },
  string: {
    title: "String Algorithms",
    description: "Explore pattern matching and string manipulation algorithms",
    questions: [
      {
        id: 1,
        question: "What is the time complexity of KMP pattern matching algorithm?",
        options: ["O(n)", "O(m+n)", "O(m*n)", "O(n log n)"],
        correctAnswer: 1,
        explanation: "KMP algorithm has O(m+n) complexity where m is pattern length and n is text length, as it avoids unnecessary comparisons using a prefix function."
      },
      {
        id: 2,
        question: "Which data structure is most efficient for implementing a trie?",
        options: ["Array", "Linked List", "Hash Map", "Binary Tree"],
        correctAnswer: 2,
        explanation: "Hash Map is most efficient for trie nodes as it provides O(1) access to child nodes and can handle variable number of children."
      },
      {
        id: 3,
        question: "What is the main advantage of Rabin-Karp over naive pattern matching?",
        options: [
          "It uses less memory",
          "It can find multiple patterns simultaneously",
          "It has better worst-case complexity",
          "It works with binary strings only"
        ],
        correctAnswer: 1,
        explanation: "Rabin-Karp can find multiple patterns simultaneously using rolling hash functions, making it efficient for multiple pattern matching."
      }
    ]
  }
};

const DSAQuiz = () => {
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);
  const [showTopics, setShowTopics] = useState(true);

  const startQuiz = (topic) => {
    setCurrentQuiz(QUIZZES[topic]);
    setCurrentQuestion(0);
    setScore(0);
    setQuizComplete(false);
    setShowTopics(false);
  };

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === currentQuiz.questions[currentQuestion].correctAnswer;
    if (correct) setScore(score + 1);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < currentQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
    }
  };

  const restartQuiz = () => {
    setShowTopics(true);
    setCurrentQuiz(null);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setQuizComplete(false);
  };

  if (showTopics) {
    return (
      <div className="dsa-quiz">
        <h1>DSA Quiz Challenge</h1>
        <p className="description">Test your knowledge of Data Structures and Algorithms</p>
        
        <div className="quiz-topics">
          {Object.entries(QUIZZES).map(([key, quiz]) => (
            <div key={key} className="quiz-topic-card" onClick={() => startQuiz(key)}>
              <h3>{quiz.title}</h3>
              <p>{quiz.description}</p>
              <span className="questions-count">
                {quiz.questions.length} Questions
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (quizComplete) {
    return (
      <div className="dsa-quiz">
        <div className="quiz-complete">
          <h2>Quiz Complete!</h2>
          <div className="score-display">
            <div className="score">
              {score}/{currentQuiz.questions.length}
            </div>
            <p>Correct Answers</p>
          </div>
          <p className="performance-message">
            {score === currentQuiz.questions.length
              ? "Perfect! You're a DSA master! 🎉"
              : score > currentQuiz.questions.length / 2
              ? "Good job! Keep practicing! 👍"
              : "Keep learning and try again! 💪"}
          </p>
          <button onClick={restartQuiz}>Try Another Quiz</button>
        </div>
      </div>
    );
  }

  const question = currentQuiz.questions[currentQuestion];

  return (
    <div className="dsa-quiz">
      <div className="quiz-header">
        <h2>{currentQuiz.title}</h2>
        <div className="quiz-progress">
          Question {currentQuestion + 1} of {currentQuiz.questions.length}
        </div>
      </div>

      <div className="question-card">
        <h3>{question.question}</h3>
        
        <div className="options">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${
                selectedAnswer === index
                  ? index === question.correctAnswer
                    ? 'correct'
                    : 'incorrect'
                  : ''
              } ${selectedAnswer !== null ? 'disabled' : ''}`}
              onClick={() => handleAnswer(index)}
              disabled={selectedAnswer !== null}
            >
              {option}
            </button>
          ))}
        </div>

        {showExplanation && (
          <div className="explanation">
            <h4>
              {selectedAnswer === question.correctAnswer
                ? "Correct! 🎉"
                : "Incorrect 😕"}
            </h4>
            <p>{question.explanation}</p>
            <button onClick={nextQuestion}>
              {currentQuestion < currentQuiz.questions.length - 1
                ? "Next Question"
                : "Complete Quiz"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DSAQuiz;
