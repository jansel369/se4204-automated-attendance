import React from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';

import App from 'grommet/components/App';
import Section from 'grommet/components/Section';
import Header from 'grommet/components/Header';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Title from 'grommet/components/Title';
import Menu from 'grommet/components/Menu';
import Actions from 'grommet/components/icons/base/Apps';




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

// @inject('store') 
@observer
class MainContainer extends React.Component {
  componentDidMount() {
    // const { store: { supplierStore, authStore, inventoryStore, transactionStore } } = this.props;
  }

  render() {
      return (
          <AppContainer />
      )
  }

}

export default MainContainer;