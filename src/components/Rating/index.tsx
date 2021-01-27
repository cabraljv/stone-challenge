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
          color={rating > 0 ? '#BDBDBD' : theme.primary}
        />
      </span>
      <span>
        <MdSentimentDissatisfied
          color={rating > 1 ? '#BDBDBD' : theme.primary}
        />
      </span>
      <span>
        <MdSentimentNeutral color={rating > 2 ? '#BDBDBD' : theme.primary} />
      </span>
      <span>
        <MdSentimentSatisfied color={rating > 3 ? '#BDBDBD' : theme.primary} />
      </span>
      <span>
        <MdSentimentVerySatisfied
          color={rating > 4 ? '#BDBDBD' : theme.primary}
        />
      </span>
    </Container>
  );
};

export default Rating;
