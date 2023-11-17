import styles from "@/styles/reglog.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";  

export default function registrasi() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [nis, setNis] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async () => {
    const data = { name, nis, password };
    console.log('click daftar by: ', data);

    try {
      const res = await fetch('/api/registrasi', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await res.json(); // Mendapatkan data JSON dari respons
      console.log(responseData);
      alert('Data sudah sukses didaftarkan');

      if (res.ok) {
        // Periksa apakah respons memiliki status code 200 (OK)
        router.push('/login')
      } else {
        console.error('Gagal melakukan permintaan:', res.status);
        alert('Data gagal didaftarkan');
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
        alignItems: "center",
        minHeight: "80vh"
      }}
    >
      <div style={{
        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
        color: "black",
        borderRadius: "8px",
        padding: "20px",
        width: "50%"
      }}>
        <div>
          <h2>Registrasi</h2>

          <div style={{ display: "flex", flexDirection: "column", marginRight: "20px", marginTop: "20px", gap: "10px" }}>
            <h3 className={styles.h3}>Nama Lengkap <span style={{ color: 'blue' }}>*</span> </h3>
            <input
              className={styles.bodra}
              style={{
                width: "70%",
                marginTop: "4px",
                padding: "10px 5px",
                border: "2px solid silver"
              }}
              placeholder="Abdullah Ihsan"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
            />

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
              value={nis}
              onChange={(e) => {
                setNis(e.target.value)
              }}
            />

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
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />

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
              Registrasi
            </button>

            <div>
              <p>Sudah punya akun? <a href="/registrasi" style={{color:"blue"}}>Login sekarang</a> </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
