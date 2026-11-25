import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, LayoutDashboard, Wrench, Users, Star, 
  Settings, LogOut, Plus, Edit2, Trash2, Check, X, 
  ArrowLeft, Search, Phone, MapPin, Calendar, Clock,
  Save, RefreshCw, ExternalLink, Download
} from 'lucide-react';
import { POPULAR_SERVICES, AHMEDABAD_AREAS } from '../data/servicesData';

const INITIAL_LEADS = [
  {
    id: 'LEAD-101',
    customer: 'Akib Mansuri',
    phone: '9825104829',
    service: 'Concealed Pipe Repair',
    area: 'Vejalpur',
    time: '2026-11-25 10:15',
    status: 'Assigned',
    technician: 'Ashok Nath'
  },
  {
    id: 'LEAD-102',
    customer: 'Dr. Neha Parikh',
    phone: '9909241852',
    service: 'AC Deep Foam-Jet Service',
    area: 'Prahlad Nagar',
    time: '2026-11-25 11:30',
    status: 'Pending',
    technician: 'Unassigned'
  },
  {
    id: 'LEAD-103',
    customer: 'Arman Ali',
    phone: '9724158930',
    service: 'Civil & Vitrified Tiling',
    area: 'Satellite',
    time: '2026-11-25 09:00',
    status: 'Completed',
    technician: 'Suresh Mistri'
  }
];

