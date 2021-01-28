import React from 'react';

import { RiMenu5Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { Container } from './styles';
import stone_icon from '../../assets/icons/stone.svg';

interface Props {
  onClose: () => void;
}

const SideBar: React.FC<Props> = ({ onClose }) => {
  return (
    <Container>
      <ul>
        <li>
          <button type="button" onClick={onClose}>
            <img src={stone_icon} alt="stone" />
            <RiMenu5Fill />
          </button>
        </li>
        <li>
          <Link to="/leads">Leads</Link>
        </li>
        <li>
          <Link to="/clients">Clientes</Link>
        </li>
      </ul>
    </Container>
  );
};

export default SideBar;
