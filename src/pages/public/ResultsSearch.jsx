import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import api from '../../services/api';
import {
  Search,
  User,
  Mail,
  Phone,
  FileDown,
  X,
  GraduationCap,
  Loader2,
  AlertCircle
} from 'lucide-react';

const ResultsSearch = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const initialRoll = searchParams.get('roll') || '';
  const initialData = location.state?.resultData || null;

  const [step, setStep] = useState(initialData ? 3 : 1); // 1: Search, 2: Modal, 3: Result
  const [rollNumber, setRollNumber] = useState(initialRoll);
  const [userDetails, setUserDetails] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resultData, setResultData] = useState(initialData);

  const handleSearchSubmit = async (e) => {
    if (e) e.preventDefault();
    setError('');

    if (!rollNumber.trim()) return;

    try {
      setLoading(true);
      // Fetch actual result directly
      const response = await api.post('/results/fetch-result', { rollNumber });
      setResultData(response.data.data);
      setStep(3); // Go straight to Result
    } catch (err) {
      setError(err.response?.data?.message || 'Roll / Enrollment Number not found in our records.');
    } finally {
      setLoading(false);
    }
  };

  // Automatically trigger search if roll number is present in URL
  useEffect(() => {
    if (initialRoll && !initialData) {
      handleSearchSubmit();
    }
  }, [initialRoll, initialData]);



  const resetWorkflow = () => {
    setStep(1);
    setRollNumber('');
    setUserDetails({ name: '', email: '', phone: '' });
    setResultData(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative font-sans">

      {/* STEP 1: Search Form */}
      {step === 1 && (
        <div className="max-w-3xl mx-auto animate-in fade-in zoom-in duration-300">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap size={40} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Examination Results</h1>
            <p className="text-lg text-gray-600">Enter your university roll number to access your academic performance.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-3">
                <AlertCircle size={20} className="shrink-0" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}
            <form onSubmit={handleSearchSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Roll / Enrollment Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    required
                    className="block w-full pl-11 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-0 focus:border-blue-600 transition-colors uppercase"
                    placeholder="e.g. JNU2026001234"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value.toUpperCase())}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#8E075F] text-white font-bold py-4 rounded-xl hover:bg-[#6e054a] transition-colors shadow-lg flex justify-center items-center gap-2 disabled:opacity-70"
              >
                {loading ? <Loader2 className="animate-spin" size={24} /> : 'VIEW RESULT'}
              </button>
            </form>
          </div>
        </div>
      )}



      {/* STEP 3: Result View */}
      {step === 3 && resultData && (
        <div className="min-h-screen bg-[#F0F2F5] py-10 px-4 flex justify-center items-start">
          <div className="bg-white border border-gray-300 rounded-sm shadow-md p-8 md:p-12 w-full max-w-5xl mx-auto relative overflow-hidden">

            {/* Watermark Logo */}
            <img
              src="/logo2.jpeg"
              alt="Watermark"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 w-80 md:w-[420px] opacity-15 filter contrast-125 object-contain"
            />

            <div className="relative z-10 w-full">
              {/* Header Area */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-6">
                {/* Logo */}
                <img
                  src="/logo2.jpeg"
                  alt="JNU Logo"
                  className="h-20 sm:h-24 md:h-28 w-auto object-contain flex-shrink-0"
                />

                {/* Header Text Block */}
                <div className="flex flex-col items-center justify-center text-center md:text-left">
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#0D1B2A] tracking-wider uppercase whitespace-normal lg:whitespace-nowrap">
                    JAIPUR NATIONAL UNIVERSITY
                  </h1>
                  <p className="text-[11px] sm:text-xs md:text-sm text-gray-600 mt-1 md:mt-2 max-w-2xl leading-relaxed font-medium">
                    Jaipur National University, established on 22 October 2007, is a private university located in Jaipur, the capital of Rajasthan, India.
                  </p>
                </div>
              </div>

              <div className="border-b-2 border-gray-800 my-6 w-full"></div>

              {/* Result Title Area */}
              <div className="text-[#C00075] text-sm md:text-base font-bold uppercase tracking-widest text-center mb-1">
                Result
              </div>
              <div className="text-lg md:text-xl font-bold text-gray-900 uppercase text-center mb-6">
                {resultData.subject}
              </div>

              {/* Result Details Table */}
              <table className="w-full text-left text-sm md:text-base border-collapse">
                <tbody>
                  <tr className="border-b border-gray-300 py-3 px-4">
                    <th className="font-bold text-gray-800 w-1/3 py-3 pl-2">Enroll No</th>
                    <td className="text-gray-900 py-3 pr-2 uppercase font-medium">{resultData.enrollNo}</td>
                  </tr>
                  <tr className="border-b border-gray-300 py-3 px-4">
                    <th className="font-bold text-gray-800 w-1/3 py-3 pl-2">Roll No</th>
                    <td className="text-gray-900 py-3 pr-2 uppercase font-medium">{resultData.rollNo}</td>
                  </tr>

                  <tr className="border-b border-gray-300 py-3 px-4">
                    <th className="font-bold text-gray-800 w-1/3 py-3 pl-2">Name</th>
                    <td className="text-gray-900 py-3 pr-2 uppercase font-medium">{resultData.name}</td>
                  </tr>
                  <tr className="border-b border-gray-300 py-3 px-4">
                    <th className="font-bold text-gray-800 w-1/3 py-3 pl-2">Father's Name</th>
                    <td className="text-gray-900 py-3 pr-2 uppercase font-medium">{resultData.fatherName}</td>
                  </tr>
                  <tr className="border-b border-gray-300 py-3 px-4">
                    <th className="font-bold text-gray-800 w-1/3 py-3 pl-2">Total Marks</th>
                    <td className="text-gray-900 py-3 pr-2 uppercase font-medium">{resultData.totalMarks}</td>
                  </tr>
                  <tr className="border-b border-gray-300 py-3 px-4">
                    <th className="font-bold text-gray-800 w-1/3 py-3 pl-2">Obtained Marks</th>
                    <td className="text-gray-900 py-3 pr-2 uppercase font-medium">{resultData.obtainedMarks}</td>
                  </tr>
                  <tr className="border-b border-gray-300 py-3 px-4">
                    <th className="font-bold text-gray-800 w-1/3 py-3 pl-2">Result</th>
                    <td className="text-gray-900 py-3 pr-2 uppercase font-bold">{resultData.result}</td>
                  </tr>
                  <tr className="border-b border-gray-300 py-3 px-4">
                    <th className="font-bold text-gray-800 w-1/3 py-3 pl-2">Remark</th>
                    <td className="text-gray-900 py-3 pr-2 uppercase font-bold">{resultData.remark}</td>
                  </tr>
                </tbody>
              </table>

              {/* Footer Disclaimer */}
              <div className="relative z-10 text-xs text-gray-600 mt-8 text-center font-medium">
                Note: The university is not responsible for errors or omissions, if any, in this statement.
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsSearch;
