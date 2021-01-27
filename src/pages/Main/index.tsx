import React, { useState, useCallback, useEffect } from 'react';
import { RiMenu5Fill } from 'react-icons/ri';
import { MdAdd } from 'react-icons/md';
import Modal from '../../components/Modal';
import { Container } from './styles';
import MapContainer from '../../components/MapContainer';
import SideMenu from '../../components/SideBar';

import api from '../../services/api';

interface IEstablishment {
  id: string;
  created_at: Date;
  name: string;
  segment: string;
  lat: number;
  lng: number;
  adress: string;
  last_visit?: Date;
  next_visit?: Date;
  negociation_status: string;
  potential_tpv: number;
  visits_count: number;
}

const Main: React.FC = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [mapData, setMapData] = useState<IEstablishment[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<IEstablishment | null>(null);

  const changeSideBarStatus = useCallback(() => {
    setSideBarOpen(!sideBarOpen);
  }, [sideBarOpen]);

  const handleClickEstablishment = useCallback(
    (establishment_id) => {
      setModalOpen(true);
      const selected = mapData.filter(
        (item) => item.id === establishment_id
      )[0];
      setModalData(selected);
    },
    [mapData]
  );

  useEffect(() => {
    async function getData() {
      const response = await api.get<IEstablishment[]>('/establishment');
      setMapData(response.data);
    }
    getData();
  }, []);

  return (
    <Container>
      {sideBarOpen && <SideMenu onClose={changeSideBarStatus} />}
      <MapContainer data={mapData} onClickMarker={handleClickEstablishment} />
      <button
        className="sidemenu-button"
        type="button"
        onClick={changeSideBarStatus}
      >
        <RiMenu5Fill />
      </button>
      <button className="float-add-establishment" type="button">
        <MdAdd />
      </button>
      <Modal
        open={modalOpen}
        data={modalData}
        handleOpen={() => setModalOpen(!modalOpen)}
      />
    </Container>
  );
};

export default Main;
