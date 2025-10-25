"use client";

import React, { useState, useEffect } from 'react';
import { profileService } from '@/services/profileService';
import { UserSummary } from '@/types/user';
import Link from 'next/link';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<UserSummary[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setLoading(true);
      try {
        const searchResults = await profileService.searchUsers(query);
        setResults(searchResults);
      } catch (error) {
        console.error("Failed to search users:", error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 bg-neutral-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {/* If there's Query */}
      {query.trim() !== '' && (
        <div className="absolute top-full mt-2 w-full bg-neutral-900 border border-neutral-800 rounded-lg shadow-lg z-50">
          {loading && <div className="p-4 text-neutral-400">Searching...</div>}
          {!loading && results.length === 0 && (
            <div className="p-4 text-neutral-400">No results found for "{query}"</div>
          )}
          {!loading && results.length > 0 && (
            <ul>
              {results.map((user) => (
                <li key={user.userId}>
                  <Link href={`/profile/${user.username}`} className="flex items-center gap-3 p-3 hover:bg-neutral-800 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-neutral-700 overflow-hidden">
                      {user.profilePictureUrl ? (
                        <img src={user.profilePictureUrl} alt={user.username} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-blue-500">
                          <span className="text-white font-bold">{user.username[0].toUpperCase()}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-white">{user.fullName || user.username}</p>
                      <p className="text-sm text-neutral-500">@{user.username}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;