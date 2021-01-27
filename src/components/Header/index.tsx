import React, { useCallback } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { useHistory } from 'react-router-dom';
import { Container } from './styles';

interface Props {
  headerTitle: string;
  headerImg: any;
}

const Header: React.FC<Props> = ({ headerTitle, headerImg }) => {
  const history = useHistory();
  const onGoBack = useCallback(() => {
    history.goBack();
  }, [history]);
  return (
    <Container>
      <header>
        <button type="button" onClick={onGoBack}>
          <IoMdArrowBack />
        </button>
      </header>
      <div>
        <h1>{headerTitle}</h1>
        <img src={headerImg} alt="illustration" />
      </div>
    </Container>
  );
};

export default Header;
