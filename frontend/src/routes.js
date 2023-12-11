// Rutas
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Movies from "./components/Movies";
import MoviePage from "./components/MoviePage";
import Reviews from "./components/ReviewsList";
import ReviewPost from "./components/ReviewsPost";
import ReviewPage from "./components/ReviewPage"
import Discussions from "./components/Discussions";
import Discussions from "./components/DiscussionsPost";
import Discussions from "./components/DiscussionsPage";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";

const publicRoutes = [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    // TODO: Recuperar contraseña
  ];
  
  const protectedRoutes = [
    { path: '/', component: Home },
    { path: '/movies', component: Movies },
    { path: '/movies/:movieId', component: MoviePage },
    { path: '/reviews', component: Reviews },
    { path: '/reviews/:movieId', component: ReviewPost },
    { path: '/reviews/:movieId/:reviewId', component: ReviewPage },
    { path: '/discussions', component: Discussions },
    { path: '/discussions/:movieId', component: ReviewPost },
    { path: '/discussions/:movieId/:discussionId', component: ReviewPage },
    { path: '/profile', component: Profile },
    { path: '*', component: NotFound }
    // Más rutas protegidas...
  ];

export { protectedRoutes, publicRoutes }