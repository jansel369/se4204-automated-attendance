import React from 'react';
import { inject, observer } from 'mobx-react';
import PasswordInput from 'grommet/components/PasswordInput';
import TextInput from 'grommet/components/TextInput';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import Title from 'grommet/components/Heading';
import LoginIcon from 'grommet/components/icons/base/Login';

// @inject('store')
@observer
class LoginContainer extends React.Component {
  render() {
    // const { uiStore, authStore } = this.props;
    return (
      <Box align="center" id="contentFull">
        <br />
        <Title>Log-in</Title><br />
        <form>
        <TextInput
          name="email"
          placeHolder="username"
          value={""}
          onDOMChange={
          (evt) => { console.log(evt.target.value); }
          }
        />
        <br />
        <PasswordInput
          name="password"
          placeholder="password"
          value={""}
          onChange={
          (evt) => { console.log(evt.target.value); }
        }
        /><br />
        </form>
        <Box align="center">
          <Footer pad={{ vertical: 'medium' }}>
            <div>
              <Button
                id="indent"
                icon={<LoginIcon id="icon" />}
                label="LOGIN"
                type="submit"
                primary={true}
                onClick={() => {
                //   store.authStore.authenticate(store.uiStore.getEmail(), store.uiStore.getPassword());
                }}
              />
            </div>
          </Footer>
        </Box>
        <Box align="center">
        <p id="error-handler"> ERRORS HERE </p>
      </Box>
      </Box>
    );
  }
}

export default LoginContainer;
