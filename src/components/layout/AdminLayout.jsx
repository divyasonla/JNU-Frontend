import React, { useContext, useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  GraduationCap, 
  Briefcase, 
  Newspaper, 
  FileText, 
  Users, 
  LogOut,
  Menu,
  Bell,
  Search,
  Eye,
  X
} from 'lucide-react';

const AdminLayout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "Admin Dashboard - JNU Jaipur";
    
    // Cleanup on unmount (optional, but good practice if leaving admin)
    return () => {
      document.title = "JNU Jaipur - Best Private University in Rajasthan, India";
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard Overview', path: '/admin/dashboard?tab=overview', icon: <LayoutDashboard size={20} /> },
    { name: 'Upload Result', path: '/admin/dashboard?tab=add-result', icon: <FileText size={20} /> },
    { name: 'All Results', path: '/admin/dashboard?tab=all-results', icon: <FileText size={20} /> },
    { name: 'Lead Submissions', path: '/admin/dashboard?tab=leads', icon: <Users size={20} /> },
  ];

  const SidebarContent = () => (
    <>
      <div>
        <div className="flex items-center justify-between mb-8 px-2">
          <div className="flex items-center gap-3">
            <img src="https://www.jnujaipur.ac.in/public/frontend/assets/images/logo/jnu-logo.webp" alt="Admin Icon" className="h-10 w-auto object-contain" />
          </div>
          {/* Close button for mobile */}
          <button 
            className="md:hidden text-slate-400 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const isActive = (location.pathname + location.search) === item.path || 
                             (item.path === '/admin/dashboard?tab=overview' && location.pathname === '/admin/dashboard' && !location.search);
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {item.icon}
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 w-full p-3 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Fixed Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 transform 
        md:relative md:translate-x-0 transition-transform duration-300 ease-in-out
        bg-slate-900 border-r border-slate-800 w-64 min-h-screen p-4 md:p-6 flex flex-col justify-between
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <SidebarContent />
      </aside>

      {/* Main Content Wrapper */}
      <main className="flex-1 flex flex-col min-h-screen w-full overflow-hidden">
        
        {/* Top Header Bar */}
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            
            <div className="hidden sm:flex items-center bg-slate-100 rounded-lg px-3 py-2 w-64 lg:w-80 focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:bg-white transition-all">
              <Search size={18} className="text-slate-400 mr-2 shrink-0" />
              <input 
                type="text" 
                placeholder="Search resources, news..." 
                className="bg-transparent border-none outline-none w-full text-sm text-slate-700 placeholder-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <Link 
              to="/" 
              target="_blank" 
              className="hidden md:flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg"
            >
              <Eye size={16} />
              Quick View Site
            </Link>
            
            <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
            
            <div className="flex items-center gap-3 pl-2 sm:pl-4 border-l border-slate-200">
              <div className="flex flex-col items-end hidden sm:flex">
                <span className="text-sm font-semibold text-slate-900">Admin Profile</span>
                <span className="text-xs text-slate-500">Super Administrator</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20 cursor-pointer">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Main Content */}
        <div className="flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
