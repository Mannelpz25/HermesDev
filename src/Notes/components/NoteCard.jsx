import React from 'react'
import { useMemo } from "react"
import { Delete, ExpandMore } from '@mui/icons-material'
import { Collapse, IconButton, Card, CardContent, Typography, CardActions, Button, CardHeader } from '@mui/material'


export const NoteCard = ({title, body}) => {
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
    <Card sx={{ bgcolor: "gray", minHeight: 250, maxWidth: 275, m: 2 }}>
      <CardHeader
        action={
          <IconButton aria-label="Delete">
            <Delete />
          </IconButton>
        }
        title={title}
      />
      <CardContent sx={{px: 2, py: 0  }}>
        <Typography paragraph sx={{m: 0}}>
          {expanded ? body : shortBody}
        </Typography>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit/>    
      <CardActions sx={{m: 0}}>
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
