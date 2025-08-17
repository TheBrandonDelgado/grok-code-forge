import React, { useState, useRef } from 'react';
import { Upload, X, Code, Image, FileText, Loader2, Sparkles } from 'lucide-react';
import type { UploadFormData } from '../types';

interface UploadFormProps {
  onSubmit: (data: UploadFormData) => Promise<void>;
  loading?: boolean;
}

const UploadForm: React.FC<UploadFormProps> = ({ onSubmit, loading = false }) => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const languages = [
    'javascript', 'typescript', 'python', 'java', 'cpp', 'csharp', 'go', 'rust',
    'php', 'ruby', 'swift', 'kotlin', 'scala', 'haskell', 'elixir', 'clojure',
    'html', 'css', 'sql', 'bash', 'powershell', 'dockerfile', 'yaml', 'json'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code.trim() && !image) {
      return;
    }

    const formData: UploadFormData = {
      code: code.trim(),
      language: language || undefined,
      image: image || undefined,
    };

    await onSubmit(formData);
  };

  const handleImageChange = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageChange(e.dataTransfer.files[0]);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview('');
  };

  const clearForm = () => {
    setCode('');
    setLanguage('');
    setImage(null);
    setImagePreview('');
  };

  return (
    <div className="bg-[var(--bg-card)] rounded-xl p-6 border border-[var(--border-primary)] shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-2 rounded-lg bg-[var(--accent-primary)]/10 mr-3">
            <Sparkles className="h-5 w-5 text-[var(--accent-primary)]" />
          </div>
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">
            Code Review Request
          </h2>
        </div>
        <button
          onClick={clearForm}
          className="p-2 rounded-lg text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-overlay)] transition-all duration-200"
          title="Clear form"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Code Input */}
        <div>
          <label htmlFor="code" className="block text-sm font-medium text-[var(--text-primary)] mb-2 flex items-center">
            <div className="p-1.5 rounded-md bg-[var(--accent-primary)]/10 mr-2">
              <Code className="h-4 w-4 text-[var(--accent-primary)]" />
            </div>
            Code Snippet
          </label>
          <textarea
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code here or upload an image below..."
            className="w-full h-32 px-3 py-2 border border-[var(--border-primary)] rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20 focus:border-[var(--accent-primary)] resize-none transition-all duration-200"
            disabled={loading}
          />
        </div>

        {/* Language Selection */}
        <div>
          <label htmlFor="language" className="block text-sm font-medium text-[var(--text-primary)] mb-2 flex items-center">
            <div className="p-1.5 rounded-md bg-[var(--accent-secondary)]/10 mr-2">
              <FileText className="h-4 w-4 text-[var(--accent-secondary)]" />
            </div>
            Programming Language (Optional)
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-3 py-2 border border-[var(--border-primary)] rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20 focus:border-[var(--accent-primary)] transition-all duration-200"
            disabled={loading}
          >
            <option value="">Auto-detect</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-2 flex items-center">
            <div className="p-1.5 rounded-md bg-[var(--accent-success)]/10 mr-2">
              <Image className="h-4 w-4 text-[var(--accent-success)]" />
            </div>
            Or Upload Code Screenshot
          </label>
          
          {!image ? (
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
                dragActive
                  ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/5'
                  : 'border-[var(--border-secondary)] hover:border-[var(--accent-primary)]/50 hover:bg-[var(--accent-primary)]/2'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="mx-auto h-12 w-12 text-[var(--text-tertiary)] mb-3" />
              <p className="text-[var(--text-secondary)] mb-2 text-sm">
                Drag and drop an image here, or{' '}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] underline font-medium transition-colors duration-200"
                  disabled={loading}
                >
                  browse
                </button>
              </p>
              <p className="text-xs text-[var(--text-muted)]">
                Supports PNG, JPG, JPEG up to 10MB
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleImageChange(e.target.files[0])}
                className="hidden"
                disabled={loading}
              />
            </div>
          ) : (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Code screenshot preview"
                className="w-full h-32 object-contain bg-[var(--bg-tertiary)] rounded-lg border border-[var(--border-primary)]"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 p-1.5 bg-[var(--accent-error)] text-white rounded-full transition-all duration-200 hover:scale-110 shadow-sm"
                disabled={loading}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || (!code.trim() && !image)}
          className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-[var(--accent-primary)] hover:bg-[var(--accent-secondary)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-primary)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
              Analyzing Code...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Submit for Review
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
