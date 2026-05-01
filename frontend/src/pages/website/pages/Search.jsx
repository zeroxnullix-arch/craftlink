import React, { useState, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import PopularCourses from "../../../components/PopularCourses";
import { BsStars } from "react-icons/bs";
import { HiMiniLanguage } from "react-icons/hi2";
import { useTranslation } from "react-i18next";
const AICourseSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [lang, setLang] = useState("auto");
 const { i18n, t } = useTranslation();
  const courses = useSelector((s) => Object.values(s.course.courseData));
  const debounceRef = useRef(null);
  const abortRef = useRef(null);

  const detectLang = (text) => (/[\u0600-\u06FF]/.test(text) ? "ar" : "en");

  const handleSearch = (value) => {
    setSearchTerm(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      if (!value.trim()) {
        setResults([]);
        return;
      }

      try {
        const res = await axios.post("/api/search", {
          query: value,
        });

        setResults(res.data || []);
      } catch (err) {
        console.error(err);
      }
    }, 350); // 👈 خليها 300–500ms أفضل أداء
  };

  const startVoiceSearch = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SR) return alert("Not supported");

    const recognition = new SR();

    recognition.lang = lang === "en" ? "en-US" : "ar-EG";

    recognition.interimResults = true;
    recognition.continuous = false;

    let finalText = "";

    let silenceTimer;

    recognition.start();

    recognition.onresult = (event) => {
      let interimText = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalText += transcript + " ";
        } else {
          interimText += transcript;
        }
      }

      const fullText = finalText + interimText;

      setSearchTerm(fullText);
      handleSearch(fullText);

      clearTimeout(silenceTimer);

      silenceTimer = setTimeout(() => {
        recognition.stop();
      }, 1200);
    };

    recognition.onerror = (e) => {
      console.error("Voice error:", e);
      recognition.stop();
    };

    recognition.onend = () => {
      console.log("Voice stopped");
    };
  };

  return (
    <div>
      <div className="full-width">

        <Header />
      </div>
      <div className="search-container">
        <div className="wavy"></div>
        <h2>{t("Search")}</h2>
        <div class="search-orb-container">
          <div class="gooey-background-layer">
            <div class="blob blob-1"></div>
            <div class="blob blob-2"></div>
            <div class="blob blob-3"></div>
            <div class="blob-bridge"></div>
          </div>

          <div class="input-overlay">
            <div class="search-icon-wrapper">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="search-icon"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              class="modern-input"
              placeholder={t("Search courses placeholder")}
            />
            <div className="btn-search-actions">

              <button onClick={startVoiceSearch} className="btn-search-voice"><BsStars /></button>
              {/* <button onClick={startVoiceSearch} className="btn-search-voice"><HiMiniLanguage/></button> */}
              <div className="lang-dropdown">
                <button className="lang-active-btn">
                  <HiMiniLanguage/>
                  {lang === "auto"
                    ? t("Auto Detect")
                    : lang === "ar"
                      ? t("Arabic")
                      : t("English")}
                </button>

                <div className="lang-menu">
                  <button onClick={() => setLang("auto")}>
                    {t("Auto Detect")}
                  </button>

                  <button onClick={() => setLang("ar")}>
                    {t("Arabic")}
                  </button>

                  <button onClick={() => setLang("en")}>
                    {t("English")}
                  </button>
                </div>
              </div>
            </div>
            <div class="focus-indicator"></div>
          </div>

          <svg class="gooey-svg-filter" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="enhanced-goo">
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="12"
                  result="blur"
                ></feGaussianBlur>
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
                  result="goo"
                ></feColorMatrix>
                <feComposite in="SourceGraphic" in2="goo" operator="atop"></feComposite>
              </filter>
            </defs>
          </svg>
        </div>

      </div>




      {/* <div className="container" style={{ marginTop: 20 }}>
        <h1>AI Smart Search</h1>
        <select value={lang} onChange={(e) => setLang(e.target.value)}>
          <option value="auto">Auto Detect</option>
          <option value="ar">Arabic</option>
          <option value="en">English</option>
        </select>


      </div> */}
      <PopularCourses
        courses={results.length ? results : courses}
        title={t("Results")}
        limit={12}
      />
      <Footer />
    </div>
  );
};

export default AICourseSearch;