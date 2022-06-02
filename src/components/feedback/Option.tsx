import {
  CreateQuestionRequestBody,
  ChoiceQuestionBody,
  CardsResponse,
  CardItem,
  Question,
} from '@parra/parra-js-sdk';
import { useState } from '@storybook/addons';
import React, { useMemo } from 'react';
import PoweredByParra from '../brand/PoweredByParra';

function ChoiceQuestionCard({ data }: { data: ChoiceQuestionBody }) {
  return (
    <div style={{ marginTop: 3 }}>
      {data?.options?.map((option, index) => {
        const title = option?.title ?? '';

        return (
          <div
            key={`option-${option.id}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: 4,
              margin: 3,
            }}
          >
            <img
              src="/img/forms/controls/radio.png"
              style={{ width: 24, height: 20 }}
            />
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

interface Props {
  cardsResponse: CardsResponse;
}

const ParraCardHeader = () => {
  return (
    <div>
      <div>{'<-'}</div>
      <div style={{ textAlign: 'center' }}>
        <PoweredByParra />
      </div>
      <div>{'->'}</div>
    </div>
  );
};

export default function ParraCardView({ cardsResponse }: Props) {
  const [currentItem, setCurrentItem] = useState<CardItem>(
    (cardsResponse.items ?? [])[0]
  );

  return (
    <div>
      <ParraCardHeader />

      {currentItem?.data && <QuestionCard question={currentItem.data} />}
    </div>
  );
}

const QuestionCard = ({ question }: { question: Question }) => {
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

      {question.data && <ChoiceQuestionCard data={question.data} />}
    </div>
  );
};
