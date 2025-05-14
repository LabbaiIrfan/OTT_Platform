import React, { useState } from "react";
import styles from "./styles.module.scss";

function Footer2() {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const languages = [
    "English", 
    "Spanish", 
    "French", 
    "German", 
    "Italian", 
    "Portuguese", 
    "Russian", 
    "Chinese", 
    "Japanese", 
    "Korean"
  ];

  return (
    <div className="bg-black p-2">
      <footer className={`${styles.footer} text-gray-300`}>
        <div className={styles.containerFooter}>
          <div className={styles.icons}>
            {/* Facebook Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 hover:text-blue-500 transition-colors fill-current">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
            
            {/* Twitter Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 hover:text-blue-400 transition-colors fill-current">
              <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
            </svg>
            
            {/* Instagram Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 hover:text-pink-500 transition-colors fill-current">
              <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6m9.65 1.5a1.25 1.25 0 1 1-1.25 1.25 1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 1 1-5 5 5 5 0 0 1 5-5m0 2a3 3 0 1 0 3 3 3 3 0 0 0-3-3z"/>
            </svg>
            
            {/* YouTube Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 hover:text-red-600 transition-colors fill-current">
              <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>
            </svg>
            
            {/* LinkedIn Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 hover:text-blue-600 transition-colors fill-current">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
            </svg>
          </div>
          <ul className={`${styles.details} hover:text-white`}>
            <li className="hover:text-blue-300 transition-colors">FAQ</li>
            <li className="hover:text-blue-300 transition-colors">Investor Relations</li>
            <li className="hover:text-blue-300 transition-colors">Privacy</li>
            <li className="hover:text-blue-300 transition-colors">Speed Test</li>
            <li className="hover:text-blue-300 transition-colors">Help Center</li>
            <li className="hover:text-blue-300 transition-colors">Jobs</li>
            <li className="hover:text-blue-300 transition-colors">Cookie Preference</li>
            <li className="hover:text-blue-300 transition-colors">Legal Notices</li>
            <li className="hover:text-blue-300 transition-colors">Account</li>
            <li className="hover:text-blue-300 transition-colors">Ways to Watch</li>
            <li className="hover:text-blue-300 transition-colors">Corporate Information</li>
            <li className="hover:text-blue-300 transition-colors">iOS</li>
            <li className="hover:text-blue-300 transition-colors">Android</li>
          </ul>
          <div className={styles.security}>
            <div 
              className="relative"
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            >
              <div className="flex items-center justify-between border border-gray-600 px-3 py-2 rounded-md cursor-pointer hover:border-white transition-all">
                {/* Globe Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h0A2.5 2.5 0 0013 5.5v-2.465c.27.192.676.4 1.5.5 1.5.2 1.5-1 3-1a3 3 0 013 3c0 1-.333 1.667-1 2-.667.333-1 1-1 2v1c0 1.333.667 2 2 2h1.945M15 20.888V18.5a2.5 2.5 0 012.5-2.5h0a2.5 2.5 0 002.5-2.5v-2.465c-.27.192-.676.4-1.5.5-1.5.2-1.5-1-3-1a3 3 0 00-3 3v1a3 3 0 01-3 3 3 3 0 00-3 3v2.95z" />
                </svg>
                <span>{selectedLanguage}</span>
                {/* Chevron Down Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {isLanguageOpen && (
                <ul className="absolute left-0 right-0 top-full mt-1 bg-[#16213e] border border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto z-10">
                  {languages.map((lang) => (
                    <li 
                      key={lang}
                      className="px-3 py-2 hover:bg-[#0f3460] cursor-pointer transition-colors"
                      onClick={() => {
                        setSelectedLanguage(lang);
                        setIsLanguageOpen(false);
                      }}
                    >
                      {lang}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <span className="text-gray-400 mt-2 md:mt-0 md:ml-4">© 1997-2024 Globix, Inc.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer2;