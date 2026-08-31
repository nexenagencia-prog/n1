'use client';

import Link from 'next/link';
import {
  Bell, CalendarDays, ChevronDown, ChevronRight, CirclePlay, Home, MoreHorizontal,
  Plus, Search, Settings2, Sparkles, Users, Video, UserPlus, Mic2, BarChart3,
  Lightbulb, ShieldCheck, Play, X
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './StructuredDashboard.module.css';

const navItems = [
  { href:'/', label:'Início', icon:Home, active:true },
  { href:'/reunioes', label:'Reuniões', icon:Video },
  { href:'/agenda', label:'Agenda', icon:CalendarDays },
  { href:'/contatos', label:'Contatos', icon:Users },
  { href:'/gravacoes', label:'Gravações', icon:CirclePlay },
  { href:'/octa-ai', label:'OCTA AI', icon:Sparkles, badge:'Novo' },
  { href:'/skills', label:'OCTA Skills', icon:ShieldCheck },
  { href:'/notificacoes', label:'Notificações', icon:Bell },
  { href:'/configuracoes', label:'Configurações', icon:Settings2 },
];

const avatars = ['/images/avatar-1.png','/images/avatar-2.png','/images/avatar-3.png','/images/avatar-4.png'];

function Avatar({src, alt='Participante'}:{src:string;alt?:string}){
  return <img className={styles.avatar} src={src} alt={alt}/>;
}

function AvatarGroup({count=false}:{count?:boolean}){
  return <div className={styles.avatarGroup}>{avatars.slice(0,count?4:3).map((src,i)=><Avatar key={src} src={src}/>)}{count&&<span className={styles.avatarMore}>+5</span>}</div>
}

function Stat({icon:Icon,value,label}:{icon:any;value:string;label:string}){
  return <div className={styles.stat}><span className={styles.statIcon}><Icon size={18}/></span><div><strong>{value}</strong><small>{label}</small></div></div>
}

function ActionCard({icon:Icon,title,meta,onClick}:{icon:any;title:string;meta:string;onClick?:()=>void}){
  return <button className={styles.actionCard} onClick={onClick}><Icon size={21}/><div><strong>{title}</strong><small>{meta}</small></div></button>
}

const recentMeetings = [
  ['Briefing Campanha','Hoje','10:30',0],
  ['Alinhamento Comercial','Hoje','15:00',1],
  ['Reunião com Cliente','Ontem','16:20',0],
] as const;

const recordings = [
  ['Planejamento de Marketing','Hoje','14:30','48 min','48:12',0],
  ['Reunião com João Silva','Ontem','15:00','32 min','32:46',0],
  ['Alinhamento Comercial','Ontem','10:30','26 min','26:10',0],
  ['Briefing Campanha','18 Mai','11:00','52 min','52:33',1],
] as const;

export function StructuredDashboard(){
  const [profileOpen,setProfileOpen]=useState(false);
  const [noticeOpen,setNoticeOpen]=useState(false);
  const [modal,setModal]=useState<string|null>(null);
  const [activeDay,setActiveDay]=useState('Qua 20');
  const searchRef=useRef<HTMLInputElement>(null);

  useEffect(()=>{
    const onKey=(e:KeyboardEvent)=>{
      if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){
        e.preventDefault(); searchRef.current?.focus();
      }
      if(e.key==='Escape'){setModal(null);setProfileOpen(false);setNoticeOpen(false)}
    };
    window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey);
  },[]);

  const days=useMemo(()=>['Seg 18','Ter 19','Qua 20','Qui 21','Sex 22','Sáb 23','Dom 24'],[]);

  return <div className={styles.app}>
    <aside className={styles.sidebar}>
      <div className={styles.brandMark}><span className={styles.brandOrb}/><span className={styles.brandOrbSmall}/></div>
      <div className={styles.brand}>OCTA</div>
      <button className={styles.sideSearch} onClick={()=>searchRef.current?.focus()}><Search size={18}/></button>
      <nav className={styles.nav}>{navItems.map(({href,label,icon:Icon,active,badge})=><Link key={label} href={href} className={`${styles.navItem} ${active?styles.activeNav:''}`}><span className={styles.navIcon}><Icon size={18}/></span><span>{label}</span>{badge&&<em>{badge}</em>}</Link>)}</nav>
      <div className={styles.sidebarProfile}><div className={styles.profilePhotoWrap}><img src="/images/avatar-1.png" alt="Denner Biersack"/><span/></div><strong>Denner Biersack</strong><small>Marketing Digital</small><button><ChevronDown size={17}/></button></div>
    </aside>

    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroImage}/>
        <div className={styles.heroFade}/>
        <div className={styles.heroTopSearch}><Search size={19}/><input ref={searchRef} placeholder="Buscar reunião, pessoa ou gravação..."/><kbd>⌘ K</kbd></div>
        <div className={styles.topProfileArea}>
          <button className={styles.bellButton} onClick={()=>setNoticeOpen(v=>!v)}><Bell size={19}/><span/></button>
          <button className={styles.userButton} onClick={()=>setProfileOpen(v=>!v)}><img src="/images/avatar-1.png" alt="Denner Biersack"/><span>Denner Biersack</span><ChevronDown size={16}/></button>
          {noticeOpen&&<div className={styles.dropdown}><b>Notificações</b><p>Você está em dia. Nenhuma nova notificação importante.</p></div>}
          {profileOpen&&<div className={`${styles.dropdown} ${styles.profileDrop}`}><b>Denner Biersack</b><p>Marketing Digital</p><Link href="/configuracoes">Configurações</Link></div>}
        </div>

        <div className={styles.heroCopy}>
          <span>Bem-vindo de volta, <b>Denner</b> 👋</span>
          <h1>Suas reuniões.<br/>Seu tempo.<br/>Tudo conectado.</h1>
          <p>A OCTA reúne reuniões, agenda, contatos e<br/>gravações em uma única experiência —<br/>para você ir além em cada conversa.</p>
          <div className={styles.heroActions}>
            <button className={styles.primaryButton} onClick={()=>setModal('Nova reunião pronta para começar.')}><Plus size={18}/> Nova reunião <ChevronRight size={18}/></button>
            <Link className={styles.secondaryButton} href="/agenda"><CalendarDays size={18}/> Agendar reunião</Link>
          </div>
        </div>

        <div className={styles.nextMeeting}>
          <div className={styles.nextHeader}><span className={styles.nextIcon}><CalendarDays size={17}/></span><span>Próxima reunião</span><MoreHorizontal size={17}/></div>
          <div className={styles.nextTimeRow}><strong>14:30</strong><span>Hoje</span><Link href="/agenda">Ver agenda <ChevronRight size={15}/></Link></div>
          <h3>Planejamento de Marketing</h3><AvatarGroup count/>
        </div>
        <div className={styles.quote}><Lightbulb size={16}/><span>“Grandes ideias<br/>acontecem em boas conversas.”</span></div>

        <div className={styles.metrics}><Stat icon={Video} value="08" label="Reuniões hoje"/><Stat icon={Users} value="12" label="Contatos recentes"/><Stat icon={CirclePlay} value="24" label="Gravações"/><Stat icon={BarChart3} value="82%" label="Performance"/></div>
      </section>

      <section className={styles.dashboardGrid}>
        <section className={`${styles.panelCard} ${styles.quickPanel}`}>
          <h2>Ações rápidas</h2>
          <div className={styles.quickGrid}><ActionCard icon={Video} title="Iniciar reunião" meta="Agora, com um clique" onClick={()=>setModal('Reunião iniciada.')}/><ActionCard icon={CalendarDays} title="Agendar" meta="Criar evento" onClick={()=>location.href='/agenda'}/><ActionCard icon={UserPlus} title="Convidar pessoas" meta="Adicionar participantes" onClick={()=>setModal('Convite pronto para compartilhar.')}/><ActionCard icon={Mic2} title="Gravar reunião" meta="Iniciar gravação" onClick={()=>setModal('Gravação preparada para iniciar.')}/></div>
        </section>

        <Link href="/octa-ai" className={styles.aiCard}><div><div className={styles.aiTitle}>OCTA AI <span>Beta</span></div><p>Sua IA de reuniões. Mais<br/>foco, mais resultados.</p><span className={styles.aiButton}>Abrir OCTA AI <ChevronRight size={15}/></span></div><div className={styles.aiOrb}><span/></div></Link>

        <Link href="/skills" className={styles.skillsCard}><div><h2>OCTA Skills</h2><p>Sua evolução em<br/>cada conversa.</p><span className={styles.softButton}>Ver análise <ChevronRight size={15}/></span></div><div className={styles.scoreRing}><div><strong>82</strong><small>/100</small></div></div></Link>

        <section className={`${styles.panelCard} ${styles.recentPanel}`}>
          <div className={styles.panelHead}><h2>Reuniões recentes</h2><Link href="/reunioes">Ver todas <ChevronRight size={14}/></Link></div>
          <div className={styles.list}>{recentMeetings.map(([title,day,time,avatarIndex],i)=><div className={styles.meetingRow} key={title}><img src={avatars[avatarIndex]} alt=""/><div className={styles.meetingText}><strong>{title}</strong><small>{day} &nbsp;·&nbsp; {time}</small></div><AvatarGroup/><button onClick={()=>setModal(`Entrando em ${title}`)}>{i<2?'Entrar':'▶'} {i<2&&<ChevronRight size={13}/>}</button><MoreHorizontal size={15}/></div>)}</div>
        </section>

        <section className={`${styles.panelCard} ${styles.recordingsPanel}`}>
          <div className={styles.panelHead}><h2>Gravações</h2><Link href="/gravacoes">Ver todas <ChevronRight size={14}/></Link></div>
          <div className={styles.list}>{recordings.map(([title,day,time,duration,stamp,avatarIndex])=><div className={styles.recordingRow} key={title}><div className={styles.thumb}><img src={avatars[avatarIndex]} alt=""/><span>{stamp}</span></div><div className={styles.meetingText}><strong>{title}</strong><small>{day} &nbsp;·&nbsp; {time} &nbsp;·&nbsp; {duration}</small></div><MoreHorizontal size={16}/><button onClick={()=>setModal(`Reproduzindo ${title}`)}><Play size={14} fill="currentColor"/></button></div>)}</div>
        </section>

        <section className={`${styles.panelCard} ${styles.agendaPanel}`}>
          <div className={styles.panelHead}><h2>Agenda da semana</h2><Link href="/agenda">Ver agenda <ChevronRight size={14}/></Link></div>
          <div className={styles.days}>{days.map(d=><button key={d} onClick={()=>setActiveDay(d)} className={activeDay===d?styles.dayActive:''}>{d}</button>)}</div>
          <div className={styles.calendarGrid}>
            <div className={styles.times}>{['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'].map(t=><span key={t}>{t}</span>)}</div>
            <div className={styles.calendarBody}>
              <div className={`${styles.event} ${styles.event1}`}>Reunião com Cliente<small>09:00 – 10:00</small></div>
              <div className={`${styles.event} ${styles.event2}`}>Alinhamento de Equipe<small>10:30 – 11:30</small></div>
              <div className={`${styles.event} ${styles.event3}`}>Apresentação<small>09:30 – 10:30</small></div>
              <div className={`${styles.event} ${styles.event4}`}>Briefing Criativo<small>11:00 – 12:00</small></div>
              <div className={`${styles.event} ${styles.eventDark}`}>Planejamento de<br/>Marketing<small>14:30 – 16:00</small></div>
              <div className={`${styles.event} ${styles.event5}`}>Revisão de Campanha<small>15:00 – 16:00</small></div>
            </div>
          </div>
        </section>
      </section>
    </main>

    {modal&&<div className={styles.modalBackdrop} onClick={()=>setModal(null)}><div className={styles.modal} onClick={e=>e.stopPropagation()}><button onClick={()=>setModal(null)}><X size={17}/></button><Sparkles size={24}/><h3>OCTA</h3><p>{modal}</p></div></div>}
  </div>
}
