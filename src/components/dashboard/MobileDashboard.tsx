'use client';

import Link from 'next/link';
import { CalendarDays, CirclePlay, Menu, Search, Sparkles, Users, Video } from 'lucide-react';
import { useState } from 'react';

const items = [
  { href:'/reunioes', icon:Video, label:'Reuniões', meta:'08 hoje' },
  { href:'/agenda', icon:CalendarDays, label:'Agenda', meta:'14:30 próxima' },
  { href:'/contatos', icon:Users, label:'Contatos', meta:'12 recentes' },
  { href:'/gravacoes', icon:CirclePlay, label:'Gravações', meta:'24 arquivos' },
];

export function MobileDashboard() {
  const [open,setOpen] = useState(false);
  return <div className="mobileOnly mobilePage">
    <header className="mobileTop"><b>OCTA</b><button onClick={()=>setOpen(v=>!v)} aria-label="Menu"><Menu size={22}/></button></header>
    {open && <nav className="mobileMenu">{items.map(i=><Link key={i.href} href={i.href}>{i.label}</Link>)}<Link href="/octa-ai">OCTA AI</Link><Link href="/skills">OCTA Skills</Link></nav>}
    <section className="mobileHero"><span>Bem-vindo de volta, Denner 👋</span><h1>Suas reuniões.<br/>Seu tempo.<br/>Tudo conectado.</h1><p>A OCTA reúne reuniões, agenda, contatos e gravações em uma única experiência.</p><div className="mobileActions"><Link href="/reunioes">+ Nova reunião</Link><Link href="/agenda">Agendar</Link></div></section>
    <div className="mobileSearch"><Search size={17}/><input placeholder="Buscar reunião, pessoa ou gravação..." /></div>
    <section className="mobileGrid">{items.map(({href,icon:Icon,label,meta})=><Link className="mobileCard" key={href} href={href}><Icon/><strong>{label}</strong><span>{meta}</span></Link>)}</section>
    <Link href="/octa-ai" className="mobileAi"><div><b>OCTA AI</b><p>Sua IA de reuniões. Mais foco, mais resultados.</p></div><Sparkles/></Link>
    <Link href="/skills" className="mobileSkills"><div><b>OCTA Skills</b><p>Sua evolução em cada conversa.</p></div><strong>82/100</strong></Link>
  </div>
}
