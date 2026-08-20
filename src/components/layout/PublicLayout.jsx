import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Phone, Search, Menu, X, GraduationCap, MapPin, Mail } from 'lucide-react';
import ApplyModal from '../common/ApplyModal';

const PublicLayout = () => {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['campus-life', 'about', 'admissions', 'academics', 'research', 'placements', 'results', 'contact'];
      
      let currentSection = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust offset to trigger when section is in upper middle of viewport
          if (rect.top <= 200 && rect.bottom >= 200) {
            currentSection = section;
          }
        }
      }
      
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { name: 'About Us', id: 'about' },
    { name: 'Admissions', id: 'admissions' },
    { name: 'Academics', id: 'academics' },
    { name: 'Research', id: 'research' },
    { name: 'Placements', id: 'placements' }
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <div className="sticky top-0 z-50 w-full shadow-md">
        {/* 1. TOP UTILITY BAR */}
        <div className="bg-[#000000] text-white text-xs py-1.5 hidden lg:block border-b border-white/10">
          <div className="max-w-[1600px] mx-auto px-6 flex justify-end items-center space-x-3">
            <Link to="#" className="hover:text-amber-500 transition-colors">NCTE Mandatory Disclosure</Link>
            <span className="text-gray-500">|</span>
            <Link to="#" className="hover:text-amber-500 transition-colors">UGC 12B Application</Link>
            <span className="text-gray-500">|</span>
            <Link to="#" className="hover:text-amber-500 transition-colors">Public Self Disclosure</Link>
            <span className="text-gray-500">|</span>
            <Link to="#" className="hover:text-amber-500 transition-colors">Information Under Clause B.1.11</Link>
            <span className="text-gray-500">|</span>
            <Link to="/admin/login" className="hover:text-amber-500 transition-colors font-medium">Admin Login</Link>
            
            <div className="flex items-center space-x-2 ml-6 pl-6 border-l border-white/20">
              <span className="text-gray-300">Call us at</span>
              <a href="tel:+919555863419" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-3 py-1 rounded shadow hover:from-amber-600 hover:to-orange-600 transition-all block text-center">
                +91 95558 63419
              </a>
            </div>
          </div>
        </div>

        {/* 2. MAIN BRANDING & NAVIGATION ROW */}
        <header className="w-full bg-black/90 backdrop-blur-sm border-b border-white/10">
          <div className="flex items-center justify-between px-4 sm:px-6 py-2 max-w-[1600px] mx-auto h-[90px]">
            
            {/* Left Branding Area */}
            <div className="flex items-center gap-4 shrink-0">
              <Link to="/" className="flex items-center space-x-3">
                <img src="https://www.jnujaipur.ac.in/public/frontend/assets/images/logo/jnu-logo.webp" alt="Jaipur National University Logo" className="h-[50px] md:h-[65px] w-auto object-contain" />

              </Link>
              {/* NAAC Badge */}
              <img src="https://www.jnujaipur.ac.in/public/frontend/assets/images/logo/naaclogo.webp" alt="NAAC A+ Accredited" className="hidden xl:block h-[40px] md:h-[50px] w-auto object-contain ml-2" />
            </div>

            {/* Center Main Navigation Bar */}
            <div className="hidden lg:flex flex-1 justify-center items-center h-full mx-4">
              <div className="flex items-center bg-[#8E075F] rounded-full px-8 py-2.5 h-[50px] shadow-lg">
                <nav className="flex items-center space-x-8 text-[14px] font-medium text-white">
                  {navLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.id === '#' ? '#' : `#${link.id}`}
                      onClick={(e) => link.id !== '#' && scrollToSection(e, link.id)}
                      className="hover:text-amber-400 transition-colors whitespace-nowrap"
                    >
                      {link.name}
                    </a>
                  ))}
                </nav>
              </div>
            </div>

            {/* Right Action Area */}
            <div className="flex items-center gap-4 shrink-0">
              <a 
                href="#results" 
                onClick={(e) => scrollToSection(e, 'results')}
                className="hidden lg:flex items-center justify-center bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold px-6 py-2.5 rounded-full shadow-lg transition-all whitespace-nowrap"
              >
                Download Result
              </a>

              {/* Mobile Menu Button */}
              <div className="lg:hidden flex items-center bg-[#8E075F] rounded-full px-4 py-2 text-white ml-auto">
                <button 
                  className="hover:text-amber-400 transition-colors flex items-center space-x-3"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Drawer */}
          <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-[500px] border-t border-white/10' : 'max-h-0'}`}>
            <div className="bg-black/95 backdrop-blur-md text-white">
              <nav className="flex flex-col px-6 py-4 space-y-4 font-medium">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.id === '#' ? '#' : `#${link.id}`}
                    onClick={(e) => {
                      if(link.id !== '#') scrollToSection(e, link.id);
                    }}
                    className="hover:text-amber-500 transition-colors border-b border-white/10 pb-2 text-sm uppercase tracking-wider"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="pt-2 flex flex-col gap-3">
                  <Link to="/admin/login" onClick={() => setIsMobileMenuOpen(false)} className="text-amber-500 hover:text-amber-400 transition-colors text-sm uppercase tracking-wider font-bold">Admin Login</Link>
                  <div className="flex items-center space-x-2 text-sm mt-2">
                    <span className="text-gray-400">Call us:</span>
                    <a href="tel:+919555863419" className="text-white font-bold hover:text-amber-400 transition-colors">+91 95558 63419</a>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </header>
      </div>

      {/* Main Content */}
      <main className="flex-grow bg-white">
        <Outlet context={{ openApplyModal: () => setIsApplyModalOpen(true) }} />
      </main>

      <ApplyModal isOpen={isApplyModalOpen} onClose={() => setIsApplyModalOpen(false)} />

      {/* Footer */}
      <footer id="contact" className="bg-[#1E2229] text-white pt-16 pb-8 text-sm">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

            {/* COLUMN 1: BRANDING & CONTACT INFO */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <img src="https://www.jnujaipur.ac.in/public/frontend/assets/images/logo/jnu-logo.webp" alt="Jaipur National University Logo" className="h-12 w-auto object-contain" />

              </div>
              <ul className="space-y-4 text-gray-400 mb-8 font-sans">
                <li className="flex items-start space-x-3">
                  <MapPin size={18} className="text-gray-300 shrink-0 mt-0.5" />
                  <span>Jagatpura, Jaipur, Rajasthan 302017, India</span>
                </li>
                <li className="flex items-center space-x-3 hover:text-white transition-colors">
                  <Phone size={18} className="text-gray-300 shrink-0" />
                  <a href="tel:+919555863419">+91 95558 63419</a>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail size={18} className="text-gray-300 shrink-0" />
                  <span>admissions@jnujaipur.ac.in</span>
                </li>
              </ul>
              
              {/* Social Media Icons */}
              <div className="flex space-x-3">
                <a href="https://www.facebook.com/jaipurnationaluniv" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center hover:bg-[#F4C430] hover:text-[#1E2229] hover:border-[#F4C430] transition-colors text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="https://x.com/jaipurjnu" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center hover:bg-[#F4C430] hover:text-[#1E2229] hover:border-[#F4C430] transition-colors text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
                <a href="https://www.youtube.com/@jnujaipuruniversity" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center hover:bg-[#F4C430] hover:text-[#1E2229] hover:border-[#F4C430] transition-colors text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                </a>
                <a href="https://www.instagram.com/jnujaipuruniversity/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center hover:bg-[#F4C430] hover:text-[#1E2229] hover:border-[#F4C430] transition-colors text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="https://www.linkedin.com/school/jaipurnationaluniversity/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center hover:bg-[#F4C430] hover:text-[#1E2229] hover:border-[#F4C430] transition-colors text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
              </div>
            </div>

            {/* COLUMN 2: QUICK LINKS */}
            <div>
              <h4 className="text-sm font-bold tracking-widest text-[#F4C430] mb-6">QUICK LINKS</h4>
              <ul className="space-y-3 text-gray-400 font-sans">
                <li><Link to="/about" className="hover:text-white transition-colors">About the University</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Leadership</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Alumni</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            {/* COLUMN 3: ADMISSIONS */}
            <div>
              <h4 className="text-sm font-bold tracking-widest text-[#F4C430] mb-6">ADMISSIONS</h4>
              <ul className="space-y-3 text-gray-400 font-sans">
                <li><Link to="#" className="hover:text-white transition-colors">UG Programmes</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">PG Programmes</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Doctoral</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Diploma</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Scholarships</Link></li>
              </ul>
            </div>

            {/* COLUMN 4: STUDENT CORNER */}
            <div>
              <h4 className="text-sm font-bold tracking-widest text-[#F4C430] mb-6">STUDENT CORNER</h4>
              <ul className="space-y-3 text-gray-400 font-sans">
                <li><Link to="#" className="hover:text-white transition-colors">Examination</Link></li>
                <li><Link to="/results" className="hover:text-white transition-colors">Results</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Student Portal</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Library</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Grievance Redressal</Link></li>
              </ul>
            </div>

            {/* COLUMN 5: DISCLOSURES */}
            <div>
              <h4 className="text-sm font-bold tracking-widest text-[#F4C430] mb-6">DISCLOSURES</h4>
              <ul className="space-y-3 text-gray-400 font-sans">
                <li><Link to="#" className="hover:text-white transition-colors">NCTE Mandatory Disclosure</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">UGC 12B Application</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Public Self Disclosure</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">IQAC</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Anti Ragging</Link></li>
              </ul>
            </div>

          </div>

          {/* Bottom Copyright Bar */}
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-xs font-sans">
            <p>&copy; 2026 Jaipur National University. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
