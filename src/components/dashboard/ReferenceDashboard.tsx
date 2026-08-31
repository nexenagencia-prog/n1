'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Hotspot } from './Hotspot';
import styles from './ReferenceDashboard.module.css';

type Panel = { title: string; text: string; light?: boolean } | null;

const nav = [
  ['/reunioes', 3.6, 26.2, 6.0, 3.2, 'Reuniões'],
  ['/agenda', 3.5, 31.2, 5.8, 3.2, 'Agenda'],
  ['/contatos', 3.5, 36.0, 6.4, 3.2, 'Contatos'],
  ['/gravacoes', 3.5, 40.8, 6.6, 3.2, 'Gravações'],
  ['/octa-ai', 3.5, 45.4, 6.0, 3.2, 'OCTA AI'],
  ['/skills', 3.5, 51.9, 6.4, 3.2, 'OCTA Skills'],
  ['/notificacoes', 3.5, 56.8, 7.2, 3.2, 'Notificações'],
  ['/configuracoes', 3.5, 61.8, 7.4, 3.2, 'Configurações'],
] as const;

export function ReferenceDashboard() {
  const router = useRouter();
  const [searching, setSearching] = useState(false);
  const [panel, setPanel] = useState<Panel>(null);
  const [day, setDay] = useState('Qua 20');
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault(); setSearching(true); requestAnimationFrame(() => searchRef.current?.focus());
      }
      if (event.key === 'Escape') { setSearching(false); setPanel(null); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const info = (title: string, text: string, light = false) => setPanel({ title, text, light });

  return (
    <div className={styles.viewport}>
      <main className={styles.stage} aria-label="Dashboard OCTA">
        <Image src="/images/octa-dashboard-reference.png" alt="Dashboard OCTA" fill priority className={styles.reference} sizes="100vw" />

        <Hotspot label="Início" style={{left:'1.2%',top:'19.6%',width:'6.8%',height:'5.2%'}} onClick={() => router.push('/')} />
        {nav.map(([href,left,top,width,height,label]) => (
          <Hotspot key={href} label={label} style={{left:`${left}%`,top:`${top}%`,width:`${width}%`,height:`${height}%`}} onClick={() => router.push(href)} />
        ))}

        <Hotspot label="Buscar" style={{left:'34.2%',top:'1.85%',width:'27%',height:'5.1%'}} onClick={() => { setSearching(true); requestAnimationFrame(() => searchRef.current?.focus()); }} />
        <Hotspot label="Notificações" style={{left:'81.2%',top:'1.8%',width:'3.2%',height:'5.3%'}} onClick={() => router.push('/notificacoes')} />
        <Hotspot label="Perfil" style={{left:'84.3%',top:'1.8%',width:'12.5%',height:'5.2%'}} onClick={() => info('Denner Biersack','Marketing Digital • Perfil online')} />

        <Hotspot label="Nova reunião" style={{left:'11.7%',top:'30.5%',width:'12.6%',height:'4.8%'}} onClick={() => info('Nova reunião','Sala instantânea preparada. Você pode convidar participantes assim que entrar.')} />
        <Hotspot label="Agendar reunião" style={{left:'25.0%',top:'30.5%',width:'12.3%',height:'4.8%'}} onClick={() => router.push('/agenda')} />
        <Hotspot label="Ver agenda" style={{left:'88.1%',top:'15.8%',width:'8.0%',height:'4.2%'}} onClick={() => router.push('/agenda')} />
        <Hotspot label="Próxima reunião" style={{left:'76.0%',top:'9.3%',width:'20.5%',height:'20.7%'}} onClick={() => info('Planejamento de Marketing','Hoje, 14:30 • 10 participantes')} />

        <Hotspot label="Iniciar reunião" style={{left:'12.4%',top:'49.3%',width:'9.9%',height:'10.5%'}} onClick={() => info('Iniciar reunião','Uma nova sala OCTA está pronta para começar.')} />
        <Hotspot label="Agendar" style={{left:'22.8%',top:'49.3%',width:'9.9%',height:'10.5%'}} onClick={() => router.push('/agenda')} />
        <Hotspot label="Convidar pessoas" style={{left:'33.2%',top:'49.3%',width:'9.9%',height:'10.5%'}} onClick={() => info('Convidar pessoas','Adicione participantes por e-mail ou compartilhe o convite da reunião.', true)} />
        <Hotspot label="Gravar reunião" style={{left:'43.5%',top:'49.3%',width:'9.9%',height:'10.5%'}} onClick={() => info('Gravação','A gravação será iniciada quando a reunião começar.', true)} />
        <Hotspot label="Abrir OCTA AI" style={{left:'53.4%',top:'45.2%',width:'20.3%',height:'15.0%'}} onClick={() => router.push('/octa-ai')} />
        <Hotspot label="Ver análise OCTA Skills" style={{left:'74.0%',top:'45.2%',width:'21.9%',height:'15.0%'}} onClick={() => router.push('/skills')} />

        <Hotspot label="Reuniões recentes" style={{left:'11.7%',top:'61.2%',width:'26.4%',height:'27.8%'}} onClick={() => router.push('/reunioes')} />
        <Hotspot label="Gravações" style={{left:'38.7%',top:'61.2%',width:'25.0%',height:'27.8%'}} onClick={() => router.push('/gravacoes')} />
        <Hotspot label="Agenda semanal" style={{left:'64.3%',top:'61.2%',width:'31.8%',height:'27.8%'}} onClick={() => router.push('/agenda')} />

        {['Seg 18','Ter 19','Qua 20','Qui 21','Sex 22','Sáb 23','Dom 24'].map((label,index) => (
          <Hotspot key={label} label={`Selecionar ${label}`} style={{left:`${67.3 + index*4.16}%`,top:'65.0%',width:'3.6%',height:'3.0%'}} onClick={() => { setDay(label); info('Agenda da semana',`${label} selecionado.`, true); }} />
        ))}

        <div className={`${styles.searchWrap} ${searching ? styles.active : ''}`}>
          <Search className={styles.searchIcon}/>
          <input ref={searchRef} className={styles.search} placeholder="Buscar reunião, pessoa ou gravação..." onKeyDown={(e) => {
            if (e.key === 'Enter') { info('Busca OCTA', e.currentTarget.value ? `Resultados para “${e.currentTarget.value}”.` : 'Digite um termo para buscar.', true); setSearching(false); }
          }} onBlur={() => setTimeout(() => setSearching(false), 120)} />
        </div>

        {panel && (
          <section className={`${styles.panel} ${panel.light ? styles.light : ''}`} role="dialog" aria-live="polite">
            <button className={styles.panelClose} onClick={() => setPanel(null)} aria-label="Fechar">×</button>
            <h2 className={styles.panelTitle}>{panel.title}</h2>
            <p className={styles.panelText}>{panel.text}{panel.title === 'Agenda da semana' ? ` Dia ativo: ${day}.` : ''}</p>
          </section>
        )}
      </main>
    </div>
  );
}
