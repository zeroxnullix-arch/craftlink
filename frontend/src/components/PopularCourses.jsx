import React, { useState } from "react";
import CourseCard from "./CourseCard";
import { useTranslation } from "react-i18next";
const PopularCourses = ({ courses = [], title = "Popular Courses", limit = 12 }) => {
   const { i18n, t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(courses.length / limit);
  const startIndex = (currentPage - 1) * limit;
  const currentCourses = courses.slice(startIndex, startIndex + limit);

const getTotalDuration = (lectures = []) => {
  const totalSeconds = lectures.reduce((acc, lec) => {
    const duration = Number(lec?.duration || 0);
    return acc + duration;
  }, 0);

  if (totalSeconds <= 0) return "0s";

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  let result = "";

  if (hours > 0) result += `${hours}h `;
  if (minutes > 0) result += `${minutes}m `;
  if (seconds > 0 || (!hours && !minutes)) result += `${seconds}s`;

  return result.trim();
};
  const maxVisible = 3;

  let startPage = Math.max(currentPage - 1, 1);
  let endPage = startPage + maxVisible - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - maxVisible + 1, 1);
  }
  return (
    <section className="container-wrapper section-layout popular-courses">
      <h2>{t(title)}</h2>

      <div className="course-grid">
        {currentCourses.map((course) => (
          <CourseCard
            key={course._id}
            title={course.title}
            image={course.thumbnail}
            instructor={course.creator?.name}
            hours={getTotalDuration(course.lectures)}
            lectures={course.lectures?.length}
            level={course.level}
            price={course.price}
            tag={course.category}
            courseId={course._id}
            reviews={course.reviews}
          />
        ))}
      </div>

      {/* 🔥 Pagination بدل See More */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            {t("Prev")}
          </button>

          {/* الصفحات */}
          {startPage > 1 && (
            <>
              <button onClick={() => setCurrentPage(1)}>1</button>
              {startPage > 2 && <span className="dots">...</span>}
            </>
          )}

          {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
            const page = startPage + i;
            return (
              <button
                key={page}
                className={currentPage === page ? "active" : ""}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            );
          })}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <span className="dots">...</span>}
              <button onClick={() => setCurrentPage(totalPages)}>
                {totalPages}
              </button>
            </>
          )}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            {t("Next")}
          </button>
        </div>
      )}
    </section>
  );
};

export default PopularCourses;