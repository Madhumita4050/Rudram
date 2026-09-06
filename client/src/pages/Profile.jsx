import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Smartphone, Calendar, Camera, Edit2, CheckCircle, LogOut, Save, X, Shield, LayoutDashboard } from 'lucide-react';

export default function Profile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  
  const [user, setUser] = useState({
    id: 1,
    name: 'User',
    email: '',
    phone: '',
    role: 'user',
    kycStatus: 'Verified',
    joinedDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser({ 
          id: parsedUser.id || 1,
          name: parsedUser.name || 'User', 
          email: parsedUser.email || '',
          phone: parsedUser.phone || '',
          role: parsedUser.role || 'user',
          kycStatus: 'Verified',
          joinedDate: parsedUser.createdAt ? new Date(parsedUser.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
        });
      } catch (e) {
        // error parsing user
      }
    }
    const savedPic = localStorage.getItem('profilePic');
    if (savedPic) {
      setProfilePic(savedPic);
    }
  }, []);



  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleSave = () => {
    setIsEditing(false);
    const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
    const updatedUser = { ...savedUser, name: user.name, phone: user.phone };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    // Trigger storage event so other tabs/components (like Navbar) might update if they listened to it, 
    // or we just rely on navigation to trigger re-renders.
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        localStorage.setItem('profilePic', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        
        {/* Profile Card */}
        <div className="bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden relative">
          
          {/* Edit Toggle Button */}
          <button 
            onClick={() => isEditing ? setIsEditing(false) : setIsEditing(true)}
            className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full transition-all shadow-sm border border-white/30"
            title={isEditing ? "Cancel Edit" : "Edit Profile"}
          >
            {isEditing ? <X className="h-5 w-5 text-white" /> : <Edit2 className="h-5 w-5 text-white" />}
          </button>

          {/* Avatar Banner Header */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 h-36 relative flex items-end justify-center">
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-4">
              <div className="relative group">
                <div className="w-28 h-28 rounded-full bg-slate-100 flex items-center justify-center border-4 border-white shadow-lg overflow-hidden relative z-10">
                  {profilePic ? (
                    <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="h-12 w-12 text-slate-400" />
                  )}
                </div>
                
                {/* Camera Overlay */}
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm z-20"
                >
                  <Camera className="h-8 w-8 text-white" />
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>
            </div>
          </div>

          <div className="pt-20 pb-8 px-6 text-center">
            
            {isEditing ? (
              <input 
                type="text" 
                value={user.name}
                onChange={(e) => setUser({...user, name: e.target.value})}
                className="text-xl font-bold text-center border-b-2 border-amber-500 focus:outline-none bg-amber-50 rounded px-2 py-1 w-full max-w-[250px]"
              />
            ) : (
              <h2 className="text-2xl font-extrabold text-slate-900">{user.name}</h2>
            )}
            
            <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">Customer ID: RP-USR-00{user.id || '1'}</p>

            {/* KYC status chip & Admin Badge */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-sm">
                <CheckCircle className="h-4 w-4" /> KYC {user.kycStatus}
              </span>

              {user.role === 'admin' && (
                <span className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-600 border border-amber-500/30 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-sm">
                  <Shield className="h-3.5 w-3.5 text-amber-600" /> Admin Privileges
                </span>
              )}
            </div>

            {/* Admin Panel Direct Action */}
            {user.role === 'admin' && (
              <div className="mt-5">
                <Link
                  to="/admin"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm py-3 px-4 rounded-2xl transition-all shadow-lg shadow-amber-500/20"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Open Admin Dashboard</span>
                </Link>
              </div>
            )}

            {/* Details list */}
            <div className="border-t border-slate-100 pt-6 mt-6 text-left space-y-5">
              
              <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="bg-white p-2.5 rounded-xl shadow-sm text-slate-400">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="flex-grow">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Email Address</p>
                  <p className="text-sm font-semibold text-slate-800">{user.email || 'Not Provided'}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="bg-white p-2.5 rounded-xl shadow-sm text-slate-400">
                  <Smartphone className="h-5 w-5" />
                </div>
                <div className="flex-grow">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Registered Mobile</p>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={user.phone}
                      onChange={(e) => setUser({...user, phone: e.target.value})}
                      placeholder="Enter mobile number"
                      className="text-sm font-semibold text-slate-800 bg-white border border-slate-300 rounded px-2 py-1 w-full focus:outline-none focus:border-amber-500"
                    />
                  ) : (
                    <p className="text-sm font-semibold text-slate-800">{user.phone || 'Not Provided'}</p>
                  )}
                </div>
              </div>


              <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="bg-white p-2.5 rounded-xl shadow-sm text-slate-400">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="flex-grow">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Member Since</p>
                  <p className="text-sm font-semibold text-slate-800">{user.joinedDate}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 space-y-3">
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg"
                >
                  <Save className="h-5 w-5" /> Save Changes
                </button>
              ) : null}
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold text-sm py-3.5 rounded-xl transition-colors"
              >
                <LogOut className="h-5 w-5" /> Log Out
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
