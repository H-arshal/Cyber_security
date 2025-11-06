import { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Paper } from '@mui/material';
import { AuthApi } from '../api/endpoints';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await AuthApi.login(form);
      localStorage.setItem('token', res.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>Sign in</Typography>
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
          {error && (
            <Typography color="error" variant="body2">{error}</Typography>
          )}
          <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">
            No account? <Link to="/register">Register</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
