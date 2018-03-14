import createServer from "../backend/app";
import {ObjectId} from 'mongodb';

const seed = async () => {
  const app = await createServer();

  const Attendance = [
        {
            name : "Brent Anthony Tudas",
            passcode : '11111111',
            course : "BSSE",
            year : 4,
            date : new Date('2018-2-12'),
        },
        {
            name : "Dianzel Gulmatico",
            passcode : '22222222',
            course : "BSSE",
            year : 4,
            date : new Date('2018-2-12'),
        },
        {   
            name : "Jacob Aparecio",
            passcode : '33333333',
            course : "BSSE",
            year : 3,
            date : new Date('2018-2-12'),
        },
  ];
  const msgsService = app.service("/api/logs");
  await msgsService.remove(null);
  return Promise.all(Attendance.map(msg => msgsService.create(msg)));
};

export default seed;
