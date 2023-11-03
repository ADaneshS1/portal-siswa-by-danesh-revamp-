import styles from "@/styles/dashboard.module.css";
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function dashboard() {
  const [user, setUser] = useState({ id: '', name: '' });
  const router = useRouter();

  useEffect(() => {
    const run = async () => {
      try {
        const myCookieValue = getCookie('token');
        console.log('myCookieValue: ', myCookieValue);
        if (myCookieValue) {
          const data = { token: myCookieValue };
          const res = await fetch('/api/checkToken', {
            method: 'POST', // Corrected the typo in 'method'
            body: JSON.stringify(data), // Assuming 'data' is an object that you want to send as JSON
            headers: {
              'Content-Type': 'application/json', // Specifying the content type as JSON
            },
          });

          if (res.ok) {
            // Periksa apakah respons memiliki status code 200 (OK)
            const responseData = await res.json(); // Mendapatkan data JSON dari respons
            console.log(responseData);
            setUser(responseData);
          } else {
            console.error('Gagal melakukan permintaan:', res.status);
            alert('terjadi kesalahan koneksi');
            router.push('/login');
          }
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.log('error: ', error);
        // alert('Terjadi Kesalahan, harap hubungi team support');
      }
    };

    run();
  }, [router]);
  
  return (
    <div className={styles.font}>

        <div className={styles.sidebar}>
            <h1 style={{textAlign:"center"}}>ADS</h1>

            <ul>
                <li>Dashboard</li>
                <li>NFT Marketplace</li>
                <li>Tables</li>
                <li>Kanban</li>
                <li>Profile</li>
                <li>Sign In</li>
            </ul>
        </div>

        <div className={styles.navbar}>
         <div>
            <p>Pages/Dashboard</p>
            <p>Main Dashboard</p>
         </div>

         <div>
            <input placeholder="Search"></input>
         </div>
        </div>
      
    </div>
  );
}
