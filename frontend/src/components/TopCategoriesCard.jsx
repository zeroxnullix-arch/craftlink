const TopCategoriesCard = ({ img: Img, text }) => (
  <div className="TopCategories-card">
    <img src={Img} className="TopCategories-img" />
    <span className="TopCategories-text">{text}</span>
  </div>
);

export default TopCategoriesCard;
