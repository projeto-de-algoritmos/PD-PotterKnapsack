import * as React from 'react';
import { COLORS } from "../assets/consts/colors";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export default function SelectedList(props) {

    const selectedItems = (items) => {
        return items.map(item => (
            <ListItem>
                <ListItemAvatar>
                    <Avatar src={require('../assets/imagens/' + item.name.toLowerCase() + '.png')} />
                </ListItemAvatar>
                <ListItemText
                    primary={item.name}
                    secondary={item.weight}
                    primaryTypographyProps={{
                        color: COLORS.defaultSelected,
                        fontSize: "14px"
                      }}
                />
            </ListItem>
        ))
    }

    const noItems = () => {
        return (<Typography align="center" variant="caption" component="div" color={COLORS.defaultSelected}>Nenhum item selecionado</Typography>)
    }


    return <List sx={{ width: "60%" }}>
        <Typography align="center" variant="h6" component="div" color={COLORS.defaultColor}>
            Itens Selecionados
        </Typography>
        {props.selectedItems.length > 0 ? selectedItems(props.selectedItems) : noItems()}
    </List>
}