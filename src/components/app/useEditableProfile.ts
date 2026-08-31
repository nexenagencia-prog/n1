'use client';

import { useEffect, useState } from 'react';

export type EditableProfile = { name: string; role: string; photo: string };
const fallback: EditableProfile = { name: 'Denner Biersack', role: 'Marketing Digital', photo: '/images/avatar-profile.png' };
const KEY = 'octa-profile-v1';

export function useEditableProfile() {
  const [profile, setProfile] = useState<EditableProfile>(fallback);
  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) setProfile({ ...fallback, ...JSON.parse(saved) });
    } catch {}
  }, []);

  const saveProfile = (next: EditableProfile) => {
    setProfile(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
  };
  return { profile, saveProfile };
}
