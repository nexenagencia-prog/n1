'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bell, Calculator, CalendarDays, ChevronDown, ChevronLeft, ChevronRight, CirclePlay,
  FileText, Home, NotebookPen, PanelTop, Search, Settings2, ShieldCheck, Sparkles,
  TrendingUp, Users, Video
} from 'lucide-react';
import type { EditableProfile } from './useEditableProfile';
import styles from '../dashboard/StructuredDashboard.module.css';

const items = [
  { href:'/', label:'Início', icon:Home },
  { href:'/reunioes', label:'Reuniões', icon:Video },
  { href:'/agenda', label:'Agenda', icon:CalendarDays },
  { href:'/contatos', label:'Contatos', icon:Users },
  { href:'/gravacoes', label:'Gravações', icon:CirclePlay },
  { href:'/calculadora', label:'Calculadora', icon:Calculator },
  { href:'/octa-ai', label:'OCTA AI', icon:Sparkles, badge:'Novo' },
  { href:'/skills', label:'Skills', icon:TrendingUp },
  { href:'/octa-skills', label:'OCTA Skills', icon:ShieldCheck },
  { href:'/lousa', label:'Lousa', icon:PanelTop },
  { href:'/anotar', label:'Anotar', icon:NotebookPen },
  { href:'/anotacoes', label:'Anotações', icon:FileText },
  { href:'/notificacoes', label:'Notificações', icon:Bell },
  { href:'/configuracoes', label:'Configurações', icon:Settings2 },
] as const;

export function Sidebar({collapsed,onToggle,profile,onEdit}:{collapsed:boolean;onToggle:()=>void;profile:EditableProfile;onEdit:()=>void}){
  const pathname=usePathname();
  return <aside className={`${styles.sidebar} ${collapsed?styles.sidebarCollapsed:''}`}>
    <button className={styles.sidebarToggle} aria-label={collapsed?'Expandir menu':'Recolher menu'} onClick={onToggle}>{collapsed?<ChevronRight size={17}/>:<ChevronLeft size={17}/>}</button>
    <div className={styles.brandMark}><span className={styles.brandOrb}/><span className={styles.brandOrbSmall}/></div>
    <div className={styles.brand}>OCTA</div>
    <Link href="/" className={styles.sideSearch} title="Pesquisar"><Search size={18}/><span className={styles.sideSearchLabel}>Pesquisar</span><kbd>⌘ K</kbd></Link>
    <nav className={styles.nav}>{items.map(({href,label,icon:Icon,...rest})=>{
      const active=href==='/'?pathname==='/':pathname.startsWith(href);
      return <Link key={href} href={href} className={`${styles.navItem} ${active?styles.activeNav:''}`}><span className={styles.navIcon}><Icon size={18}/></span><span className={styles.navLabel}>{label}</span>{'badge' in rest&&rest.badge&&<em>{rest.badge}</em>}</Link>
    })}</nav>
    <button className={styles.sidebarProfile} onClick={onEdit} aria-label="Editar perfil">
      <div className={styles.profilePhotoWrap}><img src={profile.photo} alt={profile.name}/><span/></div>
      <strong>{profile.name}</strong><small>{profile.role}</small><span className={styles.profileChevron}><ChevronDown size={17}/></span>
    </button>
  </aside>
}
