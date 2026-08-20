import React, { useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { ChevronRight, Award, CheckCircle, ArrowRight, Phone, Mail, Search, X, Loader2, AlertCircle, User, GraduationCap } from 'lucide-react';
import api from '../../services/api';
import UniversityOverview from '../../components/UniversityOverview';
import HeroSlider from '../../components/common/HeroSlider';
const Home = () => {
  const [rollSearch, setRollSearch] = useState('');
  const [checkingRoll, setCheckingRoll] = useState(false);
  const navigate = useNavigate();
  const { openApplyModal } = useOutletContext();

  const handleResultSearch = (e) => {
    e.preventDefault();
    if (!rollSearch.trim()) return;
    navigate(`/results?roll=${rollSearch}`);
  };

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* 2. Hero Section Slider */}
      <HeroSlider />

      {/* 3. Recognition Cards (Overlapping Hero) */}
      <section className="relative z-30 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -translate-y-1/2">
          {/* Card 1 */}
          <div className="bg-gradient-to-r from-purple-800 to-pink-600 p-6 rounded-lg shadow-lg text-white flex items-center">
            <div className="flex flex-col items-center justify-center min-w-[80px] mr-6">
              <span className="text-4xl lg:text-5xl font-bold text-amber-500">A+</span>
              <span className="text-[10px] tracking-widest uppercase font-semibold mt-1">RANKED</span>
            </div>
            <div className="w-px h-16 bg-white/30 mr-6"></div>
            <div>
              <h3 className="text-lg font-bold mb-1 leading-snug">Top University of Rajasthan</h3>
              <p className="text-xs opacity-90 leading-relaxed font-medium">
                First and Rajasthan's best university to be accredited by the NAAC within 7 years of its existence.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-gradient-to-r from-purple-800 to-pink-600 p-6 rounded-lg shadow-lg text-white flex items-center">
            <div className="flex flex-col items-center justify-center min-w-[80px] mr-6">
              <span className="text-4xl lg:text-5xl font-bold text-amber-500">22</span>
              <span className="text-[10px] tracking-widest uppercase font-semibold mt-1">RANKED</span>
            </div>
            <div className="w-px h-16 bg-white/30 mr-6"></div>
            <div>
              <h3 className="text-lg font-bold mb-1 leading-snug">Best University of India</h3>
              <p className="text-xs opacity-90 leading-relaxed font-medium">
                Ranked amongst the best private universities in India and the best private university in the North.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-gradient-to-r from-purple-800 to-pink-600 p-6 rounded-lg shadow-lg text-white flex items-center">
            <div className="flex flex-col items-center justify-center min-w-[80px] mr-6">
              <span className="text-4xl lg:text-5xl font-bold text-amber-500">1st</span>
              <span className="text-[10px] tracking-widest uppercase font-semibold mt-1">RANKED</span>
            </div>
            <div className="w-px h-16 bg-white/30 mr-6"></div>
            <div>
              <h3 className="text-lg font-bold mb-1 leading-snug">Pioneer Health University</h3>
              <p className="text-xs opacity-90 leading-relaxed font-medium">
                One of the top universities in Jaipur, Rajasthan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. About University Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <UniversityOverview />
        </div>
      </section>

      {/* 5. Programs Section */}
      <section id="academics" className="py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="mb-12 max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight font-serif">
              Explore Our <span className="text-magenta">100+</span> Programs and give a Start to Your Future-ready Career
            </h2>
          </div>

          {/* Card Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Card 1: Under Graduate */}
            <div className="group relative rounded-2xl overflow-hidden shadow-lg h-[450px] cursor-pointer">
              <div className="absolute inset-0 bg-black">
                <img
                  src="/jaipur5.jpeg"
                  alt="Under Graduate"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent"></div>

              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-white font-bold text-2xl font-serif mb-3 leading-snug drop-shadow-md">Under Graduate</h3>
                <p className="text-gray-200 text-sm mb-4 leading-relaxed font-sans pr-8">
                  Explore 50+ undergraduate programs across diverse disciplines and build a strong foundation for your future.
                </p>

                {/* Yellow Circular Button */}
                <div className="absolute bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center group-hover:-translate-y-1 hover:from-amber-400 hover:to-orange-400 transition-all shadow-md">
                  <ArrowRight size={20} className="text-gray-900 transform -rotate-45" />
                </div>
              </div>
            </div>

            {/* Card 2: Post Graduate */}
            <div className="group relative rounded-2xl overflow-hidden shadow-lg h-[450px] cursor-pointer">
              <div className="absolute inset-0 bg-black">
                <img
                  src="/jaipur6.jpeg"
                  alt="Post Graduate"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent"></div>

              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-white font-bold text-2xl font-serif mb-3 leading-snug drop-shadow-md">Post Graduate</h3>
                <p className="text-gray-200 text-sm mb-4 leading-relaxed font-sans pr-8">
                  Advance your expertise with our wide range of postgraduate programs designed for future leaders.
                </p>

                {/* Yellow Circular Button */}
                <div className="absolute bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center group-hover:-translate-y-1 hover:from-amber-400 hover:to-orange-400 transition-all shadow-md">
                  <ArrowRight size={20} className="text-gray-900 transform -rotate-45" />
                </div>
              </div>
            </div>

            {/* Card 3: Doctoral */}
            <div className="group relative rounded-2xl overflow-hidden shadow-lg h-[450px] cursor-pointer">
              <div className="absolute inset-0 bg-black">
                <img
                  src="/jaipur7.jpeg"
                  alt="Doctoral"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent"></div>

              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-white font-bold text-2xl font-serif mb-3 leading-snug drop-shadow-md">Doctoral</h3>
                <p className="text-gray-200 text-sm mb-4 leading-relaxed font-sans pr-8">
                  Pursue research excellence and innovation with our doctoral programs and world-class faculty.
                </p>

                {/* Yellow Circular Button */}
                <div className="absolute bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center group-hover:-translate-y-1 hover:from-amber-400 hover:to-orange-400 transition-all shadow-md">
                  <ArrowRight size={20} className="text-gray-900 transform -rotate-45" />
                </div>
              </div>
            </div>

            {/* Card 4: Diploma & Certificate */}
            <div className="group relative rounded-2xl overflow-hidden shadow-lg h-[450px] cursor-pointer">
              <div className="absolute inset-0 bg-black">
                <img
                  src="/jaipur8.jpeg"
                  alt="Diploma & Certificate"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent"></div>

              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-white font-bold text-2xl font-serif mb-3 leading-snug drop-shadow-md">Diploma & Certificate</h3>
                <p className="text-gray-200 text-sm mb-4 leading-relaxed font-sans pr-8">
                  Enhance your skills and knowledge with industry-oriented diploma and certificate programs.
                </p>

                {/* Yellow Circular Button */}
                <div className="absolute bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center group-hover:-translate-y-1 hover:from-amber-400 hover:to-orange-400 transition-all shadow-md">
                  <ArrowRight size={20} className="text-gray-900 transform -rotate-45" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Admission CTA Strip */}
      <section id="admissions" className="bg-gradient-to-r from-magenta-dark to-magenta py-12 md:py-16">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center text-center lg:text-left gap-8">

            {/* Left Side Content */}
            <div className="lg:w-3/5">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 font-serif leading-tight">
                Apply for Admissions at Jaipur National University
              </h2>
              <p className="text-pink-100 text-sm md:text-base font-sans">
                JEST 2026 scholarships, UG, PG, Doctoral and Diploma admissions are now open.
              </p>
            </div>

            {/* Right Side Call to Action Buttons */}
            <div className="lg:w-1/3 flex flex-col sm:flex-row justify-center lg:justify-end items-center gap-4">
              <button onClick={openApplyModal} className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-7 py-3 font-bold rounded-md transition-all shadow-sm whitespace-nowrap">
                APPLY ONLINE
              </button>
              <div className="flex flex-col items-center md:items-start space-y-2 text-white font-sans text-sm">
                <div className="flex items-center space-x-2">
                  <Phone size={18} className="text-white opacity-80" />
                  <span>+91 95558 63419</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail size={18} className="text-white opacity-80" />
                  <a href="mailto:admissions@jnujaipur.ac.in" className="hover:text-amber-500 transition-colors">admissions@jnujaipur.ac.in</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Academics Section */}
      <section className="py-20 md:py-28 bg-[#0B1E3D] text-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Area */}
          <div className="mb-12 md:mb-16 text-center md:text-left">
            <span className="text-amber-500 font-bold tracking-widest text-sm uppercase block mb-3">ACADEMICS</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-white">16 Distinguished Schools</h2>
          </div>

          {/* Grid Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/10">
            {[
              'School of Engineering & Technology',
              'School of Business & Management',
              'School of Law',
              'School of Medicine & Health Sciences',
              'School of Computer Science',
              'School of Education',
              'School of Sciences',
              'School of Humanities & Social Sciences',
              'School of Design',
              'School of Nursing',
              'School of Pharmacy',
              'School of Journalism & Mass Communication'
            ].map((school, i) => (
              <div key={i} className="border-r border-b border-white/10 p-6 md:p-8 hover:bg-white/5 transition-colors cursor-pointer group flex items-center justify-between">
                <h3 className="text-gray-200 font-medium text-base md:text-lg font-sans group-hover:text-white transition-colors">{school}</h3>
                <ChevronRight size={18} className="text-white/20 group-hover:text-amber-400 transition-colors opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Placements Section */}
      <section id="placements" className="bg-white pt-16 pb-0 md:pt-20">
        {/* Top Layout (Header & Stats) */}
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 lg:gap-16">

            {/* Left Side Content */}
            <div className="lg:w-1/2">
              <span className="text-magenta font-bold tracking-[0.2em] text-sm uppercase block mb-3">PLACEMENTS</span>
              <h2 className="text-3xl md:text-5xl font-bold font-serif text-[#0f172a] leading-tight">
                Careers that begin at JNU and travel the world
              </h2>
            </div>

            {/* Right Side Content (Key Statistics) */}
            <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex flex-col">
                <div className="text-4xl md:text-5xl font-bold text-magenta mb-2 font-serif">1200+</div>
                <div className="text-gray-500 font-medium text-sm leading-relaxed">Students placed in 2025</div>
              </div>
              <div className="flex flex-col">
                <div className="text-4xl md:text-5xl font-bold text-magenta mb-2 font-serif">45 LPA</div>
                <div className="text-gray-500 font-medium text-sm leading-relaxed">Highest package offered</div>
              </div>
              <div className="flex flex-col md:col-span-2 lg:col-span-1">
                <div className="text-4xl md:text-5xl font-bold text-magenta mb-2 font-serif">350+</div>
                <div className="text-gray-500 font-medium text-sm leading-relaxed">Recruiting companies</div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Layout (Infinite Logo Ticker Strip) */}
        <div className="w-full bg-[#0f172a] py-8 overflow-hidden flex border-y border-white/10">
          <div className="flex w-max animate-marquee whitespace-nowrap">
            {/* Repeat list twice for seamless loop */}
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center space-x-12 md:space-x-24 px-6 md:px-12">
                {["Medanta", "Cognizant", "Capgemini", "Vedanta", "Infosys", "TCS", "Wipro", "HCL", "Deloitte", "Amazon", "Byju's", "ICICI Bank"].map((company, j) => (
                  <span key={j} className="text-xl md:text-2xl font-bold text-gray-400 opacity-70 tracking-wide font-sans hover:text-white transition-colors cursor-pointer">
                    {company}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. News & Announcements */}
      <section id="research" className="py-16 md:py-20 bg-[#F8F7FC]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-[#0f172a] text-center md:text-left">
              News & Announcements
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { date: '12 AUG 2026', title: 'JNU Jaipur joins hands with Medanta for Corporate Wellness initiatives', img: '/jaipur9.jpeg' },
              { date: '04 AUG 2026', title: 'TEDx at JNU: Inspiring innovation through impactful conversations', img: '/jaipur10.jpeg' },
              { date: '28 JUL 2026', title: 'Recognised as one of India\'s Greatest Brands 2025 by AsiaOne Magazine', img: '/jaipur.jpeg' },
              { date: '19 JUL 2026', title: 'Expanding global horizons with world class education partnerships', img: '/jaipu8.jpeg' }
            ].map((news, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full cursor-pointer group overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img src={news.img} alt="News thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-magenta font-bold text-sm mb-3 block uppercase tracking-wide">{news.date}</span>
                  <h3 className="text-[#0f172a] font-bold text-lg md:text-[18px] mb-6 flex-grow leading-snug font-serif group-hover:text-magenta transition-colors">
                    {news.title}
                  </h3>
                  <div className="text-magenta font-bold text-sm flex items-center group-hover:opacity-80 transition-opacity mt-auto">
                    Read more
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Examination Results Widget */}
      <section id="results" className="py-16 md:py-20 bg-[#F8F7FC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0f172a] font-serif mb-3">
            Examination Results
          </h2>
          <p className="text-gray-500 text-sm md:text-base mb-10 font-sans">
            Enter your university roll number or enrollment number to view your semester result.
          </p>

          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md max-w-xl mx-auto">
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleResultSearch}>
              <input
                type="text"
                placeholder="e.g. JNU2026001234"
                value={rollSearch}
                onChange={(e) => setRollSearch(e.target.value)}
                className="flex-grow px-4 py-3 md:py-4 border border-gray-200 rounded-lg sm:rounded-r-none focus:outline-none focus:border-magenta focus:ring-1 focus:ring-magenta bg-transparent text-[#0f172a] font-medium"
              />
              <button
                type="submit"
                disabled={checkingRoll}
                className="bg-[#E63946] hover:bg-red-700 text-white font-bold px-6 py-3 md:py-4 rounded-lg sm:rounded-l-none transition-colors whitespace-nowrap flex items-center justify-center tracking-wide disabled:opacity-70"
              >
                {checkingRoll ? <Loader2 className="animate-spin mr-2" size={18} /> : <Search size={18} className="mr-2" />}
                VIEW RESULT
              </button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
