import React from 'react'
import {Card, CardContent, Typography} from '@material-ui/core'
import './MessageDisplay.css'

function MessageDisplay(props) {
    let isCurrentUser=(props.currentEmail===props.theEmail)
    return (
        <div className={`message_guest ${isCurrentUser && 'message_current'}`}>
            <Card className={`message_card_guest_user ${isCurrentUser && 'message_card_current_user'}`}>
                <CardContent>
                <Typography color="white" variant="h5" component="h2">
                    {!isCurrentUser && `${props.theEmail || 'Unknown'}:`} {props.theMessage}
                </Typography>
                </CardContent>
            </Card>
          </div>
    )
}

export default MessageDisplay
