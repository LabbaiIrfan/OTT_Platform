import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/UserContext'; 
import Hindi from '../images/hindi.png';
import English from '../images/english.png';
import Tamil from '../images/Tamil.png';
import Telugu from '../images/telugu.png';
// import English from '../images/english.png';
// import English from '../images/english.png';


export default function LanguageSelection() {
    const navigate = useNavigate();
    const { setLanguageSetup } = useContext(AuthContext);
    const [selectedLanguageIds, setSelectedLanguageIds] = useState(['tamil', 'telugu', 'bengali', 'marathi']);

    const languageOptions = [
        { id: 'hindi', name: 'हिन्दी', latinName: 'Hindi', image: Hindi },
        { id: 'english', name: 'English', latinName: 'English', image: English },
        { id: 'tamil', name: 'தமிழ்', latinName: 'Tamil', image: Tamil },
        { id: 'telugu', name: 'తెలుగు', latinName: 'Telugu', image: Telugu },
        { id: 'malayalam', name: 'മലയാളം', latinName: 'Malayalam', image: "/api/placeholder/400/225" },
        { id: 'bengali', name: 'বাংলা', latinName: 'Bengali', image: "/api/placeholder/400/225" },
        { id: 'marathi', name: 'मराठी', latinName: 'Marathi', image: "/api/placeholder/400/225" },
        { id: 'kannada', name: 'ಕನ್ನಡ', latinName: 'Kannada', image: "/api/placeholder/400/225" }
    ];

    const toggleLanguage = (languageId) => {
        if (selectedLanguageIds.includes(languageId)) {
            setSelectedLanguageIds(selectedLanguageIds.filter(id => id !== languageId));
        } else {
            if (selectedLanguageIds.length < 5) {
                setSelectedLanguageIds([...selectedLanguageIds, languageId]);
            }
        }
    };

    const handleContinue = () => {
        // Simply update the language setup in context and navigate
        setLanguageSetup(true);
        navigate('/home');
    };

    return (
        <div className="min-h-screen bg-purple-950 text-white flex flex-col">
            {/* Header */}
            <div className="p-4 pt-8">
                <h1 className="text-xl font-medium mb-1 text-center">Build Your Home Page</h1>
                <div className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                    </svg>
                    <span className="text-2xl font-bold">Choose your favourite languages</span>
                </div>
            </div>

            {/* Language Grid */}
            <div className="flex-1 px-4 py-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {languageOptions.map(lang => (
                        <div
                            key={lang.id}
                            className={`rounded-lg overflow-hidden cursor-pointer relative transform transition-transform duration-200 hover:scale-105 ${selectedLanguageIds.includes(lang.id) ? 'ring-2 ring-white' : ''
                                }`}
                            onClick={() => toggleLanguage(lang.id)}
                        >
                            <div className="relative">
                                <img
                                    src={lang.image}
                                    alt={lang.latinName}
                                    className="w-full aspect-video object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                <div className="absolute top-2 right-2">
                                    <div className={`p-1 rounded-full ${selectedLanguageIds.includes(lang.id) ? 'text-blue-400' : 'text-white/70'}`}>
                                        {selectedLanguageIds.includes(lang.id) ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                            </svg>
                                        )}
                                    </div>
                                </div>
                                <div className="absolute bottom-2 left-2">
                                    <div className="text-xl font-medium">{lang.name}</div>
                                    <div className="text-sm text-gray-300">{lang.latinName}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Continue Button */}
            <div className="p-4 flex justify-center">
                <button
                    onClick={handleContinue}
                    disabled={selectedLanguageIds.length === 0}
                    className="w-64 py-3 rounded-lg text-white font-bold bg-gradient-to-r from-blue-500 to-pink-500 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Continue
                </button>
            </div>

            {/* Footer */}
            <div className="p-4 text-xs text-gray-400 text-center max-w-2xl mx-auto">
                <p>
                    We will use your information to personalize and improve your Globix experience and to send you information about the service. By clicking "Start Watching" you agree to our <a href="#" className="text-gray-300">Terms of Use</a> and acknowledge that you have read our <a href="#" className="text-gray-300">Privacy Policy</a>. JioHotstar will collect your location data and data relating to the other apps installed to offer personalized video suggestions and ads.
                </p>
            </div>
        </div>
    );
}