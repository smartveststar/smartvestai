'use client'

import React, { useState, useRef } from 'react';
import { useUser } from '@clerk/nextjs';
import { useActionState } from 'react';
import { HelpCircle, Send, Upload, X, CheckCircle, Clock } from 'lucide-react';
import { submitSupportComplaint } from '@/lib/actions/support-actions';

interface FormData {
  subject: string;
  category: string;
  priority: string;
  description: string;
}

export default function HelpSupport() {
  const { user } = useUser();
  const [formData, setFormData] = useState<FormData>({
    subject: '',
    category: '',
    priority: 'Medium',
    description: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [state, formAction] = useActionState(submitSupportComplaint, null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    'Technical Issue',
    'Billing Question',
    'Account Problem',
    'Investment Concern',
    'General Support',
    'Feature Request',
    'Recovery Case'
  ];

  const priorities = ['Low', 'Medium', 'High'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        e.target.value = '';
        return;
      }
      
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please select a valid file type (images, PDF, Word, or text files)');
        e.target.value = '';
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const resetForm = () => {
    setFormData({
      subject: '',
      category: '',
      priority: 'Medium',
      description: ''
    });
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (state?.success) {
    return (
      <div className="w-full max-w-6xl mx-auto space-y-2 p-6">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-8 text-center">
          <div className="w-16 h-16 bg-green-800 dark:bg-green-300 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-white dark:text-gray-900" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">Complaint Submitted!</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
            Thank you for reaching out. Our support team will respond to your inquiry within 1-24 hours.
          </p>
          <button
            onClick={resetForm}
            className="flex items-center justify-center gap-3 px-6 py-3 text-white bg-green-800 hover:bg-green-900 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-2 p-2">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6 mb-4">
        <div className="flex items-center gap-3 mb-2">
          <HelpCircle className="w-6 h-6 text-green-800 dark:text-green-300" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">Help & Support</h2>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          We&apos;re here to assist you with any issues or questions
        </p>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-5 h-5 text-green-800 dark:text-green-300" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-semibold text-gray-900 dark:text-white">Response Time:</span> 1-24 hours
          </p>
        </div>

        {/* Error Messages */}
        {state?.error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-xl">
            <div className="flex items-center gap-2 text-red-800 dark:text-red-300 mb-2">
              <X className="w-5 h-5" />
              <span className="font-semibold">Error:</span>
            </div>
            <ul className="text-sm text-red-800 dark:text-red-300">
              {state.error.map((err, index) => (
                <li key={index}>• {err}</li>
              ))}
            </ul>
          </div>
        )}

        <form action={formAction} className="space-y-6">
          <input type="hidden" name="name" value={user?.fullName || ''} />
          <input type="hidden" name="email" value={user?.primaryEmailAddress?.emailAddress || ''} />

          {/* User Info Display */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-900 dark:text-white mb-1 block">Name</label>
              <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-3 text-gray-600 dark:text-gray-400">
                {user?.fullName || 'Not provided'}
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-900 dark:text-white mb-1 block">Email</label>
              <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-3 text-gray-600 dark:text-gray-400">
                {user?.primaryEmailAddress?.emailAddress || 'Not provided'}
              </div>
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="text-sm font-semibold text-gray-900 dark:text-white mb-1 block">Subject *</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-800 focus:border-green-800 dark:focus:ring-green-300 dark:focus:border-green-300 placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="Brief description of your issue"
            />
          </div>

          {/* Category and Priority */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-900 dark:text-white mb-1 block">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-800 focus:border-green-800 dark:focus:ring-green-300 dark:focus:border-green-300"
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-900 dark:text-white mb-1 block">Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-800 focus:border-green-800 dark:focus:ring-green-300 dark:focus:border-green-300"
              >
                {priorities.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-semibold text-gray-900 dark:text-white mb-1 block">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={5}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-800 focus:border-green-800 dark:focus:ring-green-300 dark:focus:border-green-300 placeholder-gray-400 dark:placeholder-gray-500 resize-none"
              placeholder="Please describe your issue in detail..."
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="text-sm font-semibold text-gray-900 dark:text-white mb-1 block">Attachment (Optional)</label>
            <input
              ref={fileInputRef}
              type="file"
              name="attachment"
              onChange={handleFileChange}
              accept="image/*,.pdf,.doc,.docx,.txt"
              className="hidden"
            />
            
            {!selectedFile ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="bg-gray-50 dark:bg-gray-700 border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-xl p-6 text-center hover:border-green-800 dark:hover:border-green-300 transition-all cursor-pointer"
              >
                <Upload className="w-8 h-8 text-gray-600 dark:text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 dark:text-gray-400">Click to upload file</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Images, PDF, Word, or Text files (Max 5MB)
                </p>
              </div>
            ) : (
              <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-gray-900 dark:text-white">{selectedFile.name}</span>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">
                    ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  className="text-red-800 dark:text-red-300 hover:text-red-900 dark:hover:text-red-400 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 px-6 py-3 text-white bg-green-800 hover:bg-green-900 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
          >
            <Send className="w-5 h-5" />
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}