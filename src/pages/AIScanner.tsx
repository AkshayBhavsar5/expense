import React, { useState, useRef } from 'react';
import { useAppDispatch } from '../hooks/useAppHooks';
import { addExpense } from '../store/slices/expenseSlice';
import {
  PhotoCamera,
  CheckCircle,
  Receipt,
  AutoAwesome,
} from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { AppCard, AppButton } from '../components/CustomMUI';

const mockScanResults = [
  {
    title: 'Starbucks Coffee',
    amount: 8.75,
    category: 'Food & Dining',
    date: '2026-03-03',
  },
  {
    title: 'Shell Gas Station',
    amount: 54.2,
    category: 'Transport',
    date: '2026-03-03',
  },
  {
    title: 'Walmart Grocery',
    amount: 112.43,
    category: 'Food & Dining',
    date: '2026-03-02',
  },
];

const AIScanner: React.FC = () => {
  const dispatch = useAppDispatch();
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState<(typeof mockScanResults)[0] | null>(
    null,
  );
  const [drag, setDrag] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
    setScanning(true);
    setScanned(null);
    setTimeout(() => {
      setScanning(false);
      const result =
        mockScanResults[Math.floor(Math.random() * mockScanResults.length)];
      setScanned(result);
    }, 2500);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDrag(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handleFile(file);
  };

  const handleAddScanned = () => {
    if (!scanned) return;
    dispatch(
      addExpense({
        id: Date.now().toString(),
        ...scanned,
        type: 'expense',
      }),
    );
    setScanned(null);
    setPreview(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-[#1a1a2e] tracking-tight">
          AI Receipt Scanner
        </h2>
        <p className="text-slate-500 font-medium text-sm">
          Snap a photo and let our AI extract the billing details automatically.
        </p>
      </div>

      {/* How it Works */}
      <div className="grid grid-cols-3 gap-5">
        {[
          {
            icon: '📸',
            step: '1',
            title: 'Upload Receipt',
            desc: 'Snap or drag your invoice here',
          },
          {
            icon: '🤖',
            step: '2',
            title: 'AI Analysis',
            desc: 'Our engine extracts the metadata',
          },
          {
            icon: '✅',
            step: '3',
            title: 'Verify & Save',
            desc: 'Add verified records to ledger',
          },
        ].map((s) => (
          <AppCard
            key={s.step}
            className="!p-6 text-center border border-slate-100 shadow-sm"
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl mx-auto mb-4 shadow-sm"
              style={{ background: '#f8fafc' }}
            >
              {s.icon}
            </div>
            <span className="text-[10px] font-extrabold text-[#4F46E5] uppercase tracking-widest">
              Step {s.step}
            </span>
            <p className="font-extrabold text-slate-800 text-sm mt-2">
              {s.title}
            </p>
            <p className="text-xs text-slate-400 font-medium mt-1 leading-relaxed">
              {s.desc}
            </p>
          </AppCard>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Upload Zone */}
        <AppCard
          className={`!p-10 text-center cursor-pointer transition-all duration-300 border-2 border-dashed shadow-sm group ${
            drag
              ? 'border-[#4F46E5] bg-indigo-50/30'
              : 'border-slate-200 hover:border-[#4F46E5] hover:bg-slate-50'
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onClick={() => fileRef.current?.click()}
        >
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) =>
              e.target.files?.[0] && handleFile(e.target.files[0])
            }
          />

          {preview ? (
            <div className="space-y-4">
              <img
                src={preview}
                alt="Receipt Preview"
                className="max-h-56 mx-auto rounded-2xl object-contain shadow-2xl shadow-indigo-100"
              />
              {scanning && (
                <div className="flex items-center justify-center gap-3 text-[#4F46E5] text-sm font-bold bg-white/60 backdrop-blur-md p-3 rounded-2xl border border-white">
                  <CircularProgress
                    size={18}
                    thickness={5}
                    sx={{ color: '#4F46E5' }}
                  />
                  Processing receipt...
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-5">
              <div
                className="w-20 h-20 rounded-[24px] flex items-center justify-center mx-auto transition-transform group-hover:scale-110 duration-300 shadow-lg shadow-indigo-100"
                style={{
                  background: 'linear-gradient(135deg, #4F46E5, #3730A3)',
                }}
              >
                <PhotoCamera sx={{ fontSize: 32, color: '#fff' }} />
              </div>
              <div>
                <p className="text-lg font-extrabold text-slate-800">
                  Drop receipt here
                </p>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">
                  or click to upload from files
                </p>
              </div>
              <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest bg-slate-100 py-1 px-4 rounded-full inline-block mt-4">
                JPG • PNG • HEIC • PDF
              </p>
            </div>
          )}
        </AppCard>

        {/* Result Panel */}
        <AppCard className="!p-8 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                <AutoAwesome sx={{ fontSize: 20, color: '#4F46E5' }} />
              </div>
              <h3 className="text-lg font-extrabold text-slate-800">
                AI Intelligence
              </h3>
            </div>

            {!scanned && !scanning && (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                  <Receipt sx={{ fontSize: 40, color: '#CBD5E1' }} />
                </div>
                <p className="text-slate-400 font-bold text-sm max-w-[180px]">
                  Extraction data will appear here after upload
                </p>
              </div>
            )}

            {scanning && (
              <div className="flex flex-col items-center justify-center py-10 gap-6">
                <div className="relative">
                  <CircularProgress
                    size={64}
                    thickness={4}
                    sx={{ color: '#4F46E5' }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <AutoAwesome
                      sx={{
                        fontSize: 24,
                        color: '#4F46E5',
                        animation:
                          'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                      }}
                    />
                  </div>
                </div>
                <div className="text-center">
                  <p className="font-extrabold text-slate-700">
                    Extracting data...
                  </p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                    AI engine is active
                  </p>
                </div>
              </div>
            )}

            {scanned && (
              <div className="space-y-5 animate-in fade-in duration-500">
                <div className="flex items-center gap-2 text-green-600 text-xs font-extrabold uppercase tracking-wider mb-4">
                  <CheckCircle sx={{ fontSize: 18 }} /> Extraction Ready
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'Merchant', value: scanned.title },
                    { label: 'Amount', value: `$${scanned.amount.toFixed(2)}` },
                    { label: 'Category', value: scanned.category },
                    { label: 'Date', value: scanned.date },
                  ].map((f) => (
                    <div
                      key={f.label}
                      className="flex justify-between items-center py-4 px-4 bg-slate-50/50 rounded-2xl border border-transparent hover:border-slate-100 transition-all"
                    >
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                        {f.label}
                      </span>
                      <span className="text-sm font-extrabold text-slate-800">
                        {f.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {scanned && (
            <div className="flex gap-4 pt-8">
              <AppButton
                fullWidth
                variant="contained"
                onClick={handleAddScanned}
                startIcon={<CheckCircle />}
              >
                Confirm & Add
              </AppButton>
              <AppButton
                variant="outlined"
                onClick={() => {
                  setScanned(null);
                  setPreview(null);
                }}
                className="!border-slate-200 !text-slate-500 hover:!bg-slate-50"
              >
                Discard
              </AppButton>
            </div>
          )}
        </AppCard>
      </div>

      {/* Recent Scans */}
      <AppCard className="!p-8 border border-slate-100 shadow-sm">
        <h3 className="text-lg font-extrabold text-slate-800 mb-6">
          Execution Log
        </h3>
        <div className="space-y-3">
          {mockScanResults.map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-50 shadow-sm hover:border-slate-100 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-50 group-hover:bg-indigo-50 transition-colors">
                <Receipt
                  sx={{ fontSize: 20, color: '#4F46E5', opacity: 0.6 }}
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-extrabold text-slate-800">
                  {s.title}
                </p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                  {s.category} • {s.date}
                </p>
              </div>
              <span className="text-sm font-extrabold text-red-500">
                -${s.amount.toFixed(2)}
              </span>
              <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                <CheckCircle sx={{ fontSize: 16, color: '#10b981' }} />
              </div>
            </div>
          ))}
        </div>
      </AppCard>
    </div>
  );
};

export default AIScanner;
