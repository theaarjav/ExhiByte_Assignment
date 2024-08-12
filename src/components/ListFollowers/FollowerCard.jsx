import React from 'react'
import './ListFollowers.css'
import { useDispatch, useSelector } from 'react-redux'
import { setFollowers } from '../../followersSlice';

const FollowerCard = () => {
  const followers = useSelector((state) => state.followers.value);
  const dispatch = useDispatch();
  const getColor = (rating, type) => {
    rating = parseFloat(rating)
    if (type == "sub") return rating < 2 ? "#ffaaaa" : rating < 3.5 ? "#ffff00" : "#00ff00";
    return rating < 4 ? "#ffaaaa" : rating < 7 ? "#ffff00" : "#00ff00";
  }

  const getDate = (date) => {
    const newDate = new Date(1000 * date.toString());
    return newDate.toLocaleDateString();
  }

  const removeFollowerHandler = (follower) => {
    dispatch(setFollowers(followers.slice().filter((fol) => fol != follower)))
  }

  return (
    <div className='foll-container'>
      {followers && followers.map((follower, i) => {
        return <div key={i} className='follower-card'>
          <div className="username-and-removebtn">
            <span>
              {follower.username}
            </span>
            <button id='remove-btn' onClick={() => removeFollowerHandler(follower)}>Remove Follower</button>
          </div>
          <div className="pic-and-ratings">
            <div className="image-and-name">

              <div className="follower-img">
                <img src={follower.image} alt="" />
              </div>
              <div className="fullname">
                {follower.fullname}
                <div className="joined">
                  User since {getDate(follower.join_date)}
                </div>
              </div>
            </div>
            <div className="name-and-ratings">
              <div className="ratings">
                <div className="total">
                  <p className='total-title'>Twubric</p>
                  <p className="total-rating" style={{
                    color: getColor(follower.twubric.total)
                  }}>
                    {follower.twubric.total}
                  </p>
                </div>
                <div className='all-ratings'>
                  {['Friends', 'Influence', 'Chirpiness'].map((ele, i) => {
                    return <div key={i} className="subrating">
                      <p className="subrating-title">
                        {ele}
                      </p>
                      <p className="subrating-rating" style={{
                        color: getColor(follower.twubric[ele.toLowerCase()], "sub")
                      }}>
                        {follower.twubric[ele.toLowerCase()]}
                      </p>
                    </div>
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>
      })

      }
    </div>
  )
}

export default FollowerCard