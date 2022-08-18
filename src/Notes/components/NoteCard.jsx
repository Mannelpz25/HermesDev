import React from 'react'
import { useMemo } from "react"
import { Delete, ExpandMore } from '@mui/icons-material'
import { Collapse, IconButton, Card, CardContent, Typography, CardActions, Button, CardHeader, CardActionArea } from '@mui/material'


export const NoteCard = ({title, body, color}) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const shortBody = useMemo( () => {        
        return body.length > 120
            ? body.substring(0,120) + '...'
            : body;
    },[body]);

  return (
    <Card sx={{ bgcolor: color, minHeight: 250, maxWidth: 275, m: 2 }}>
      
      <CardHeader
        action={
          <IconButton aria-label="Delete">
            <Delete />
          </IconButton>
        }
        title={title}
      />
      <CardActionArea       
      sx={{         
        minHeight: body.length > 120 ? 140 : 185,
        display: 'flex'
      }}>
      <CardContent sx={{px: 2, py: 1 ,  alignSelf: 'flex-start'}}>
        <Typography paragraph sx={{m: 0}}>
          {expanded ? body : shortBody}
        </Typography>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit/>    
      </CardActionArea>          
      <CardActions sx={{
        m: 0,
        display: body.length > 120 ? 'inline' : 'none',
        }}>
        <IconButton
            onClick={handleExpandClick}
            aria-label="show more"
            sx={{
                visibility: body.length > 120 ? 'visible' : 'hidden',
                transform: !expanded ? 'rotate(0deg)' : 'rotate(180deg)',
                marginLeft: 'auto'                
            }}
        >
          <ExpandMore />
        </IconButton>
      </CardActions> 
      
    </Card>
  );
};
