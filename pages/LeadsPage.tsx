import React, { useState, useEffect } from 'react';
import { leads as mockLeads } from '../services/mockData';
import type { Lead } from '../types';
import Spinner from '../components/Spinner';
import useScrollAnimation from '../hooks/useScrollAnimation';
import ImageWithShimmer from '../components/ImageWithShimmer';

const LeadModal: React.FC<{ lead: Lead | null; onClose: () => void }> = ({ lead, onClose }) => {
  if (!lead) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 scale-95 animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
         <div className="relative p-8">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white text-3xl">&times;</button>
            <div className="flex flex-col md:flex-row items-center gap-8">
                <ImageWithShimmer
                  src={lead.imageUrl}
                  alt={lead.name}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.5)]"
                  wrapperClassName="w-32 h-32 md:w-40 md:h-40 rounded-full"
                />
                <div className="text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">{lead.name}</h2>
                    <p className="text-xl text-amber-300 font-semibold">{lead.role}</p>
                    <div className="flex justify-center md:justify-start space-x-4 mt-4">
                       <a href={lead.socials.instagram} className="text-gray-400 hover:text-white transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.04c-5.5 0-10 4.49-10 10s4.5 10 10 10 10-4.49 10-10-4.5-10-10-10zm0 18.2c-4.52 0-8.2-3.68-8.2-8.2s3.68-8.2 8.2-8.2 8.2 3.68 8.2 8.2-3.68 8.2-8.2 8.2z"/><path d="M12 7.02c-2.75 0-4.98 2.23-4.98 4.98s2.23 4.98 4.98 4.98 4.98-2.23 4.98-4.98-2.23-4.98-4.98-4.98zm0 8.16c-1.75 0-3.18-1.43-3.18-3.18s1.43-3.18 3.18-3.18 3.18 1.43 3.18 3.18-1.43 3.18-3.18 3.18zM16.95 6.05c-.5 0-.9.4-.9.9s.4.9.9.9.9-.4.9-.9-.4-.9-.9-.9z"/></svg></a>
                       <a href={lead.socials.linkedin} className="text-gray-400 hover:text-white transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <h3 className="text-lg font-semibold text-white">Achievements</h3>
                <ul className="list-disc list-inside mt-2 text-gray-400 space-y-1">
                    {lead.achievements.map((ach, i) => <li key={i}>{ach}</li>)}
                </ul>
            </div>
         </div>
      </div>
      <style>{`
        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

interface LeadCardProps {
  lead: Lead;
  delay: number;
  onClick: () => void;
  animationType: 'slide-left' | 'slide-right';
}

const LeadCard: React.FC<LeadCardProps> = ({ lead, delay, onClick, animationType }) => {
    const { ref } = useScrollAnimation<HTMLDivElement>();

    return (
        <div 
            ref={ref}
            className={`group scroll-animate ${animationType} lead-card text-center cursor-pointer transition-transform active:scale-95`} 
            style={{ transitionDelay: `${delay}ms` }}
            onClick={onClick}
        >
            <div className="relative inline-block">
                <ImageWithShimmer
                  src={lead.imageUrl}
                  alt={lead.name}
                  className="w-48 h-48 rounded-full object-cover mx-auto"
                  wrapperClassName="w-48 h-48 rounded-full"
                />
                <div className="border-overlay absolute inset-0 rounded-full border-4 border-transparent"></div>
            </div>
            <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">{lead.name}</h3>
            <p className="text-amber-400 dark:text-amber-300">{lead.role}</p>
        </div>
    );
};

const LeadsPage: React.FC = () => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const { ref: titleRef } = useScrollAnimation<HTMLDivElement>();

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setLeads(mockLeads);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pt-24 pb-16 md:pb-20 bg-gray-100 dark:bg-transparent min-h-screen">
      <div className="container mx-auto px-6">
        <div ref={titleRef} className="scroll-animate zoom-in text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold font-orbitron text-gray-900 dark:text-white">Meet Our Leaders</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">The visionaries guiding our creative journey.</p>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {leads.map((lead, index) => {
              const animationType = index % 2 === 0 ? 'slide-right' : 'slide-left';
              return (
                <LeadCard 
                  key={lead.id} 
                  lead={lead} 
                  delay={index * 150} 
                  onClick={() => setSelectedLead(lead)}
                  animationType={animationType}
                />
              );
            })}
          </div>
        )}
      </div>
      <LeadModal lead={selectedLead} onClose={() => setSelectedLead(null)} />
    </div>
  );
};

export default LeadsPage;