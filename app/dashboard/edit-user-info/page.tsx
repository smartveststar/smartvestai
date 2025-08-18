'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { getUserData } from '@/lib/actions/GetUserData';
import { updateUserData } from './updateUserData'; 
import { UserData } from '@/types/type';
import { ArrowLeft, Check } from 'lucide-react';

export default function EditUserInfo() {
  const { user, isLoaded } = useUser();
  const [userData, setUserData] = useState<UserData | null>(null);
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    zip_code: '',
    address: '',
    gender: '',
    date_of_birth: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadUserData() {
      if (!user?.id) return;
      
      try {
        const data = await getUserData(user.id);
        if (!data) {
          console.error('User not found');
          return;
        }
        
        setUserData(data);
        setFormData({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          username: data.username || '',
          email: data.email || '',
          phone: data.phone || '',
          country: data.country || '',
          city: data.city || '',
          zip_code: data.zip_code || '',
          address: data.address || '',
          gender: data.gender || '',
          date_of_birth: data.date_of_birth || ''
        });
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    }

    if (isLoaded) {
      loadUserData();
    }
  }, [user, isLoaded]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id || !userData) return;
    
    setSaving(true);
    
    try {
      const result = await updateUserData(user.id, formData);
      
      if (result.success) {
        setSaving(false);
        alert('Profile updated successfully!');
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      setSaving(false);
      alert('Error updating profile. Please try again.');
    }
  };

  if (loading || !isLoaded || !user) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-8 text-gray-900 dark:text-white text-lg">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-2 p-6">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6 mb-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 tracking-tight">
          Edit Profile
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Update your personal information and KYC details
        </p>
      </div>

      {/* Avatar Display */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6 mb-6 flex justify-center">
        <div className="relative">
          {userData?.avatar ? (
            <img
              src={userData.avatar}
              alt="Profile Avatar"
              className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center border-4 border-gray-200 dark:border-gray-700">
              <span className="text-2xl text-gray-600 dark:text-gray-400">
                {formData.first_name?.[0] || formData.username?.[0] || '?'}
              </span>
            </div>
          )}
        </div>
      </div>
      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-semibold text-gray-900 dark:text-white mb-1 block">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-800 focus:border-green-800 dark:focus:ring-green-300 dark:focus:border-green-300"
              placeholder="Enter your first name"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-900 dark:text-white mb-1 block">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-800 focus:border-green-800 dark:focus:ring-green-300 dark:focus:border-green-300"
              placeholder="Enter your last name"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-900 dark:text-white mb-1 block">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-800 focus:border-green-800 dark:focus:ring-green-300 dark:focus:border-green-300"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-900 dark:text-white mb-1 block">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed"
              placeholder="Your email"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-900 dark:text-white mb-1 block">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-800 focus:border-green-800 dark:focus:ring-green-300 dark:focus:border-green-300"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-900 dark:text-white mb-1 block">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-800 focus:border-green-800 dark:focus:ring-green-300 dark:focus:border-green-300"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-900 dark:text-white mb-1 block">
              Date of Birth
            </label>
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-800 focus:border-green-800 dark:focus:ring-green-300 dark:focus:border-green-300"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-900 dark:text-white mb-1 block">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-800 focus:border-green-800 dark:focus:ring-green-300 dark:focus:border-green-300"
              placeholder="Enter your country"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-900 dark:text-white mb-1 block">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-800 focus:border-green-800 dark:focus:ring-green-300 dark:focus:border-green-300"
              placeholder="Enter your city"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-900 dark:text-white mb-1 block">
              Zip Code
            </label>
            <input
              type="text"
              name="zip_code"
              value={formData.zip_code}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-800 focus:border-green-800 dark:focus:ring-green-300 dark:focus:border-green-300"
              placeholder="Enter your zip code"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-900 dark:text-white mb-1 block">
            Address
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-800 focus:border-green-800 dark:focus:ring-green-300 dark:focus:border-green-300"
            placeholder="Enter your full address"
          />
        </div>

        <div className="flex justify-between gap-4 mt-6">
          <Link href="/dashboard/portfolio">
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-3 px-6 py-3 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 rounded-xl font-medium bg-white dark:bg-gray-800 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="flex-1 flex items-center justify-center gap-3 px-6 py-3 text-white bg-green-800 hover:bg-green-900 disabled:bg-green-800/50 disabled:cursor-not-allowed rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            <Check className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}