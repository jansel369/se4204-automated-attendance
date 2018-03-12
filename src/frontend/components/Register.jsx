import React from 'react';
import { inject, observer } from 'mobx-react';
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
class RegisterContainer extends React.Component {
  render() {
    const { StudentStore } = this.props;
    return (
      <Box align="center" id="contentFull">
        <br />
        <Title>Register</Title><br />
        <form id="register-form">
        <TextInput
          name="register-field"
          className="register-field"
          placeHolder="Id Number"
          value={StudentStore.newStudent.idNumber}
          onDOMChange={
          (evt) => { setProperty(StudentStore.newStudent, 'idNumber', evt.target.value); }
          }
        />
        <br />
        <br />
        <TextInput
          name="register-field"
          className="register-field"
          placeHolder="Full Name"
          value={StudentStore.newStudent.name}
          onDOMChange={
          (evt) => { setProperty(StudentStore.newStudent, 'name', evt.target.value); }
          }
        />
        <br />
        <br />
        <PasswordInput
          name="password"
          className="register-field"
          placeholder="password"
          value={StudentStore.newStudent.password}
          onChange={
          (evt) => { setProperty(StudentStore.newStudent, 'password', evt.target.value); }
        }
        /><br /> <br />
        <TextInput
          name="register-field"
          className="register-field"
          placeHolder="Passcode"
          value={StudentStore.newStudent.passcode}
          onDOMChange={
          (evt) => { console.log(evt.target.value); }
          }
        />
        <br />
        </form>
        <Box align="center">
          <Footer pad={{ vertical: 'medium' }}>
            <div>
              <Button
                icon={<LoginIcon id="icon" />}
                label="Register"
                type="submit"
                onClick={() => {
                    StudentStore.register();
                //   store.authStore.authenticate(store.uiStore.getEmail(), store.uiStore.getPassword());
                }}
              />
            </div>
          </Footer>
        </Box>
        <Box align="center">
      </Box>
      </Box>
    );
  }
}

export default RegisterContainer;
