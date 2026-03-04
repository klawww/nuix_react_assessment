import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { Item } from '@/types';
import { setSelectedItem } from '@/store/itemsSlice';
import { itemsAPI } from '@/services/api';
import './ItemCard.css';

interface ItemCardProps {
  item: Item;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const dispatch = useDispatch();

  const handleViewDetails = () => {
    dispatch(setSelectedItem(item));
  };

  return (
    <Card className="item-card" sx={{ height: '90%', display: 'flex', flexDirection: 'column' }}>
      <Box className="item-card-image-container">
        <CardMedia
          component="img"
          image={itemsAPI.getItemImage(item.guid)}
          alt={item.name}
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            // Try backend API as fallback
            if (!img.src.includes('placeholder')) {
              img.src = `http://localhost:8080/image/${item.guid}`;
            } else {
              img.src = 'https://via.placeholder.com/150?text=No+Image';
            }
          }}
          sx={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', p: 1 }}
        />
      </Box>

      <CardHeader
        title={item.name}
        titleTypographyProps={{ variant: 'h6', noWrap: true }}
        subheader={
          item.guid
        }
      />

      <CardContent sx={{ flex: 1, overflow: 'hidden', pb: 4 }}> {/* add bottom padding so the button doesn't cover content */}
        {item.path && item.path.length > 0 && (
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            Path: {item.path.join(' / ')}
          </Typography>
        )}

      </CardContent>

      <CardActions>
        <Button size="small" onClick={handleViewDetails} variant="contained">
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default ItemCard;
