import React from 'react';
import useCountUp from '../hooks/useCountUp';
import useScrollAnimation from '../hooks/useScrollAnimation';

interface Stat {
  icon: React.ReactNode;
  value: number;
  label: string;
  tooltip: string;
}

const StatCounter: React.FC<{ value: number; isVisible: boolean }> = ({ value, isVisible }) => {
  const count = useCountUp(value, 2000, isVisible);
  return (
    <span className="text-5xl md:text-6xl font-orbitron font-bold text-white tracking-tighter">
      {count.toLocaleString()}
    </span>
  );
};

const StatisticsSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  const stats: Stat[] = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      value: 12345,
      label: 'Followers',
      tooltip: '+500 in the last week',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.995 5.995 0 0012 12a5.995 5.995 0 00-3 5.197M15 21a6 6 0 00-9-5.197" />
        </svg>
      ),
      value: 876,
      label: 'Members',
      tooltip: 'Growing every semester',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      value: 42,
      label: 'Events Hosted',
      tooltip: 'Latest: Animathon 2023',
    },
  ];

  return (
    <section ref={ref} className="scroll-animate zoom-in py-20 bg-gray-100 dark:bg-transparent">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="stat-card bg-white/10 dark:bg-gray-900/50 backdrop-blur-md rounded-2xl p-8 group"
            >
                <div className="stat-tooltip">{stat.tooltip}</div>
              <div className={`mx-auto mb-6 ${isVisible ? 'animate-icon-pop' : 'opacity-0'}`} style={{ animationDelay: `${index * 200}ms` }}>
                {stat.icon}
              </div>
              <StatCounter value={stat.value} isVisible={isVisible} />
              <p className="mt-2 text-lg text-amber-300 font-semibold uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;