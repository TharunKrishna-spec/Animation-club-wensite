import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { departments as mockDepartments } from '../services/mockData';
import type { Project, Department } from '../types';
import useScrollAnimation from '../hooks/useScrollAnimation';
import SocialShareButtons from '../components/SocialShareButtons';
import ImageWithShimmer from '../components/ImageWithShimmer';

const ProjectModal: React.FC<{ project: Project | null; onClose: () => void }> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-gray-900 rounded-lg shadow-2xl w-full max-w-3xl transform transition-all duration-300 animate-fade-in-up" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button onClick={onClose} className="absolute top-3 right-4 text-gray-400 hover:text-white text-3xl font-bold z-10">&times;</button>
          {project.mediaType === 'image' ? (
            <ImageWithShimmer
              src={project.mediaUrl}
              alt={project.title}
              className="w-full h-auto max-h-[60vh] object-contain rounded-t-lg"
              wrapperClassName="w-full max-h-[60vh] flex justify-center items-center bg-gray-800 rounded-t-lg"
            />
          ) : (
            <div className="aspect-w-16 aspect-h-9">
              {/* Video embed would go here */}
              <iframe src={project.mediaUrl} title={project.title} className="w-full h-full rounded-t-lg" allowFullScreen></iframe>
            </div>
          )}
          <div className="p-6">
            <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-gray-400">{project.description}</p>
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

const ProjectCardPlaceholder: React.FC = () => (
  <div className="group relative overflow-hidden rounded-lg shadow-lg">
    <div className="w-full h-64 shimmer-placeholder" />
  </div>
);

const DepartmentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [department, setDepartment] = useState<Department | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [offsetY, setOffsetY] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);


  const { ref: aboutRef } = useScrollAnimation<HTMLDivElement>();
  const { ref: teamRef } = useScrollAnimation<HTMLDivElement>();
  const { ref: projectsRef } = useScrollAnimation<HTMLDivElement>();

  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    const timer = setTimeout(() => {
      const deptData = mockDepartments.find(d => d.id === id);
      setDepartment(deptData || null);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);

  const totalSlides = department?.teamPhotos?.length || 0;

  const nextSlide = () => {
      setCurrentSlide(prev => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
      setCurrentSlide(prev => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const goToSlide = (slideIndex: number) => {
      setCurrentSlide(slideIndex);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
      if (totalSlides <= 1) return;
      setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
      if (touchStart === null || totalSlides <= 1) return;
      const touchEnd = e.changedTouches[0].clientX;
      const touchDiff = touchStart - touchEnd;
      const swipeThreshold = 50;

      if (touchDiff > swipeThreshold) {
          nextSlide();
      } else if (touchDiff < -swipeThreshold) {
          prevSlide();
      }
      setTouchStart(null);
  };

  if (!department && !loading) {
    return (
       <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-transparent">
        <div className="text-center">
          <h1 className="text-4xl font-bold font-orbitron text-red-500">404 - Not Found</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">The department you are looking for does not exist.</p>
          <Link to="/departments" className="mt-8 inline-block bg-amber-400 text-gray-900 font-bold py-3 px-6 rounded-full hover:bg-amber-300 transition-all duration-300 transform hover:scale-105 active:scale-100">
            Back to Departments
          </Link>
        </div>
      </div>
    );
  }
  
  const shareUrl = window.location.href;
  const shareTitle = department ? `Check out the ${department.name} Department at Animation Club VITC!` : 'Check out this department at Animation Club VITC!';

  return (
    <div className="bg-gray-100 dark:bg-transparent text-gray-900 dark:text-white">
      <div className="relative h-96 overflow-hidden bg-gray-900">
        {!department ? (
          <div className="absolute inset-0 shimmer-placeholder" />
        ) : (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${department.bannerImage})`,
                transform: `scale(${1 + offsetY * 0.0003}) translateY(${offsetY * 0.4}px)`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          </>
        )}
        <div className="relative h-full flex items-end z-10">
          <div className="container mx-auto px-6 pb-12">
            {!department ? (
              <div className="h-14 w-3/4 max-w-lg rounded-md shimmer-placeholder" />
            ) : (
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-orbitron drop-shadow-lg">{department.name}</h1>
            )}
          </div>
        </div>
      </div>

      <div className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div ref={aboutRef} className="scroll-animate slide-up max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">About the Department</h2>
            {!department ? (
                <div className="space-y-3">
                    <div className="h-5 w-full rounded shimmer-placeholder" />
                    <div className="h-5 w-full rounded shimmer-placeholder" />
                    <div className="h-5 w-5/6 rounded shimmer-placeholder" />
                    <div className="h-5 w-3/4 rounded shimmer-placeholder" />
                </div>
            ) : (
                <>
                  <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                    {department.longDescription}
                  </p>
                  <SocialShareButtons shareUrl={shareUrl} title={shareTitle} />
                </>
            )}
          </div>
          
          {!department ? (
            <div ref={teamRef} className="scroll-animate zoom-in mt-12 md:mt-20">
                <h2 className="text-3xl font-bold text-center mb-12">Meet the Team</h2>
                <div className="relative max-w-4xl mx-auto">
                    <div className="w-full aspect-video rounded-lg shadow-2xl shimmer-placeholder" />
                </div>
            </div>
          ) : (
            department.teamPhotos.length > 0 && (
              <div ref={teamRef} className="scroll-animate zoom-in mt-12 md:mt-20">
                <h2 className="text-3xl font-bold text-center mb-12">Meet the Team</h2>
                <div 
                  className="relative max-w-4xl mx-auto"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  <div className="overflow-hidden rounded-lg shadow-2xl">
                    <div 
                      className="flex transition-transform duration-500 ease-in-out"
                      style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                      {department.teamPhotos.map((photo, index) => (
                        <div key={index} className="flex-shrink-0 w-full">
                          <ImageWithShimmer
                            src={photo}
                            alt={`Team photo ${index + 1}`}
                            className="w-full h-auto aspect-video object-cover"
                            wrapperClassName="w-full aspect-video"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {totalSlides > 1 && (
                      <>
                          <button onClick={prevSlide} aria-label="Previous slide" className="absolute top-1/2 left-0 md:-left-12 transform -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full transition-all active:scale-90 z-10">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                          </button>
                          <button onClick={nextSlide} aria-label="Next slide" className="absolute top-1/2 right-0 md:-right-12 transform -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full transition-all active:scale-90 z-10">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                          </button>

                          <div className="flex justify-center space-x-2 mt-4">
                            {department.teamPhotos.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-amber-400 scale-125' : 'bg-gray-600 hover:bg-gray-500'}`}
                                aria-label={`Go to slide ${index + 1}`}
                              ></button>
                            ))}
                          </div>
                      </>
                  )}
                </div>
              </div>
            )
          )}

          <div ref={projectsRef} className="scroll-animate zoom-in mt-12 md:mt-20">
            <h2 className="text-3xl font-bold text-center mb-12">Our Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {!department ? (
                Array.from({ length: 3 }).map((_, index) => <ProjectCardPlaceholder key={index} />)
              ) : (
                department.projects.map((project) => (
                  <div 
                    key={project.id} 
                    className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-transform duration-300 hover:-translate-y-2 active:scale-95"
                    onClick={() => setSelectedProject(project)}
                  >
                    <ImageWithShimmer
                      src={project.mediaUrl}
                      alt={project.title}
                      className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                      wrapperClassName="w-full h-64"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent flex items-end p-4">
                      <h3 className="text-xl font-bold text-white transform transition-transform duration-300 group-hover:translate-x-2">{project.title}</h3>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
};

export default DepartmentDetailPage;