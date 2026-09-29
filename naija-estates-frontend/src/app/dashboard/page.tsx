"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Loader2, Home, X } from "lucide-react";

export default function DashboardPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    type: "HOUSE",
    address: "",
    city: "Lagos",
    state: "Lagos",
    rentalPeriod: "YEARLY",
    imageUrl: "",
  });

  useEffect(() => {
    fetchMyProperties();
  }, []);

  const fetchMyProperties = async () => {
    try {
      const res = await fetch("/api/agent/properties");
      if (res.ok) {
        const data = await res.json();
        setProperties(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowAddForm(false);
        fetchMyProperties();
        setFormData({
          title: "", description: "", price: "", type: "HOUSE", 
          address: "", city: "Lagos", state: "Lagos", 
          rentalPeriod: "YEARLY", imageUrl: ""
        });
      } else {
        alert("Failed to add property. Ensure you are logged in as an Agent.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      <header className="w-full px-6 py-6 border-b border-white/10 flex justify-between items-center bg-[#0a0a0a] sticky top-0 z-50">
        <Link href="/" className="text-xl font-bold tracking-widest uppercase hover:opacity-50">
          Naija<span className="font-light">Spaces</span> <span className="text-gray-500 text-xs ml-2">AGENT</span>
        </Link>
        <Link href="/properties" className="flex items-center gap-2 text-xs tracking-widest uppercase hover:text-gray-400">
          <Home className="h-4 w-4" /> Live Site
        </Link>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-12">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-serif">Portfolio Manager</h1>
            <p className="text-gray-400 mt-2 text-sm uppercase tracking-widest">Manage your exclusive listings</p>
          </div>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 border border-white px-6 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
          >
            {showAddForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {showAddForm ? "Cancel" : "New Listing"}
          </button>
        </div>

        {showAddForm && (
          <div className="bg-[#111] p-8 border border-white/10 mb-12 animate-in fade-in slide-in-from-top-4">
            <h2 className="text-xl font-serif mb-8 border-b border-white/10 pb-4">Add New Property</h2>
            <form onSubmit={handleAddSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">Title</label>
                  <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-white text-lg font-light" placeholder="e.g. Luxury 4-Bed Duplex" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">Description</label>
                  <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} className="w-full bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-white text-lg font-light resize-none" placeholder="Property narrative..." />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">Price (₦)</label>
                    <input type="number" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-white text-lg font-light" placeholder="e.g. 15000000" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">Rental Period</label>
                    <select value={formData.rentalPeriod} onChange={e => setFormData({...formData, rentalPeriod: e.target.value})} className="w-full bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-white text-lg font-light appearance-none rounded-none cursor-pointer">
                      <option value="DAILY" className="bg-[#111] text-white">Daily</option>
                      <option value="WEEKLY" className="bg-[#111] text-white">Weekly</option>
                      <option value="MONTHLY" className="bg-[#111] text-white">Monthly</option>
                      <option value="YEARLY" className="bg-[#111] text-white">Yearly</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">Property Type</label>
                  <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-white text-lg font-light appearance-none rounded-none cursor-pointer">
                    <option value="HOUSE" className="bg-[#111] text-white">House</option>
                    <option value="APARTMENT" className="bg-[#111] text-white">Apartment</option>
                    <option value="SHOP" className="bg-[#111] text-white">Shop / Commercial</option>
                    <option value="LAND" className="bg-[#111] text-white">Land</option>
                  </select>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">City</label>
                    <input required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-white text-lg font-light" placeholder="e.g. Lagos" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">State</label>
                    <input required value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} className="w-full bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-white text-lg font-light" placeholder="e.g. Lagos" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">Specific Address</label>
                  <input required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-white text-lg font-light" placeholder="e.g. 15 Admiralty Way, Lekki" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">Image URL</label>
                  <input value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-white text-lg font-light" placeholder="https://unsplash.com/..." />
                </div>
              </div>

              <div className="md:col-span-2 pt-6">
                <button type="submit" disabled={submitting} className="bg-white text-black px-10 py-4 uppercase tracking-widest text-xs font-bold hover:bg-gray-200 transition-colors disabled:opacity-50">
                  {submitting ? "Publishing..." : "Publish Listing"}
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-gray-500" /></div>
        ) : properties.length === 0 ? (
          <div className="border border-dashed border-white/20 p-20 text-center text-gray-500 uppercase tracking-widest text-sm">
            No properties found in your portfolio
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map(p => (
              <div key={p.id} className="border border-white/10 bg-[#111] overflow-hidden group">
                <div className="aspect-video relative overflow-hidden bg-black">
                  <img src={p.imageUrl || "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80"} alt={p.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                </div>
                <div className="p-6">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2 flex justify-between">
                    <span>{p.city}</span>
                    <span>{p.type}</span>
                  </div>
                  <h3 className="font-serif text-xl mb-4 truncate">{p.title}</h3>
                  <div className="text-xl font-light">₦{(p.price || 0).toLocaleString()} <span className="text-xs text-gray-500">/ {p.rentalPeriod}</span></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
