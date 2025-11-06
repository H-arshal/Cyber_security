import { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Paper } from '@mui/material';
import { AuthApi } from '../api/endpoints';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      await AuthApi.register(form);
      setMessage('Registration successful. You can now login.');
      setTimeout(() => navigate('/login'), 800);
    } catch (err) {
      setMessage('Registration failed (username may already exist).');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>Create account</Typography>
        <Box component="form" onSubmit={onSubmit}>
          <TextField
            margin="normal"
            fullWidth
            required
            label="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <TextField
            margin="normal"
            fullWidth
            required
            type="password"
            label="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          {message && (
            <Typography color={message.includes('failed') ? 'error' : 'primary'} variant="body2">{message}</Typography>
          )}
          <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }} disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">
            Have an account? <Link to="/login">Login</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
