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
import Actions from 'grommet/components/icons/base/Group';
import Update from 'grommet/components/icons/base/Folder';
import Ascend from 'grommet/components/icons/base/Ascend';
import Descend from 'grommet/components/icons/base/Descend';
import Add from 'grommet/components/icons/base/Add';

import LoginContainer from './Login';
import LogTable from './LogTable';
import StudentTable from './StudentTable';
import RegisterContainer  from './Register';


const MenuButton = (({label, path, Icon, onClick}) => (
    <Anchor
      icon={Icon}
      className="header-anchor"
      onClick={async () => {
        onClick(path);
      }}>
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



const AppContainer = observer(({StudentStore, StateStore}) => (
    <App>
        <AppHeader />
        <Box flex={true}
            justify='start'
            direction='row'
            responsive={true}>

            <MenuButton onClick={StateStore.setView} label="Students" path="students" Icon={<Actions />} />
            <MenuButton onClick={StateStore.setView} label="Attendance" path="logtable" Icon={<Update />} />
            <MenuButton onClick={StateStore.setView} label="Register Student" path="register" Icon={<Add />} />

        </Box>
        <Section>
            {StateStore.view === "logtable" ?
                <div>
                    <Box align="center"> 
                        <span>
                        <h3> {StudentStore.selectedDate} </h3>
                        <Anchor icon={<Ascend />} onClick={async () => {
                            await StudentStore.manipulateDate(true);
                        }} />
                        <Anchor icon={<Descend /> } onClick={async () => {
                            await StudentStore.manipulateDate(false);
                        }} />
                        </span>
                    </Box>                    
                    <LogTable subject='Computer Architecture II' timeStart={StudentStore.startTime} timeEnd={StudentStore.endTime} /> 
                </div>
                :
            StateStore.view === "register" ?
                <RegisterContainer /> :
            StateStore.view === "students" ? 
                <StudentTable /> :
                null
            }
        </Section>
    </App>
));

@inject('StudentStore', 'StateStore') 
@observer
class MainContainer extends React.Component {
  componentDidMount() {
    const { StudentStore, StateStore } = this.props;
  }

  render() {
    const { StudentStore, StateStore } = this.props;
      return (
          StudentStore.userHasLoggedIn ?
          <AppContainer StudentStore={StudentStore} StateStore={StateStore} />
        //   : <LoginContainer />
            : <AppContainer StudentStore={StudentStore} StateStore={StateStore} />
      )
  }

}

export default MainContainer;