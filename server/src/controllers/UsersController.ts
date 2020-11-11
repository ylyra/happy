import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import userView from '../views/users_view';
import * as Yup from 'yup';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'
import * as nodemailer from 'nodemailer'
import crypto from 'crypto'

import User from '../models/User';

export default {
  async login(request: Request, response: Response) {
    const { email, password } = request.body
    const usersRepository = getRepository(User);        
    
    const oneUser = await usersRepository.findOneOrFail({
      where:{email}
    });

    bcrypt.compare(password, oneUser.password, async function(err, result) {
      if(result && !err) {
        let idtoken = oneUser.id
        oneUser.token = jwt.sign({ id:idtoken }, String(process.env.SECRET));

        await usersRepository.save(oneUser);
        response.json(userView.render(oneUser))
      }      
    });
  },

  async reset(request: Request, response: Response) {
    const { email } = request.body
    const usersRepository = getRepository(User);
    let token = '';
    let message = {}
    let statusNumber = 400;

    const user = await usersRepository.findOneOrFail({
      where:{email}
    })

    if(user) {
      token = crypto.randomBytes(20).toString('hex');

      user.token = token;
      await usersRepository.save(user);

      statusNumber = 200

      message = {
        email:email,
        info:'Reset e-mail was sended successfuly, congrats!'
      }

      let testAccount = await nodemailer.createTestAccount();
      let transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
          user:testAccount.user,
          pass:testAccount.pass,
        },
        tls: {
          rejectUnauthorized:false
        }
      })

      let mailOptions = {
        from:"Happy Guarapari <no-replay@happy-guarapari.com>",
        to:user.email,
        subject:"Reset password from Happy Guarapari",
        html:`<p>Olá, ${user.name}</p>
        <p>Ficamos sabendo que você esqueceu sua senha, não tem problema estamos aqui para lhe ajudar com isso.</p>
        <a href="http://localhost:3000/reset?token=${user.token}">Clique aqui para resetar sua senha</a>
        <p>Caso o link não abra copie este e abra em uma nova aba: http://localhost:3000/reset?token=${user.token}</p>`
      }

      transporter.sendMail(mailOptions, (err, info) => {
        if(!err) console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      })
    }

    response.status(statusNumber).json(message)
  },

  async update(request: Request, response: Response) {
    const { token } = request.params
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOneOrFail({
      where:{token}
    })

    if(user) {
      const { newPassword } = request.body
      const saltRounds = 10;

      bcrypt.hash(newPassword, saltRounds, async (err, hash) => {
        if(!err) {
          let newToken = jwt.sign({ id:user.id }, String(process.env.SECRET), {
            algorithm: 'RS256'
          });
    
          user.password = hash;
          user.token = newToken;
          await usersRepository.save(user);
        }
      })
    }
  },

  async create(request: Request, response: Response) {
    const usersRepository = getRepository(User);

    const {
      name,
      email,
      password
    } = request.body
      
    const saltRounds = 10;

    const data = {
      name,
      email,
      password,
      token:'',
    };

    bcrypt.hash(password, saltRounds, async function(err, hash) {
      if(!err) {
        data.password = hash;

        const schema = Yup.object().shape({
          name: Yup.string().required(),
          email: Yup.string().required(),
          password: Yup.string().required(),
          token: Yup.string(),
        })
        
        await schema.validate(data, {
          abortEarly: false
        })

        const user = usersRepository.create(data);
    
        await usersRepository.save(user);
        
        response.status(201).json(user);
      }
    });
  }
};