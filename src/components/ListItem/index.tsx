import React, { useCallback, useMemo } from 'react';

import { AiOutlineCalendar } from 'react-icons/ai';
import { GiBackwardTime } from 'react-icons/gi';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { format } from 'date-fns';
import { useHistory } from 'react-router-dom';
import { Container } from './styles';

interface IProps {
  data: {
    _id: string;
    name: string;
    adress: string;
    negociation_status: string;
    next_visit?: string;
    last_visit?: string;
    potential_tpv: number;
    segment: string;
  };
}

const ListItem: React.FC<IProps> = ({ data }) => {
  const history = useHistory();

  const next_date = useMemo(() => {
    if (data) {
      if (data.next_visit) {
        return format(Date.parse(data.next_visit), 'dd/MM');
      }
    }
    return 'N/A';
  }, [data]);

  const last_date = useMemo(() => {
    if (data) {
      if (data.last_visit) {
        return format(Date.parse(data.last_visit), 'dd/MM');
      }
    }
    return 'N/A';
  }, [data]);
  const tpv = useMemo(() => {
    if (data) {
      return (data.potential_tpv / 1000).toPrecision(2);
    }
    return 0;
  }, [data]);

  const handleClick = useCallback(() => {
    if (data.negociation_status === 'CONCLUIDO') {
      history.push(`/client/${data._id}`);
    } else {
      history.push(`/lead/${data._id}`);
    }
  }, [history, data]);

  return (
    <Container onClick={handleClick}>
      <header>
        <p>{data.name}</p>
      </header>
      <div className="content">
        <div className="left">
          <p className="adress">{data.adress}</p>
        </div>
        <div className="right">
          <p>
            <GiBackwardTime />
            <span>{last_date}</span>
          </p>
          <p>
            <AiOutlineCalendar />
            <span>{next_date}</span>
          </p>
          <p>{data.segment}</p>
          <p>
            <RiMoneyDollarCircleLine />
            <span>{tpv}k</span>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default ListItem;
