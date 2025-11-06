import { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { CredentialApi } from '../api/endpoints';

export default function CredentialForm({ onAdded }: { onAdded: () => void }) {
  const [form, setForm] = useState({ sitename: '', username: '', password: '' });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await CredentialApi.add(form);
      setForm({ sitename: '', username: '', password: '' });
      onAdded();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        mt: 2,
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
        gap: 2,
        alignItems: 'center',
      }}
    >
      <TextField
        label="Site"
        fullWidth
        required
        value={form.sitename}
        onChange={(e) => setForm({ ...form, sitename: e.target.value })}
      />
      <TextField
        label="Username"
        fullWidth
        required
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        required
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <Box sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}>
        <Button variant="contained" type="submit" disabled={loading}>
          Add Credential
        </Button>
      </Box>
    </Box>
  );
}
