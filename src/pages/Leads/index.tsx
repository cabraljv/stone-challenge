import React, { useCallback, useEffect, useState } from 'react';
import { format } from 'date-fns';

import { useParams, useHistory } from 'react-router-dom';
import { AiOutlineCalendar } from 'react-icons/ai';
import { GiBackwardTime } from 'react-icons/gi';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';

import { FaSuitcase, FaWalking } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { TextField } from '@material-ui/core';
import Header from '../../components/Header';
import { Container } from './styles';
import api from '../../services/api';
import establishment_img from '../../assets/establishment_view.svg';

interface IParams {
  establishment_id: string;
}

interface IEstablishment {
  _id: string;
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

const Leads: React.FC = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [adress, setAdress] = useState('');
  const [nextVisit, setNextVisit] = useState('N/A');
  const [lastVisit, setLastVisit] = useState('N/A');
  const [segment, setSegment] = useState('N/A');
  const [tpv, setTPV] = useState('0');
  const [hasVisitToday, setHasVisitToday] = useState(false);
  const [visitsCount, setVisitsCount] = useState(0);
  const [negociationStatus, setNegociationStatus] = useState('N/A');
  const [proposte, setProposte] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>();

  const history = useHistory();

  const handleMarkVisit = useCallback(async () => {
    if (selectedDate) {
      const response = await api.post(`/establishment/${id}/visit`, {
        date: selectedDate,
      });
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
  }, [selectedDate, history, id]);

  const handleSubmit = useCallback(async () => {
    if (proposte.length > 10) {
      const response = await api.post(`/establishment/${id}/proposte`, {
        proposte,
      });

      if (response.status === 200) {
        toast('Proposta enviada com sucesso', {
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
      }
    } else {
      toast('Proposta inválida', {
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
  }, [proposte, history, id]);

  const { establishment_id } = useParams<IParams>();

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

  useEffect(() => {
    async function getData() {
      const response = await api.get<IEstablishment>(
        `/establishment/${establishment_id}`
      );
      if (response.status === 200) {
        setName(response.data.name);
        setAdress(response.data.adress);
        if (response.data.next_visit) {
          const visit = new Date(Date.parse(response.data.next_visit));
          setNextVisit(format(visit, 'dd/MM'));
          const today_date = new Date();
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
        const potential_tpv = (response.data.potential_tpv / 1000).toPrecision(
          2
        );
        setNegociationStatus(response.data.negociation_status);
        setTPV(potential_tpv);
        setVisitsCount(response.data.visits_count);
        setId(response.data._id);
      }
    }
    getData();
  }, [establishment_id]);
  return (
    <Container>
      <Header headerTitle={name} headerImg={establishment_img} />

      <section className="content">
        <p className="adress">{adress}</p>
        <div className="visit">
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
            <p>
              <GiBackwardTime />
              <span>{lastVisit}</span>
            </p>
            <p>
              <AiOutlineCalendar />
              <span>{nextVisit}</span>
            </p>
            <p>
              <FaSuitcase />
              <span>{negociationStatus}</span>
            </p>
          </div>
          <div className="right">
            <p>{segment}</p>
            <p>
              <RiMoneyDollarCircleLine />
              <span>{tpv}k em potencial</span>
            </p>
            <p>
              <FaWalking />
              <span>{visitsCount}</span>
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
      {negociationStatus === 'FRIA' && (
        <>
          <div className="proposte">
            <p className="label-proposte">Proposta</p>
            <textarea
              className="proposte"
              onChange={(e) => setProposte(e.target.value)}
            />
          </div>
          <button
            className="create-proposte"
            type="button"
            onClick={handleSubmit}
          >
            Enviar proposta
          </button>
        </>
      )}
    </Container>
  );
};

export default Leads;
