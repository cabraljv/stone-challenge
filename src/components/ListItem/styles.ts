import styled from 'styled-components';
import theme from '../../styles/themes';

export const Container = styled.div`
  width: 90%;
  margin: 20px auto;
  background: ${theme.white};
  border-radius: 1em;
  padding: 20px 40px;
  header {
    font-size: 1.3em;
  }
  div.content {
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-gap: 5px;
    div.left {
      margin-top: 20px;
      opacity: 0.7;
      font-size: 0.9em;
    }
    div.right {
      opacity: 0.7;
      p {
        padding: 3px 0;
        display: flex;
        align-items: center;
      }
    }
  }
`;
