import React, {  useState } from 'react'
import FollowerCard from './FollowerCard'
import './ListFollowers.css'
import { useSelector, useDispatch } from 'react-redux'
import { setFollowers, setOpacity } from '../../followersSlice'

const ListFollowers = (props) => {
  const dispatch=useDispatch();
  const followers=useSelector((state)=>state.followers.value)
  const [showSortingOptions, setShowSortingOptions] = useState(false)
  const [sortby, setSortby] = useState(null);
  const [data, setdata] = useState(followers)
  const [sortAsc, setSortAsc] = useState(false);
  const handleSortClick = () => {
    const sortList=document.getElementsByClassName("sortby-options");
    console.log(sortList[0].classList.length)
    if(sortList[0].classList.length==1)sortList[0].classList.add("onsort")
    else sortList[0].classList.remove("onsort")
  }
  const handleSetFollowers=(val)=>{
    dispatch(setFollowers(val));
  }


  const handleSortTypeClick = (e) => {
    const sortVar = e.target.getAttribute("value");
    if (sortby && sortby == e.target.getAttribute("value")) {
      setSortby(null);
      // handleSetFollowers(followers);
    } else {
      if(sortVar!="join_date")handleSetFollowers(followers.slice().sort((a, b) => b["twubric"][sortVar] - a["twubric"][sortVar]));
      else handleSetFollowers(followers.slice().sort((a, b) => b[sortVar] - a[sortVar]));
      setSortby(sortVar);
    }
    setSortAsc(false);
  }

  const handleSortOrder = () => {
    handleSetFollowers(followers.slice().reverse());
    setSortAsc(sortAsc => !sortAsc);
  }
  let timeOut;
  const handleScroll=()=>{
    dispatch(setOpacity(0.7))
    if(timeOut){
      clearTimeout(timeOut)
    }
    timeOut=setTimeout(()=>{
      dispatch(setOpacity(1));
    }, 500)
  }

  return (
    <div className="list-followers" onWheelCapture={handleScroll}>
      <div className="sort-container">

        <div className="sort-by" style={{
          backgroundColor: showSortingOptions ? "#BCBCBC" : "#DDDDDD"
        }} >
          <span className='sort-btn-text' onClick={handleSortClick}>
            Sort By <i className="fa-solid fa-sort"></i> :
          </span>
          {
            sortby && <span className='sort-order' onClick={handleSortOrder}>
              {sortby.split("_").join(" ").toUpperCase()}
              {sortAsc ? <>
                <i className="fa-solid fa-arrow-up"></i>
              </>
                : <>
                  <i className='fa-solid fa-arrow-down'></i>
                </>
              }
            </span>
          }
        </div>
        
          <div  className="sortby-options onsort">
            {["Chirpiness", "Join Date", "Friends", "Influence", "Total"].map((cat, i) => {
              return <div key={i} className={`sort-card ${sortby==cat.toLowerCase().split(" ").join('_') && 'active'}`} onClick={handleSortTypeClick} value={cat.toLowerCase().split(" ").join('_')}>{cat}</div>
            })}
          </div>
        
      </div>
      <FollowerCard/>
    </div>
  )
}

export default ListFollowers