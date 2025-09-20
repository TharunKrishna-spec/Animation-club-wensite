import React from 'react';
import { Link } from 'react-router-dom';

const SocialIcon: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-300 transition-all duration-300 transform hover:-translate-y-1 hover:scale-110 active:scale-100">
    {children}
  </a>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900/50 text-gray-300 py-12 border-t border-amber-900/50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-xl font-orbitron font-bold text-white mb-4">Animation Club VITC</h3>
            <p className="text-sm text-gray-400">Creativity in Motion. Join us to explore the world of animation and visual storytelling.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/departments" className="hover:text-amber-300 transition-colors inline-block transform transition-transform active:scale-95">Departments</Link></li>
              <li><Link to="/events" className="hover:text-amber-300 transition-colors inline-block transform transition-transform active:scale-95">Events</Link></li>
              <li><Link to="/leads" className="hover:text-amber-300 transition-colors inline-block transform transition-transform active:scale-95">Our Leads</Link></li>
              <li><Link to="/members" className="hover:text-amber-300 transition-colors inline-block transform transition-transform active:scale-95">Join Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Connect With Us</h3>
            <div className="flex justify-center md:justify-start space-x-6">
              <SocialIcon href="#">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c-4.42 0-7.74 3.632-7.74 8.182 0 3.58 2.36 6.63 5.58 7.69.41.08.56-.18.56-.39v-1.38c-2.29.5-2.77-1.11-2.77-1.11-.37-.95-1-1.2-1-1.2-.75-.51.06-.5.06-.5.83.06 1.26.85 1.26.85.74 1.27 1.94.9 2.41.69.07-.54.29-.9.52-1.11-1.84-.21-3.77-.92-3.77-4.1 0-.9.32-1.64.85-2.21-.08-.21-.37-1.04.08-2.18 0 0 .69-.22 2.27.85.66-.18 1.36-.27 2.05-.27.69 0 1.39.09 2.05.27 1.58-1.07 2.27-.85 2.27-.85.45 1.14.16 1.97.08 2.18.53.57.85 1.3.85 2.21 0 3.19-1.93 3.89-3.78 4.09.3.26.55.78.55 1.57v2.27c0 .22.15.48.56.39 3.22-1.06 5.58-4.11 5.58-7.69 0-4.55-3.32-8.182-7.74-8.182z" clipRule="evenodd" /></svg>
              </SocialIcon>
              <SocialIcon href="#">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.04c-5.5 0-10 4.49-10 10s4.5 10 10 10 10-4.49 10-10-4.5-10-10-10zm0 18.2c-4.52 0-8.2-3.68-8.2-8.2s3.68-8.2 8.2-8.2 8.2 3.68 8.2 8.2-3.68 8.2-8.2 8.2z"/><path d="M12 7.02c-2.75 0-4.98 2.23-4.98 4.98s2.23 4.98 4.98 4.98 4.98-2.23 4.98-4.98-2.23-4.98-4.98-4.98zm0 8.16c-1.75 0-3.18-1.43-3.18-3.18s1.43-3.18 3.18-3.18 3.18 1.43 3.18 3.18-1.43 3.18-3.18 3.18zM16.95 6.05c-.5 0-.9.4-.9.9s.4.9.9.9.9-.4.9-.9-.4-.9-.9-.9z"/></svg>
              </SocialIcon>
               <SocialIcon href="#">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </SocialIcon>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Animation Club VITC. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;