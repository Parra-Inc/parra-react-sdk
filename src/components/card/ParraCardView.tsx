import {
  ChoiceQuestionBody,
  CardsResponse,
  Question,
  CardItem,
} from '../../lib/api/ParraAPI';
import React, { useMemo, useState } from 'react';
import FeedbackNavigation from '../feedback/FeedbackNavigation';
import RadioOff from '../assets/svgs/RadioOff';
import RadioOn from '../assets/svgs/RadioOn';
import { useParraFeedback } from '../feedback/context';

export const EmptyView = () => {
  const title = "You're all caught up for now!";
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <p>{title}</p>
    </div>
  );
};

export const FinalView = ({
  onDismissClick,
}: {
  onDismissClick: () => void;
}) => {
  const title = 'Thank you for your feedback!';
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p>{title}</p>
        <button
          onClick={onDismissClick}
          style={{ backgroundColor: 'unset', border: 'unset', fontSize: 16 }}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

function ChoiceQuestionCard({
  data,
  answer,
  onAnswerSelected,
}: {
  data: ChoiceQuestionBody;
  answer?: any;
  onAnswerSelected: (data: any) => void;
}) {
  const options = data?.options || [];
  return (
    <div style={{ marginTop: 3 }}>
      {options.map((option, index) => {
        const title = option.title ?? '';
        const isCurrentAnswer = option.id === answer?.id;

        return (
          <div
            key={`option-${option.id}-${index}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: 4,
              margin: 3,
            }}
            onClick={() => {
              onAnswerSelected(option);
            }}
          >
            <div style={{ width: 24, height: 24 }}>
              {isCurrentAnswer ? <RadioOn /> : <RadioOff />}
            </div>
            <span
              style={{
                marginLeft: 8,
                fontSize: 14,
                fontWeight: 400,
                textAlign: 'left',
                overflowWrap: 'break-word',
              }}
            >
              {title}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export interface Props {
  cardsResponse: CardsResponse;
  onDismissClicked: () => void;
}

const CardContent = ({
  items,
  currentItem,
  onDismissClicked,
  onQuestionAnswered,
}: {
  items: CardItem[];
  currentItem?: CardItem | null;
  onDismissClicked: () => void;
  onQuestionAnswered: (id: string, data: any) => void;
}) => {
  if (!items.length) {
    return <EmptyView />;
  }

  if (!currentItem) {
    return <FinalView onDismissClick={onDismissClicked} />;
  }

  if (!currentItem.data) {
    throw new Error(`Item data is missing`);
  }

  switch (currentItem.type) {
    case 'question':
      return (
        <QuestionCard
          question={currentItem.data}
          onAnswerSelected={(data) =>
            onQuestionAnswered(currentItem.data!.id, data)
          }
        />
      );
    default:
      throw new Error(`Unknown item type: ${currentItem.type}`);
  }
};

export default function ParraCardView({
  cardsResponse,
  onDismissClicked,
}: Props) {
  const { answerQuestionById } = useParraFeedback();

  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const items = useMemo(() => cardsResponse.items ?? [], [cardsResponse.items]);

  const currentItem = useMemo(
    () => items[currentItemIndex],
    [currentItemIndex, items]
  );

  const hideNext = useMemo(
    () => currentItemIndex === items.length,
    [currentItemIndex, items.length]
  );
  const hidePrevious = useMemo(
    () => currentItemIndex === 0,
    [currentItemIndex]
  );
  const hideBrand = false;

  const goToNextQuestion = () => {
    if (currentItemIndex === items.length) {
      return;
    }

    setCurrentItemIndex(currentItemIndex + 1);
  };
  const goToPreviousQuestion = () => {
    if (currentItemIndex < 1) {
      return;
    }

    setCurrentItemIndex(currentItemIndex - 1);
  };

  const onQuestionAnswered = (id: string, data: any) => {
    answerQuestionById(id, data);
    setTimeout(() => {
      goToNextQuestion();
    }, 500);
  };

  return (
    <div
      style={{
        borderRadius: 12,
        backgroundColor: '#FAFAFA',
        paddingTop: 12,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 8,
        maxWidth: 320,
        flex: 1,
        width: 320,
        minHeight: 210,
        margin: 3,
      }}
    >
      <FeedbackNavigation
        hideNext={hideNext}
        hideBrand={hideBrand}
        hidePrevious={hidePrevious}
        onNextClicked={goToNextQuestion}
        onPreviousClicked={goToPreviousQuestion}
      />

      <CardContent
        items={items}
        currentItem={currentItem}
        onDismissClicked={onDismissClicked}
        onQuestionAnswered={onQuestionAnswered}
      />
    </div>
  );
}

const QuestionCard = ({
  question,
  onAnswerSelected,
}: {
  question: Question;
  onAnswerSelected: (data: any) => void;
}) => {
  const { answers } = useParraFeedback();
  const answer = useMemo(() => answers[question.id], [answers, question.id]);

  return (
    <div>
      <div
        style={{
          fontWeight: 500,
          fontSize: 18,
          color: '#000000',
          overflowWrap: 'break-word',
          margin: 3,
        }}
      >
        {question.title}
      </div>
      {question.subtitle && (
        <div
          style={{
            marginTop: 3,
            fontWeight: 300,
            fontSize: 12,
            overflowWrap: 'break-word',
          }}
        >
          {question.subtitle}
        </div>
      )}

      {question.data && (
        <ChoiceQuestionCard
          data={question.data as any}
          answer={answer}
          onAnswerSelected={onAnswerSelected}
        />
      )}
    </div>
  );
};
