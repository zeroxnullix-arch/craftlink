import React from "react";
import { HiArrowUpRight } from "react-icons/hi2";
import { FaStar } from "react-icons/fa";
import { BsClockHistory } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const CourseCard = ({ image, title, instructor, tag, hours, lectures, level,price,courseId }) => {
    const navigate = useNavigate()
    return (
        <div className="course-card">
            <div className="card-inner">
                <div className="box">
                    <div className="imgBox">
                        <img className="inverted-radius" src={image} alt={title} />
                        <div className="icon iconBox">
                            <HiArrowUpRight onClick={()=>navigate(`/viewcourse/${courseId}`)} />
                        </div>
                        <div className="tag-star">
                            <span>#{tag}</span>
                            <span className="star"><FaStar/>4.5</span>
                        </div>
                        <span className="hours"><BsClockHistory />{hours}</span>
                    </div>
                </div>
            </div>

            <div className="content">
                <h3 className="clamp-v clamp-v1" title={title}>{title}</h3>
                <p className="clamp-1" title={instructor}>By : {instructor}</p>
                <p className="clamp-1" title={instructor}>{lectures} Lectures . {level}</p>
                <h3 className="clamp-1" title={title}>EGP {price}</h3>

            </div>
        </div>
    );
};

export default CourseCard;
