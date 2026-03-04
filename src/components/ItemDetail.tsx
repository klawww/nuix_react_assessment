import React, { useState } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Divider, Grid, Button, Tabs, Tab } from '@mui/material';
import { Item } from '@/types';
import { itemsAPI } from '@/services/api';
import './ItemDetail.css';

interface ItemDetailProps {
    item: Item;
}

const ItemDetail: React.FC<ItemDetailProps> = ({ item }) => {
    const [showAllProperties, setShowAllProperties] = useState(false);
    const [detailTab, setDetailTab] = useState(0);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setDetailTab(newValue);
    };

    return (
        <Box p={3} className="item-detail">
            <Typography variant="h4" gutterBottom>
                {item.name}
            </Typography>

            {/* Breadcrumb path */}
            {item.path && item.path.length > 0 && (
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    Path: {item.path.join(' / ')}
                </Typography>
            )}

            <Divider sx={{ my: 2 }} />

            {/* tabs for panel */}
            <Tabs value={detailTab} onChange={handleTabChange} sx={{ mb: 2 }}>
                <Tab label="Properties" />
                <Tab label="Image" />
            </Tabs>

            {detailTab === 0 ? (
                <Card variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>

                        {item.properties && Object.keys(item.properties).length > 0 ? (
                            <>
                                {Object.entries(item.properties)
                                    .slice(0, showAllProperties ? undefined : 2)
                                    .map(([key, value]) => (
                                        <Box key={key} mb={2}>
                                            <Typography color="textSecondary" gutterBottom>
                                                {key.charAt(0).toUpperCase() + key.slice(1)}
                                            </Typography>
                                            <Typography variant="body2">
                                                {Array.isArray(value) ? value.join(', ') : String(value)}
                                            </Typography>
                                        </Box>
                                    ))}

                                {Object.keys(item.properties).length > 2 && (
                                    <Box mt={2} mb={2}>
                                        <Button
                                            size="small"
                                            variant="text"
                                            onClick={() => setShowAllProperties(!showAllProperties)}
                                            sx={{ textTransform: 'none', p: 0 }}
                                        >
                                            {showAllProperties ? 'Show Less' : 'Show More'}
                                        </Button>
                                    </Box>
                                )}
                            </>
                        ) : (
                            <Typography variant="body2" color="textSecondary">
                                No properties available
                            </Typography>
                        )}
                    </CardContent>
                </Card>
            ) : (
                <Card>
                    <Box className="item-detail-image-container">
                        <CardMedia
                            component="img"
                            image={itemsAPI.getItemImage(item.guid)}
                            alt={item.name}
                            sx={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', p: 2 }}
                            onError={(e) => {
                                const img = e.target as HTMLImageElement;
                                if (!img.src.includes('placeholder')) {
                                    img.src = `http://localhost:8080/image/${item.guid}`;
                                } else {
                                    img.src = 'https://via.placeholder.com/300?text=No+Image';
                                }
                            }}
                        />
                    </Box>
                </Card>
            )}
        </Box>
    );
};

export default ItemDetail;
