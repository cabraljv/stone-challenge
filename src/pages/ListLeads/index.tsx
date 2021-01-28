import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import list_img from '../../assets/list.svg';

import { Container } from './styles';
import ListItem from '../../components/ListItem';
import api from '../../services/api';

interface IEstablishment {
  _id: string;
  created_at: string;
  name: string;
  segment: string;
  adress: string;
  last_visit?: string;
  next_visit?: string;
  negociation_status: string;
  potential_tpv: number;
  visits_count: number;
}
const ListLeads: React.FC = () => {
  const [data, setData] = useState<IEstablishment[]>([]);

  useEffect(() => {
    async function getData() {
      const response = await api.get<IEstablishment[]>('/establishment');
      setData(response.data);
    }
    getData();
  }, []);
  return (
    <Container>
      <Header headerTitle="Leads" headerImg={list_img} />
      <section className="content">
        {data.map(
          (item) =>
            item.negociation_status !== 'CONCLUIDO' && (
              <ListItem data={item} key={item._id} />
            )
        )}
      </section>
    </Container>
  );
};

export default ListLeads;
