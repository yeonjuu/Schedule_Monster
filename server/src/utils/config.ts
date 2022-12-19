import dotenv from 'dotenv';
const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

if (process.env.MONGODB_URI === undefined) {
  throw new Error(
    '어플리케이션을 시작하려면 MONGODB_URI 환경변수가 필요합니다.',
  );
}

if (process.env.JWT_SECRET_KEY === undefined) {
  throw new Error('JWT Secret Key 값이 존재하지 않습니다. ');
}

// if (process.env.SMTPID === undefined || process.env.SMTPPW === undefined) {
//   throw new Error('SMTP ID 또는 PW가 존재하지 않습니다. ');
// }
const port = parseInt(process.env.PORT ?? '8080', 10);
const mongoDBUri = process.env.MONGODB_URI;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
// const SMTPID = process.env.SMTPID;
// const SMTPPW = process.env.SMTPPW;
export { port, mongoDBUri, JWT_SECRET_KEY };
