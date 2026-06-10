import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import path from 'path'
import { Responder } from "../middleware/Responder";
import { PrismaClient } from "@prisma/client";


export class UserActor {
    static async signin(req: Request, res: Response){
        try {
            // 1. get data
            const {login, password} = req.body
            // 2. find User in DB by login
            const client = new PrismaClient()
            const user = await client.users.findFirst({where: { login } })
            
            if (!user){
                res.send("Пользователь не найден")
            } else {
                // 3. compare passwords
                let pwdCompare = bcrypt.compareSync(password, user.password)
                if (!pwdCompare){
                    res.send("Пароль неверный")
                }
                // 4. token
                const token = jwt.sign(
                    {login: user.login},
                    process.env.SECRET_KEY || "DEFAULT_SECRET_KEY", 
                    {expiresIn: '24h'}
                )
                res.json(Responder.ok({token, user}))
            }
            
        } catch (e) {
            console.log(e.message)
            return res.json(Responder.forbidden("Некорректный запрос"))
        }
     
    }
    static async signup(req: Request, res: Response){
        try {
            // пытаемся что-то выполнить 
             // 1. get data 
            const {login, password, email, phone} = req.body
            
            // 2. validate data
            if (!login || !password) {
                res.json(Responder.forbidden("Некорректные данные"))
            }
            // 3. check Users on unique (DB)
            // const candidate = users.findOne({login})
            const candidate = {login: "petya", password: "vasya"}
            // if (candidate.login) {
            //     res.send(Responder.forbidden("Логин занят"))
            // }
            // 4. hash pwd
            const hashPassword = await bcrypt.hash(password, 5)
            // 5. create user (DB)
            const client = new PrismaClient()
            const user = await client.users.create({
                data: {
                    login,
                    email,
                    phone,
                    password: hashPassword
                }
            })
            // 6. login user
            const token = jwt.sign(
                {login: user.login},
                process.env.SECRET_KEY || "DEFAULT_SECRET_KEY", 
                {expiresIn: '24h'}
            )
            res.json(Responder.ok({token, user}))
        }
        catch (e) {
            // отлов ошибки
            console.log(e.message)
            return res.json(Responder.forbidden("Некорректный запрос"))
        }
       
    }
}


// curl --header "Content-Type: application/json" --request POST  --data '{"login":"xyz","password":"xyz"}' http://localhost:5000/user/signup