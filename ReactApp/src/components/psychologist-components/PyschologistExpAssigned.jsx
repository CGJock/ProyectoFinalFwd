import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useEffect,useState } from 'react';
import { user_fetch } from '../../services/user_fetch';
import { useAuth } from '../../context/AuthContext';
import { useParams } from 'react-router-dom';
import SelectInput from '@mui/material/Select/SelectInput';
import { useNavigate } from 'react-router-dom';
import UndoIcon from '@mui/icons-material/Undo';
import { Link } from 'react-router-dom';
import SessionInput from './Modals/DatePicker';
// Componente CustomTabPanel
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

// Función para accesibilidad
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// Componente principal BasicTabs
export default function BasicTabs() {


  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const { id_expedient } = useParams();
  const [DetailedData, setDetailedData] = useState(null);
  const apiExpedient = "http://localhost:8000/api/psychologist/expedient-detailed";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {formatDate} = useAuth()
  const navigate = useNavigate()

  const handleBackNavigation = () => {
    navigate('/profile/psychologist/psychologist-cases');
  };

  
  useEffect(() => {
    if (id_expedient) {
      const gestionar_data = async () => {
        try {
          setLoading(true); // Inicia la carga
          const data = await user_fetch(apiExpedient, id_expedient);
          setDetailedData(data);
        } catch (error) {
          console.error("Error al obtener los datos del expediente:", error);
          setError("Error al cargar los datos");
        } finally {
          setLoading(false); // Finaliza la carga
        }
      };
      gestionar_data();
    }
  }, [id_expedient]);

  if (loading) {
    return <p>Cargando...</p>; // Muestra un mensaje de carga
  }

  if (error) {
    return <p>{error}</p>; // Muestra un mensaje de error
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Informacion del Paciente:" {...a11yProps(0)} />
          <Tab label="Sesiones" {...a11yProps(1)} />
          <Tab label="Proxima Sesión" {...a11yProps(2)} />
          <Tab icon={<UndoIcon />} onClick={handleBackNavigation} {...a11yProps(3)} />

        </Tabs>
      </Box>
      <h3>Informacion Expediente {DetailedData.id_expedient}</h3>
      <CustomTabPanel value={value} index={0}>
        <div>
            <p>Nombre: {DetailedData.id_pacient.name} {DetailedData.id_pacient.first_name} {DetailedData.id_pacient.last_name}</p>
            <p>Nacimiento: {DetailedData.id_pacient.birth_date} </p>
            <p>Cedula: {DetailedData.id_pacient.Dni} </p>
            <p>Email: <a href={`mailto:${DetailedData.id_pacient.email}`}>{DetailedData.id_pacient.email}</a></p>
            <p>Gender: {DetailedData.id_pacient.sex} </p>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <div>
    {DetailedData.Sessions.map((session, index) => (
      <div key={session.id_session}>
        <p>Sesion: {index  + 1}</p>

        <p>Fecha agendada: {formatDate(session.session_date)}</p>
        <hr /> 
      </div>
    ))}
  </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <SessionInput  />
      </CustomTabPanel>

    </Box>
  );
}
