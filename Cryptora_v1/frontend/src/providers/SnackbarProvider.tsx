import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { Alert, Snackbar } from '@mui/material';

type SnackbarState = { open: boolean; message: string; severity: 'success' | 'error' | 'info' | 'warning' };

type SnackbarContextType = {
  showMessage: (message: string, severity?: SnackbarState['severity']) => void;
};

const SnackbarContext = createContext<SnackbarContextType | null>(null);

export function useSnackbar() {
  const ctx = useContext(SnackbarContext);
  if (!ctx) throw new Error('useSnackbar must be used within SnackbarProvider');
  return ctx;
}

export default function SnackbarProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SnackbarState>({ open: false, message: '', severity: 'info' });

  const showMessage = useCallback((message: string, severity: SnackbarState['severity'] = 'info') => {
    setState({ open: true, message, severity });
  }, []);

  const handleClose = useCallback(() => setState((s) => ({ ...s, open: false })), []);

  const value = useMemo(() => ({ showMessage }), [showMessage]);

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar open={state.open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity={state.severity} variant="filled" sx={{ width: '100%' }}>
          {state.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}
