import React from 'react';
import LeftArrow from '../assets/svgs/LeftArrow';
import RightArrow from '../assets/svgs/RightArrow';
import PoweredByParra from '../brand/PoweredByParra';

export interface Props {
  onNextClicked: () => void;
  onPreviousClicked: () => void;
  hideNext?: boolean;
  hidePrevious?: boolean;
  hideBrand?: boolean;
}

const NextArrow = ({ onClick }: { onClick: () => void }) => {
  return (
    <div style={{ width: 24, height: 25 }} onClick={onClick}>
      <RightArrow />
    </div>
  );
};

const PreviousArrow = ({ onClick }: { onClick: () => void }) => {
  return (
    <div style={{ width: 24, height: 25 }} onClick={onClick}>
      <LeftArrow />
    </div>
  );
};

export default function FeedbackNavigation({
  onNextClicked,
  onPreviousClicked,
  hideNext,
  hidePrevious,
  hideBrand,
}: Props) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        width: '100%',
      }}
    >
      <div style={{ minWidth: 24 }}>
        {!hidePrevious && <PreviousArrow onClick={onPreviousClicked} />}
      </div>
      <div>{!hideBrand && <PoweredByParra />}</div>
      <div style={{ minWidth: 24 }}>
        {!hideNext && <NextArrow onClick={onNextClicked} />}
      </div>
    </div>
  );
}
