import React from 'react';
import { Link } from 'react-router-dom';
import { departments, pastEvents, leads } from '../services/mockData';
import useScrollAnimation from '../hooks/useScrollAnimation';
import StatisticsSection from '../components/StatisticsSection';
import ImageWithShimmer from '../components/ImageWithShimmer';

const HomePage: React.FC = () => {
  const { ref: heroRef } = useScrollAnimation<HTMLDivElement>();
  const { ref: aboutRef } = useScrollAnimation<HTMLElement>();
  const { ref: deptsRef } = useScrollAnimation<HTMLElement>();
  const { ref: eventsRef } = useScrollAnimation<HTMLElement>();
  const { ref: leadsRef } = useScrollAnimation<HTMLElement>();
  const { ref: joinRef } = useScrollAnimation<HTMLElement>();

  return (
    <div className="bg-gray-100 dark:bg-transparent">
      {/* Hero Section */}
      <section 
        className="min-h-screen flex items-center relative overflow-hidden bg-gray-100 dark:bg-gray-900 pt-24 lg:pt-0"
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
            
            {/* Left side: Text Content */}
            <div ref={heroRef} className="scroll-animate slide-right text-center lg:text-left z-10 lg:w-1/2 xl:w-5/12">
                <h1 className="text-5xl md:text-7xl font-orbitron font-extrabold uppercase tracking-widest text-gray-900 dark:text-white drop-shadow-lg">
                    Animation Club <span className="text-amber-400">VITC</span>
                </h1>
                <p className="mt-4 text-xl md:text-2xl text-gray-600 dark:text-gray-300 drop-shadow-md">Creativity in Motion.</p>
                 <Link to="/departments" className="btn-shimmer mt-12 inline-block bg-amber-400 text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-amber-300 transition-all duration-300 transform hover:scale-105 active:scale-100 shadow-[0_0_20px_rgba(251,191,36,0.6)] hover:shadow-[0_0_30px_rgba(251,191,36,0.8)]">
                    Explore Our World
                </Link>
            </div>

            {/* Right side: 3D Model Showcase */}
            <div className="relative z-0 lg:w-1/2 xl:w-7/12 flex items-center justify-center">
              <div className="showcase-container">
                <div className="hero-particle-container" aria-hidden="true">
                  {Array.from({ length: 25 }).map((_, i) => {
                    const style = {
                      '--angle': `${Math.random() * 360}deg`,
                      '--distance': `${200 + Math.random() * 200}px`,
                      '--duration': `${10 + Math.random() * 10}s`,
                      '--delay': `-${Math.random() * 20}s`,
                      '--size': `${1 + Math.random() * 2}px`,
                    } as React.CSSProperties;
                    return <div key={i} className="hero-particle" style={style}></div>;
                  })}
                </div>
                <div className="showcase-core"></div>
                {/* Orbit 1 */}
                <div className="orbit-path path-1">
                  <div className="orbiting-model-wrapper model-wrapper-1">
                    <div className="orbiting-model">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                    </div>
                  </div>
                </div>
                {/* Orbit 2 */}
                <div className="orbit-path path-2">
                  <div className="orbiting-model-wrapper model-wrapper-2">
                    <div className="orbiting-model">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                    </div>
                  </div>
                </div>
                {/* Orbit 3 */}
                <div className="orbit-path path-3">
                  <div className="orbiting-model-wrapper model-wrapper-3">
                    <div className="orbiting-model">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>
                    </div>
                  </div>
                </div>
                {/* Orbit 4 */}
                <div className="orbit-path path-4">
                  <div className="orbiting-model-wrapper model-wrapper-4">
                    <div className="orbiting-model">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* About Us Preview */}
      <section ref={aboutRef} className="scroll-animate zoom-in relative py-16 md:py-20 bg-gray-100 dark:bg-transparent overflow-hidden">
        <div 
            className="absolute top-0 left-0 w-full h-full opacity-10 dark:opacity-20"
            style={{
            backgroundImage: 'radial-gradient(circle at 20% 30%, #fBBF24, transparent 40%), radial-gradient(circle at 80% 70%, #fBBF24, transparent 40%)',
            backgroundSize: '150% 150%',
            zIndex: 0,
            }}
        />
        <div className="container relative mx-auto px-6 text-center z-10">
          <h2 className="text-4xl font-bold font-orbitron mb-4 dark:text-white text-gray-900">Who We Are</h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            The Animation Club at VITC is a creative hub for students passionate about animation, visual effects, and storytelling. Our vision is to foster a community where artists can learn, collaborate, and bring their imaginative ideas to life.
          </p>
        </div>
      </section>

      {/* Statistics Section */}
      <StatisticsSection />

       {/* Departments Preview */}
      <section ref={deptsRef} className="scroll-animate slide-up py-16 md:py-20 bg-gray-200 dark:bg-gray-900/50 overflow-hidden">
          <div className="container mx-auto px-6 text-center">
              <h2 className="text-4xl font-bold font-orbitron mb-12 dark:text-white text-gray-900">Our Departments</h2>
          </div>
          <div className="marquee-container">
            <div className="marquee-track flex gap-8 py-4">
              {[...departments, ...departments].map((dept, index) => (
                <div key={`${dept.id}-${index}`} className="group w-80 flex-shrink-0">
                  <Link to={`/departments/${dept.id}`} className="card-3d-hover block bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden active:scale-95 h-full p-6">
                      <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-amber-300 transition-colors">{dept.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{dept.description}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
      </section>
      
      {/* Events Preview */}
      <section ref={eventsRef} className="scroll-animate slide-up py-16 md:py-20 bg-gray-100 dark:bg-transparent overflow-hidden">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold font-orbitron text-center mb-12 dark:text-white text-gray-900">Recent Events</h2>
          <div className="marquee-container">
            <div className="marquee-track flex gap-8 py-4">
              {[...pastEvents.slice(0, 3), ...pastEvents.slice(0, 3)].map((event, index) => (
                <div key={`${event.id}-${index}`} className="group relative rounded-lg overflow-hidden shadow-lg w-96 flex-shrink-0">
                  <ImageWithShimmer
                    src={event.images[0]}
                    alt={event.title}
                    className="w-full h-72 object-cover event-card-image"
                    wrapperClassName="w-full h-72"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-2xl font-bold text-white">{event.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-12">
            <Link to="/events" className="text-amber-400 dark:text-amber-300 font-semibold text-lg hover:underline">
              See all events &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Leads Preview */}
      <section ref={leadsRef} className="scroll-animate slide-up py-16 md:py-20 bg-gray-200 dark:bg-gray-900/50 overflow-hidden">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold font-orbitron text-center mb-12 dark:text-white text-gray-900">Meet Our Leads</h2>
        </div>
        <div className="marquee-container">
            <div className="marquee-track flex gap-12 py-4 items-center justify-center">
              {[...leads.slice(0, 4), ...leads.slice(0, 4)].map((lead, index) => (
                <div key={`${lead.id}-${index}`} className="lead-card text-center group w-40 flex-shrink-0">
                  <div className="relative inline-block">
                    <ImageWithShimmer 
                      src={lead.imageUrl} 
                      alt={lead.name} 
                      className="w-32 h-32 rounded-full object-cover mx-auto" 
                      wrapperClassName="w-32 h-32 rounded-full"
                    />
                    <div className="border-overlay absolute inset-0 rounded-full border-4 border-transparent"></div>
                  </div>
                  <h3 className="mt-4 text-xl font-bold dark:text-white text-gray-900">{lead.name}</h3>
                  <p className="text-amber-400 dark:text-amber-300">{lead.role}</p>
                </div>
              ))}
            </div>
        </div>
        <div className="text-center mt-12 container mx-auto px-6">
          <Link to="/leads" className="text-amber-400 dark:text-amber-300 font-semibold text-lg hover:underline">
            Meet the whole team &rarr;
          </Link>
        </div>
      </section>

      {/* Join Us CTA */}
       <section ref={joinRef} className="scroll-animate zoom-in py-16 md:py-20 bg-amber-900/20">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold font-orbitron mb-4 text-white">Join The Club</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-300 mb-8">
                Become a part of our creative family. Whether you're a seasoned artist or just starting, there's a place for you here.
            </p>
            <Link to="/members" className="btn-shimmer bg-amber-400 text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-amber-300 transition-all duration-300 transform hover:scale-105 active:scale-100 shadow-[0_0_20px_rgba(251,191,36,0.6)]">
                Become a Member
            </Link>
        </div>
      </section>

    </div>
  );
};

export default HomePage;