import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import CredentialForm from '../components/CredentialForm';
import CredentialTable from '../components/CredentialTable';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Cryptora Vault</Typography>
          <Button color="inherit" onClick={logout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>Add Credential</Typography>
        <CredentialForm onAdded={() => { /* reloads happen via table search */ }} />
        <Typography variant="h5" sx={{ mt: 4 }} gutterBottom>Your Credentials</Typography>
        <CredentialTable />
      </Container>
    </Box>
  );
}
