import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link, Redirect } from 'react-router-dom';
import PasswordInput from 'grommet/components/PasswordInput';
import TextInput from 'grommet/components/TextInput';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import Title from 'grommet/components/Heading';
import LoginIcon from 'grommet/components/icons/base/Login';

import { setProperty } from '../utils/';

@inject('StudentStore')
@observer
class LoginContainer extends React.Component {
  render() {
    const { StudentStore } = this.props;
    return (
      <Box align="center" id="contentFull">
        <br />
        <Title>Log-in</Title><br />
        <form>
        <TextInput
          name="email"
          placeHolder="Id Number"
          value={StudentStore.loggedInUser.idNumber}
          onDOMChange={
          (evt) => { setProperty(StudentStore.loggedInUser, 'idNumber', evt.target.value); }
          }
        />
        <br />
        <PasswordInput
          name="password"
          placeholder="password"
          value={StudentStore.loggedInUser.password}
          onChange={
            (evt) => { setProperty(StudentStore.loggedInUser, 'password', evt.target.value); }
        }
        /><br />
        </form>
        <Box align="center">
          <Footer pad={{ vertical: 'medium' }}>
            <div>
            <Link to="/">
              <Button
                id="indent"
                icon={<LoginIcon id="icon" />}
                label="LOGIN"
                type="submit"
                primary={true}
                onClick={() => {
                    StudentStore.login();
                //   store.authStore.authenticate(store.uiStore.getEmail(), store.uiStore.getPassword());
                }}
              />
            </Link>
            </div>
          </Footer>
        </Box>
        <Box align="center">
        <p id="error-handler"> {StudentStore.loggedInUser.passcode} </p>
      </Box>
      </Box>
    );
  }
}

export default LoginContainer;
