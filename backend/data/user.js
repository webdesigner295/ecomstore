// import bcrypt from 'bcryptjs';
import bcrypt from 'bcrypt'

const users = [
  {
    name: 'Admin User',
    email: 'admin@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Awais Jutt',
    email: 'awais.cs777@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Muhammad Awais',
    email: 'webdesigner295@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;