import React, { useState } from 'react';
import { X, User, Mail, Phone, BookOpen, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../../services/api';

const ApplyModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    programInterested: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.programInterested) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      await api.post('/leads/apply', formData);
      toast.success('Thank you! Our admissions team will contact you soon.');
      setFormData({ fullName: '', email: '', phone: '', programInterested: '' });
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10 animate-in zoom-in duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-slate-50 rounded-t-2xl">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Apply Online / Inquiry</h3>
            <p className="text-sm text-slate-500 mt-1">Fill out the form below and we'll reach out.</p>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 transition-colors text-slate-500"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className="text-slate-400" />
              </div>
              <input
                type="text"
                name="fullName"
                placeholder="Your Name"
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-magenta focus:border-transparent transition-all"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-slate-400" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-magenta focus:border-transparent transition-all"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone size={18} className="text-slate-400" />
              </div>
              <input
                type="text"
                name="phone"
                placeholder="10-digit number"
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-magenta focus:border-transparent transition-all"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Program Interested In</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BookOpen size={18} className="text-slate-400" />
              </div>
              <select
                name="programInterested"
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-magenta focus:border-transparent transition-all appearance-none"
                value={formData.programInterested}
                onChange={handleChange}
              >
                <option value="">Select a Program</option>
                <option value="B.Tech Computer Science">B.Tech Computer Science</option>
                <option value="B.Tech Mechanical">B.Tech Mechanical</option>
                <option value="MBA">MBA</option>
                <option value="BBA">BBA</option>
                <option value="B.Sc Nursing">B.Sc Nursing</option>
                <option value="BA Journalism">BA Journalism</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center bg-magenta text-white font-bold py-3 px-4 rounded-lg hover:bg-magenta-dark transition-colors shadow-lg shadow-magenta/25 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-magenta mt-6"
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin mr-2" />
                Submitting...
              </>
            ) : (
              'Submit Inquiry'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyModal;
