import React, { useState, useContext, useEffect, useRef } from "react";
import { getAuth, updateProfile, signOut } from "firebase/auth";
import {
  doc, setDoc, getDoc, updateDoc, serverTimestamp,
} from "firebase/firestore";
import { db } from "../Firebase/FirebaseConfig";
import { AuthContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import WelcomePageBanner from "../images/WelcomePageBanner.jpg";

function Profile() {
  const { User } = useContext(AuthContext);
  const [profilePic, setProfilePic] = useState("");
  const [previewPic, setPreviewPic] = useState("");
  const [newFile, setNewFile] = useState(null);
  const [userName, setUserName] = useState("");
  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (User) {
      setProfilePic(User.photoURL);
      loadUserData();
    }
  }, [User]);

  const loadUserData = async () => {
    try {
      const userRef = doc(db, "users", User.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const { photoURL } = userSnap.data();
        if (photoURL) setProfilePic(photoURL);
      } else {
        await setDoc(userRef, {
          displayName: User.displayName || "",
          email: User.email,
          photoURL: User.photoURL || "",
          uid: User.uid,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to load user data.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setNewFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setPreviewPic(ev.target.result);
    reader.readAsDataURL(file);
  };

  const updateProfileInfo = async () => {
    const auth = getAuth();
    const userRef = doc(db, "users", User.uid);
    const updates = {};

    if (userName) {
      updates.displayName = userName;
      try {
        await updateProfile(auth.currentUser, { displayName: userName });
      } catch (error) {
        console.error("Error updating Firebase Auth display name:", error);
        toast.error("Failed to update display name in authentication.");
      }
    }

    if (previewPic && previewPic !== profilePic) { // Only update if picture has changed
      updates.photoURL = previewPic;
      try {
        await updateProfile(auth.currentUser, { photoURL: previewPic });
        setProfilePic(previewPic); // Update local state for immediate visual
      } catch (error) {
        console.error("Error updating Firebase Auth photo URL:", error);
        toast.error("Failed to update profile picture in authentication.");
      }
    }

    if (Object.keys(updates).length > 0) {
      updates.updatedAt = serverTimestamp();
      try {
        const userSnap = await getDoc(userRef);
        userSnap.exists()
          ? await updateDoc(userRef, updates)
          : await setDoc(userRef, {
              ...updates,
              email: User.email,
              uid: User.uid,
              createdAt: serverTimestamp(),
            });
        toast.success("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating user document:", error);
        toast.error("Failed to save profile changes.");
      }
    } else {
      toast("No changes to save.", { icon: 'ℹ️' });
    }
  };

  const SignOut = () => {
    getAuth().signOut().then(() => {
      toast.success("Signed out successfully!");
      navigate("/");
    }).catch(error => {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out.");
    });
  };

  const profileOptions = [
    "https://i.pinimg.com/originals/ba/2e/44/ba2e4464e0d7b1882cc300feceac683c.png",
    "https://i.pinimg.com/736x/db/70/dc/db70dc468af8c93749d1f587d74dcb08.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png",
    "https://ih0.redbubble.net/image.618363037.0853/flat,1000x1000,075,f.u2.jpg",
  ];

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center px-4 py-8"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${WelcomePageBanner})`,
      }}
    >
      <Toaster />
      <div className="bg-gradient-to-br from-gray-900 to-black p-8 md:p-12 rounded-xl shadow-2xl w-full max-w-2xl border border-gray-700">
        <h2 className="text-white text-4xl font-extrabold mb-8 text-center tracking-wide">Edit Profile</h2>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
          <div className="flex-shrink-0">
            <img
              src={
                previewPic || profilePic || "https://www.citypng.com/public/uploads/preview/profile-user-round-red-icon-symbol-download-png-11639594337tco5j3n0ix.png"
              }
              className="w-32 h-32 rounded-full object-cover border-4 border-red-600 shadow-lg transition-transform duration-300 hover:scale-105"
              alt="Profile Avatar"
            />
          </div>

          <div className="flex-1 w-full">
            <div className="mb-6">
              <label htmlFor="username" className="text-gray-300 text-sm font-medium mb-2 block">Username</label>
              <input
                id="username"
                type="text"
                onChange={(e) => setUserName(e.target.value)}
                placeholder={User?.displayName || "Enter your username"}
                className="w-full bg-gray-800 text-white rounded-lg px-5 py-3 outline-none border border-gray-700 focus:ring-2 focus:ring-red-600 focus:border-transparent transition duration-200"
              />
            </div>

            <div className="mb-6">
              <label className="text-gray-300 text-sm font-medium mb-2 block">Email</label>
              <div className="w-full bg-gray-800 text-gray-400 p-3 rounded-lg border border-gray-700 font-mono text-sm">
                {User?.email}
              </div>
            </div>

            <div className="mb-6">
              <label className="text-gray-300 text-sm font-medium mb-2 block">User ID</label>
              <div className="w-full bg-gray-800 text-gray-400 p-3 rounded-lg border border-gray-700 break-words font-mono text-sm">
                {User?.uid}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <label className="text-gray-300 text-lg font-semibold mb-4 block">Choose Your Avatar</label>
          <div className="flex items-center gap-4 flex-wrap">
            {profileOptions.map((url, i) => (
              <img
                key={i}
                src={url}
                onClick={() => setPreviewPic(url)}
                className={`w-16 h-16 rounded-full object-cover cursor-pointer border-2 ${previewPic === url ? 'border-red-600 ring-2 ring-red-600' : 'border-gray-600'} hover:scale-110 transition-all duration-200 shadow-md`}
                alt={`Avatar option ${i + 1}`}
              />
            ))}
            <button
              onClick={() => inputRef.current.click()}
              className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 text-gray-300 border-2 border-gray-600 hover:bg-gray-700 hover:border-gray-500 transition-all duration-200 shadow-md"
              title="Upload custom avatar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </button>
            <input ref={inputRef} onChange={handleFileChange} type="file" className="hidden" accept="image/*" />
          </div>
          {previewPic && !profileOptions.includes(previewPic) && ( // Show preview only for uploaded image
            <div className="mt-6">
              <p className="text-gray-300 text-sm font-medium mb-2">Uploaded Image Preview:</p>
              <img src={previewPic} className="w-full max-h-60 object-contain rounded-lg shadow-xl border border-gray-700" alt="Preview" />
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
          <button
            onClick={SignOut}
            className="flex-1 bg-transparent border border-gray-600 text-gray-300 py-3 rounded-lg hover:bg-gray-800 hover:border-gray-500 transition-all duration-200 text-lg font-medium shadow-md"
          >
            Sign Out
          </button>
          <button
            onClick={userName || previewPic ? updateProfileInfo : () => navigate("/")}
            className="flex-1 bg-red-700 text-white py-3 rounded-lg hover:bg-red-600 transition-all duration-200 text-lg font-medium shadow-md"
          >
            {userName || previewPic ? "Save Changes" : "Back to Home"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;