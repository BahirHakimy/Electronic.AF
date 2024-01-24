import { FaUserCircle } from "react-icons/fa";

import ReactStars from "react-rating-stars-component";

const Review = ({ review }) => {
  return (
    <div className="space-y-2">
      {review.map((rev) => (
        <div key={rev.username} className="flex  ">
          <div className="flex shadow-md border border-gray-200  rounded-tl-xl rounded-br-xl   ">
            <span className="px-2 pt-0.5 bg">{rev.rating}.0</span>
            <ReactStars count={5} size={24} activeColor="#ffd700" />,
          </div>
          <div className="text-xs pl-4 relative">
            <div className="flex space-x-2 ">
              <FaUserCircle />
              <span className="font-bold ">{rev.username}</span>
            </div>
            <span className="block absolute truncate ">{rev.review}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Review;
