import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { departments as mockDepartments } from '../services/mockData';
import type { Department } from '../types';
import Spinner from '../components/Spinner';
import useScrollAnimation from '../hooks/useScrollAnimation';

interface DepartmentCardProps {
  department: Department;
  delay: number;
  animationType: 'slide-left' | 'slide-right';
}

const DepartmentCard: React.FC<DepartmentCardProps> = ({ department, delay, animationType }) => {
  const { ref } = useScrollAnimation<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`group scroll-animate ${animationType} perspective-1000`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <Link
        to={`/departments/${department.id}`}
        className="card-3d-hover relative block p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden active:scale-95 transition-all duration-500 ease-in-out h-full"
      >
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 rounded-full bg-amber-400/20 dark:bg-amber-400/10 transition-transform duration-500 group-hover:scale-[10]"></div>
        <div className="relative">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-white transition-colors duration-300">{department.name}</h2>
          <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-100 transition-colors duration-300">{department.description}</p>
          <span className="mt-6 inline-block font-semibold text-amber-400 group-hover:text-white transition-colors duration-300">
            Learn More &rarr;
          </span>
        </div>
      </Link>
    </div>
  );
};

const DepartmentsPage: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const { ref: titleRef } = useScrollAnimation<HTMLDivElement>();

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setDepartments(mockDepartments);
      setLoading(false);
    }, 1000); // 1-second delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pt-24 pb-16 md:pb-20 bg-gray-100 dark:bg-transparent min-h-screen">
      <div className="container mx-auto px-6">
        <div ref={titleRef} className="scroll-animate zoom-in text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold font-orbitron text-gray-900 dark:text-white">Our Departments</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">The creative pillars of our club.</p>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {departments.map((dept, index) => {
              const animationType = index % 2 === 0 ? 'slide-right' : 'slide-left';
              return (
                <DepartmentCard 
                  key={dept.id} 
                  department={dept} 
                  delay={index * 150} 
                  animationType={animationType} 
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentsPage;