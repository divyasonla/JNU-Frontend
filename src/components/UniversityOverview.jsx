import React from 'react';
import { Award } from 'lucide-react';

const UniversityOverview = () => {
  const stats = [
    { value: '80K+', label: 'Student Community' },
    { value: '16', label: 'Distinguished Schools' },
    { value: '750+', label: 'Expert Faculties' },
    { value: '100+', label: 'Programs to choose from' },
    { value: '70+', label: 'National & International Collaborations' },
  ];

  const accolades = [
    "Amongst Top 25 Best Private Universities of India by India Today, 2019",
    "Best Private University in Rajasthan by One Planet Research, 2013",
    "Rajasthan Education Excellence Award, 2022",
    "Asia's Greatest Brand by URS Asia One, 2017",
    "Excellence Award for JNU, 2022",
    "The Best Employer Award by The Employers' Association, 2023"
  ];

  return (
    <section id="about" className="bg-[#F8F6FA] py-16 md:py-20 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: CONTENT & STATS */}
          <div className="space-y-8 flex flex-col">
            
            {/* Main Heading */}
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              One of the Top{' '}
              <span className="text-[#C00075]">Private Universities</span>{' '}
              in Rajasthan
            </h2>

            {/* Statistics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-y-8 gap-x-8 py-4 border-y border-gray-200">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="font-serif text-3xl md:text-4xl font-bold text-[#C00075]">
                    {stat.value}
                  </span>
                  <span className="text-sm font-medium text-gray-700 mt-2 leading-snug">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Accolades / Awards List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 pt-2">
              {accolades.map((award, idx) => (
                <div key={idx} className="flex items-start gap-3 group">
                  <Award className="w-5 h-5 text-[#D4A373] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                  <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                    {award}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT COLUMN: CAMPUS IMAGE & BADGE */}
          <div className="relative mt-8 lg:mt-0 w-full h-full min-h-[400px] md:min-h-[500px] lg:min-h-full">
            <div className="relative w-full h-full pb-8 lg:pb-0 group">
              <img 
                src="/campus_aerial.png" 
                alt="University Campus Aerial View" 
                className="w-full h-full object-cover rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500 min-h-[400px] md:min-h-[500px] lg:min-h-full"
              />
              
              {/* Overlapping Badge */}
              <div className="absolute -bottom-4 sm:-bottom-6 left-6 sm:left-8 bg-gradient-to-r from-amber-500 to-orange-500 p-5 rounded-xl shadow-lg border border-amber-300/50 transform hover:-translate-y-1 transition-transform duration-300 z-10">
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-gray-900 text-xl sm:text-2xl whitespace-nowrap">
                    Since 2007
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-gray-800 mt-1 whitespace-nowrap opacity-90">
                    Jaipur, Rajasthan
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default UniversityOverview;
