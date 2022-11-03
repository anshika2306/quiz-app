import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import '../styles/globals.css'
import {useState, useEffect} from 'react'
import { useRouter } from 'next/router'


function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState({value:null})
  const [key, setKey] = useState(0)
  const router = useRouter()

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token){
      setUser({value: token})
      setKey(Math.random())
    }
  },[router.query])

  const logout = ()=>{
    localStorage.removeItem('token')
    setUser({value:null})
    setKey(Math.random())
  }

  return <>
    <Navbar logout={logout} user={user} key={key} />
    <Component {...pageProps} />
    <Footer />
  </>
}

export default MyApp
