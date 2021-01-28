import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { AiOutlineCalendar } from 'react-icons/ai';
import { GiBackwardTime } from 'react-icons/gi';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { format } from 'date-fns';
import { TextField } from '@material-ui/core';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import Header from '../../components/Header';
import { Container } from './styles';
import api from '../../services/api';
import establishment_img from '../../assets/establishment_view.svg';
import Rating from '../../components/Rating';
import theme from '../../styles/themes';

interface IParams {
  establishment_id: string;
}

interface IEstablishment {
  name: string;
  adress: string;
  potential_tpv: number;
  segment: string;
  last_visit?: string;
  next_visit?: string;
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
  const [selectedDate, setSelectedDate] = useState<Date>();
  const { establishment_id } = useParams<IParams>();
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const handleMarkVisit = useCallback(async () => {
    if (selectedDate) {
      const response = await api.post(
        `/establishment/${establishment_id}/visit`,
        {
          date: selectedDate,
        }
      );
      if (response.status === 200) {
        toast('Visita marcada com sucesso', {
          position: 'top-right',
          type: 'success',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        history.push('/');
      } else {
        toast('Data inválida', {
          position: 'top-right',
          type: 'error',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  }, [selectedDate, history, establishment_id]);

  useEffect(() => {
    async function getData() {
      const response = await api.get<IEstablishment>(
        `/establishment/${establishment_id}`
      );
      if (response.status === 200) {
        setName(response.data.name);
        setAdress(response.data.adress);
        if (response.data.next_visit) {
          setNextVisit(format(Date.parse(response.data.next_visit), 'dd/MM'));
          const today_date = new Date();
          const visit = new Date(Date.parse(response.data.next_visit));
          if (
            today_date.getDay() === visit.getDay() &&
            today_date.getMonth() === visit.getMonth() &&
            today_date.getFullYear() === visit.getFullYear()
          ) {
            setHasVisitToday(true);
          }
        }
        if (response.data.last_visit) {
          setLastVisit(format(Date.parse(response.data.last_visit), 'dd/MM'));
        }
        setSegment(response.data.segment);
        if (response.data.transactions === 0) {
          const migration_percent = 0;
          setMigrationPercent(`${migration_percent.toPrecision(1) || 0}%`);
        } else {
          const migration_percent =
            (response.data.potential_tpv / response.data.transactions) * 100;
          setMigrationPercent(`${migration_percent.toPrecision(1) || 0}%`);
        }
        setLoading(false);
      }
    }
    getData();
  }, [establishment_id]);
  const handlePickDate = useCallback((date_input: string) => {
    const day = parseInt(date_input.split('-')[2], 10);
    const month = parseInt(date_input.split('-')[1], 10);
    const year = parseInt(date_input.split('-')[0], 10);
    const newDate = new Date();
    newDate.setDate(day);
    newDate.setMonth(month);
    newDate.setFullYear(year);
    setSelectedDate(newDate);
  }, []);
  return (
    <Container>
      {loading ? (
        <div className="loading">
          <ClipLoader size={150} color={theme.secondary} loading />
        </div>
      ) : (
        <>
          <Header headerTitle={name} headerImg={establishment_img} />
          <section className="content">
            <p className="adress">{adress}</p>
            <div className="satisfaction">
              <p>Satisfação do cliente</p>
              <Rating rating={rating} />
              {hasVisitToday ? (
                <p className="visitToday">
                  Você tem uma visita marcada para hoje
                </p>
              ) : (
                <p className="visitToday">
                  Você não tem uma visita marcada para hoje
                </p>
              )}
              <p />
            </div>
            <div className="infos">
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
          </section>

          {nextVisit === 'N/A' && (
            <>
              <div className="date-picker">
                <TextField
                  id="time"
                  type="date"
                  onChange={(e) => handlePickDate(e.target.value)}
                />
              </div>
              <button
                className="create-visit"
                type="button"
                onClick={handleMarkVisit}
              >
                Marcar visita
              </button>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default Clients;
