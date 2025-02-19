import React, { useState } from 'react'
import { Card, CardContent, CardMedia, List, CardHeader, ListItem } from '@mui/material';

const Match = ({ dogName, dogBreed, dogImg, dogAge, dogZip }) => {
    return(<Card variant="outlined" sx={{ minWidth: 275 }}>
        <CardHeader
            title={dogName}
            subheader={dogBreed}
        />
        <CardMedia
            component="img"
            image={dogImg}
            alt={`Your new dog, ${dogName}!`}
        />
        <CardContent>
            <List>
                <ListItem>Age: {dogAge}</ListItem>
                <ListItem>Zip Code: {dogZip}</ListItem>
            </List>
        </CardContent>
    </Card>)
}

export default Match
