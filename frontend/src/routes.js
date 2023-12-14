// Rutas
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Movies from "./components/Movies";
import MoviePage from "./components/MoviePage";
import Reviews from "./components/ReviewsList";
import ReviewPost from "./components/ReviewsPost";
import ReviewPage from "./components/ReviewPage"
import DiscussionsList from "./components/DiscussionsList";
import DiscussionsPost from "./components/DiscussionsPost";
import DiscussionPage from "./components/DiscussionPage";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";

const publicRoutes = [
    { path: '/login', component: Login, showNavbar: false },
    { path: '/register', component: Register, showNavbar: false },
    // TODO: Recuperar contraseña
  ];
  
  const protectedRoutes = [
    { path: '/', component: Home },
    { path: '/movies', component: Movies },
    { path: '/movies/:movieId', component: MoviePage },
    { path: '/reviews', component: Reviews },
    { path: '/reviews/:movieId', component: ReviewPost },
    { path: '/reviews/:movieId/:reviewId', component: ReviewPage },
    { path: '/discussions', component: DiscussionsList },
    { path: '/discussions/:movieId', component: DiscussionsPost },
    { path: '/discussions/:movieId/:discussionId', component: DiscussionPage },
    { path: '/profile', component: Profile },
    { path: '*', component: NotFound }
  ];

export { protectedRoutes, publicRoutes }