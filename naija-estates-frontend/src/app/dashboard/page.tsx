"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Loader2, Home, X, UploadCloud, Edit, Trash2, CheckCircle2, Eye, Images } from "lucide-react";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function DashboardPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<any | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");

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
    extraImages: "", // Comma separated extra image URLs
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

  const openEditModal = (property: any) => {
    setEditingProperty(property);
    const extraUrls = property.images ? property.images.map((i: any) => i.url).join("\n") : "";
    setFormData({
      title: property.title || "",
      description: property.description || "",
      price: property.price ? property.price.toString() : "",
      type: property.type || "HOUSE",
      address: property.address || "",
      city: property.city || "Lagos",
      state: property.state || "Lagos",
      rentalPeriod: property.rentalPeriod || "YEARLY",
      imageUrl: property.imageUrl || "",
      extraImages: extraUrls
    });
    setPreviewUrl(property.imageUrl || "");
    setShowAddForm(true);
  };

  const closeForm = () => {
    setShowAddForm(false);
    setEditingProperty(null);
    setFile(null);
    setPreviewUrl("");
    setFormData({
      title: "", description: "", price: "", type: "HOUSE", 
      address: "", city: "Lagos", state: "Lagos", 
      rentalPeriod: "YEARLY", imageUrl: "", extraImages: ""
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let finalImageUrl = formData.imageUrl;

      if (file) {
        const cloudinaryCloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "93yMRFDfOOpm7RLdSufmcLsPwHQ";

        if (!cloudinaryCloudName) {
           alert("Please add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME to your Vercel Environment Variables.");
           setSubmitting(false);
           return;
        }

        const formDataData = new FormData();
        formDataData.append("file", file);
        formDataData.append("upload_preset", uploadPreset);
        
        const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/auto/upload`, {
          method: "POST",
          body: formDataData
        });
        
        const uploadData = await uploadRes.json();
        if (uploadData.secure_url) {
           finalImageUrl = uploadData.secure_url;
        } else {
           alert("Upload failed. Using image URL instead.");
        }
      }

      // Parse extra image URLs
      const extraArray = formData.extraImages
        ? formData.extraImages.split(/[\n,]+/).map(s => s.trim()).filter(Boolean)
        : [];
      
      const allImages = finalImageUrl ? [finalImageUrl, ...extraArray] : extraArray;

      if (editingProperty) {
        // Edit existing property
        const res = await fetch(`/api/agent/properties/${editingProperty.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, imageUrl: finalImageUrl, images: allImages }),
        });
        if (res.ok) {
          closeForm();
          fetchMyProperties();
        } else {
          alert("Failed to update property.");
        }
      } else {
        // Create new property
        const res = await fetch("/api/properties", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, imageUrl: finalImageUrl, images: allImages }),
        });
        if (res.ok) {
          closeForm();
          fetchMyProperties();
        } else {
          alert("Failed to add property.");
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const toggleAvailability = async (property: any) => {
    try {
      const res = await fetch(`/api/agent/properties/${property.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAvailable: !property.isAvailable })
      });
      if (res.ok) {
        fetchMyProperties();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this property listing?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/agent/properties/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        fetchMyProperties();
      } else {
        alert("Failed to delete property.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col selection:bg-white selection:text-black">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-4 w-full">
        <Breadcrumbs items={[
          { label: "Agent Portal" }
        ]} />
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-12">
        <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-gray-500">Agent Command Center</span>
            <h1 className="text-4xl font-serif text-white mt-1">Portfolio Manager</h1>
          </div>
          <button 
            onClick={showAddForm ? closeForm : () => setShowAddForm(true)}
            className="flex items-center gap-2 border border-white px-6 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
          >
            {showAddForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {showAddForm ? "Cancel" : "New Listing"}
          </button>
        </div>

        {/* Form Modal / Accordion */}
        {showAddForm && (
          <div className="bg-[#111] p-8 border border-white/10 mb-12 animate-in fade-in slide-in-from-top-4">
            <h2 className="text-2xl font-serif mb-8 border-b border-white/10 pb-4">
              {editingProperty ? `Edit "${editingProperty.title}"` : "Add New Property"}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">Title</label>
                  <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-white text-lg font-light" placeholder="e.g. Luxury 4-Bed Duplex in Lekki" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">Description</label>
                  <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} className="w-full bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-white text-lg font-light resize-none" placeholder="Property narrative & features..." />
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
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">City & State</label>
                    <input required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-white text-lg font-light" placeholder="e.g. Lagos" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">Property Type</label>
                    <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-white text-lg font-light appearance-none rounded-none cursor-pointer">
                      <option value="HOUSE" className="bg-[#111] text-white">House</option>
                      <option value="APARTMENT" className="bg-[#111] text-white">Apartment</option>
                      <option value="SHOP" className="bg-[#111] text-white">Shop / Commercial</option>
                      <option value="LAND" className="bg-[#111] text-white">Land</option>
                    </select>
                  </div>
                </div>
                
                {/* Media Upload & Multi-Image Gallery */}
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">Primary Cover Photo or Video</label>
                  <div className="border border-dashed border-white/20 p-6 text-center relative hover:bg-white/5 transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[120px] overflow-hidden mb-4">
                    <input 
                      type="file" 
                      accept="image/*,video/*" 
                      className="absolute inset-0 opacity-0 cursor-pointer z-10 w-full h-full" 
                      onChange={(e) => {
                        const selectedFile = e.target.files?.[0];
                        if (selectedFile) {
                          setFile(selectedFile);
                          setPreviewUrl(URL.createObjectURL(selectedFile));
                        }
                      }}
                    />
                    {previewUrl ? (
                      file?.type.startsWith('video/') ? (
                         <video src={previewUrl} className="absolute inset-0 w-full h-full object-cover opacity-80" muted autoPlay loop />
                      ) : (
                         <img src={previewUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                      )
                    ) : (
                      <div className="flex flex-col items-center">
                        <UploadCloud className="h-6 w-6 text-gray-500 mb-2" />
                        <span className="text-xs text-gray-400">Click to Upload Cover Image/Video</span>
                      </div>
                    )}
                  </div>

                  {/* Additional Image URLs */}
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2 flex items-center gap-1">
                    <Images className="w-3.5 h-3.5" /> Additional Gallery Photo URLs (One URL per line)
                  </label>
                  <textarea
                    value={formData.extraImages}
                    onChange={(e) => setFormData({ ...formData, extraImages: e.target.value })}
                    rows={2}
                    className="w-full bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-white text-xs font-mono text-gray-300 resize-none"
                    placeholder="https://images.unsplash.com/photo-1...&#10;https://images.unsplash.com/photo-2..."
                  />
                </div>
              </div>

              <div className="md:col-span-2 pt-6 flex gap-4">
                <button type="submit" disabled={submitting} className="bg-white text-black px-10 py-4 uppercase tracking-widest text-xs font-bold hover:bg-gray-200 transition-colors disabled:opacity-50">
                  {submitting ? "Saving Listing..." : editingProperty ? "Save Changes" : "Publish Listing"}
                </button>
                <button type="button" onClick={closeForm} className="border border-white/20 text-gray-400 px-8 py-4 uppercase tracking-widest text-xs hover:text-white transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-gray-500" /></div>
        ) : properties.length === 0 ? (
          <div className="border border-dashed border-white/20 p-20 text-center text-gray-500 uppercase tracking-widest text-sm">
            No properties found in your portfolio. Click "New Listing" above to publish your first property!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map(p => (
              <div key={p.id} className="border border-white/10 bg-[#111] overflow-hidden group flex flex-col justify-between">
                <div>
                  <div className="aspect-video relative overflow-hidden bg-black">
                    {p.imageUrl?.includes('/video/upload') || p.imageUrl?.endsWith('.mp4') ? (
                      <video src={p.imageUrl} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700" muted autoPlay loop />
                    ) : (
                      <img src={p.imageUrl || "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80"} alt={p.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                    )}
                    
                    {/* Status Badge */}
                    <button 
                      onClick={() => toggleAvailability(p)}
                      className={`absolute top-4 left-4 px-3 py-1 text-[10px] uppercase tracking-widest font-bold border transition-colors ${
                        p.isAvailable ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-red-500/20 text-red-400 border-red-500/30"
                      }`}
                    >
                      {p.isAvailable ? "● Available" : "● Occupied / Rented"}
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2 flex justify-between">
                      <span>{p.city}, {p.state}</span>
                      <span>{p.type}</span>
                    </div>
                    <h3 className="font-serif text-xl mb-3 truncate">{p.title}</h3>
                    <div className="text-xl font-light">₦{(p.price || 0).toLocaleString()} <span className="text-xs text-gray-500">/ {p.rentalPeriod}</span></div>
                  </div>
                </div>

                {/* Agent Card Management Actions (Task 1 & 2) */}
                <div className="p-6 pt-0 flex gap-2 border-t border-white/10 pt-4">
                  <Link 
                    href={`/properties/${p.id}`} 
                    className="flex-1 border border-white/20 py-2.5 text-center text-[10px] uppercase tracking-widest text-gray-300 hover:text-white hover:border-white transition-colors flex items-center justify-center gap-1"
                    title="View property live"
                  >
                    <Eye className="w-3.5 h-3.5" /> View
                  </Link>

                  <button 
                    onClick={() => openEditModal(p)} 
                    className="flex-1 border border-white/20 py-2.5 text-[10px] uppercase tracking-widest text-gray-300 hover:text-white hover:border-white transition-colors flex items-center justify-center gap-1"
                    title="Edit property details"
                  >
                    <Edit className="w-3.5 h-3.5" /> Edit
                  </button>

                  <button 
                    disabled={deletingId === p.id}
                    onClick={() => handleDelete(p.id)} 
                    className="border border-red-500/30 text-red-400 hover:bg-red-500/10 px-3 py-2.5 text-[10px] uppercase tracking-widest transition-colors flex items-center justify-center"
                    title="Delete listing"
                  >
                    {deletingId === p.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