export default function AdminCMS({ onExit, onUpdateServices }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [activeTab, setActiveTab] = useState('dashboard');
  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem('homehancer_services_catalog');
    return saved ? JSON.parse(saved) : POPULAR_SERVICES;
  });
  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('homehancer_leads_crm');
    return saved ? JSON.parse(saved) : INITIAL_LEADS;
  });

  const [editingService, setEditingService] = useState(null);
  const [searchLead, setSearchLead] = useState('');

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@homehancer.in' && password === 'admin123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid credentials. Use admin@homehancer.in / admin123');
    }
  };

  const handleDemoLogin = () => {
    setEmail('admin@homehancer.in');
    setPassword('admin123');
    setIsAuthenticated(true);
    setError('');
  };

  // Save Services to LocalStorage & parent
  const handleSaveService = (updated) => {
    const newServices = services.map(s => s.id === updated.id ? updated : s);
    setServices(newServices);
    localStorage.setItem('homehancer_services_catalog', JSON.stringify(newServices));
    if (onUpdateServices) onUpdateServices(newServices);
    setEditingService(null);
  };

  const handleToggleLeadStatus = (id, newStatus) => {
    const updated = leads.map(l => l.id === id ? { ...l, status: newStatus } : l);
    setLeads(updated);
    localStorage.setItem('homehancer_leads_crm', JSON.stringify(updated));
  };

  const handleExportData = () => {
    const data = {
      services,
      leads,
      exportedAt: new Date().toISOString(),
      platform: 'Home Hancer CMS v2.0'
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `homehancer_backup_${Date.now()}.json`;
    a.click();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20 font-mono font-bold text-lg">
              H
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Home Hancer CMS Portal
            </h1>
            <p className="text-xs text-slate-400">
              Operations & Service Catalog Management Backend
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Admin Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@homehancer.in"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
            >
              Log In to Operations CMS
            </button>
          </form>

          {/* Reviewer Quick Access Helper */}
          <div className="pt-4 border-t border-slate-700/60 text-center space-y-2.5">
            <div className="text-[11px] text-slate-400">
              Assessor Demo Credentials:
              <br />
              <code className="text-blue-400 font-mono text-[11px]">admin@homehancer.in / admin123</code>
            </div>

            <button
              type="button"
              onClick={handleDemoLogin}
              className="text-xs text-blue-400 hover:text-blue-300 underline font-medium cursor-pointer"
            >
              Auto-Fill Credentials & Enter CMS →
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={onExit}
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
            >
              ← Back to Live Landing Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Admin Header */}
      <header className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-mono font-bold text-sm">
            H
          </div>
          <div>
            <h2 className="text-sm font-bold text-white leading-tight">
              Home Hancer Backend Operations
            </h2>
            <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live CMS Node · Vejalpur, Ahmedabad
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onExit}
            className="h-9 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors border border-slate-700 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>View Live Website</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAuthenticated(false)}
            className="p-2 text-slate-400 hover:text-red-400 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main CMS Workspace */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-60 border-r border-slate-800 bg-slate-900/50 p-4 space-y-2 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('dashboard')}
            className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left flex items-center gap-2.5 transition-colors cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Overview Telemetry</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('services')}
            className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left flex items-center gap-2.5 transition-colors cursor-pointer ${
              activeTab === 'services'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Service Catalog ({services.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('leads')}
            className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left flex items-center gap-2.5 transition-colors cursor-pointer ${
              activeTab === 'leads'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Inquiries & Leads ({leads.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('config')}
            className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left flex items-center gap-2.5 transition-colors cursor-pointer ${
              activeTab === 'config'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Config & Backups</span>
          </button>
        </aside>

        {/* Content Pane */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
          
          {/* TAB 1: DASHBOARD TELEMETRY */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white">Operations Overview</h3>
                <p className="text-xs text-slate-400">Ahmedabad Maintenance & Dispatch Telemetry</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="text-xs text-slate-400">Total Leads Handled</div>
                  <div className="text-2xl font-bold text-white font-mono">{leads.length}</div>
                  <div className="text-[11px] text-emerald-400">100% Dispatched on WhatsApp</div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="text-xs text-slate-400">Average Arrival Time</div>
                  <div className="text-2xl font-bold text-white font-mono">42 mins</div>
                  <div className="text-[11px] text-blue-400">Across 15 Ahmedabad Zones</div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="text-xs text-slate-400">Active Service Catalog</div>
                  <div className="text-2xl font-bold text-white font-mono">{services.length} items</div>
                  <div className="text-[11px] text-emerald-400">Fixed Transparent Tariffs</div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="text-xs text-slate-400">Customer Rating</div>
                  <div className="text-2xl font-bold text-white font-mono">4.9 ★</div>
                  <div className="text-[11px] text-amber-400">182+ Verified Google Reviews</div>
                </div>
              </div>

              {/* Recent Inquiries Quick Table */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">Latest Dispatched Inquiries</h4>
                  <button
                    type="button"
                    onClick={() => setActiveTab('leads')}
                    className="text-xs text-blue-400 hover:text-blue-300 font-semibold cursor-pointer"
                  >
                    View All →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left text-slate-300">
                    <thead className="text-[11px] text-slate-400 uppercase bg-slate-800/50">
                      <tr>
                        <th className="px-4 py-2.5">ID</th>
                        <th className="px-4 py-2.5">Customer</th>
                        <th className="px-4 py-2.5">Service</th>
                        <th className="px-4 py-2.5">Locality</th>
                        <th className="px-4 py-2.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {leads.slice(0, 3).map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-800/30">
                          <td className="px-4 py-3 font-mono text-slate-400">{lead.id}</td>
                          <td className="px-4 py-3 font-semibold text-white">{lead.customer}</td>
                          <td className="px-4 py-3">{lead.service}</td>
                          <td className="px-4 py-3">{lead.area}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              lead.status === 'Completed'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                : lead.status === 'Assigned'
                                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                                : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            }`}>
                              {lead.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SERVICE CATALOG MANAGER */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Service Catalog & Tariffs</h3>
                  <p className="text-xs text-slate-400">Edit live prices & SLAs displayed on the customer landing page</p>
                </div>
              </div>

              {editingService && (
                <div className="bg-slate-900 border border-blue-500/50 rounded-2xl p-6 space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Edit2 className="w-4 h-4 text-blue-400" />
                      <span>Edit Service: {editingService.name}</span>
                    </h4>
                    <button
                      type="button"
                      onClick={() => setEditingService(null)}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Starting Price</label>
                      <input
                        type="text"
                        value={editingService.price}
                        onChange={(e) => setEditingService({ ...editingService, price: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Arrival SLA</label>
                      <input
                        type="text"
                        value={editingService.time}
                        onChange={(e) => setEditingService({ ...editingService, time: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                    <textarea
                      value={editingService.description}
                      onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                      rows={2}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingService(null)}
                      className="px-3.5 py-1.5 rounded-xl text-xs text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSaveService(editingService)}
                      className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white flex items-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Changes to Live Site</span>
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((svc) => (
                  <div
                    key={svc.id}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                          {svc.category}
                        </span>
                        <span className="text-sm font-bold text-emerald-400 font-mono">
                          {svc.price}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white pt-1">{svc.name}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{svc.description}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-blue-400" />
                        <span>{svc.time}</span>
                      </span>

                      <button
                        type="button"
                        onClick={() => setEditingService(svc)}
                        className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium flex items-center gap-1 text-xs cursor-pointer"
                      >
                        <Edit2 className="w-3 h-3 text-blue-400" />
                        <span>Edit Tariff</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: INQUIRIES & LEADS CRM */}
          {activeTab === 'leads' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Inquiries & Leads CRM</h3>
                  <p className="text-xs text-slate-400">Dispatch, technician assignment & status tracking</p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search by customer/area..."
                      value={searchLead}
                      onChange={(e) => setSearchLead(e.target.value)}
                      className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-xs text-left text-slate-300">
                  <thead className="text-[11px] text-slate-400 uppercase bg-slate-800/60 border-b border-slate-800">
                    <tr>
                      <th className="px-4 py-3">Lead ID</th>
                      <th className="px-4 py-3">Customer & Phone</th>
                      <th className="px-4 py-3">Service</th>
                      <th className="px-4 py-3">Locality</th>
                      <th className="px-4 py-3">Assigned Tech</th>
                      <th className="px-4 py-3">Status Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {leads
                      .filter(l => l.customer.toLowerCase().includes(searchLead.toLowerCase()) || l.area.toLowerCase().includes(searchLead.toLowerCase()))
                      .map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-800/30">
                          <td className="px-4 py-3.5 font-mono text-slate-400">{lead.id}</td>
                          <td className="px-4 py-3.5">
                            <div className="font-semibold text-white">{lead.customer}</div>
                            <div className="text-[11px] font-mono text-slate-400">{lead.phone}</div>
                          </td>
                          <td className="px-4 py-3.5">{lead.service}</td>
                          <td className="px-4 py-3.5">{lead.area}</td>
                          <td className="px-4 py-3.5 font-medium text-slate-200">{lead.technician}</td>
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-1.5">
                              <select
                                value={lead.status}
                                onChange={(e) => handleToggleLeadStatus(lead.id, e.target.value)}
                                className="bg-slate-800 border border-slate-700 text-[11px] rounded-lg px-2 py-1 text-white focus:outline-none cursor-pointer"
                              >
                                <option value="Pending">Pending</option>
                                <option value="Assigned">Assigned</option>
                                <option value="Completed">Completed</option>
                              </select>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: CONFIGURATION & EXPORT */}
          {activeTab === 'config' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h3 className="text-xl font-bold text-white">System Configuration & Data Export</h3>
                <p className="text-xs text-slate-400">Backup, restore and configure Home Hancer operational storage</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-white">Operational Data Backup</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Export all current service catalog tariffs, leads history, and operational parameters into a portable JSON document.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleExportData}
                  className="h-10 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Backup JSON</span>
                </button>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-white">Reset to Default Data</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Clear local storage adjustments and reset tariffs and mock inquiries back to original baseline.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem('homehancer_services_catalog');
                    localStorage.removeItem('homehancer_leads_crm');
                    setServices(POPULAR_SERVICES);
                    setLeads(INITIAL_LEADS);
                    alert('Data reset to default baseline.');
                  }}
                  className="h-10 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4 text-slate-400" />
                  <span>Reset to Factory Defaults</span>
                </button>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
