import { AppShell } from './AppShell';
import { WorkspaceSection } from './WorkspaceSection';
type Kind='reunioes'|'agenda'|'contatos'|'gravacoes'|'calculadora'|'octa-ai'|'skills'|'lousa'|'anotar'|'anotacoes'|'notificacoes'|'configuracoes'|'instantanea'|'planos'|'profile';
export function SectionPage({title,subtitle,kind}:{title:string;subtitle:string;kind:Kind}){return <AppShell title={title} subtitle={subtitle}><WorkspaceSection kind={kind}/></AppShell>}
