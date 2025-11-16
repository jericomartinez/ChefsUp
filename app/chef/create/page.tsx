'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: string;
};

export default function ChefCreatePage() {
  const searchParams = useSearchParams();
  const emailFromParams = searchParams.get('email');

  const [ownerEmail, setOwnerEmail] = useState('');
  const [storeName, setStoreName] = useState('');
  const [description, setDescription] = useState('');
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [items, setItems] = useState<MenuItem[]>([{ id: 1, name: '', description: '', price: '' }]);
  const [nextId, setNextId] = useState(2);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (emailFromParams) {
      setOwnerEmail(emailFromParams);
      if (typeof window !== 'undefined') {
        localStorage.setItem('chefsup-current-email', emailFromParams);
      }
    } else if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('chefsup-current-email');
      if (stored) setOwnerEmail(stored);
    }
  }, [emailFromParams]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setCoverPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const updateItem = (id: number, payload: Partial<MenuItem>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...payload } : item))
    );
  };

  const addItem = () => {
    setItems((prev) => [...prev, { id: nextId, name: '', description: '', price: '' }]);
    setNextId((prev) => prev + 1);
  };

  const removeItem = (id: number) => {
    setItems((prev) => (prev.length === 1 ? prev : prev.filter((item) => item.id !== id)));
  };

  const handleSave = async () => {
    if (!ownerEmail) {
      setStatusMessage('Enter your email on the signup page first.');
      return;
    }

    setIsSaving(true);
    setStatusMessage(null);

    try {
      const response = await fetch('/api/storefront', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: ownerEmail,
          storefront: {
            name: storeName,
            description,
            coverImage: coverPreview,
            items,
            updatedAt: new Date().toISOString(),
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save storefront');
      }

      setStatusMessage('Storefront saved (mock)!');
    } catch (error) {
      setStatusMessage('Unable to save storefront right now.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-4 py-10">
        <header className="flex flex-col gap-2">
          <span className="text-sm font-semibold uppercase tracking-wide text-orange-500">
            Storefront setup
          </span>
          <h1 className="text-3xl font-bold text-gray-900">Create your ChefsUp kitchen</h1>
          <p className="text-sm text-gray-600">
            Upload your cover photo, choose a store name, and add signature dishes before going
            live.
          </p>
        </header>

        <div className="rounded-3xl bg-white shadow-lg shadow-orange-100/40">
          <div className="relative">
            {coverPreview ? (
              <img
                src={coverPreview}
                alt="Storefront cover"
                className="h-64 w-full rounded-t-3xl object-cover"
              />
            ) : (
              <div className="flex h-64 w-full flex-col items-center justify-center rounded-t-3xl border-2 border-dashed border-gray-200 bg-gray-50 text-sm text-gray-500">
                Upload a cover photo to showcase your food
              </div>
            )}
            <label className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow">
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              Upload photo
            </label>
          </div>

          <div className="grid gap-6 p-6">
            <div className="space-y-4">
              <label className="space-y-2">
                <span className="text-sm font-semibold text-gray-900">Storefront name</span>
                <input
                  type="text"
                  placeholder="Homestyle Ramen by Aiko"
                  value={storeName}
                  onChange={(event) => setStoreName(event.target.value)}
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100"
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-semibold text-gray-900">Description</span>
                <textarea
                  rows={3}
                  placeholder="Slow-simmered broths, hand-pulled noodles, and cozy bowls that taste like home."
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100"
                />
              </label>
            </div>
          </div>
        </div>

        <section className="space-y-4 rounded-3xl bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Signature items</h2>
              <p className="text-sm text-gray-500">
                Add dishes with a short description and price. Drag to reorder later.
              </p>
            </div>
            <button
              type="button"
              onClick={addItem}
              className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:text-orange-500"
            >
              + Add item
            </button>
          </div>

          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-3 rounded-2xl border border-gray-200 p-4 md:flex-row md:items-center"
              >
                <input
                  type="text"
                  placeholder="Dish name"
                  value={item.name}
                  onChange={(event) => updateItem(item.id, { name: event.target.value })}
                  className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-100"
                />
                <input
                  type="text"
                  placeholder="Short description"
                  value={item.description}
                  onChange={(event) => updateItem(item.id, { description: event.target.value })}
                  className="flex-[2] rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-100"
                />
                <input
                  type="text"
                  placeholder="$12.00"
                  value={item.price}
                  onChange={(event) => updateItem(item.id, { price: event.target.value })}
                  className="w-32 rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-100"
                />
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="text-sm font-semibold text-gray-500 transition hover:text-red-500"
                  disabled={items.length === 1}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </section>

        {statusMessage && <p className="text-sm text-gray-600">{statusMessage}</p>}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            Signed in as {ownerEmail || 'unknown chef'}
          </span>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="rounded-full bg-orange-500 px-8 py-3 text-sm font-semibold text-white shadow-[0_15px_35px_rgba(249,115,22,0.35)] transition hover:bg-orange-600 disabled:opacity-50"
          >
            {isSaving ? 'Saving…' : 'Save storefront'}
          </button>
        </div>
      </div>
    </div>
  );
}
