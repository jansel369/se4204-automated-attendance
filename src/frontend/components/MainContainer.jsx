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
import Actions from 'grommet/components/icons/base/Apps';

import LoginContainer from './Login';


const AppHeader = observer(() => (
    <Header>
  <Title>
    Automated Attendance System
  </Title>
  <Box flex={true}
    justify='end'
    direction='row'
    responsive={false}>
    <Menu icon={<Actions />}
      dropAlign={{"right": "right"}}>
      <Anchor href='#'
        className='active'>
        First
      </Anchor>
      <Anchor href='#'>
        Second
      </Anchor>
      <Anchor href='#'>
        Third
      </Anchor>
    </Menu>
  </Box>
</Header>
));



const AppContainer = observer(() => (
    <App>
        <AppHeader />
        <Section>

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
          : <LoginContainer />
      )
  }

}

export default MainContainer;