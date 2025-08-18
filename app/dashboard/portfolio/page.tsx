'use client';

import { useUser } from '@clerk/nextjs'
import React, { useState, useEffect } from 'react';
import { HelpCircle, ChevronRight, Wallet, TrendingUp, Users, Pencil, ArrowDownLeft, User, Calendar, MapPin, Phone, Shield } from 'lucide-react';

import { getUserData } from '@/lib/actions/GetUserData';
import { UserData } from '@/types/type';
import { updateUserAvatar } from '@/lib/actions/UpdateAvatar';
import AvatarUploadForm from '@/components/AvatarUploadForm'; 
import { formatCurrency, getKycStatus } from '@/lib/utils';
import Link from 'next/link';
import HeaderWithLocation from '@/components/dashboard/HeaderWithLocation';

export default function PortfolioScreen() {
  const { isLoaded, user } = useUser();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showKycNotice, setShowKycNotice] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id) return;
      
      try {
        const data = await getUserData(user.id);
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isLoaded && user) {
      fetchUserData();
    }
  }, [isLoaded, user]);

  if (!isLoaded || !user) return null;
  
  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  const balance = userData?.balance || 0;
  const profitBalance = userData?.profit_balance || 0;
  const recoveryFund = userData?.recovery_fund || 0;
  const totalWithdrawals = userData?.total_withdrawals || 0;
  const kycStatus = getKycStatus(userData?.kyc || null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <HeaderWithLocation />

        <div className="px-4 sm:px-6 lg:px-8 space-y-8">
          {/* KYC Notice */}
          {userData?.kyc === 1 && showKycNotice && (
            <div className="fixed top-6 right-6 z-50 max-w-sm bg-white dark:bg-gray-800 border border-amber-200 dark:border-amber-800 rounded-xl shadow-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">KYC Verification</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Please submit both front and back of your ID for verification. If already submitted, please wait for approval.
                  </p>
                </div>
                <button
                  onClick={() => setShowKycNotice(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          {/* Profile Header */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-32 relative">
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
            <div className="px-6 pb-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-end space-y-4 sm:space-y-0 sm:space-x-6 -mt-16">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-800">
                    {userData?.avatar ? (
                      <img
                        src={userData.avatar} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white text-xl font-bold">
                          {userData?.first_name?.charAt(0) || user?.firstName?.charAt(0) || 'U'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {userData?.first_name || user?.firstName} {userData?.last_name || user?.lastName}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    {userData?.email || user?.emailAddresses?.[0]?.emailAddress}
                  </p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      userData?.kyc === 2 ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300' :
                      userData?.kyc === 1 ? 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-300' :
                      'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300'
                    }`}>
                      <Shield className="w-3 h-3 mr-1" />
                      KYC: {kycStatus.text}
                    </span>
                    {userData?.country && (
                      <span className="text-gray-500 dark:text-gray-400 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {userData.city}, {userData.country}
                      </span>
                    )}
                  </div>
                  {userData?.kyc === 3 && userData?.kyc_credential && (
                    <p className="text-red-600 dark:text-red-400 text-sm mt-2">
                      Reason: {JSON.parse(userData.kyc_credential)["Action Message"] || 'No reason provided'}
                    </p>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <AvatarUploadForm 
                    userId={user.id}
                    formAction={updateUserAvatar}
                  />
                  <Link 
                    href="/dashboard/edit-user-info" 
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-800 rounded-lg transition-all duration-200"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
              <Wallet className="w-5 h-5 mr-3 text-indigo-600 dark:text-indigo-400" />
              Financial Overview
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="flex items-center justify-between mb-2">
                  <Wallet className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  <div className="w-3 h-3 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                </div>
                <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-1">Account Balance</p>
                <p className="text-gray-900 dark:text-gray-100 text-2xl font-bold">
                  {formatCurrency(balance)}
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30 p-6 rounded-xl border border-emerald-200 dark:border-emerald-800">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                  <div className="w-3 h-3 bg-emerald-600 dark:bg-emerald-400 rounded-full"></div>
                </div>
                <p className="text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-1">Profit Balance</p>
                <p className="text-gray-900 dark:text-gray-100 text-2xl font-bold">
                  {formatCurrency(profitBalance)}
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
                <div className="flex items-center justify-between mb-2">
                  <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  <div className="w-3 h-3 bg-purple-600 dark:bg-purple-400 rounded-full"></div>
                </div>
                <p className="text-purple-600 dark:text-purple-400 text-sm font-medium mb-1">Recovery Fund</p>
                <p className="text-gray-900 dark:text-gray-100 text-2xl font-bold">
                  {formatCurrency(recoveryFund)}
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 p-6 rounded-xl border border-orange-200 dark:border-orange-800">
                <div className="flex items-center justify-between mb-2">
                  <ArrowDownLeft className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                  <div className="w-3 h-3 bg-orange-600 dark:bg-orange-400 rounded-full"></div>
                </div>
                <p className="text-orange-600 dark:text-orange-400 text-sm font-medium mb-1">Total Withdrawals</p>
                <p className="text-gray-900 dark:text-gray-100 text-2xl font-bold">
                  {formatCurrency(totalWithdrawals)}
                </p>
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
              <User className="w-5 h-5 mr-3 text-indigo-600 dark:text-indigo-400" />
              Account Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userData?.phone && (
                <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <Phone className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Phone Number</p>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{userData.phone}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Member Since</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {userData?.created_at ? new Date(userData.created_at).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Shield className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Account Status</p>
                  <p className="font-medium text-emerald-600 dark:text-emerald-400">Active</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <User className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">User Type</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">Premium Member</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { 
                  icon: Users, 
                  label: 'My Referrals', 
                  href: '/dashboard/referrals',
                  description: 'View your referral network',
                  color: 'indigo'
                },
                { 
                  icon: HelpCircle, 
                  label: 'Help & Support', 
                  href: '/dashboard/support',
                  description: 'Get assistance and support',
                  color: 'purple'
                },
              ].map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="group p-6 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl border border-gray-200 dark:border-gray-600 transition-all duration-200 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        item.color === 'indigo' ? 'bg-indigo-100 dark:bg-indigo-900/50' : 'bg-purple-100 dark:bg-purple-900/50'
                      }`}>
                        <item.icon className={`w-6 h-6 ${
                          item.color === 'indigo' ? 'text-indigo-600 dark:text-indigo-400' : 'text-purple-600 dark:text-purple-400'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                          {item.label}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}