import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineDoubleLeft, AiOutlineCalendar } from 'react-icons/ai';
import { GiBackwardTime } from 'react-icons/gi';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { format } from 'date-fns';
import Header from '../../components/Header';
import { Container } from './styles';
import api from '../../services/api';
import establishment_img from '../../assets/establishment_view.svg';
import Rating from '../../components/Rating';

interface IParams {
  establishment_id: string;
}

interface IEstablishment {
  name: string;
  adress: string;
  potential_tpv: number;
  segment: string;
  last_visit?: Date;
  next_visit?: Date;
  negociation_status: string;
  visits_count: number;
  commercial_proposal?: string;
  transactions: number;
}

const rating = 4;

const Clients: React.FC = () => {
  const [name, setName] = useState('');
  const [adress, setAdress] = useState('');
  const [nextVisit, setNextVisit] = useState('N/A');
  const [lastVisit, setLastVisit] = useState('N/A');
  const [segment, setSegment] = useState('N/A');
  const [migrationPercent, setMigrationPercent] = useState('0%');
  const [hasVisitToday, setHasVisitToday] = useState(false);

  const { establishment_id } = useParams<IParams>();

  useEffect(() => {
    async function getData() {
      const response = await api.get<IEstablishment>(
        `/establishment/${establishment_id}`
      );
      if (response.status === 200) {
        setName(response.data.name);
        setAdress(response.data.adress);
        if (response.data.next_visit) {
          setNextVisit(format(response.data.next_visit, 'DD/MM'));
          const today_date = new Date();
          if (
            today_date.getDay() === response.data.next_visit.getDay() &&
            today_date.getMonth() === response.data.next_visit.getMonth() &&
            today_date.getFullYear() === response.data.next_visit.getFullYear()
          ) {
            setHasVisitToday(true);
          }
        }
        if (response.data.last_visit) {
          setLastVisit(format(response.data.last_visit, 'DD/MM'));
        }
        setSegment(response.data.segment);
        const migration_percent =
          (response.data.potential_tpv / response.data.transactions) * 100;
        setMigrationPercent(`${migration_percent.toFixed(2)}%`);
      }
    }
    getData();
  }, [establishment_id]);
  return (
    <Container>
      <Header headerTitle={name} headerImg={establishment_img} />
      <p className="adress">{adress}</p>
      <div className="satisfaction">
        <p>Satisfação do cliente</p>
        <Rating rating={rating} />
        {hasVisitToday ? (
          <p className="visitToday">Você tem uma visita marcada para hoje</p>
        ) : (
          <p className="visitToday">
            Você não tem uma visita marcada para hoje
          </p>
        )}
        <p />
      </div>
      <div className="infos">
        <div className="left">
          <div className="left">
            <p>
              <GiBackwardTime />
              <span>{lastVisit}</span>
            </p>
            <p>
              <AiOutlineCalendar />
              <span>{nextVisit}</span>
            </p>
          </div>
          <div className="right">
            <p>{segment}</p>
            <p>
              <RiMoneyDollarCircleLine />
              <span>{migrationPercent} de migração</span>
            </p>
          </div>
        </div>
      </div>

      {nextVisit === 'N/A' && (
        <button className="create-visit" type="button">
          MARCAR VISITA
        </button>
      )}
    </Container>
  );
};

export default Clients;
