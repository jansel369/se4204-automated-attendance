import React from 'react';
import { inject, observer } from 'mobx-react';

import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import Anchor from 'grommet/components/Anchor';
import Ascend from 'grommet/components/icons/base/Ascend';
import Descend from 'grommet/components/icons/base/Descend';
import Box from 'grommet/components/Box';

const TableItem = observer(({id, name, timeIn, timeOut, remarks}) => (
    <TableRow>
      <td> {id} </td>
      <td> {name} </td>
      <td> {timeIn} </td>
      <td> {timeOut} </td>
      <td className='secondary'> {remarks} </td>
    </TableRow>
));


const LogTable = inject('StudentStore')(observer(({StudentStore, subject, timeStart, timeEnd}) => (
    <div>
        <Box justify="start" direction="row">
            <h3 className="header-anchor"> Subject: {subject} </h3> 
            <h3 className="header-anchor"> Starts: {timeStart} </h3> 
            <h3 className="header-anchor"> Ends: {timeEnd} </h3> 
        </Box>
    <Table>
        <thead>
        <tr>
      <th> Id Number </th> 
      <th> Name </th>
      <th> Time In </th>
      <th> Time Out </th> 
      <th> Remarks </th>
      </tr> 
      </thead>

        <tbody>
            {StudentStore.todaysLog.map(log => 
            <TableItem id={log.student.idNumber} name={log.student.name} 
             timeIn={log.time} timeOut={"N/A"} remarks={(log.time !== "N/A") ? "PRESENT" : "ABSENT"} />)}
        </tbody>
    </Table>
    </div>
)));

export default LogTable;