// ManageQuestions.tsx

import React, { useState, useEffect } from 'react';
import { fetchAllQuestions } from '../../../api/apiService';
import { QuestionWithId } from '../../../assets/types';

const ManageQuestions: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionWithId[]>([]);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const fetchedQuestions = await fetchAllQuestions();
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    loadQuestions();
  }, []);

  return (
    <div>
      <h1>Zarządzanie pytaniami</h1>
      <div>
        {questions.map(question => (
          <div key={question.id}>
            <p>Email: {question.email}</p>
            <p>Temat: {question.subject}</p>
            <p>Treść: {question.body}</p>
            {/* Możesz dodać więcej szczegółów lub akcji dla każdego pytania */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageQuestions;
