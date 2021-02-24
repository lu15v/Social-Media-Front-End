import React from 'react';
import {Image, Popup } from "semantic-ui-react";
import moment from "moment";

const Avatar = ({size, float, content:{createdAt, username, avatar}}) => {
    
    function popUp() {
       return  createdAt ? (
            <Popup
            inverted
            content={`User since ${moment(new Date(parseInt(createdAt))).format('yyyy')}`}
            key={username}
            header={username}
            trigger={
              <Image
                floated={float}
                size={size}
                src={avatar}
              />
            }
          />
        ) : (
            <Image
                floated={float}
                size={size}
                src={avatar}
              />
        )
    }

    return popUp();
}

export default Avatar;