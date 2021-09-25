import Header from './components/Header';
import { Container } from '@mui/material';
import CarsTable from './components/CarsTable';
import OwnersTable from './components/OwnersTable';
import CarForm from './components/CarForm';
import OwnerForm from './components/OwnerForm';

function App() {
  return (
    <>
      <Header></Header>
      <Container>
        <OwnerForm></OwnerForm>
        <CarForm></CarForm>
        <CarsTable></CarsTable>
        <OwnersTable></OwnersTable>
      </Container>
    </>
  );
}

export default App;
