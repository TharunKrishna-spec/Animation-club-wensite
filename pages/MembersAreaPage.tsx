import React, { useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import useScrollAnimation from '../hooks/useScrollAnimation';
import ImageWithShimmer from '../components/ImageWithShimmer';

const MembersAreaPage: React.FC = () => {
  const { user, login } = useAuth();
  const googleButtonRef = useRef<HTMLDivElement>(null);
  const { ref: titleRef, isVisible: isTitleVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: contentRef, isVisible: isContentVisible } = useScrollAnimation<HTMLDivElement>();

  useEffect(() => {
    // Prevent rendering button if user is already logged in or if the Google library isn't loaded
    if (user || !window.google || !googleButtonRef.current) {
      return;
    }

    const handleCredentialResponse = (response: any) => {
      login(response.credential);
    };

    try {
        window.google.accounts.id.initialize({
            // IMPORTANT: Replace with your actual Google Client ID from Google Cloud Console
            client_id: '1234567890-a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6.apps.googleusercontent.com',
            callback: handleCredentialResponse,
        });

        window.google.accounts.id.renderButton(
            googleButtonRef.current,
            { theme: 'filled_black', size: 'large', type: 'standard', text: 'signin_with', shape: 'pill' }
        );
        
    } catch (error) {
        console.error("Error initializing Google Sign-In", error);
    }

  }, [user, login]);

  return (
    <div className="pt-28 md:pt-32 pb-16 md:pb-20 bg-gray-100 dark:bg-transparent min-h-screen flex items-center">
      <div className="container mx-auto px-6">
        <div ref={titleRef} className="scroll-animate zoom-in text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold font-orbitron text-gray-900 dark:text-white">Members Area</h1>
        </div>
        
        <div ref={contentRef} className="scroll-animate slide-up bg-white dark:bg-gray-900/50 p-6 sm:p-8 md:p-12 rounded-2xl shadow-2xl max-w-4xl mx-auto">
          {user ? (
            <div className="text-center animate-fade-in-up">
              <ImageWithShimmer
                src={user.picture}
                alt={user.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-amber-400 shadow-lg object-cover"
                wrapperClassName="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome, {user.given_name || user.name}!</h2>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">You are now logged in to the Animation Club portal.</p>
              
              <div className="mt-8 text-left bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Your Profile</h3>
                  <p className="text-gray-700 dark:text-gray-300"><strong>Full Name:</strong> {user.name}</p>
                  <p className="text-gray-700 dark:text-gray-300"><strong>Email:</strong> {user.email}</p>
              </div>

              <div className="mt-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Exclusive Content</h3>
                <p className="text-gray-600 dark:text-gray-400">Here you will find exclusive workshops, resources, and project files available only to members. Stay tuned for more!</p>
              </div>
            </div>
          ) : (
            <div className="text-center animate-fade-in-up">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Join the Inner Circle</h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                Sign in with your Google account to access exclusive content, workshop materials, and connect with other members of the Animation Club.
              </p>
              <div className="mt-8 flex justify-center">
                <div ref={googleButtonRef} className="google-btn-container"></div>
              </div>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-500">
                By signing in, you agree to our community guidelines.
              </p>
            </div>
          )}
        </div>
      </div>
       <style>{`
        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default MembersAreaPage;