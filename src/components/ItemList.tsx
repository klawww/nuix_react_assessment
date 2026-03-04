import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Item } from '@/types';
import { setSelectedItem } from '@/store/itemsSlice';
import { RootState } from '@/store/store';
import './ItemList.css';

interface ItemListProps {
  items: Item[];
}

const ItemList: React.FC<ItemListProps> = ({ items }) => {
  const dispatch = useDispatch();
  const selectedItem = useSelector((state: RootState) => state.items.selectedItem);

  const handleRowClick = (item: Item) => {
    dispatch(setSelectedItem(item));
  };

  return (
    <Box className="item-list">
      <TableContainer
        component={Paper}
        sx={{ maxHeight: 520, borderRadius: 2, boxShadow: 2 }}
      >
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: 'grey.100', fontWeight: 600, fontSize: '0.85rem' }}>GUID</TableCell>
              <TableCell sx={{ backgroundColor: 'grey.100', fontWeight: 600, fontSize: '0.85rem' }}>Name</TableCell>
              <TableCell sx={{ backgroundColor: 'grey.100', fontWeight: 600, fontSize: '0.85rem' }}>Path</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow
                key={item.guid}
                hover
                onClick={() => handleRowClick(item)}
                sx={{
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08) },
                  ...(selectedItem?.guid === item.guid
                    ? { bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16), borderLeft: (theme) => `4px solid ${theme.palette.primary.main}` }
                    : {}),
                }}
              >
                <TableCell sx={{ maxWidth: 220, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', px: 2, py: 1 }}>
                  <Tooltip title={item.guid} placement="top" arrow>
                    <Typography variant="body2" noWrap>{item.guid}</Typography>
                  </Tooltip>
                </TableCell>

                <TableCell sx={{ maxWidth: 220, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', px: 2, py: 1 }}>
                  <Tooltip title={item.name || ''} placement="top" arrow>
                    <Typography variant="body2" noWrap>{item.name}</Typography>
                  </Tooltip>
                </TableCell>

                <TableCell sx={{ maxWidth: 280, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', px: 2, py: 1 }}>
                  <Tooltip title={item.path?.join('/')} placement="top" arrow>
                    <Typography variant="body2" color="text.secondary" noWrap>{item.path?.join('/')}</Typography>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ItemList;
