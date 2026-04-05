const FeatureCard = ({ icon: Icon, text }) => (
  <div className="feature-card">
    <Icon className="feature-icon" />
    <span className="feature-text">{text}</span>
  </div>
);

export default FeatureCard;
