import {connectionDB} from "@/db/mongodb"
import Tasks from "@/models/tasks"
import User from "@/models/users"
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';

connectionDB();

export default async function handler(req,res) {
    try {

        if(req.method !== 'PUT' ) {
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

        const tasksId = req.query.id
        if(!tasksId) {
            return res.status(400).json({ error: true, message: 'Id tugas tidak diberikan'})
        }

        const {date,deadline,link,note} = req.body;
        if(!date || !deadline || !link) {
            return res.status(400).json({ error: true, message: 'Berkas yang anda kirimkan belum lengkap'})   
        }

        const updatedTask = await Tasks.findByIdAndUpdate(
            tasksId,
            { date, deadline, link, note },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ error: true, message: "Tugas tidak ditemukan" });
        }

        return res.status(201).json({updatedTask})

    } catch(err) {
        console.log('error: ', err)
        res.status(500).json({ error: true, message: 'ada masalah harap hubungi developer' });
    }
}