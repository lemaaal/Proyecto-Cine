import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import UserReviews from './UserReviews';
// import FavoriteMoviesList from './FavoriteMoviesList';
// import WatchList from './WatchList';
// import ProfilePicture from './ProfilePicture';
// import FollowersList from './FollowersList';
// import FollowingList from './FollowingList';
// import Biography from './Biography';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/profile'); 
        setUserData(response.data);
      } catch (error) {
        console.error('Error al cargar datos del perfil:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <div>Cargando perfil...</div>;
  }

  return (
    <div className="user-profile">
      {/* <ProfilePicture imageUrl={userData.profilePicture} /> */}
      <h1>{userData.name}</h1>
      {/* <Biography text={userData.biography} />
      <UserReviews reviews={userData.reviews} />
      <FavoriteMoviesList movies={userData.favoriteMovies} />
      <WatchList movies={userData.watchList} />
      <FollowersList followers={userData.followers} />
      <FollowingList following={userData.following} /> */}
    </div>
  );
};

export default UserProfile;
