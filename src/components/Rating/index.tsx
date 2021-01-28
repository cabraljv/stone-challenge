import React from 'react';
import {
  MdSentimentDissatisfied,
  MdSentimentNeutral,
  MdSentimentSatisfied,
  MdSentimentVeryDissatisfied,
  MdSentimentVerySatisfied,
} from 'react-icons/md';
import theme from '../../styles/themes';

import { Container } from './styles';

interface IProps {
  rating: number;
}

const Rating: React.FC<IProps> = ({ rating }) => {
  return (
    <Container>
      <span>
        <MdSentimentVeryDissatisfied
          color={rating > 0 ? theme.primary : '#BDBDBD'}
        />
      </span>
      <span>
        <MdSentimentDissatisfied
          color={rating > 1 ? theme.primary : '#BDBDBD'}
        />
      </span>
      <span>
        <MdSentimentNeutral color={rating > 2 ? theme.primary : '#BDBDBD'} />
      </span>
      <span>
        <MdSentimentSatisfied color={rating > 3 ? theme.primary : '#BDBDBD'} />
      </span>
      <span>
        <MdSentimentVerySatisfied
          color={rating > 4 ? theme.primary : '#BDBDBD'}
        />
      </span>
    </Container>
  );
};

export default Rating;
