import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { departments, pastEvents, leads } from '../services/mockData';
import useScrollAnimation from '../hooks/useScrollAnimation';
import StatisticsSection from '../components/StatisticsSection';
import ImageWithShimmer from '../components/ImageWithShimmer';

const ThreeDShowcase: React.FC = () => {
    const orbits = [
      { size: '250px', duration: '20s', particles: 1, ry: '60deg', rz: '10deg' },
      { size: '300px', duration: '25s', particles: 1, ry: '70deg', rz: '30deg' },
      { size: '350px', duration: '30s', particles: 2, ry: '80deg', rz: '50deg' },
    ];
  
    return (
      <div className="w-64 h-64 md:w-80 md:h-80 relative flex items-center justify-center perspective-1000">
        <div 
          className="w-24 h-24 rounded-full absolute"
          style={{
            background: 'radial-gradient(circle, #FDE047 0%, #FBBF24 40%, #F97316 100%)',
            animation: 'pulse-glow-core 3s infinite ease-in-out',
            transformStyle: 'preserve-3d',
          }}
        />
        {orbits.map((orbit, i) => (
          <div
            key={i}
            className="absolute rounded-full border-dashed border border-amber-300/20"
            style={{
              width: orbit.size,
              height: orbit.size,
              transform: `rotateY(${orbit.ry}) rotateZ(${orbit.rz})`,
              transformStyle: 'preserve-3d',
            }}
          >
            {Array.from({ length: orbit.particles }).map((_, p_i) => (
              <div
                key={p_i}
                className="absolute top-1/2 -mt-1.5 left-0 -ml-1.5 w-3 h-3 rounded-full bg-amber-200"
                style={
                  {
                    '--ry': orbit.ry,
                    '--rz': orbit.rz,
                    '--tx': `calc(${parseInt(orbit.size) / 2}px)`,
                    animation: `orbit ${orbit.duration} linear infinite`,
                    animationDelay: `-${(p_i * (parseInt(orbit.duration) / orbit.particles))}s`,
                    boxShadow: '0 0 10px #FDE047',
                  } as React.CSSProperties
                }
              ></div>
            ))}
          </div>
        ))}
      </div>
    );
};

const HomePage: React.FC = () => {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  const { ref: heroRef } = useScrollAnimation<HTMLDivElement>();
  const { ref: aboutRef } = useScrollAnimation<HTMLElement>();
  const { ref: deptsRef } = useScrollAnimation<HTMLElement>();
  const { ref: eventsRef } = useScrollAnimation<HTMLElement>();
  const { ref: leadsRef } = useScrollAnimation<HTMLElement>();
  const { ref: joinRef } = useScrollAnimation<HTMLElement>();

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-transparent">
      {/* Hero Section */}
      <section 
        className="min-h-screen flex items-center justify-center relative overflow-hidden bg-transparent text-white"
      >
        <div 
          className="absolute inset-0 bg-no-repeat bg-center opacity-40"
          style={{ 
            backgroundImage: 'url(https://raw.githubusercontent.com/al-ptk/portfolio-assets/main/assets/images/stars.png)',
            transform: `translateY(${offsetY * 0.3}px)`,
          }}
        />
        <div 
          className="absolute inset-0 bg-no-repeat bg-bottom opacity-50"
          style={{ 
            backgroundImage: 'url(https://raw.githubusercontent.com/al-ptk/portfolio-assets/main/assets/images/mountains_behind.png)',
            backgroundSize: 'contain',
            transform: `translateY(${offsetY * 0.5}px)`,
          }}
        />
         <div 
          className="absolute inset-0 bg-no-repeat bg-bottom"
          style={{ 
            backgroundImage: 'url(https://raw.githubusercontent.com/al-ptk/portfolio-assets/main/assets/images/mountains_front.png)',
            backgroundSize: 'contain',
            transform: `translateY(${offsetY * 0.8}px)`,
          }}
        />
        <div ref={heroRef} className="scroll-animate zoom-in container mx-auto px-6 text-center z-10 grid md:grid-cols-2 items-center gap-8">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <h1 className="text-5xl md:text-7xl font-orbitron font-extrabold uppercase tracking-widest animate-glow">
                    Animation Club <span className="text-amber-300">VITC</span>
                </h1>
                <p className="mt-4 text-xl md:text-2xl text-gray-300">Creativity in Motion.</p>
                 <Link to="/departments" className="btn-shimmer mt-8 bg-amber-400 text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-amber-300 transition-all duration-300 transform hover:scale-105 active:scale-100 shadow-[0_0_20px_rgba(251,191,36,0.6)]">
                    Explore Our World
                </Link>
            </div>
            <div className="flex justify-center items-center">
               <ThreeDShowcase />
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
            transform: `translateY(${offsetY * 0.1}px)`,
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
      <section ref={deptsRef} className="scroll-animate slide-up py-16 md:py-20 bg-gray-200 dark:bg-gray-900/50">
          <div className="container mx-auto px-6">
              <h2 className="text-4xl font-bold font-orbitron text-center mb-12 dark:text-white text-gray-900">Our Departments</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {departments.map((dept, index) => (
                    <div key={dept.id} className="perspective-1000 group">
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
      <section ref={eventsRef} className="scroll-animate slide-up py-16 md:py-20 bg-gray-100 dark:bg-transparent">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold font-orbitron text-center mb-12 dark:text-white text-gray-900">Recent Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastEvents.slice(0, 3).map((event, index) => (
              <div key={event.id} className="group relative rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300" style={{ transitionDelay: `${index * 100}ms` }}>
                <ImageWithShimmer
                  src={event.images[0]}
                  alt={event.title}
                  className="w-full h-72 object-cover"
                  wrapperClassName="w-full h-72"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white">{event.title}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/events" className="text-amber-400 dark:text-amber-300 font-semibold text-lg hover:underline">
              See all events &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Leads Preview */}
      <section ref={leadsRef} className="scroll-animate slide-up py-16 md:py-20 bg-gray-200 dark:bg-gray-900/50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold font-orbitron text-center mb-12 dark:text-white text-gray-900">Meet Our Leads</h2>
          <div className="flex flex-wrap justify-center gap-12">
            {leads.slice(0, 4).map((lead, index) => (
              <div key={lead.id} className="text-center group" style={{ transitionDelay: `${index * 100}ms` }}>
                <img src={lead.imageUrl} alt={lead.name} className="w-32 h-32 rounded-full object-cover mx-auto grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105 border-4 border-transparent group-hover:border-amber-400" />
                <h3 className="mt-4 text-xl font-bold dark:text-white text-gray-900">{lead.name}</h3>
                <p className="text-amber-400 dark:text-amber-300">{lead.role}</p>
              </div>
            ))}
          </div>
           <div className="text-center mt-12">
            <Link to="/leads" className="text-amber-400 dark:text-amber-300 font-semibold text-lg hover:underline">
              Meet the whole team &rarr;
            </Link>
          </div>
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