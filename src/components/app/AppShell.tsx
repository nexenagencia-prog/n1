'use client';
import Link from 'next/link';
import { Bell, Moon, Search } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { ProfileEditor } from './ProfileEditor';
import { Sidebar } from './Sidebar';
import { useEditableProfile } from './useEditableProfile';
import styles from '../dashboard/StructuredDashboard.module.css';
export function AppShell({ title, subtitle, children }: { title:string; subtitle:string; children?:ReactNode }) {
  const [sidebarCollapsed,setSidebarCollapsed]=useState(false); const [editing,setEditing]=useState(false); const {profile,saveProfile}=useEditableProfile();
  return <div className={`${styles.app} ${sidebarCollapsed?styles.appCollapsed:styles.appExpanded}`}><Sidebar collapsed={sidebarCollapsed} onToggle={()=>setSidebarCollapsed(v=>!v)} profile={profile} onEdit={()=>setEditing(true)}/><main className={styles.sectionMain}><header className={styles.wsTopbar}><Link href="/" className={styles.wsLogo}>OCTA</Link><nav><Link href="/">Início</Link><Link href="/reunioes">Reuniões</Link><Link href="/agenda">Agenda</Link><Link href="/planos">Planos e preços</Link></nav><label><Search size={16}/><input placeholder="Buscar reunião, pessoa ou gravação"/></label><Link href="/notificacoes" aria-label="Notificações"><Bell size={18}/></Link></header><section className={styles.sectionContent}><div className={styles.wsHeading}><div><span>OCTA Workspace</span><h1>{title}</h1><p>{subtitle}</p></div></div><div className={styles.sectionBody}>{children}</div></section></main>{editing&&<ProfileEditor profile={profile} onSave={saveProfile} onClose={()=>setEditing(false)}/>}</div>
}
