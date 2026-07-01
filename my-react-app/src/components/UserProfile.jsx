import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./UserProfile.css";

const UserProfile = ({ userProfile }) => {
  const [savedStyles, setSavedStyles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSavedStyles = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const response = await axios.get('http://localhost:5000/athire/saved-styles', {
          headers: { 
            Authorization: `Bearer ${token}` 
          }
        });
        setSavedStyles(response.data.styles);
      } catch (err) {
        setError('Failed to load saved styles');
      } finally {
        setLoading(false);
      }
    };

    if (userProfile) {
      fetchSavedStyles();
    }
  }, [userProfile]);

  if (!userProfile) return <div>Please log in to view your profile.</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-photo-container">
          <div className="profile-photo">
            {userProfile.profileImage ? (
              <img src={userProfile.profileImage} alt={userProfile.firstName} />
            ) : (
              <div className="profile-initial">
                {userProfile.firstName?.[0]}
              </div>
            )}
          </div>
        </div>
        <div className="user-info-container">
          <h1 className="user-name">
            {`${userProfile.firstName} ${userProfile.lastName || ''}`}
          </h1>
          <div className="user-credentials">
            <p>Email: {userProfile.email}</p>
            {userProfile.city && <p>Location: {`${userProfile.city}, ${userProfile.country}`}</p>}
            {userProfile.dateOfBirth && <p>Date of Birth: {new Date(userProfile.dateOfBirth).toLocaleDateString()}</p>}
          </div>
        </div>
      </div>

      <div className="saved-styles-container">
        <h2 className="saved-styles-title">Saved Styles</h2>
        {loading ? (
          <div>Loading saved styles...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : savedStyles.length === 0 ? (
          <div>No saved styles yet.</div>
        ) : (
          <div className="saved-styles-grid">
            {savedStyles.map((style) => (
              <div key={style.id} className="saved-style-item">
                <img
                  src={style.image}
                  alt={style.title}
                  className="saved-style-image"
                />
                <p className="saved-style-title">{style.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;