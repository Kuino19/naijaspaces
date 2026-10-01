"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Shield, Users, Building, DollarSign, CheckCircle2, XCircle, Loader2, ArrowLeft, RefreshCw } from "lucide-react";

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleVerification = async (target: "property" | "user", id: string, currentStatus: boolean) => {
    setActionLoading(id);
    try {
      const res = await fetch("/api/admin", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target, id, isVerified: !currentStatus })
      });
      if (res.ok) {
        await fetchAdminData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col selection:bg-white selection:text-black">
      {/* Header */}
      <header className="w-full z-50 px-6 py-8 flex justify-between items-center border-b border-white/10">
        <Link href="/" className="text-xl font-bold tracking-widest uppercase hover:opacity-50 transition-opacity">
          Naija<span className="font-light">Spaces</span> <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 ml-2 font-mono">ADMIN</span>
        </Link>
        <Link href="/dashboard" className="flex items-center gap-2 text-xs tracking-widest uppercase hover:opacity-50 transition-opacity">
          <ArrowLeft className="h-4 w-4" /> Agent Portal
        </Link>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-12">
        <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-gray-500">Platform Governance</span>
            <h1 className="text-4xl font-serif text-white mt-1">Admin Dashboard</h1>
          </div>
          <button 
            onClick={fetchAdminData} 
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 hover:text-white border border-white/10 px-4 py-2"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh Data
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-[#111] border border-white/10 p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs uppercase tracking-widest text-gray-500">Total Users</span>
              <Users className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-3xl font-serif text-white">{data?.stats?.totalUsers || 0}</div>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-2 block">{data?.stats?.totalAgents || 0} Licensed Agents</span>
          </div>

          <div className="bg-[#111] border border-white/10 p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs uppercase tracking-widest text-gray-500">Total Properties</span>
              <Building className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-3xl font-serif text-white">{data?.stats?.totalProperties || 0}</div>
            <span className="text-[10px] text-green-400 uppercase tracking-widest mt-2 block">{data?.stats?.verifiedProperties || 0} Verified Listings</span>
          </div>

          <div className="bg-[#111] border border-white/10 p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs uppercase tracking-widest text-gray-500">Verified Badges</span>
              <Shield className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-3xl font-serif text-green-400">{data?.stats?.verifiedProperties || 0}</div>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-2 block">Active Trust Certificates</span>
          </div>

          <div className="bg-[#111] border border-white/10 p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs uppercase tracking-widest text-gray-500">Platform Revenue</span>
              <DollarSign className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-3xl font-serif text-white">₦{(data?.stats?.totalRevenue || 0).toLocaleString()}</div>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-2 block">{data?.stats?.totalPayments || 0} Completed Transactions</span>
          </div>
        </div>

        {/* Recent Properties Management */}
        <div className="mb-16">
          <h2 className="text-2xl font-serif text-white mb-6">Property Verification Management</h2>
          <div className="overflow-x-auto border border-white/10 bg-[#111]">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-[#161616] text-xs uppercase tracking-widest text-gray-400">
                  <th className="p-4">Property</th>
                  <th className="p-4">Agent</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {data?.recentProperties?.map((prop: any) => (
                  <tr key={prop.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-medium text-white">{prop.title}</td>
                    <td className="p-4 text-gray-300">{prop.agent?.name || prop.agent?.email || "Unknown"}</td>
                    <td className="p-4 text-gray-300">₦{(prop.price || 0).toLocaleString()}</td>
                    <td className="p-4 text-gray-400">{prop.city}, {prop.state}</td>
                    <td className="p-4">
                      {prop.isVerified ? (
                        <span className="inline-flex items-center gap-1 text-green-400 text-xs font-semibold uppercase tracking-wider">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                        </span>
                      ) : (
                        <span className="text-gray-500 text-xs uppercase tracking-wider">Pending</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        disabled={actionLoading === prop.id}
                        onClick={() => toggleVerification("property", prop.id, prop.isVerified)}
                        className={`text-xs uppercase tracking-widest px-3 py-1.5 border transition-colors ${
                          prop.isVerified 
                            ? "border-red-500/30 text-red-400 hover:bg-red-500/10" 
                            : "border-green-500/30 text-green-400 hover:bg-green-500/10"
                        }`}
                      >
                        {actionLoading === prop.id ? "Updating..." : prop.isVerified ? "Revoke Verification" : "Grant Verified Badge"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Users Management */}
        <div>
          <h2 className="text-2xl font-serif text-white mb-6">User & Agent Directory</h2>
          <div className="overflow-x-auto border border-white/10 bg-[#111]">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-[#161616] text-xs uppercase tracking-widest text-gray-400">
                  <th className="p-4">User</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {data?.recentUsers?.map((user: any) => (
                  <tr key={user.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-medium text-white">{user.name || "N/A"}</td>
                    <td className="p-4 text-gray-300">{user.email}</td>
                    <td className="p-4 text-xs font-mono uppercase text-gray-400">{user.role}</td>
                    <td className="p-4">
                      {user.isVerified ? (
                        <span className="inline-flex items-center gap-1 text-green-400 text-xs font-semibold uppercase tracking-wider">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Verified Agent
                        </span>
                      ) : (
                        <span className="text-gray-500 text-xs uppercase tracking-wider">Standard</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        disabled={actionLoading === user.id}
                        onClick={() => toggleVerification("user", user.id, user.isVerified)}
                        className={`text-xs uppercase tracking-widest px-3 py-1.5 border transition-colors ${
                          user.isVerified 
                            ? "border-red-500/30 text-red-400 hover:bg-red-500/10" 
                            : "border-green-500/30 text-green-400 hover:bg-green-500/10"
                        }`}
                      >
                        {actionLoading === user.id ? "Updating..." : user.isVerified ? "Unverify Agent" : "Verify Agent"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
