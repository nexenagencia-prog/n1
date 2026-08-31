'use client';

import Link from 'next/link';
import { ArrowLeft, CalendarDays, CirclePlay, Settings2, Sparkles, Users, Video } from 'lucide-react';
import type { ReactNode } from 'react';

const links = [
  ['/reunioes','Reuniões',Video],['/agenda','Agenda',CalendarDays],['/contatos','Contatos',Users],['/gravacoes','Gravações',CirclePlay],['/octa-ai','OCTA AI',Sparkles],['/configuracoes','Configurações',Settings2]
] as const;

export function AppShell({ title, subtitle, children }: { title:string; subtitle:string; children?:ReactNode }) {
  return <main style={{minHeight:'100vh',background:'#f4f4f1',padding:'24px'}}>
    <div style={{maxWidth:1180,margin:'0 auto',display:'grid',gridTemplateColumns:'220px 1fr',gap:18}}>
      <aside style={{background:'#101113',color:'#fff',borderRadius:30,padding:22,minHeight:'calc(100vh - 48px)'}}>
        <Link href="/" style={{fontWeight:800,fontSize:22,display:'block',marginBottom:28}}>OCTA</Link>
        <nav style={{display:'grid',gap:6}}>{links.map(([href,label,Icon])=><Link key={href} href={href} style={{padding:'11px 10px',borderRadius:12,display:'flex',alignItems:'center',gap:10,fontSize:14}}><Icon size={17}/>{label}</Link>)}</nav>
      </aside>
      <section style={{background:'#fff',border:'1px solid #e6e6e2',borderRadius:30,padding:32}}>
        <Link href="/" style={{display:'inline-flex',gap:7,alignItems:'center',fontSize:13,color:'#666'}}><ArrowLeft size={15}/> Voltar ao início</Link>
        <h1 style={{fontSize:48,letterSpacing:'-.055em',margin:'34px 0 8px'}}>{title}</h1><p style={{color:'#737373',marginTop:0}}>{subtitle}</p>
        <div style={{marginTop:30}}>{children ?? <div style={{padding:24,border:'1px solid #ededeb',borderRadius:22,background:'#fafaf8'}}>Área OCTA pronta para integração com seus dados.</div>}</div>
      </section>
    </div>
  </main>
}
