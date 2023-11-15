import styles from "@/styles/reglog.module.css";
import { getCookie } from 'cookies-next';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";  

export default function dashboard() {
  const router = useRouter();
  const [user, setUser] = useState({id:'',name:''});

  const handleRegistration = async () => {
          let myToken = '';
          if (localStorage.getItem('keepLogin') === 'true') {
            myToken = getCookie('token');
          } else {
            sessionStorage.setItem('token', '');
            router.push('/login');
            return;
          }
          if (myToken) {
            const data = { token: myToken };
            const res = await fetch('/api/logout', {
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
            router.push('/login');
            } else {
                console.error('Gagal melakukan permintaan:', res.status);
                alert('terjadi kesalahan koneksi');
            }
                } else {
                    router.push('/login');
                }
  }

  useEffect(() => {
    const run = async () => {
      try {
        let myToken = '';
        if (localStorage.getItem('keepLogin') === 'true') {
          myToken = getCookie('token');
        } else {
          myToken = sessionStorage.getItem('token');
        }

        if (myToken) {
          const data = { token: myToken };
          const res = await fetch('/api/check-token', {
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
    <div className={styles.font}
      style={{
        display: "flex",
        flexDirection:"column",
        justifyContent: "center",
        alignItems: "center",
        gap:"40px",
        minHeight: "80vh"
      }}
    >

        <div>
            <h4>Nama:</h4>
            <p>{user.name}</p>
        </div>

        <div>
            <h3>Logout:</h3>
            <button
              className={styles.bodra}
              style={{
                padding:"10px 20px"
              }}
              onClick={handleRegistration}
            >
              Logout
            </button>
        </div>
        
    </div>
  );
}
