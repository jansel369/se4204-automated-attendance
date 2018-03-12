import createServer from "../backend/app";
import {ObjectId} from 'mongodb';

const seed = async () => {
  const app = await createServer();

  const students = [
        {
            name : "Brent Anthony Tudas",
            passcode : '11111111',
            course : "BSSE",
            year : 4,
        },
        {
            name : "Dianzel Gulmatico",
            passcode : '22222222',
            course : "BSSE",
            year : 4,
        },
        {   
            name : "Jacob Aparecio",
            passcode : '33333333',
            course : "BSSE",
            year : 3,
        },
  ];
  const msgsService = app.service("/api/students");
  await msgsService.remove(null);
  return Promise.all(students.map(msg => msgsService.create(msg)));
};

export default seed;
