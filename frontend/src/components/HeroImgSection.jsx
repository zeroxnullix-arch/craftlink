import React from 'react'
import image from "../assets/img/BgIntro.jpg";
import { FaLocationArrow, FaPlay } from "react-icons/fa";
import picProfile from "../assets/img/picProfile.jpg";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
const HeroImgSection = () => {
    const { i18n, t } = useTranslation();
    const navigate = useNavigate();
    return (
        <section className="section-main intro">
            <div className="left section-layout">
                <div className="text-intro-container">

                    <h2>
                        {t("unlock your")} <span>{t("creative potential")}</span> & {t("start your career")}
                        <span>!</span>
                    </h2>
                    <p className="text">
                        {t("master creative skills, explore endless learning opportunities, start today and transform your future.")}
                    </p>
                    <div className="btn-group">
                        <button className="join-now" onClick={() => navigate("/signup")}>{t("join now")}</button>
                        <button className="learn-more" onClick={() => navigate("/about")}>
                            <span>{t("Learn More")}</span>
                            <FaLocationArrow />
                        </button>
                    </div>
                    <div className="cft-reviews">
                        <div className="images">
                            <img src={picProfile} alt="" />
                            <img src={picProfile} alt="" />
                            <img src={picProfile} alt="" />
                            <img src={picProfile} alt="" />
                        </div>
                        <div className="content">
                            <p>{t("Trusted by")} +100{t("K")} {t("Clients")}</p>
                            <div className="reviews">
                                <span className="stars">
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                </span>
                                <span>4.5/5 (25{t("K")} {t("Reviews")})</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="img-intro-container">
                    <img src={image} className="inverted-radius" alt="intro" />
                    <button onClick={() => navigate("/search")}>
                        <FaPlay />
                    </button>
                </div>
            </div>
        </section>
    )
}

export default HeroImgSection