import React from 'react';
import { inject, observer } from 'mobx-react';

import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import Anchor from 'grommet/components/Anchor';
import Ascend from 'grommet/components/icons/base/Ascend';
import Descend from 'grommet/components/icons/base/Descend';
import Chat from 'grommet/components/icons/base/Chat';

const TableItem = observer(({id, name, email, passcode, attendance, absents, parent, remarks, fail, StudentStore}) => (
    <TableRow>
      <td> {id} </td>
      <td> {name} </td>
      <td> {email} </td>
      <td> {parent} </td>
      <td> {passcode} </td>
      <td> {attendance} </td>
      <td> {absents} </td>
      <td className={fail ? "red" : "green"}> {remarks} </td>      
      <td>
          <Anchor icon={<Chat />} onClick={async () => await StudentStore.sendParentalNotice(name, parent, fail)}  />
      </td>
    </TableRow>
));


const StudentTable = inject('StudentStore')(observer(({StudentStore}) => (
    <div>
    {/* <h2> {StudentStore.selectedDate} </h2> <br />     */}
    <Table>
        <thead>
        <tr>
      <th> Id Number </th> 
      <th> Name </th>
      <th> Email </th>
      <th> Parents </th>
      <th> Passcode </th>
      <th> Attendance </th>
      <th> Absences </th> 
      <th> Remarks </th>
      <th> Actions </th>
      </tr> 
      </thead>

        <tbody>
            {StudentStore.students.map(student => 
            !isNaN(student.absents) ?
            <TableItem id={student.idNumber} name={student.name}  email={student.email}  passcode={student.passcode} 
            parent={student.parent} attendance={student.attendance} absents={student.absents} StudentStore={StudentStore} 
            remarks={(student.absents <= 6) ? "Passing" : "In Danger Of Dropping"}
            fail={(student.absents <= 6) ? false : true} /> : null
            )}
        </tbody>
    </Table>
    </div>
)));

export default StudentTable;