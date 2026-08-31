'use client';

import Link from 'next/link';
import { useState, type ReactNode } from 'react';
import { ProfileEditor } from './ProfileEditor';
import { Sidebar } from './Sidebar';
import { useEditableProfile } from './useEditableProfile';
import styles from '../dashboard/StructuredDashboard.module.css';

export function AppShell({ title, subtitle, children }: { title:string; subtitle:string; children?:ReactNode }) {
  const [sidebarCollapsed,setSidebarCollapsed]=useState(false);
  const [editing,setEditing]=useState(false);
  const {profile,saveProfile}=useEditableProfile();

  return <div className={`${styles.app} ${sidebarCollapsed?styles.appCollapsed:styles.appExpanded}`}>
    <Sidebar collapsed={sidebarCollapsed} onToggle={()=>setSidebarCollapsed(v=>!v)} profile={profile} onEdit={()=>setEditing(true)}/>
    <main className={styles.sectionMain}>
      <section className={styles.sectionContent}>
        <Link href="/" className={styles.sectionBack}>← Voltar ao início</Link>
        <h1>{title}</h1><p>{subtitle}</p>
        <div className={styles.sectionBody}>{children ?? <div className={styles.sectionPlaceholder}>Área OCTA pronta para integração com seus dados.</div>}</div>
      </section>
    </main>
    {editing&&<ProfileEditor profile={profile} onSave={saveProfile} onClose={()=>setEditing(false)}/>} 
  </div>
}
