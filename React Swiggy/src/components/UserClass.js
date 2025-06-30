import React from 'react';

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    // Initial state with default values
    this.state = {
      name: "Darshan Vasani",
      age: 22,
      location: "Ahmedabad, Gujarat",
      avatar_url: "",
      bio: "",
    };
  }

  async componentDidMount() {
    // Fetch data from GitHub API for user "dpvasani"
    const response = await fetch("https://api.github.com/users/dpvasani");
    const data = await response.json();

    // Update the state with data from GitHub
    this.setState({
      name: data.name || "Darshan Vasani",
      location: data.location || "Ahmedabad, Gujarat",
      avatar_url: data.avatar_url,
      bio: data.bio || "",
    });
  }

  render() {
    const { name, location, avatar_url, bio } = this.state;

    return (
      <div className="user-card user-card-horizontal">
        {avatar_url && (
          <div className="user-card-photo">
            <img src={avatar_url} alt="avatar" width="110" />
          </div>
        )}
        <div className="user-card-details">
          <div className="user-detail-row"><span className="user-detail-key">Name:</span> <span className="user-detail-value">{name}</span></div>
          <div className="user-detail-row"><span className="user-detail-key">Location:</span> <span className="user-detail-value">{location}</span></div>
          {bio && <div className="user-detail-row"><span className="user-detail-key">Bio:</span> <span className="user-detail-value user-bio">{bio}</span></div>}
        </div>
      </div>
    );
  }
}

export default UserClass;
