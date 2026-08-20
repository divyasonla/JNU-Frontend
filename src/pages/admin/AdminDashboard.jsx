import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  LogOut, 
  Trash2, 
  Save, 
  Search,
  Download,
  Loader2,
  Eye,
  Edit
} from 'lucide-react';
import api from '../../services/api';
import { toast } from 'react-hot-toast';

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const activeTab = searchParams.get('tab') || 'overview';
  
  // Data States
  const [dashboardStats, setDashboardStats] = useState(null);
  
  // Leads State
  const [leads, setLeads] = useState([]);
  const [leadLoading, setLeadLoading] = useState(false);
  const [leadFilter, setLeadFilter] = useState('ALL');

  // Results List State
  const [resultsList, setResultsList] = useState([]);
  const [resultLoading, setResultLoading] = useState(false);
  const [resultSearchQuery, setResultSearchQuery] = useState('');

  // Result Upload Form State
  const [resultForm, setResultForm] = useState({
    subject: '',
    enrollNo: '',
    rollNo: '',
    name: '',
    fatherName: '',
    totalMarks: '',
    obtainedMarks: '',
    result: 'PASS',
    remark: ''
  });
  const [isSubmittingResult, setIsSubmittingResult] = useState(false);
  const [editingResultId, setEditingResultId] = useState(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  useEffect(() => {
    if (activeTab === 'leads') {
      fetchLeads();
    } else if (activeTab === 'all-results') {
      fetchResults();
    }
  }, [activeTab, leadFilter]);

  const fetchDashboardStats = async () => {
    try {
      const res = await api.get('/admin/dashboard-stats');
      setDashboardStats(res.data.data);
    } catch (err) {
      console.error('Failed to fetch dashboard stats', err);
    }
  };

  const fetchLeads = async () => {
    setLeadLoading(true);
    try {
      let url = '/admin/leads?limit=100';
      if (leadFilter !== 'ALL') url += `&type=${leadFilter}`;
      const res = await api.get(url);
      setLeads(res.data.data);
    } catch (err) {
      toast.error('Failed to load leads');
    } finally {
      setLeadLoading(false);
    }
  };

  const updateLeadStatus = async (id, status) => {
    try {
      await api.patch(`/admin/leads/${id}/status`, { status });
      toast.success('Lead status updated');
      fetchLeads();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const handleDeleteLead = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    try {
      await api.delete(`/admin/leads/${id}`);
      toast.success('Lead removed');
      fetchLeads();
      fetchDashboardStats();
    } catch (err) {
      toast.error('Failed to delete lead');
    }
  };

  const exportCSV = () => {
    if (leads.length === 0) {
      toast.error('No leads to export');
      return;
    }
    const headers = ['Date', 'Type', 'Name', 'Email', 'Phone', 'Program/Roll', 'Status'];
    const rows = leads.map(l => [
      new Date(l.createdAt || l.accessTimestamp).toLocaleDateString(),
      l.leadType,
      `"${l.fullName || l.username}"`,
      l.email,
      l.phone,
      `"${l.leadType === 'ADMISSION_APPLY' ? l.programInterested : l.rollNumber}"`,
      l.status
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fetchResults = async () => {
    setResultLoading(true);
    try {
      const res = await api.get('/admin/results');
      setResultsList(res.data.data);
    } catch (err) {
      toast.error('Failed to load results');
    } finally {
      setResultLoading(false);
    }
  };

  const handleResultSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingResult(true);
    try {
      if (editingResultId) {
        await api.put(`/admin/results/${editingResultId}`, resultForm);
        toast.success('Result updated successfully!');
      } else {
        await api.post('/admin/upload-result', resultForm);
        toast.success('Result saved successfully in Database');
      }
      setResultForm({
        subject: '',
        enrollNo: '',
        rollNo: '',
        name: '',
        fatherName: '',
        totalMarks: '',
        obtainedMarks: '',
        result: 'PASS',
        remark: ''
      });
      fetchResults(); // Refresh table
      fetchDashboardStats(); // Refresh counter
      
      // If we were editing, go back to the published results list
      if (editingResultId) {
        setEditingResultId(null);
        navigate('?tab=all-results');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to upload result');
    } finally {
      setIsSubmittingResult(false);
    }
  };

  const handleEditResult = (res) => {
    setEditingResultId(res._id);
    setResultForm({
      subject: res.subject || '',
      enrollNo: res.enrollNo || '',
      rollNo: res.rollNo || '',
      name: res.name || '',
      fatherName: res.fatherName || '',
      totalMarks: res.totalMarks || '',
      obtainedMarks: res.obtainedMarks || '',
      result: res.result || 'PASS',
      remark: res.remark || ''
    });
    // Switch to Add Result tab
    navigate('?tab=add-result');
  };

  const handleDeleteResult = async (id) => {
    if (!window.confirm('Are you sure you want to delete this result?')) return;
    try {
      await api.delete(`/admin/results/${id}`);
      toast.success('Result removed');
      fetchResults();
      fetchDashboardStats();
    } catch (err) {
      toast.error('Failed to delete result');
    }
  };

  const filteredResults = resultsList.filter(res => {
    const q = resultSearchQuery.toLowerCase();
    return (
      res.rollNo?.toLowerCase().includes(q) ||
      res.enrollNo?.toLowerCase().includes(q) ||
      res.name?.toLowerCase().includes(q)
    );
  });

  const handleLogout = () => {
    window.location.href = '/';
  };

  return (
    <div className="w-full font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Top Header */}
          <header className="mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
                {activeTab === 'overview' && 'Dashboard Overview'}
                {activeTab === 'add-result' && 'Upload New Result'}
                {activeTab === 'all-results' && 'Published Results'}
                {activeTab === 'leads' && 'Lead Submissions'}
              </h1>
              <p className="text-slate-500 mt-2">
                {activeTab === 'overview' && 'High-level analytics and summary of operations.'}
                {activeTab === 'add-result' && 'Upload a new student examination result.'}
                {activeTab === 'all-results' && 'Manage existing student records and published results.'}
                {activeTab === 'leads' && 'Track and manage student inquiries and result views.'}
              </p>
            </div>
          </header>

          {/* Tab: Overview */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-500">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center justify-between hover:shadow-md transition-all">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Results Published</p>
                  <p className="mt-3 text-4xl font-black text-slate-800">{dashboardStats?.totalResults || 0}</p>
                </div>
                <div className="p-4 rounded-full bg-magenta/10">
                  <FileText className="text-magenta" size={32} />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center justify-between hover:shadow-md transition-all">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Admission Inquiries</p>
                  <p className="mt-3 text-4xl font-black text-slate-800">{dashboardStats?.admissionLeads || 0}</p>
                </div>
                <div className="p-4 rounded-full bg-blue-100">
                  <Users className="text-blue-600" size={32} />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center justify-between hover:shadow-md transition-all">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Result Views Captured</p>
                  <p className="mt-3 text-4xl font-black text-slate-800">{dashboardStats?.resultLeads || 0}</p>
                </div>
                <div className="p-4 rounded-full bg-emerald-100">
                  <LayoutDashboard className="text-emerald-600" size={32} />
                </div>
              </div>
            </div>
          )}

          {/* Tab: Add Result Form */}
          {activeTab === 'add-result' && (
            <div className="space-y-10 animate-in fade-in duration-500">
              
              {/* Section A: Upload Form */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
                <h3 className="text-xl font-bold text-slate-800 mb-6 font-serif border-b pb-4">Add Student Examination Result</h3>
                
                <form onSubmit={handleResultSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Subject / Course Name</label>
                      <input type="text" required value={resultForm.subject} onChange={e => setResultForm({...resultForm, subject: e.target.value})} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-magenta focus:border-transparent outline-none transition-all text-sm uppercase" placeholder="DIPLOMA IN MECHANICAL" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Enrollment Number</label>
                      <input type="text" required value={resultForm.enrollNo} onChange={e => setResultForm({...resultForm, enrollNo: e.target.value})} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-magenta focus:border-transparent outline-none transition-all text-sm uppercase" placeholder="JNU/DME/423463" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Roll Number</label>
                      <input type="text" required value={resultForm.rollNo} onChange={e => setResultForm({...resultForm, rollNo: e.target.value})} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-magenta focus:border-transparent outline-none transition-all text-sm uppercase" placeholder="364234621674" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Student Name</label>
                      <input type="text" required value={resultForm.name} onChange={e => setResultForm({...resultForm, name: e.target.value})} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-magenta focus:border-transparent outline-none transition-all text-sm uppercase" placeholder="FARDIN ABBASALI TAMBOLI" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Father's Name</label>
                      <input type="text" required value={resultForm.fatherName} onChange={e => setResultForm({...resultForm, fatherName: e.target.value})} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-magenta focus:border-transparent outline-none transition-all text-sm uppercase" placeholder="ABBASALI DASTAGIR TAMBOLI" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Total Marks</label>
                      <input type="number" required value={resultForm.totalMarks} onChange={e => setResultForm({...resultForm, totalMarks: e.target.value})} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-magenta focus:border-transparent outline-none transition-all text-sm" placeholder="3000" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Obtained Marks</label>
                      <input type="number" required value={resultForm.obtainedMarks} onChange={e => setResultForm({...resultForm, obtainedMarks: e.target.value})} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-magenta focus:border-transparent outline-none transition-all text-sm" placeholder="2160" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Result Status</label>
                      <select required value={resultForm.result} onChange={e => setResultForm({...resultForm, result: e.target.value})} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-magenta focus:border-transparent outline-none transition-all text-sm bg-white font-medium">
                        <option value="PASS">PASS</option>
                        <option value="FAIL">FAIL</option>
                        <option value="WITHHELD">WITHHELD</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Remark</label>
                      <input type="text" required value={resultForm.remark} onChange={e => setResultForm({...resultForm, remark: e.target.value})} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-magenta focus:border-transparent outline-none transition-all text-sm" placeholder="1st Division, 2nd Division, etc." />
                    </div>
                  </div>

                  <div className="pt-6 flex justify-end">
                    <button 
                      type="submit" 
                      disabled={isSubmittingResult}
                      className="bg-gradient-to-r from-purple-700 to-pink-600 text-white font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity flex items-center shadow-lg shadow-pink-200 disabled:opacity-50"
                    >
                      {isSubmittingResult ? <Loader2 className="animate-spin mr-2" size={20} /> : <Save className="mr-2" size={20} />}
                      {isSubmittingResult ? 'Saving...' : 'Save & Publish Result'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Tab: All Published Results */}
          {activeTab === 'all-results' && (
            <div className="space-y-10 animate-in fade-in duration-500">
              {/* Section B: All Published Results */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
                  <div className="flex items-center space-x-4">
                    <h3 className="text-lg font-bold text-slate-800">All Published Results</h3>
                    <span className="bg-magenta text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">Total Results: {resultsList.length}</span>
                  </div>
                  <div className="relative w-full sm:w-72">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Search Roll, Enroll or Name..." 
                      value={resultSearchQuery}
                      onChange={(e) => setResultSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full border border-slate-300 rounded-lg focus:ring-2 focus:ring-magenta outline-none text-sm"
                    />
                  </div>
                </div>
                
                {resultLoading ? (
                  <div className="flex justify-center items-center py-20">
                    <Loader2 className="animate-spin text-magenta" size={32} />
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                      <thead>
                        <tr className="bg-slate-100/50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                          <th className="py-4 px-6">S.No / Date</th>
                          <th className="py-4 px-6">Roll & Enroll No</th>
                          <th className="py-4 px-6">Student & Father</th>
                          <th className="py-4 px-6">Course / Sem</th>
                          <th className="py-4 px-6">Marks</th>
                          <th className="py-4 px-6">Status / Remark</th>
                          <th className="py-4 px-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredResults.length === 0 ? (
                          <tr><td colSpan="7" className="py-12 text-center text-slate-500 font-medium">No results found matching your search.</td></tr>
                        ) : (
                          filteredResults.map((res, index) => (
                            <tr key={res._id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="py-4 px-6">
                                <p className="font-bold text-slate-700">#{index + 1}</p>
                                <p className="text-xs text-slate-400 mt-1">{new Date(res.createdAt).toLocaleDateString()}</p>
                              </td>
                              <td className="py-4 px-6">
                                <p className="font-bold text-slate-800 uppercase">{res.rollNo}</p>
                                <p className="text-xs text-slate-500 mt-1 uppercase">{res.enrollNo}</p>
                              </td>
                              <td className="py-4 px-6">
                                <p className="font-bold text-slate-800 uppercase">{res.name}</p>
                                <p className="text-xs text-slate-500 mt-1 uppercase">D/O, S/O: {res.fatherName}</p>
                              </td>
                              <td className="py-4 px-6">
                                <p className="font-medium text-slate-700 uppercase text-sm">{res.subject}</p>
                              </td>
                              <td className="py-4 px-6">
                                <p className="font-bold text-slate-800">{res.obtainedMarks} <span className="text-slate-400 font-normal">/ {res.totalMarks}</span></p>
                              </td>
                              <td className="py-4 px-6">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                                  res.result === 'PASS' ? 'bg-green-100 text-green-700' : 
                                  res.result === 'FAIL' ? 'bg-red-100 text-red-700' : 
                                  'bg-amber-100 text-amber-700'
                                }`}>
                                  {res.result}
                                </span>
                                <p className="text-xs text-slate-500 mt-1.5 font-medium">{res.remark}</p>
                              </td>
                              <td className="py-4 px-6 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button onClick={() => navigate('/results', { state: { resultData: res } })} className="text-slate-400 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50 transition-all inline-flex shadow-sm border border-transparent hover:border-blue-100" title="View Result">
                                    <Eye size={18} />
                                  </button>
                                  <button onClick={() => handleEditResult(res)} className="text-amber-500 hover:text-amber-700 p-2 rounded-lg hover:bg-amber-50 transition-all inline-flex shadow-sm border border-transparent hover:border-amber-100" title="Edit Result">
                                    <Edit size={18} />
                                  </button>
                                  <button onClick={() => handleDeleteResult(res._id)} className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-all inline-flex shadow-sm border border-transparent hover:border-red-100" title="Delete Result">
                                    <Trash2 size={18} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab: Leads */}
          {activeTab === 'leads' && (
            <div className="animate-in fade-in duration-500 space-y-6">
              
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex space-x-1 bg-slate-100 p-1.5 rounded-lg border border-slate-200 overflow-x-auto max-w-full">
                  <button onClick={() => setLeadFilter('ALL')} className={`whitespace-nowrap px-5 py-2 text-sm font-bold rounded-md transition-all ${leadFilter === 'ALL' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}>All Data</button>
                  <button onClick={() => setLeadFilter('ADMISSION_APPLY')} className={`whitespace-nowrap px-5 py-2 text-sm font-bold rounded-md transition-all ${leadFilter === 'ADMISSION_APPLY' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}>Admissions</button>
                  <button onClick={() => setLeadFilter('RESULT_VIEW')} className={`whitespace-nowrap px-5 py-2 text-sm font-bold rounded-md transition-all ${leadFilter === 'RESULT_VIEW' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}>Result Views</button>
                </div>
                
                <button onClick={exportCSV} className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg flex items-center space-x-2 transition-colors text-sm font-bold shadow-sm shadow-emerald-200 whitespace-nowrap">
                  <Download size={18} />
                  <span>Export CSV</span>
                </button>
              </div>

              {leadLoading ? (
                <div className="flex justify-center items-center py-20 bg-white rounded-xl border border-slate-200">
                  <Loader2 className="animate-spin text-magenta" size={32} />
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                          <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                          <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Source</th>
                          <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Student Info</th>
                          <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Details</th>
                          <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                          <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {leads.length === 0 ? (
                          <tr><td colSpan="6" className="py-12 text-center text-slate-500 font-medium">No leads found.</td></tr>
                        ) : (
                          leads.map((lead) => (
                            <tr key={lead._id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="py-4 px-6 text-sm text-slate-600 whitespace-nowrap font-medium">
                                {new Date(lead.createdAt || lead.accessTimestamp).toLocaleDateString()}
                              </td>
                              <td className="py-4 px-6 whitespace-nowrap">
                                <span className={`px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full ${lead.leadType === 'ADMISSION_APPLY' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                  {lead.leadType === 'ADMISSION_APPLY' ? 'Admission' : 'Result View'}
                                </span>
                              </td>
                              <td className="py-4 px-6">
                                <p className="text-sm font-bold text-slate-800">{lead.fullName || lead.username}</p>
                                <p className="text-xs text-slate-500 mt-1">{lead.email}</p>
                                <p className="text-xs text-slate-500">{lead.phone}</p>
                              </td>
                              <td className="py-4 px-6 text-sm text-slate-700">
                                {lead.leadType === 'ADMISSION_APPLY' ? (
                                  <span className="font-bold text-slate-800">{lead.programInterested}</span>
                                ) : (
                                  <span className="font-bold text-slate-600 uppercase">Roll: {lead.rollNumber}</span>
                                )}
                              </td>
                              <td className="py-4 px-6 whitespace-nowrap">
                                <select 
                                  value={lead.status}
                                  onChange={(e) => updateLeadStatus(lead._id, e.target.value)}
                                  className={`text-xs font-bold rounded-lg px-3 py-1.5 outline-none border cursor-pointer transition-colors ${
                                    lead.status === 'NEW' ? 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100' : 
                                    lead.status === 'CONTACTED' ? 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100' : 
                                    'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                                  }`}
                                >
                                  <option value="NEW">NEW</option>
                                  <option value="CONTACTED">CONTACTED</option>
                                  <option value="CLOSED">CLOSED</option>
                                </select>
                              </td>
                              <td className="py-4 px-6 text-right whitespace-nowrap">
                                <button onClick={() => handleDeleteLead(lead._id)} className="text-slate-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-all inline-flex shadow-sm border border-transparent hover:border-red-100">
                                  <Trash2 size={16} />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
    </div>
  );
};

export default AdminDashboard;
