import React from 'react';
import { observer, inject } from 'mobx-react';
import { Link, Redirect } from 'react-router-dom';

import App from 'grommet/components/App';
import Section from 'grommet/components/Section';
import Header from 'grommet/components/Header';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Title from 'grommet/components/Title';
import Menu from 'grommet/components/Menu';
import Label from 'grommet/components/Label';
import Actions from 'grommet/components/icons/base/Apps';
import Update from 'grommet/components/icons/base/Update';

import LoginContainer from './Login';


const MenuButton = (({label, path, Icon}) => (
    <Anchor
      icon={Icon}
      className="header-anchor"
      path={path}>
    <Label> {label} </Label>
    </Anchor>
));

const AppHeader = observer(() => (
    <Header>
  <Title>
    Automated Attendance System
  </Title>
  <Box flex={true}
    justify='end'
    direction='row'
    responsive={false}>
    
  </Box>
</Header>
));



const AppContainer = observer(() => (
    <App>
        <AppHeader />
        <Section>
            <Box flex={true}
            justify='start'
            direction='row'
            responsive={true}>

            <MenuButton label="Students" path="students" Icon={<Actions />} />
            <MenuButton label="Attendance" path="attendance" Icon={<Update />} />

            </Box>
        </Section>
    </App>
));

@inject('StudentStore') 
@observer
class MainContainer extends React.Component {
  componentDidMount() {
    const { StudentStore } = this.props;
  }

  render() {
    const { StudentStore } = this.props;
      return (
          StudentStore.userHasLoggedIn ?
          <AppContainer />
        //   : <LoginContainer />
            : <AppContainer />
      )
  }

}

export default MainContainer;