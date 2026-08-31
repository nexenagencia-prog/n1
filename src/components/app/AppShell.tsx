'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bell, CalendarDays, ChevronDown, ChevronLeft, ChevronRight, CirclePlay,
  Home, Search, Settings2, ShieldCheck, Sparkles, Users, Video
} from 'lucide-react';
import { useState, type ReactNode } from 'react';
import styles from '../dashboard/StructuredDashboard.module.css';

const links = [
  { href:'/', label:'Início', icon:Home },
  { href:'/reunioes', label:'Reuniões', icon:Video },
  { href:'/agenda', label:'Agenda', icon:CalendarDays },
  { href:'/contatos', label:'Contatos', icon:Users },
  { href:'/gravacoes', label:'Gravações', icon:CirclePlay },
  { href:'/octa-ai', label:'OCTA AI', icon:Sparkles, badge:'Novo' },
  { href:'/skills', label:'OCTA Skills', icon:ShieldCheck },
  { href:'/notificacoes', label:'Notificações', icon:Bell },
  { href:'/configuracoes', label:'Configurações', icon:Settings2 },
] as const;

export function AppShell({ title, subtitle, children }: { title:string; subtitle:string; children?:ReactNode }) {
  const pathname = usePathname();
  const [sidebarCollapsed,setSidebarCollapsed] = useState(false);

  return <div className={`${styles.app} ${sidebarCollapsed?styles.appCollapsed:styles.appExpanded}`}>
    <aside className={`${styles.sidebar} ${sidebarCollapsed?styles.sidebarCollapsed:''}`}>
      <button className={styles.sidebarToggle} aria-label={sidebarCollapsed?'Expandir menu':'Recolher menu'} onClick={()=>setSidebarCollapsed(v=>!v)}>
        {sidebarCollapsed?<ChevronRight size={17}/>:<ChevronLeft size={17}/>}
      </button>
      <div className={styles.brandMark}><span className={styles.brandOrb}/><span className={styles.brandOrbSmall}/></div>
      <div className={styles.brand}>OCTA</div>
      <Link className={styles.sideSearch} href="/" title="Pesquisar"><Search size={18}/><span className={styles.sideSearchLabel}>Pesquisar</span><kbd>⌘ K</kbd></Link>
      <nav className={styles.nav}>
        {links.map(({href,label,icon:Icon,...item})=>{
          const active = href==='/' ? pathname==='/' : pathname.startsWith(href);
          return <Link key={href} href={href} className={`${styles.navItem} ${active?styles.activeNav:''}`}>
            <span className={styles.navIcon}><Icon size={18}/></span>
            <span className={styles.navLabel}>{label}</span>
            {'badge' in item && item.badge && <em>{item.badge}</em>}
          </Link>
        })}
      </nav>
      <div className={styles.sidebarProfile}>
        <div className={styles.profilePhotoWrap}><img src="/images/avatar-profile.png" alt="Denner Biersack"/><span/></div>
        <strong>Denner Biersack</strong><small>Marketing Digital</small>
        <button aria-label="Abrir perfil"><ChevronDown size={17}/></button>
      </div>
    </aside>
    <main className={styles.sectionMain}>
      <section className={styles.sectionContent}>
        <Link href="/" className={styles.sectionBack}>← Voltar ao início</Link>
        <h1>{title}</h1><p>{subtitle}</p>
        <div className={styles.sectionBody}>{children ?? <div className={styles.sectionPlaceholder}>Área OCTA pronta para integração com seus dados.</div>}</div>
      </section>
    </main>
  </div>
}
