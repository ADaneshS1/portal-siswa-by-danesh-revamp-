import {connectionDB} from "@/db/mongodb"
import User from "@/models/users"
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';

connectionDB();

export default async function handler(req, res) {
    try {
        if (req.method !== 'POST') {
          return res.status(405).json({ error: true, message: 'mehtod tidak diijinkan' });
        }
    
        const { token } = req.body;
    
        if (!token) {
          return res.status(400).json({ error: true, message: 'tidak ada token' });
        }
        
        const user = await User.findOne({ token });
        console.log('user: ', user);
    
        if (!user || !user.nis) {
          return res.status(400).json({
            error: false,
            message: 'token tidak valid atau sudah logout',
          });
        }
    
        // delete token
        const users = await User.findOneAndUpdate(
          { nis: user.nis },
          { token: '' },
          { new: true }
        );
        console.log('users after update: ', users);
        deleteCookie('token', { req, res });
    
        // kasih tahu client (hanya data yg diperbolehkan)
        return res.status(200).json({ error: false, message: 'berhasil logout' });
      } catch (error) {
        console.log('error:', error);
        res.status(500).json({ error: true, message: 'ada masalah harap hubungi developer' });
      }
}