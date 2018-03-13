import React from 'react';
import { inject, observer } from 'mobx-react';

import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import Anchor from 'grommet/components/Anchor';
import Ascend from 'grommet/components/icons/base/Ascend';
import Descend from 'grommet/components/icons/base/Descend';

const TableItem = observer(({id, name, email, passcode, attendance, absents, remarks}) => (
    <TableRow>
      <td> {id} </td>
      <td> {name} </td>
      <td> {email} </td>
      <td> {passcode} </td>
      <td> {attendance} </td>
      <td> {absents} </td>
      <td className='secondary'> {remarks} </td>
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
      <th> Passcode </th>
      <th> Attedance </th>
      <th> Absents </th> 
      <th> Remarks </th>
      </tr> 
      </thead>

        <tbody>
            {StudentStore.students.map(student => 
            !isNaN(student.absents) ?
            <TableItem id={student.idNumber} name={student.name}  email={"N/A"}  passcode={student.passcode} 
            attendance={student.attendance} absents={student.absents} remarks={(student.absents <= 6) ? "Passing" : "In Danger Of Failing"} /> : null
            )}
        </tbody>
    </Table>
    </div>
)));

export default StudentTable;