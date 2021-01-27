import React, { useState, useCallback } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import header_illustration from '../../assets/create_establishment.svg';
import { Container, Select } from './styles';
import LocationPicker from '../../components/LocationPicker';
import api from '../../services/api';

const segmentos = [
  {
    value: 'Restaurante',
    label: 'Restaurante',
  },
  {
    value: 'Moda',
    label: 'Moda',
  },
  {
    value: 'Borracharia',
    label: 'Borracharia',
  },
  {
    value: 'Oficina',
    label: 'Oficina',
  },
];

interface ILocation {
  lat: number;
  lng: number;
}

const CreateEstablishment: React.FC = () => {
  const [name, setName] = useState('');
  const [segment, setSegment] = useState('');
  const [tpv, setTPV] = useState(0);
  const [location, setLocation] = useState<ILocation>();

  const history = useHistory();

  const handleSubmit = useCallback(async () => {
    if (name === '' || segment === '' || tpv === 0 || location === null) {
      toast('Preencha todos os campos corretamente', {
        position: 'top-right',
        type: 'error',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    try {
      const response = await api.post('/establishment', {
        name,
        segment,
        potential_tpv: tpv,
        lat: location?.lat,
        lng: location?.lng,
      });
      if (response.status === 201) {
        toast('Estabelecimento criado com sucesso', {
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
    } catch (error) {
      toast(error, {
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
  }, [name, segment, tpv, location, history]);
  return (
    <Container>
      <Header
        headerTitle="Cadastrar estabelecimento"
        headerImg={header_illustration}
      />
      <form>
        <label htmlFor="name">
          Nome do estabelecimento
          <input
            type="text"
            id="name"
            placeholder="Ex: Mc Donalds centro"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <div className="label">
          <span>SEGMENTO DO LOGISTA</span>
          <Select
            options={segmentos}
            onChange={(e: any) => setSegment(e?.value)}
          />
        </div>
        <div className="label">
          <span>TPV Potencial</span>
          <CurrencyInput
            id="input-example"
            name="input-name"
            placeholder="R$0,00"
            prefix="R$"
            decimalSeparator=","
            groupSeparator="."
            defaultValue={0}
            decimalsLimit={2}
            onValueChange={(e) => {
              const value = e?.replace(',', '.') || '0';
              setTPV(parseFloat(value));
            }}
          />
          ;
        </div>
        <div className="label">
          <span>Localização</span>
          <div className="location-picker">
            <LocationPicker onSelectLocation={(e) => setLocation(e)} />
          </div>
        </div>
        <button className="submit" type="button" onClick={handleSubmit}>
          CADASTRAR
        </button>
      </form>
    </Container>
  );
};

export default CreateEstablishment;
