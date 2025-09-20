import React, { useState, useEffect } from 'react';
import { pastEvents as mockPastEvents, upcomingEvents as mockUpcomingEvents } from '../services/mockData';
import type { PastEvent, UpcomingEvent } from '../types';
import Spinner from '../components/Spinner';
import useScrollAnimation from '../hooks/useScrollAnimation';
import SocialShareButtons from '../components/SocialShareButtons';
import ImageWithShimmer from '../components/ImageWithShimmer';

const PastEventModal: React.FC<{ event: PastEvent | null; onClose: () => void }> = ({ event, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    // Reset index when a new event is selected
    if (event) {
      setCurrentIndex(0);
    }
  }, [event]);

  if (!event) return null;

  const totalImages = event.images.length;

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? totalImages - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === totalImages - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  
  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const touchDiff = touchStart - touchEnd;
    const swipeThreshold = 50; // Minimum distance for a swipe

    if (touchDiff > swipeThreshold) {
      goToNext(); // Swiped left
    } else if (touchDiff < -swipeThreshold) {
      goToPrevious(); // Swiped right
    }
    setTouchStart(null);
  };

  const shareUrl = window.location.href; // Shares the main /events page
  const shareTitle = `Check out this event from Animation Club VITC: ${event.title}`;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-gray-900 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">{event.title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl font-bold z-10">&times;</button>
          </div>
          <p className="text-gray-400">{event.description}</p>
          
          <SocialShareButtons shareUrl={shareUrl} title={shareTitle} />
          
          {/* Carousel Implementation */}
          {totalImages > 0 && (
            <div className="relative">
              {/* Image Display */}
              <div 
                className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-800"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <ImageWithShimmer
                  key={currentIndex}
                  src={event.images[currentIndex]}
                  alt={`${event.title} - ${currentIndex + 1}`}
                  className="w-full h-full object-contain carousel-image"
                  wrapperClassName="w-full h-full"
                />
                 {/* Image Counter */}
                <div className="absolute bottom-2 right-3 bg-black/50 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  {currentIndex + 1} / {totalImages}
                </div>
              </div>

              {/* Navigation Buttons */}
              {totalImages > 1 && (
                <>
                  <button onClick={goToPrevious} className="absolute top-1/2 left-2 md:-left-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-all active:scale-90 z-10">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button onClick={goToNext} className="absolute top-1/2 right-2 md:-right-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-all active:scale-90 z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </>
              )}

               {/* Indicator Dots */}
               {totalImages > 1 && (
                <div className="flex justify-center space-x-2 mt-4">
                  {event.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-amber-400 scale-125' : 'bg-gray-600 hover:bg-gray-500'}`}
                      aria-label={`Go to image ${index + 1}`}
                    ></button>
                  ))}
                </div>
               )}
            </div>
          )}
        </div>
      </div>
       <style>{`
        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
        
        .carousel-image {
          animation: fade-in 0.4s ease-in-out;
        }
        @keyframes fade-in {
            from { opacity: 0.7; }
            to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};


const EventsPage: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<PastEvent | null>(null);
  const [pastEvents, setPastEvents] = useState<PastEvent[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const { ref: titleRef } = useScrollAnimation<HTMLDivElement>();
  const { ref: pastEventsRef } = useScrollAnimation<HTMLElement>();
  const { ref: upcomingEventsRef } = useScrollAnimation<HTMLElement>();

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setPastEvents(mockPastEvents);
      setUpcomingEvents(mockUpcomingEvents);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);


  return (
    <div className="pt-24 pb-16 md:pb-20 bg-gray-100 dark:bg-transparent min-h-screen">
      <div className="container mx-auto px-6">
        <div ref={titleRef} className="scroll-animate zoom-in text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold font-orbitron text-gray-900 dark:text-white">Club Events</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Moments we've created and what's next.</p>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <>
            {/* Past Events Section */}
            <section ref={pastEventsRef} className="scroll-animate slide-up mb-20">
              <h2 className="text-4xl font-bold font-orbitron mb-8 dark:text-white text-gray-900">Past Events</h2>
              <div className="flex space-x-8 overflow-x-auto pb-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {pastEvents.map(event => (
                  <div
                    key={event.id}
                    className="group flex-shrink-0 w-80 perspective-1000 cursor-pointer"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="relative w-full h-96 rounded-lg shadow-xl overflow-hidden transform-style-3d transition-all duration-500 group-hover:rotate-y-3 group-hover:scale-105 active:scale-100 group-hover:shadow-2xl group-hover:shadow-amber-400/40">
                      <ImageWithShimmer
                        src={event.images[0]}
                        alt={event.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        wrapperClassName="w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-6">
                        <h3 className="text-2xl font-bold text-white">{event.title}</h3>
                        <p className="text-gray-300 line-clamp-2">{event.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Upcoming Events Section */}
            <section ref={upcomingEventsRef} className="scroll-animate slide-up">
              <h2 className="text-4xl font-bold font-orbitron mb-8 dark:text-white text-gray-900">Upcoming Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingEvents.map((event, index) => (
                  <div key={event.id} className="group perspective-1000 transition-transform active:scale-[0.98]" style={{transitionDelay: `${index * 150}ms`}}>
                    <div className="relative w-full h-80 rounded-lg shadow-xl transition-transform duration-700 transform-style-3d group-hover:rotate-y-180">
                      {/* Front of card */}
                      <div className="absolute inset-0 w-full h-full bg-amber-800 rounded-lg backface-hidden flex flex-col justify-between p-6">
                          <div>
                            <span className="text-sm font-bold text-amber-200">{event.date}</span>
                            <h3 className="text-3xl font-bold text-white mt-2">{event.title}</h3>
                          </div>
                          <span className="self-end text-white/70">Hover to see details</span>
                      </div>
                      {/* Back of card */}
                      <div className="absolute inset-0 w-full h-full bg-gray-800 rounded-lg backface-hidden rotate-y-180 p-6 flex flex-col justify-center">
                          <h4 className="text-xl font-bold text-white mb-4">Event Highlights</h4>
                          <ul className="space-y-3">
                              {event.details.map((detail, i) => (
                                  <li key={i} className="flex items-center text-gray-300">
                                      <span className="mr-3 text-lg">{detail.icon}</span>
                                      <span>{detail.text}</span>
                                  </li>
                              ))}
                          </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
       <PastEventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
       <style>{`
          .perspective-1000 { perspective: 1000px; }
          .transform-style-3d { transform-style: preserve-3d; }
          .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
          .rotate-y-180 { transform: rotateY(180deg); }
          .group-hover\\:rotate-y-180:hover { transform: rotateY(180deg); }
          .group-hover\\:rotate-y-3:hover { transform: rotateY(3deg); }
          .line-clamp-2 {
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
          /* Simple scrollbar styling for webkit browsers */
          .overflow-x-auto::-webkit-scrollbar {
            height: 8px;
          }
          .overflow-x-auto::-webkit-scrollbar-track {
            background: transparent;
          }
          .overflow-x-auto::-webkit-scrollbar-thumb {
            background-color: rgba(251, 191, 36, 0.5);
            border-radius: 20px;
            border: 3px solid transparent;
          }
        `}</style>
    </div>
  );
};

export default EventsPage;