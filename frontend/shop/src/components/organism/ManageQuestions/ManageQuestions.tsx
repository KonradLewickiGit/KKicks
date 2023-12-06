// ManageQuestions.tsx
import TextareaField from '../../molecules/textArea/TextareaField';
import React, { useState, useEffect } from 'react';
import { fetchAllQuestions, sendAnswer } from '../../../api/apiService';
import { QuestionWithId } from '../../../assets/types';

const ManageQuestions: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionWithId[]>([]);
  const [body, setAnswer] = useState('');
  const [activeQuestionId, setActiveQuestionId] = useState<number | null>(null);

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

  const handleAnswerChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(event.target.value);
  };
  
  const handleSendAnswer = async (questionId: number) => {
    try {
      await sendAnswer(questionId, { body });
      setAnswer('');
      setActiveQuestionId(null);
      alert('Wysłano odpowiedź'); // Wyświetl komunikat
    } catch (error) {
      console.error('Error sending answer:', error);
    }
  };
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
            <button onClick={() => setActiveQuestionId(question.id)}>Odpowiedz</button>
            {activeQuestionId === question.id && (
              <div>
                <TextareaField
                  id={`answer-${question.id}`}
                  labelText="Twoja odpowiedź"
                  value={body}
                  onChange={handleAnswerChange}
                />
                <button onClick={() => handleSendAnswer(question.id)}>Wyślij</button>
          </div>
           )}
           </div>
        ))}
      </div>
    </div>
  );
};

export default ManageQuestions;
