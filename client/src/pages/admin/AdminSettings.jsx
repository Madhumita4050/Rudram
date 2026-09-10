import React, { useState, useEffect } from 'react';
import {
  Shield,
  KeyRound,
  Mail,
  User,
  Phone,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Save,
  Check,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { getAdminProfile, updateAdminProfile } from '../../api/admin';

export default function AdminSettings() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'admin',
    createdAt: ''
  });
  const [loadingProfile, setLoadingProfile] = useState(true);

  // Form states for profile & email
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);

  // Form states for password change
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  // Feedback notifications
  const [alertMsg, setAlertMsg] = useState(null); // { type: 'success' | 'error', text: '' }

  const fetchProfileData = async () => {
    try {
      setLoadingProfile(true);
      const data = await getAdminProfile();
      setProfile(data);
      setName(data.name || '');
      setEmail(data.email || '');
      setPhone(data.phone || '');
    } catch (err) {
      // Fallback from localStorage if available
      const localUserStr = localStorage.getItem('user');
      if (localUserStr) {
        try {
          const localUser = JSON.parse(localUserStr);
          setProfile(localUser);
          setName(localUser.name || '');
          setEmail(localUser.email || '');
          setPhone(localUser.phone || '');
        } catch (e) {}
      }
      setAlertMsg({ type: 'error', text: err.message || 'Failed to load profile data.' });
    } finally {
      setLoadingProfile(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const showAlert = (type, text) => {
    setAlertMsg({ type, text });
    setTimeout(() => {
      setAlertMsg((prev) => (prev?.text === text ? null : prev));
    }, 6000);
  };

  // Handle Profile (Name, Phone, Email) Update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showAlert('error', 'Please enter a valid email address.');
      return;
    }

    try {
      setSavingProfile(true);
      setAlertMsg(null);
      const res = await updateAdminProfile({
        name,
        email,
        phone
      });

      if (res.token) {
        localStorage.setItem('token', res.token);
      }
      if (res.user) {
        localStorage.setItem('user', JSON.stringify(res.user));
        setProfile(res.user);
        setName(res.user.name);
        setEmail(res.user.email);
        setPhone(res.user.phone || '');
      }

      showAlert('success', res.message || 'Admin profile & email updated successfully!');
    } catch (err) {
      showAlert('error', err.message || 'Failed to update profile.');
    } finally {
      setSavingProfile(false);
    }
  };

  // Handle Password Update
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!currentPassword) {
      showAlert('error', 'Please enter your current admin password.');
      return;
    }
    if (newPassword.length < 6) {
      showAlert('error', 'New password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      showAlert('error', 'New password and confirmation password do not match.');
      return;
    }

    try {
      setSavingPassword(true);
      setAlertMsg(null);
      const res = await updateAdminProfile({
        currentPassword,
        newPassword
      });

      if (res.token) {
        localStorage.setItem('token', res.token);
      }
      if (res.user) {
        localStorage.setItem('user', JSON.stringify(res.user));
      }

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      showAlert('success', 'Admin password changed successfully! Your portal is protected with your new password.');
    } catch (err) {
      showAlert('error', err.message || 'Failed to update password.');
    } finally {
      setSavingPassword(false);
    }
  };

  // Password strength calculation
  const getPasswordStrength = (pass) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 6) score += 25;
    if (pass.length >= 10) score += 25;
    if (/[0-9]/.test(pass)) score += 25;
    if (/[^A-Za-z0-9]/.test(pass)) score += 25;
    return score;
  };

  const strength = getPasswordStrength(newPassword);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200">
              Admin Exclusive
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Protected
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Shield className="w-7 h-7 text-amber-500" />
            <span>Admin Security & Account Settings</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your administrator credentials. You can update your login email and password securely here.
          </p>
        </div>

        <button
          onClick={fetchProfileData}
          disabled={loadingProfile}
          className="self-start sm:self-auto flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl shadow-sm transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loadingProfile ? 'animate-spin text-amber-500' : ''}`} />
          <span>Refresh Details</span>
        </button>
      </div>

      {/* Global Alert Notification */}
      {alertMsg && (
        <div
          className={`p-4 rounded-2xl text-xs font-bold flex items-start gap-3 border shadow-sm transition-all animate-fadeIn ${
            alertMsg.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-rose-50 text-rose-800 border-rose-200'
          }`}
        >
          {alertMsg.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <p className="font-bold">{alertMsg.type === 'success' ? 'Success' : 'Error Notice'}</p>
            <p className="font-normal text-slate-700 mt-0.5">{alertMsg.text}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Admin Identity Summary Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-r from-amber-500 to-amber-600"></div>

            <div className="relative pt-6">
              <div className="w-20 h-20 rounded-2xl bg-white p-1 shadow-lg mx-auto mb-3 flex items-center justify-center">
                <div className="w-full h-full rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-black text-2xl border border-amber-200">
                  {profile.name?.charAt(0) || 'A'}
                </div>
              </div>

              <h2 className="text-lg font-black text-slate-900">{profile.name || 'Administrator'}</h2>
              <p className="text-xs text-amber-600 font-bold mt-0.5 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Super Administrator
              </p>
              <p className="text-[11px] text-slate-500 mt-1 break-all">{profile.email}</p>

              <div className="mt-6 pt-5 border-t border-slate-100 text-left space-y-3 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400">Account Role</span>
                  <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 uppercase text-[10px]">
                    {profile.role}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400">Account Status</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 capitalize text-[10px] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    {profile.status || 'Active'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400">Contact Number</span>
                  <span className="font-semibold text-slate-800">{profile.phone || 'Not set'}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400">Admin ID</span>
                  <span className="font-mono text-[10px] text-slate-500">ADM-#{profile.id || 1}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Confidentiality Notice */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-5 shadow-sm border border-slate-800">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs mb-2">
              <Lock className="w-4 h-4" />
              <span>Confidentiality & Privacy</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Your administrator profile and password are strictly private. Admin details are completely hidden from standard platform user lists and public directories.
            </p>
          </div>
        </div>

        {/* Right Column: Edit Forms */}
        <div className="lg:col-span-8 space-y-6">
          {/* 1. Profile & Email Settings */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">Admin Identity & Login Email</h3>
                <p className="text-xs text-slate-500">Change your administrative display name, contact phone, or login email.</p>
              </div>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Admin Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Admin Name"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Contact Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder=""
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Admin Login Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder=""
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  You will use this email address to log in to the admin panel.
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-md shadow-amber-500/20 transition-all disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{savingProfile ? 'Saving Email & Details...' : 'Save Profile & Email'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* 2. Password Security Settings */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">Change Admin Password</h3>
                <p className="text-xs text-slate-500">Update your password to ensure full control and security over your portal.</p>
              </div>
            </div>

            <form onSubmit={handleUpdatePassword} className="space-y-4">
              {/* Current Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Current Admin Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password to verify authority"
                    className="w-full pl-10 pr-11 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* New Password & Confirmation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    New Password <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="w-full pl-10 pr-11 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Confirm New Password <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-type new password"
                      className="w-full pl-10 pr-11 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Password Strength Meter */}
              {newPassword && (
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-semibold">Password Strength:</span>
                    <span
                      className={`font-bold ${
                        strength <= 25
                          ? 'text-rose-600'
                          : strength <= 50
                          ? 'text-amber-600'
                          : strength <= 75
                          ? 'text-blue-600'
                          : 'text-emerald-600'
                      }`}
                    >
                      {strength <= 25
                        ? 'Weak'
                        : strength <= 50
                        ? 'Fair'
                        : strength <= 75
                        ? 'Good'
                        : 'Strong & Secure'}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        strength <= 25
                          ? 'bg-rose-500 w-1/4'
                          : strength <= 50
                          ? 'bg-amber-500 w-2/4'
                          : strength <= 75
                          ? 'bg-blue-500 w-3/4'
                          : 'bg-emerald-500 w-full'
                      }`}
                    ></div>
                  </div>
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={savingPassword}
                  className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl shadow-md transition-all disabled:opacity-50"
                >
                  <KeyRound className="w-4 h-4 text-amber-400" />
                  <span>{savingPassword ? 'Updating Password...' : 'Update Password'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
