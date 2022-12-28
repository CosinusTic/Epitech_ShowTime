import React from 'react';

class UserProfile extends React.Component {
  render() {
    const { name, age, favoriteConcerts, profileImage, description } = this.props;
    return (
      <div>
        <h1>{name}</h1>
        <p>{age} years old</p>
        <h2>Favorite concerts</h2>
        <ul>
          {favoriteConcerts.map(concert => (
            <li key={concert}>{concert}</li>
          ))}
        </ul>
        <img src={profileImage} alt={`Profile image for ${name}`} />
        <p>{description}</p>
      </div>
    );
  }
}

export default UserProfile;
