import {connectionDB} from "@/db/mongodb"
import User from "@/models/users"
import Task from "@/models/tasks"
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';

connectionDB();

export default async function handler(req,res) {
    try {

        if(req.method !== 'POST' ) {
            return res.status(405).json({ error: true, message: 'Salah method'})
        }

        const token = req.headers.authorization
        if(!token) {
            return res.status(400).json({ error: true, message: 'Tidak ada token'})
        }

        const user = await User.findOne({token})
        console.log('user: ', user)
        if (!user || !user.nis) {
            deleteCookie('token', {req,res})
            return res.status(400).json({
              error: true,
              message: 'token tidak valid',
            });
        }

        if(user.role !== 1) {
            return res.status(400).json({ error: true, message: 'Anda tidak memiliki hak akses'})
        }

        const {date,deadline,link,note} = req.body;
        if(!date || !deadline || !link) {
            return res.status(400).json({ error: true, message: 'Berkas yang anda kirimkan belum lengkap'})   
        }

        const data = {date, deadline, link, teacher_id: user.id, status:1 , note}
        const tasks = new Task(data);
        await tasks.save()

        return res.status(201).json({message:'Data sudah berhasil diinputkan'})

    } catch(err) {
        console.log('error: ', err)
        res.status(500).json({ error: true, message: 'ada masalah harap hubungi developer' });
    }
}