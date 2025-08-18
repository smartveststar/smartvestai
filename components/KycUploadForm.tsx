import { useState, useEffect } from "react";
import { Upload, Loader2, ImagePlus, AlertCircle, CheckCircle, X, RotateCcw, Eye } from "lucide-react";
import imageCompression from 'browser-image-compression';

interface KycUploadFormProps {
  kycStatus: number | null | undefined;
  onUploadSuccess?: () => void;
}

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_RETRIES = 3;

export default function KycUploadForm({ kycStatus, onUploadSuccess }: KycUploadFormProps) {
  const [selectedFiles, setSelectedFiles] = useState<{
    front: File | null;
    back: File | null;
    selfie: File | null;
  }>({
    front: null,
    back: null,
    selfie: null,
  });
  
  const [documentType, setDocumentType] = useState("Driver's license");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState<{
    front: boolean;
    back: boolean;
    selfie: boolean;
  }>({
    front: false,
    back: false,
    selfie: false,
  });
  const [previewUrls, setPreviewUrls] = useState<{
    front: string | null;
    back: string | null;
    selfie: string | null;
  }>({
    front: null,
    back: null,
    selfie: null,
  });

  const isVerified = kycStatus === 2;

  useEffect(() => {
    return () => {
      Object.values(previewUrls).forEach(url => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [previewUrls]);

  const compressImage = async (file: File, type: 'front' | 'back' | 'selfie'): Promise<File> => {
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: 'image/jpeg',
      initialQuality: 0.8,
    };

    try {
      console.log(`Compressing ${file.name}, original size: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
      setCompressionProgress(prev => ({ ...prev, [type]: true }));
      const compressedFile = await imageCompression(file, options);
      console.log(`Compressed to: ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`);
      setCompressionProgress(prev => ({ ...prev, [type]: false }));
      return compressedFile;
    } catch (error) {
      console.error('Compression failed:', error);
      setCompressionProgress(prev => ({ ...prev, [type]: false }));
      return file;
    }
  };

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return 'File must be JPEG, PNG, or WebP';
    }
    if (file.size < 1024) {
      return 'File is too small (minimum 1KB)';
    }
    return null;
  };

  const handleUploadError = (xhr: XMLHttpRequest) => {
    if (xhr.status === 0) {
      setError('Network connection lost. Please check your internet connection.');
    } else if (xhr.status >= 500) {
      setError('Server error. Please try again later.');
    } else if (xhr.status === 413) {
      setError('Request too large. Please try again.');
    } else if (xhr.status === 401) {
      setError('Authentication failed. Please refresh the page and try again.');
    } else {
      try {
        const response = JSON.parse(xhr.responseText);
        setError(response.error || 'Upload failed');
      } catch {
        setError('Upload failed. Please try again.');
      }
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'front' | 'back' | 'selfie') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setIsCompressing(true);

    try {
      const compressedFile = await compressImage(file, type);
      if (previewUrls[type]) {
        URL.revokeObjectURL(previewUrls[type]!);
      }
      const previewUrl = URL.createObjectURL(compressedFile);
      setSelectedFiles(prev => ({
        ...prev,
        [type]: compressedFile
      }));
      setPreviewUrls(prev => ({
        ...prev,
        [type]: previewUrl
      }));
      setRetryCount(0);
    } catch (error) {
      console.error('Compression error:', error);
      setError('Image compression failed. Please try a different image.');
    } finally {
      setIsCompressing(false);
    }
  };

  const removeFile = (type: 'front' | 'back' | 'selfie') => {
    if (previewUrls[type]) {
      URL.revokeObjectURL(previewUrls[type]!);
    }
    setSelectedFiles(prev => ({
      ...prev,
      [type]: null
    }));
    setPreviewUrls(prev => ({
      ...prev,
      [type]: null
    }));
  };

  const retryUpload = () => {
    if (retryCount < MAX_RETRIES) {
      setRetryCount(prev => prev + 1);
      setError(null);
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!selectedFiles.front || !selectedFiles.back || !selectedFiles.selfie) {
      setError('Please select all required files');
      return;
    }

    setIsUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('documentType', documentType);
      formData.append('front', selectedFiles.front);
      formData.append('back', selectedFiles.back);
      formData.append('selfie', selectedFiles.selfie);

      const xhr = new XMLHttpRequest();
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(progress);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          setSuccess(true);
          setSelectedFiles({ front: null, back: null, selfie: null });
          Object.values(previewUrls).forEach(url => {
            if (url) URL.revokeObjectURL(url);
          });
          setPreviewUrls({ front: null, back: null, selfie: null });
          setTimeout(() => {
            if (onUploadSuccess) {
              onUploadSuccess();
            } else {
              window.location.reload();
            }
          }, 2000);
        } else {
          handleUploadError(xhr);
        }
        setIsUploading(false);
      };

      xhr.onerror = () => {
        handleUploadError(xhr);
        setIsUploading(false);
      };

      xhr.ontimeout = () => {
        setError('Upload timeout. Your internet connection may be slow. Please try again.');
        setIsUploading(false);
      };

      xhr.timeout = 60000;
      xhr.open('POST', '/api/kyc/upload');
      xhr.send(formData);

    } catch (error) {
      console.log(error);
      setError('Upload failed. Please try again.');
      setIsUploading(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const FileUploadField = ({ 
    type, 
    label, 
    file,
    previewUrl
  }: { 
    type: 'front' | 'back' | 'selfie'; 
    label: string; 
    file: File | null;
    previewUrl: string | null;
  }) => {
    const isCompressingThis = compressionProgress[type];
    
    return (
      <div className="space-y-2">
        <label className={`cursor-pointer ${isVerified ? 'opacity-50 cursor-not-allowed' : ''} bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-4 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-600 block`}>
          <div className="flex items-center justify-center mb-2">
            {isCompressingThis ? (
              <Loader2 className="w-5 h-5 animate-spin text-green-800 dark:text-green-300 mr-2" />
            ) : (
              <ImagePlus className="w-5 h-5 text-gray-900 dark:text-white mr-2" />
            )}
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {isCompressingThis ? `Compressing ${label}...` : label}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {file ? file.name : 'No file selected'}
            </span>
            {file && (
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {formatFileSize(file.size)}
              </span>
            )}
          </div>
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            className="hidden"
            disabled={isVerified || isUploading || isCompressing}
            onChange={(e) => handleFileChange(e, type)}
          />
        </label>
        {previewUrl && (
          <div className="relative bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                <Eye className="w-4 h-4" />
                Preview (Compressed)
              </span>
              <button
                type="button"
                onClick={() => removeFile(type)}
                disabled={isUploading || isCompressing}
                className="text-red-800 dark:text-red-300 hover:text-red-900 dark:hover:text-red-400 disabled:opacity-50"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex justify-center">
              <img
                src={previewUrl}
                alt={`${label} preview`}
                className="max-w-full max-h-32 object-contain rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-2">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-6 mb-2">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 tracking-tight">
          KYC Verification
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Upload your identification documents to verify your account
        </p>
      </div>

      {isVerified && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 text-green-800 dark:text-green-300">
            <CheckCircle className="w-5 h-5" />
            Your KYC has been verified.
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6 space-y-6">
        <div>
          <label className="text-sm font-semibold text-gray-900 dark:text-white mb-1 block">Document Type *</label>
          <select
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            disabled={isVerified || isUploading || isCompressing}
            className="w-full bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white text-sm disabled:opacity-50"
          >
            <option value="Driver's license">Driver&apos;s license</option>
            <option value="National Identity card">National ID card</option>
            <option value="Passport">Passport</option>
            <option value="Voter's card">Voter&apos;s card</option>
          </select>
        </div>

        <FileUploadField 
          type="front" 
          label="Upload Front Side" 
          file={selectedFiles.front}
          previewUrl={previewUrls.front}
        />
        
        <FileUploadField 
          type="back" 
          label="Upload Back Side" 
          file={selectedFiles.back}
          previewUrl={previewUrls.back}
        />
        
        <FileUploadField 
          type="selfie" 
          label="Upload Selfie Holding Your ID" 
          file={selectedFiles.selfie}
          previewUrl={previewUrls.selfie}
        />

        {isCompressing && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30 rounded-xl p-4 flex items-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-blue-800 dark:text-blue-300" />
            <p className="text-sm text-blue-800 dark:text-blue-300">Compressing images... This improves upload speed.</p>
          </div>
        )}

        {isUploading && uploadProgress > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Uploading please wait...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-3 shadow-inner">
              <div
                className="bg-gradient-to-r from-green-600 to-green-800 rounded-full h-3 transition-all duration-500 ease-out shadow-sm"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!selectedFiles.front || !selectedFiles.back || !selectedFiles.selfie || isVerified || isUploading || isCompressing}
          className="w-full flex items-center justify-center gap-3 px-6 py-3 text-white bg-green-800 hover:bg-green-900 disabled:bg-green-800/50 disabled:cursor-not-allowed rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Uploading...
            </>
          ) : isCompressing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Compressing Images...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              Upload Documents
            </>
          )}
        </button>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-red-800 dark:text-red-300" />
              <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
            </div>
            {retryCount < MAX_RETRIES && !isUploading && !isCompressing && (
              <button
                type="button"
                onClick={retryUpload}
                className="flex items-center gap-1 text-sm bg-red-100 dark:bg-red-800 hover:bg-red-200 dark:hover:bg-red-700 text-red-800 dark:text-red-300 px-3 py-1 rounded-lg transition-all duration-300"
              >
                <RotateCcw className="w-4 h-4" />
                Retry Upload ({retryCount + 1}/{MAX_RETRIES})
              </button>
            )}
          </div>
        )}

        {success && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 rounded-xl p-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-800 dark:text-green-300" />
            <p className="text-sm text-green-800 dark:text-green-300">Documents uploaded successfully! {onUploadSuccess ? 'Updating...' : 'Reloading...'}</p>
          </div>
        )}

        <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
          <p>• Supported formats: JPEG, PNG, WebP</p>
          <p>• Images are automatically compressed to ~2MB for faster upload</p>
          <p>• Compression happens on your device for better privacy</p>
          <p>• Upload progress is tracked in real-time</p>
          <p>• Much faster upload times with client-side optimization</p>
        </div>
      </div>
    </div>
  );
}