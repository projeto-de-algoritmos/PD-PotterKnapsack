import * as React from 'react';
import { COLORS } from "../assets/consts/colors";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';

const CustomCard = styled(Card)(() => ({
    'img:hover': {
        opacity: 0,
        transition: "0.3s",
        cursor: "pointer"
      },
}));

export default function CustomizedCard(props) {
    const bgColor = props.isSelected ? COLORS.cardSelected : COLORS.card
    
    return <CustomCard {...props} sx={{ width: "fit-content" }}>
        <Box sx={{ position: 'absolute', display: 'flex', flexDirection: 'column', minWidth: 220, backgroundColor: bgColor, borderRadius: '10%' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="button">
                    {props.item.name}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" component="div">
                    Peso: {props.item.weight}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" component="div">
                    Proteção: {props.item.protection}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" component="div">
                    Ataque: {props.item.attack}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" component="div">
                    Mobilidadde: {props.item.mobility}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" component="div">
                    Furtividade: {props.item.stealth}
                </Typography>
            </CardContent>
        </Box>
        <CardMedia
            component="img"
            sx={{ position: 'absolute', width: 220, height: 180, objectFit: 'fill', borderRadius: '10%' }}
            image={require('../assets/imagens/' + props.item.name.toLowerCase() + '.png')}
            alt={props.item.name}
        />
    </CustomCard>

}