'use client';

import { Camera, X } from 'lucide-react';
import { ChangeEvent, useRef, useState } from 'react';
import type { EditableProfile } from './useEditableProfile';

export function ProfileEditor({ profile, onSave, onClose }:{ profile:EditableProfile; onSave:(p:EditableProfile)=>void; onClose:()=>void }) {
  const [draft,setDraft]=useState(profile);
  const fileRef=useRef<HTMLInputElement>(null);
  const onFile=(e:ChangeEvent<HTMLInputElement>)=>{
    const f=e.target.files?.[0]; if(!f) return;
    const r=new FileReader(); r.onload=()=>setDraft(v=>({...v,photo:String(r.result)})); r.readAsDataURL(f);
  };
  return <div style={{position:'fixed',inset:0,zIndex:200,background:'rgba(10,12,14,.28)',backdropFilter:'blur(8px)',display:'grid',placeItems:'center'}} onClick={onClose}>
    <div style={{width:'min(92vw,390px)',background:'rgba(255,255,255,.98)',border:'1px solid rgba(0,0,0,.08)',borderRadius:26,padding:24,boxShadow:'0 30px 80px rgba(0,0,0,.2)'}} onClick={e=>e.stopPropagation()}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}><div><strong style={{fontSize:18}}>Editar perfil</strong><div style={{fontSize:12,color:'#7a7a7a',marginTop:3}}>Nome e foto ficam salvos neste navegador.</div></div><button onClick={onClose} aria-label="Fechar" style={{width:34,height:34,border:0,borderRadius:17,display:'grid',placeItems:'center',background:'#f1f1ef'}}><X size={17}/></button></div>
      <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:22}}>
        <div style={{position:'relative'}}><img src={draft.photo} alt="Foto de perfil" style={{width:74,height:74,borderRadius:'50%',objectFit:'cover',display:'block'}}/><button onClick={()=>fileRef.current?.click()} style={{position:'absolute',right:-3,bottom:-3,width:30,height:30,borderRadius:'50%',border:'2px solid #fff',background:'#111',color:'#fff',display:'grid',placeItems:'center'}}><Camera size={14}/></button></div>
        <button onClick={()=>fileRef.current?.click()} style={{border:'1px solid #ddd',background:'#fff',borderRadius:14,padding:'10px 13px',fontSize:12,fontWeight:600}}>Trocar foto</button>
        <input ref={fileRef} type="file" accept="image/*" onChange={onFile} hidden/>
      </div>
      <label style={{display:'grid',gap:7,fontSize:12,fontWeight:650,marginBottom:14}}>Nome<input value={draft.name} onChange={e=>setDraft(v=>({...v,name:e.target.value}))} style={{height:44,border:'1px solid #ddd',borderRadius:14,padding:'0 13px',font:'inherit',fontWeight:450,outline:'none'}}/></label>
      <label style={{display:'grid',gap:7,fontSize:12,fontWeight:650}}>Cargo<input value={draft.role} onChange={e=>setDraft(v=>({...v,role:e.target.value}))} style={{height:44,border:'1px solid #ddd',borderRadius:14,padding:'0 13px',font:'inherit',fontWeight:450,outline:'none'}}/></label>
      <button onClick={()=>{onSave({...draft,name:draft.name.trim()||profile.name});onClose()}} style={{width:'100%',height:46,border:0,borderRadius:23,background:'#111',color:'#fff',fontWeight:650,marginTop:22}}>Salvar alterações</button>
    </div>
  </div>
}
