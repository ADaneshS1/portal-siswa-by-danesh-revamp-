import styles from "@/styles/reglog.module.css";
import { getCookie } from 'cookies-next';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";  
import { getDataApi, postDataApi } from '@/utils/api';

export default function dashboard() {
  const router = useRouter();
  const [user, setUser] = useState({id:'',name:''});
  const [allUsers, setAllUsers] = useState([]);

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
            await postDataApi(
              '/api/logout',
              data,
              (successData) => {
                router.push('/login');
              },
              (failData) => {
                console.error('Gagal melakukan permintaan:', failData);
                alert('terjadi kesalahan koneksi ' + failData);
              }
            );
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
          let myUser;
          await postDataApi(
            '/api/check-token',
            data,
            (successData) => {
              let roleName = '';
              switch (successData.role) {
                case 0:
                  roleName = 'Santri';
                  break;
                case 1:
                  roleName = 'Admin';
                  break;
              }
              myUser = { ...successData, roleName };
              setUser(myUser);
            },
            (failData) => {
              console.log('failData: ', failData);
              router.push('/login');
            }
          );

          if (myUser && myUser.role === 1) {
            await getDataApi(
              '/api/list-user',
              (dataSuccess) => {
                console.log('dataSuccess: ', dataSuccess);
                setAllUsers(dataSuccess.users);
              },
              (dataFail) => {
                console.log('dataFail: ', dataFail);
              }
            );
          }
        }
      } catch (error) {
        console.log('error: ', error);
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

        <div>
        <span style={{ fontWeight: '700', fontSize: '28px' }}>
            {user.name}({user.roleName})
          </span>
        </div>

        <div style={{ padding: '32px' }}>
          <div style={{ width: '100%' }}>
            <table
              style={{
                width: '100%',
                backgroundColor: '#fff',
                border: '1px',
              }}
            >
              <tbody>
                {allUsers &&
                  allUsers.map((data, index) => {
                    return (
                      <tr key={index} style={{ padding: '8px' }}>
                        <td>{data.nis}</td>
                        <td>{data.name}</td>
                        <td>{data.status}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        
    </div>
  );
}
