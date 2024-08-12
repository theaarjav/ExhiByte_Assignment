import { useState } from 'react'
import './App.css'
import axios from "axios"
import { useEffect } from 'react'
import  Navbar  from './components/Navbar/Navbar'
import ListFollowers from './components/ListFollowers/ListFollowers'
import { setFollowers } from './followersSlice'
import { useDispatch } from 'react-redux'
function App() {
  const dispatch=useDispatch();
  // const [data, setdata] = useState([])
  const fetchData=async ()=>{
    const {data}=await axios.get("https://gist.githubusercontent.com/pandemonia/21703a6a303e0487a73b2610c8db41ab/raw/82e3ef99cde5b6e313922a5ccce7f38e17f790ac/twubric.json");
    // setdata(data);
    // console.log(data)
    dispatch(setFollowers(data));
    // console.log(data);
  }

  useEffect(() => {
    fetchData();
  }, [])
  

  return (
    <>
      <Navbar/>
      <ListFollowers/>
    </>
  )
}

export default App
