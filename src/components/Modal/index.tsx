import React, { useMemo } from 'react';

import { AiOutlineDoubleLeft, AiOutlineCalendar } from 'react-icons/ai';
import { GiBackwardTime } from 'react-icons/gi';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { format } from 'date-fns';
import { Container } from './styles';

interface IProps {
  open: boolean;
  handleOpen: () => void;
  data: {
    id: string;
    name: string;
    segment: string;
    potential_tpv: number;
    adress: string;
    last_visit?: Date;
    next_visit?: Date;
    negociation_status: string;
  } | null;
}

const Modal: React.FC<IProps> = ({ open, handleOpen, data }) => {
  const tpv = useMemo(() => {
    if (data) {
      return (data.potential_tpv / 1000).toPrecision(2);
    }
    return 0;
  }, [data]);

  const next_date = useMemo(() => {
    if (data) {
      if (data.next_visit) {
        return format(data.next_visit, 'MM/DD');
      }
    }
    return 'N/A';
  }, [data]);

  const last_date = useMemo(() => {
    if (data) {
      if (data.last_visit) {
        return format(data.last_visit, 'MM/DD');
      }
    }
    return 'N/A';
  }, [data]);

  return (
    <Container open={open}>
      <header>
        <button type="button" onClick={handleOpen}>
          <AiOutlineDoubleLeft />
        </button>
      </header>
      {open && data && (
        <section>
          <div className="item-header">
            <p>{data.name}</p>
            <p>{data.adress}</p>
          </div>
          <div className="item-content">
            <div className="item-content-left">
              <p>
                <GiBackwardTime />
                <span>{last_date}</span>
              </p>
              <p>
                <AiOutlineCalendar />
                <span>{next_date}</span>
              </p>
            </div>
            <div className="item-content-right">
              <p>{data.segment}</p>
              <p>
                <RiMoneyDollarCircleLine />
                <span>{tpv}k</span>
              </p>
            </div>
          </div>
          <button className="more-info" type="button">
            {data.negociation_status === 'CONCLUIDO'
              ? 'Mais informações da loja'
              : 'Mais informações do lead'}
          </button>
        </section>
      )}
    </Container>
  );
};

export default Modal;
