// ManageQuestions.tsx
import TextareaField from '../../molecules/textArea/TextareaField';
import React, { useState, useEffect } from 'react';
import { fetchAllQuestions, sendAnswer } from '../../../api/apiService';
import { QuestionWithId } from '../../../assets/types';
import { ManagementWrapper, Row, StyledButton } from '../../molecules/ManageAdmin/ManageAdmin.styles';

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
    <ManagementWrapper>
    <h1>Zarządzanie pytaniami</h1>
    {questions.map(question => (
      <Row key={question.id}>
        <p>Email: {question.email}</p>
        <p>Temat: {question.subject}</p>
        <p>Treść: {question.body}</p>
        <StyledButton onClick={() => setActiveQuestionId(question.id)}>Odpowiedz</StyledButton>
        {activeQuestionId === question.id && (
          <div>
            <TextareaField
              id={`answer-${question.id}`}
              labelText="Twoja odpowiedź"
              value={body}
              onChange={handleAnswerChange}
            />
            <StyledButton onClick={() => handleSendAnswer(question.id)}>Wyślij</StyledButton>
          </div>
        )}
      </Row>
    ))}
  </ManagementWrapper>
);
};

export default ManageQuestions;
