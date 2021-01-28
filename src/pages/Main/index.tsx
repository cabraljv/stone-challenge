import React, { useState, useCallback, useEffect } from 'react';
import { RiMenu5Fill } from 'react-icons/ri';
import { MdAdd } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import Modal from '../../components/Modal';
import { Container } from './styles';
import MapContainer from '../../components/MapContainer';
import SideMenu from '../../components/SideBar';

import api from '../../services/api';

interface IEstablishment {
  _id: string;
  created_at: string;
  name: string;
  segment: string;
  lat: number;
  lng: number;
  adress: string;
  last_visit?: string;
  next_visit?: string;
  negociation_status: string;
  potential_tpv: number;
  visits_count: number;
}

const Main: React.FC = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [mapData, setMapData] = useState<IEstablishment[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<IEstablishment | null>(null);
  const history = useHistory();

  const changeSideBarStatus = useCallback(() => {
    setSideBarOpen(!sideBarOpen);
  }, [sideBarOpen]);

  const handleClickEstablishment = useCallback(
    (establishment_id: string) => {
      setModalOpen(true);
      const selected = mapData.filter(
        (item) => item._id === establishment_id
      )[0];
      setModalData(selected);
    },
    [mapData]
  );

  const handleOpenModal = useCallback(() => {
    if (modalData) {
      setModalOpen(!modalOpen);
    }
  }, [modalOpen, modalData]);

  useEffect(() => {
    async function getData() {
      const response = await api.get<IEstablishment[]>('/establishment');
      setMapData(response.data);
    }
    getData();
  }, []);

  return (
    <Container open={modalOpen}>
      {sideBarOpen && <SideMenu onClose={changeSideBarStatus} />}
      <MapContainer data={mapData} onClickMarker={handleClickEstablishment} />
      <button
        className="sidemenu-button"
        type="button"
        onClick={changeSideBarStatus}
      >
        <RiMenu5Fill />
      </button>
      <button
        className="float-add-establishment"
        type="button"
        onClick={() => history.push('/establishment')}
      >
        <MdAdd />
      </button>
      <Modal open={modalOpen} data={modalData} handleOpen={handleOpenModal} />
    </Container>
  );
};

export default Main;
