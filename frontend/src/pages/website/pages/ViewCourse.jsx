import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Carpentry from "../../../assets/img/cat1.jpg";
import picProfile from "../../../assets/img/picProfile.jpg";
import { FaPlay, FaStar } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";

import { BsFillInfoCircleFill } from "react-icons/bs";
import { PiMonitorPlayFill } from "react-icons/pi";
import { MdReviews } from "react-icons/md";
import { PiUserCircleDashedFill } from "react-icons/pi";
import TestimonialsSwiper from "../../../components/TestimonialsSwiper";
import { useParams } from "react-router-dom";
import { api } from "@services/api";
import axios from "axios";
import { useSelector } from "react-redux";
import ChatBot from "../../../components/chatBot";
const tabs = [
  { id: "Overview", icon: BsFillInfoCircleFill, text: "Overview" },
  { id: "Curriculum", icon: PiMonitorPlayFill, text: "Curriculum" },
  { id: "Reviews", icon: MdReviews, text: "Reviews" },
  { id: "Instructor", icon: PiUserCircleDashedFill, text: "Instructor" },
];
const ViewCourse = () => {
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [activeTab, setActiveTab] = useState("Overview");
  const { userData } = useSelector(state => state.user); // لو عندك Redux للـ user
  const [paymentIframeUrl, setPaymentIframeUrl] = useState(null);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    if (course && userData) {
      setIsEnrolled(
        course.enrolledCraftsmen?.some(
          id => id.toString() === userData._id.toString()
        )
      );
      console.log("userData:", userData);
      console.log("course enrolled:", course?.enrolledCraftsmen);
    }
  }, [course, userData]);
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await api.get(`/api/course/getcourse/${courseId}`);
        setCourse(data);

        // 🔥 تشغيل أول فيديو تلقائي
        const firstFree = data.lectures?.find(l => l.isFree);
        if (firstFree) {
          setCurrentVideo(firstFree.videoUrl);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  // Refetch course data when returning from payment
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // Page has become visible - user might be returning from payment
        console.log("Page visible again, refetching course data...");
        const fetchCourse = async () => {
          try {
            const { data } = await api.get(`/api/course/getcourse/${courseId}`);
            setCourse(data);
          } catch (err) {
            console.error("Error refetching course:", err);
          }
        };
        fetchCourse();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [courseId]);
  const handlePayment = async () => {
    if (!course) return;

    try {
      setLoadingPayment(true);

      const res = await api.post(`/api/payment/create-payment`, {
        amount: course.price,
        courseId: course._id,
      });

      if (res.data.success && res.data.iframeUrl) {
        // Redirect to Paymob iframe for payment
        window.location.href = res.data.iframeUrl;
      } else {
        alert("Failed to initiate payment. Please try again.");
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed: " + (err.response?.data?.message || err.message));
    } finally {
      setLoadingPayment(false);
    }
  };
  const buyersCount = course?.enrolledCraftsmen?.length || 0;

  return (
    <>
      <div className="full-width">
        <Header />
      </div>
      <section className="course-pro section-layout">
        <div className="course-hero">
          <div className="video-box">
            <img src={course?.thumbnail} alt="" />
            <button className="play-btn">
              <FaPlay />
            </button>
          </div>
          <div className="course-meta">
            <h1>{course?.title}</h1>
            <p>
              {course?.subTitle}
            </p>
            <div className="rating">
              <span className="stars">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </span>
              <span>4.8 (12,500 reviews)</span>
            </div>
            <div className="instructor">
              <img src={picProfile} alt="" />
              <span>{course?.creator.name} • Instructor</span>
            </div>
            
          </div>
        </div>
        <div className="course-grid">
          <div className="course-left">
            <div className="course-tabs">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <Icon className="tab-icon" />
                    <span>{tab.text}</span>
                  </button>
                );
              })}
            </div>
            <div className="course-content">
              {activeTab === "Overview" && (
                <div className="overview">
                  <h3>What you’ll learn</h3>
                  <p style={{ whiteSpace: "pre-line" }}>
                    {course?.description}
                  </p>
                </div>
              )}
              {activeTab === "Curriculum" && (
                <div className="curriculum">
                  {course?.lectures?.map((lecture, i) => (
                    <div className="lesson" key={lecture._id || i}>
                      {lecture.isPreviewFree || isEnrolled ? <FaPlay /> : <IoIosLock />}
                      <span>
                        Lesson {i + 1}: {lecture?.lectureTitle}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === "Reviews" && (
                <div className="reviews">
                  {[1, 2, 3].map((i) => (
                    <div className="review-card" key={i}>
                      <img src={picProfile} alt="" />
                      <div>
                        <h4>User {i}</h4>
                        <p>Amazing course! Highly recommended.</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === "Instructor" && (
                <div className="instructor-info">
                  <div className="instructor-box">
                    <img src={picProfile} alt="" />
                    <div>
                      <h3>{course?.creator.name}</h3>
                      <span>Instructor</span>
                    </div>
                  </div>
                  <p>
                    {course?.creator.description}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="card-container">
            <div className="title-card">
              <p>{course?.category}</p>
              {/* <div className="course-meta-info">
              <span>{buyersCount} Purchases</span>
            </div> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M10.277 16.515c.005-.11.187-.154.24-.058c.254.45.686 1.111 1.177 1.412c.49.3 1.275.386 1.791.408c.11.005.154.186.058.24c-.45.254-1.111.686-1.412 1.176s-.386 1.276-.408 1.792c-.005.11-.187.153-.24.057c-.254-.45-.686-1.11-1.176-1.411s-1.276-.386-1.792-.408c-.11-.005-.153-.187-.057-.24c.45-.254 1.11-.686 1.411-1.177c.301-.49.386-1.276.408-1.791m8.215-1c-.008-.11-.2-.156-.257-.062c-.172.283-.421.623-.697.793s-.693.236-1.023.262c-.11.008-.155.2-.062.257c.283.172.624.42.793.697s.237.693.262 1.023c.009.11.2.155.258.061c.172-.282.42-.623.697-.792s.692-.237 1.022-.262c.11-.009.156-.2.062-.258c-.283-.172-.624-.42-.793-.697s-.236-.692-.262-1.022M14.704 4.002l-.242-.306c-.937-1.183-1.405-1.775-1.95-1.688c-.545.088-.806.796-1.327 2.213l-.134.366c-.149.403-.223.604-.364.752c-.143.148-.336.225-.724.38l-.353.141l-.248.1c-1.2.48-1.804.753-1.881 1.283c-.082.565.49 1.049 1.634 2.016l.296.25c.325.275.488.413.58.6c.094.187.107.403.134.835l.024.393c.093 1.52.14 2.28.634 2.542s1.108-.147 2.336-.966l.318-.212c.35-.233.524-.35.723-.381c.2-.032.402.024.806.136l.368.102c1.422.394 2.133.591 2.52.188c.388-.403.196-1.14-.19-2.613l-.099-.381c-.11-.419-.164-.628-.134-.835s.142-.389.365-.752l.203-.33c.786-1.276 1.179-1.914.924-2.426c-.254-.51-.987-.557-2.454-.648l-.379-.024c-.417-.026-.625-.039-.806-.135c-.18-.096-.314-.264-.58-.6m-5.869 9.324C6.698 14.37 4.919 16.024 4.248 18c-.752-4.707.292-7.747 1.965-9.637c.144.295.332.539.5.73c.35.396.852.82 1.362 1.251l.367.31l.17.145c.005.064.01.14.015.237l.03.485c.04.655.08 1.294.178 1.805"
                ></path>
              </svg>
            </div>
            <div className="card-content">
              <p className="title">{buyersCount} Purchases</p>
              <p className="plain">
                <span>{course?.price}</span>
                <span>EGP</span>
              </p>
              <p className="description">
                Unlock skills with practical lessons that make learning exciting!
              </p>
              <button
                className="card-btn"
                onClick={handlePayment}
                disabled={loadingPayment || isEnrolled}
              >
                {isEnrolled ? "Already Enrolled" : loadingPayment ? "Processing..." : "Enroll Now"}
              </button>
              <div className="card-separate">
                <div className="separate"></div>
                <p>FEATURES</p>
                <div className="separate"></div>
              </div>
              <div className="card-list-features">
                <div className="option">
                  <svg
                    viewBox="0 0 24 24"
                    height="14"
                    width="14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      strokeWidth="2"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                    >
                      <rect rx="4" y="3" x="3" height="18" width="18"></rect>
                      <path d="m9 12l2.25 2L15 10"></path>
                    </g>
                  </svg>
                  <p>Hands-on practical lessons</p>
                </div>
                <div className="option">
                  <svg
                    viewBox="0 0 24 24"
                    height="14"
                    width="14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      strokeWidth="2"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                    >
                      <rect rx="4" y="3" x="3" height="18" width="18"></rect>
                      <path d="m9 12l2.25 2L15 10"></path>
                    </g>
                  </svg>
                  <p>Step-by-step tutorials</p>
                </div>
                <div className="option">
                  <svg
                    viewBox="0 0 24 24"
                    height="14"
                    width="14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      strokeWidth="2"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                    >
                      <rect rx="4" y="3" x="3" height="18" width="18"></rect>
                      <path d="m9 12l2.25 2L15 10"></path>
                    </g>
                  </svg>
                  <p>Learn at your own pace</p>
                </div>
                <div className="option">
                  <svg
                    viewBox="0 0 24 24"
                    height="14"
                    width="14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      strokeWidth="2"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                    >
                      <rect rx="4" y="3" x="3" height="18" width="18"></rect>
                      <path d="m9 12l2.25 2L15 10"></path>
                    </g>
                  </svg>
                  <p>Real-world projects</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <TestimonialsSwiper />
<ChatBot/>
      <Footer />
    </>
  );
};

export default ViewCourse;
