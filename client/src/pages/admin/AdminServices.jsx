import React, { useState, useEffect } from 'react';
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  Search,
  X,
  AlertCircle,
  CheckCircle,
  Smartphone,
  Tv,
  Zap,
  Droplet,
  CreditCard,
  Plane,
  Tag,
  Flame,
  Globe,
  Briefcase
} from 'lucide-react';
import {
  createAdminService,
  updateAdminService,
  deleteAdminService
} from '../../api/admin';
import { getServices } from '../../api/services';
import DynamicIcon from '../../components/DynamicIcon';

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [message, setMessage] = useState(null);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Recharge',
    description: '',
    price: 0,
    icon: 'Smartphone'
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const data = await getServices();
      setServices(data || []);
    } catch (err) {
      console.error('Error fetching services:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openAddModal = () => {
    setEditingService(null);
    setFormData({
      title: '',
      category: 'Recharge',
      description: '',
      price: 0,
      icon: 'Smartphone'
    });
    setModalOpen(true);
  };

  const openEditModal = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      category: service.category || 'Recharge',
      description: service.description || '',
      price: service.price || 0,
      icon: service.icon || 'Smartphone'
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      if (editingService) {
        const res = await updateAdminService(editingService.id, formData);
        setServices((prev) =>
          prev.map((s) => (s.id === editingService.id ? res.service : s))
        );
        setMessage({ type: 'success', text: 'Service updated successfully!' });
      } else {
        const res = await createAdminService(formData);
        setServices((prev) => [...prev, res.service]);
        setMessage({ type: 'success', text: 'New service created successfully!' });
      }
      setModalOpen(false);
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: 'Error saving service details' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      await deleteAdminService(id);
      setServices((prev) => prev.filter((s) => s.id !== id));
      setMessage({ type: 'success', text: 'Service deleted.' });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to delete service' });
    }
  };

  const availableIcons = [
    'Smartphone', 'Tv', 'Zap', 'Droplet', 'CreditCard', 'Plane', 'Tag', 'Flame', 'Globe', 'Briefcase', 'Shield', 'FileText'
  ];

  const categories = ['All', 'Recharge', 'Utility', 'Finance', 'Travel', 'Government', 'General'];

  const filteredServices = services.filter((s) => {
    const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase()) || (s.description && s.description.toLowerCase().includes(search.toLowerCase()));
    const matchesCat = categoryFilter === 'All' || (s.category && s.category.toLowerCase() === categoryFilter.toLowerCase());
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Layers className="w-7 h-7 text-amber-400" />
            <span>Services Catalog</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Create, update, manage categories, and configure pricing for digital services.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl text-xs font-black shadow-lg shadow-amber-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {message && (
        <div
          className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2 border ${
            message.type === 'success'
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              : 'bg-red-500/10 text-red-400 border-red-500/20'
          }`}
        >
          <AlertCircle className="w-4 h-4" />
          <span>{message.text}</span>
        </div>
      )}

      {/* Filter Toolbar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-lg flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search services by title or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs text-slate-400 font-semibold whitespace-nowrap">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3.5 py-2.5 bg-slate-950/60 border border-slate-800 rounded-2xl text-xs text-white focus:outline-none focus:border-amber-500 w-full md:w-auto"
          >
            {categories.map((c) => (
              <option key={c} value={c} className="bg-slate-900">
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          [1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-44 bg-slate-900/80 rounded-3xl animate-pulse border border-slate-800"></div>
          ))
        ) : filteredServices.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-500">
            <Layers className="w-10 h-10 mx-auto text-slate-600 mb-2" />
            <p className="font-semibold text-slate-400">No services found matching filters.</p>
          </div>
        ) : (
          filteredServices.map((svc) => (
            <div
              key={svc.id}
              className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20 group-hover:scale-105 transition-transform">
                    <DynamicIcon name={svc.icon || 'Smartphone'} className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-slate-800 text-slate-300 rounded-lg border border-slate-700">
                    {svc.category || 'General'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-1">{svc.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2 mb-4">
                  {svc.description || 'No description provided.'}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 font-semibold block uppercase">Base Price</span>
                  <span className="text-sm font-black text-white">
                    {svc.price && svc.price > 0 ? `₹ ${svc.price}` : 'Dynamic / Free'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(svc)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="Edit Service"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(svc.id)}
                    className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors"
                    title="Delete Service"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Service Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-amber-500/10 text-amber-400 rounded-2xl">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">
                  {editingService ? 'Edit Service' : 'Add New Service'}
                </h3>
                <p className="text-xs text-slate-400">Configure catalog details and metadata</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-400 mb-1">Service Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Metro Card Recharge"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-400 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  >
                    {categories.filter(c => c !== 'All').map((cat) => (
                      <option key={cat} value={cat} className="bg-slate-900">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-400 mb-1">Base Fee (₹)</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0 for dynamic"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-400 mb-1">Lucide Icon</label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                >
                  {availableIcons.map((ic) => (
                    <option key={ic} value={ic} className="bg-slate-900">
                      {ic}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-400 mb-1">Description</label>
                <textarea
                  rows="3"
                  placeholder="Provide short explanation of this service..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500 resize-none"
                ></textarea>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-colors shadow-md disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : editingService ? 'Save Changes' : 'Create Service'}
                </button>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
