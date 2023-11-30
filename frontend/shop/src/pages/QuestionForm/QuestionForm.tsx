// QuestionForm.tsx

import React, { useState } from 'react';
import { addQuestion } from '../../api/apiService';
import { Question } from '../../assets/types';
import FormField from '../../components/molecules/formField/FormField';
import Button from '../../components/atoms/Button/Button';
import { Wrapper } from '../login/Login.styles';
import { Label } from '../home/home.styles';
import TextareaField from '../../components/molecules/textArea/TextareaField';

const QuestionForm: React.FC = () => {
    const [question, setQuestion] = useState<Question>({ email: '', subject: '', body: '' });
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
          const response = await addQuestion(question.email, question.subject, question.body);
          console.log(response); // Możesz to zamienić na powiadomienie użytkownika
          // Resetowanie formularza
          setQuestion({ email: '', subject: '', body: '' });
          setIsSubmitted(true);
        } catch (error) {
          console.error('Failed to submit question:', error);
        }
      };

      return (
        <Wrapper onSubmit={handleSubmit}>
          <FormField
            id="email"
            labelText="Email"
            type="email"
            placeholder="Wprowadź email"
            value={question.email}
            onChange={(e) => setQuestion({ ...question, email: e.target.value })}
          />
          <FormField
        id="subject"
        labelText="Temat"
        type="text"
        placeholder="Wprowadź temat"
        value={question.subject}
        onChange={(e) => setQuestion({ ...question, subject: e.target.value })}
        
      />
      <TextareaField
        id="body"
        labelText="Treść"
        placeholder="Wprowadź treść pytania"
        value={question.body}
        onChange={(e) => setQuestion({ ...question, body: e.target.value })}
        
      />
          <Button type="submit">Wyślij</Button>
          {isSubmitted && <Label>Formularz wysłano!</Label>}
        </Wrapper>
      );
    };
    
    export default QuestionForm;
