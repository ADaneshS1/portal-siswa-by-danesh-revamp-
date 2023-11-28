import styles from "@/styles/reglog.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";  

export default function login() {
  const router = useRouter();

  const [nis, setNis] = useState('');
  const [password, setPassword] = useState('');
  const [isKeepLogin, setKeepLogin] = useState(false);

  const handleRegistration = async () => {
    const data = { nis, password, isKeepLogin };
    console.log('click daftar by: ', data);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await res.json(); // Mendapatkan data JSON dari respons

      if (res.ok) {
        // Periksa apakah respons memiliki status code 200 (OK)
        console.log('responsData: ',responseData);
        localStorage.setItem('keepLogin', responseData.isKeepLogin)

        if(!responseData.isKeepLogin) {
          sessionStorage.setItem('token',responseData.token)
        }

        alert('Berhasil login');
        router.push('/dashboard');
      } else {
        console.error('Gagal melakukan permintaan:', res.status);
        console.log(responseData)
        alert(responseData.message);
      }
    } catch (error) {
      console.log('error: ', error);
      alert('Terjadi Kesalahan, harap hubungi tim support');
    }
  }

  return (
    <div className={styles.font}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div style={{
        border:"solid silver 2px",
        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
        color: "black",
        borderRadius: "8px",
        padding: "20px",
        width: "40%"
      }}>

        <div>
          <h2>Login</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

            <div>
              <h3 className={styles.h3}>NIS <span style={{ color: 'blue' }}>*</span> </h3>
              <input
                className={styles.bodra}
                style={{
                  width: "70%",
                  marginTop: "4px",
                  padding: "10px 5px",
                  border: "2px solid silver"
                }}
                placeholder="12345"
                onChange={(e) => {
                  setNis(e.target.value)
                }}
              />
            </div>

            <div>
              <h3 className={styles.h3}>Password <span style={{ color: 'blue' }}>*</span> </h3>
              <input
                className={styles.bodra}
                style={{
                  width: "70%",
                  marginTop: "4px",
                  padding: "10px 5px",
                  border: "2px solid silver"
                }}
                type="password"
                placeholder="*******"
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </div>
        
            <div>
              <input
                type="checkbox"
                onChange={(e) => {
                  console.log(e.target.checked);
                  let isChecked = e.target.checked;
                  localStorage.setItem('keepLogin', isChecked);
                  setKeepLogin(isChecked);
                }}
              ></input>
              <span> Keep Me Logged In</span>
            </div>

            <button
              className={styles.bodra}
              style={{
                width: "72%",
                marginTop: "15px",
                padding: "15px 20px",
                backgroundColor: "blue",
                color: "white",
                fontWeight: "600",
                border: "2px solid blue"
              }}
              onClick={handleRegistration}
            >
              Login
            </button>

            <div>
            <p>Belum punya akun? <a href="/registrasi" style={{color:"blue"}}>Buat akun baru</a> </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
