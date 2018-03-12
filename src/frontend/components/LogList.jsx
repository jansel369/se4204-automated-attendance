import React from 'react';
import { inject, observer } from 'mobx-react';

import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';


const LogListItem = observer(() => (
    <ListItem justify='between' separator='horizontal'>
    <span> Alan </span>
    <span className='secondary'> happy </span>
    </ListItem>
));

const LogList = inject('StudentStore')(observer(() => (
    <List>
        
        <ListItem justify='between'>
            <span>
            Chris
            </span>
            <span className='secondary'>
            cool
            </span>
        </ListItem>
        <ListItem justify='between'>
            <span>
            Eric
            </span>
            <span className='secondary'>
            odd
            </span>
        </ListItem>
    </List>
)));

export default LogList;