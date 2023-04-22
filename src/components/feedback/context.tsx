import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { BulkAnswerQuestionsBody } from '../../lib/api/ParraAPI';
import { useParra } from '../../parra';

type SubmittableAnswer = any & { submitted?: boolean };

type Answers = { [key: string]: SubmittableAnswer };

interface ParraFeedback {
  answers: Answers;
  answerQuestionById: (id: string, data: object) => void;
  sync: () => Promise<void>;
}

export const Context = createContext<ParraFeedback>(null as any);

export const useParraFeedback = () => useContext(Context);

interface Props { }

export const ParraFeedbackProvider: React.FC<PropsWithChildren<Props>> = ({
  children,
}) => {
  const { api } = useParra();

  const [answers, setAnswers] = useState<Answers>({});

  const sync = async () => {
    // We maintain a submitted flag so we dont't submit unnecessarily
    const answersToSubmit = Object.entries(answers)
      .filter(([, data]) => !data.submitted)

    const answersBody: BulkAnswerQuestionsBody = answersToSubmit
      .map(([questionId, data]) => {
        delete data.submitted;
        return { question_id: questionId, data: { option_id: data.id } };
      });

    if (!answersBody.length) {
      return;
    }

    await api.bulkAnswerQuestions(answersBody);

    const answersWithSubmitted = answersToSubmit.reduce((acc, [questionId, data]) => {
      acc[questionId] = { submitted: true, ...data };
      return acc;
    }, answers);

    setAnswers(answersWithSubmitted);
  };

  const answerQuestionById = (id: string, data: object) => {
    setAnswers((a) => ({ ...a, [id]: data }));
  };

  useEffect(() => {
    sync().catch(console.error);
  }, [answers]);

  return (
    <Context.Provider value={{ answers, sync, answerQuestionById }}>
      {children}
    </Context.Provider>
  );
};
