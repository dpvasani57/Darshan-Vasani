import User from "./User";
import UserClass from "./UserClass";
import "./About.css";

const About = () => {
    return (
        <div className="about-page">
            <h1>About</h1>
            <p className="about-subtitle">Welcome! This project demonstrates a modern React application with beautiful UI, dynamic routing, and live GitHub user data.</p>
            <div className="about-section-label">Developer</div>
            <div className="user-cards-row">
                <div className="user-card-wrapper">
                    <div className="user-card-title">Function-based User Card</div>
                    <User />
                </div>
                <div className="user-card-wrapper">
                    <div className="user-card-title">Class-based User Card</div>
                    <UserClass />
                </div>
            </div>
        </div>
    );
}

// Export the About component
export default About;