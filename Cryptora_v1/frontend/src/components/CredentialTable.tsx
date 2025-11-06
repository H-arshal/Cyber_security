import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, TextField, Box, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import { CredentialApi } from '../api/endpoints';
import type { CredentialResponse } from '../api/endpoints';

export default function CredentialTable() {
  const [keyword, setKeyword] = useState('');
  const [data, setData] = useState<CredentialResponse[]>([]);

  const search = async (value: string) => {
    setKeyword(value);
    const res = await CredentialApi.search(value || ' ');
    setData(res);
  };

  const copy = async (sitename: string) => {
    const res = await CredentialApi.getBySitename(sitename);
    await navigator.clipboard.writeText(res.decryptedPassword);
  };

  const del = async (sitename: string, siteUsername: string) => {
    await CredentialApi.remove(sitename, siteUsername);
    search(keyword);
  };

  return (
    <Box>
      <TextField label="Search" fullWidth sx={{ mb: 2 }} value={keyword} onChange={(e) => search(e.target.value)} />
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Site</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Password</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={`${row.sitename}-${row.username}`}>
              <TableCell>{row.sitename}</TableCell>
              <TableCell>{row.username}</TableCell>
              <TableCell>••••••••</TableCell>
              <TableCell align="right">
                <Tooltip title="Copy password">
                  <IconButton onClick={() => copy(row.sitename)} size="small"><ContentCopyIcon fontSize="small" /></IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton onClick={() => del(row.sitename, row.username)} size="small" color="error"><DeleteIcon fontSize="small" /></IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
