import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Paper, CircularProgress, Alert } from '@mui/material';
import { RootState, AppDispatch } from './store/store';
import { setItems, setSelectedItem, setLoading, setError } from './store/itemsSlice';
import { itemsAPI } from './services/api';
import ItemList from './components/ItemList';
import ItemDetail from './components/ItemDetail';
import './App.css';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, selectedItem, loading, error } = useSelector(
    (state: RootState) => state.items
  );

  useEffect(() => {
    const fetchItems = async () => {
      dispatch(setLoading(true));
      try {
        const data = await itemsAPI.getItems();
        dispatch(setItems(data));
      } catch (err) {
        dispatch(
          setError(
            err instanceof Error ? err.message : 'Failed to fetch items'
          )
        );
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchItems();
  }, [dispatch]);


  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <h1>Items Display</h1>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ display: 'flex', height: '600px' }}>
        {/* Left side: Items table */}
        <Box sx={{ flex: '0 0 40%', overflowY: 'auto', borderRight: 1, borderColor: 'divider', p: 2 }}>
          <ItemList items={items} />
        </Box>

        {/* Right side: Item details */}
        <Box sx={{ flex: '1', overflow: 'auto', p: 2 }}>
          {selectedItem ? (
            <ItemDetail item={selectedItem} />
          ) : (
            <Box p={2}>Select an item to view details</Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default App;
