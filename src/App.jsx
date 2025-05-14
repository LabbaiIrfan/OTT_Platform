import { useEffect, useContext, lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./App.css";

// Import lazy-loaded pages
const Home = lazy(() => import("./Pages/Home"));
const Series = lazy(() => import("./Pages/Series"));
const Search = lazy(() => import("./Pages/Search"));
const Profile = lazy(() => import("./Pages/Profile"));
const MyList = lazy(() => import("./Pages/MyList"));
const SignIn = lazy(() => import("./Pages/SignIn"));
const SignUp = lazy(() => import("./Pages/SignUp"));
const Welcome = lazy(() => import("./Pages/Welcome"));
const ErrorPage = lazy(() => import("./Pages/ErrorPage"));
const Play = lazy(() => import("./Pages/Play"));
const LikedMovies = lazy(() => import("./Pages/LikedMovies"));
const History = lazy(() => import("./Pages/History"));
const LanguageSelection = lazy(() => import("./Pages/LanguageSelection")); 

import { AuthContext } from "./Context/UserContext";
import Loading from "./componets/Loading/Loading";
import Navbar from "./componets/Header/Navbar";
import NavbarWithoutUser from "./componets/Header/NavbarWithoutUser";

function App() {
  const { User, setUser, setLanguageSetup, languagesSetup } = useContext(AuthContext);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        
        try {
          // Check if user has completed language setup
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          const userData = userDoc.data();
          
          // Set language setup status
          setLanguageSetup(userData?.languagesSetup || false);
        } catch (error) {
          console.error('Error checking user language setup:', error);
          setLanguageSetup(false);
        }
      } else {
        setUser(null);
        setLanguageSetup(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {User ? <Navbar /> : <NavbarWithoutUser />}
      <Suspense replace fallback={<Loading />}>
        <Routes>
          {/* Modify root route to handle language selection */}
          <Route 
            index 
            path="/" 
            element={
              User ? (
                // Check if language setup is complete
                languagesSetup ? (
                  <Home />
                ) : (
                  <LanguageSelection />
                )
              ) : (
                <Welcome />
              )
            } 
          />
          
          {/* Add explicit route for language selection */}
          <Route path="/language-setup" element={<LanguageSelection />} />

          {User ? (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/series" element={<Series />} />
              <Route path="/search" element={<Search />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/mylist" element={<MyList />} />
              <Route path="/liked" element={<LikedMovies />} />
              <Route path="/history" element={<History />} />
              <Route path="/play/:id" element={<Play />} />
            </>
          ) : null}

          <Route path="/play/:id" element={<Play />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;