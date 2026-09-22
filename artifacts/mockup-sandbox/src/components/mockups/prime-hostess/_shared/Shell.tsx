import { useState, type ReactNode } from "react";
import "./prime.css";

export const navLeft = [["Начало","Home"],["За нас","About"],["Услуги","Services"],["Профили","Profiles"]];
export const navRight = [["Портфолио","Portfolio"],["Екипът","JoinTeam"],["Контакти","Contact"],["FAQ","FAQ"]];
const link = (name:string) => `/preview/prime-hostess/${name}`;

export function Logo(){return <a className="prime-logo" href={link("Home")} aria-label="PRIME Hostess"><strong>PRIME</strong><small>HOSTESS</small></a>}
export function Header(){
  const [open,setOpen]=useState(false);
  return <header className="prime-header"><nav className="prime-nav">{navLeft.map(([label,page])=><a key={page} href={link(page)}>{label}</a>)}</nav><Logo/><nav className="prime-nav right">{navRight.map(([label,page])=><a key={page} href={link(page)}>{label}</a>)}</nav><button className="prime-menu" onClick={()=>setOpen(!open)} aria-label="Меню">{open?"×":"☰"}</button>{open&&<div style={{position:"absolute",top:"70px",left:18,right:18,background:"#181512",padding:"20px",display:"grid",gap:"15px",textAlign:"center"}}>{[...navLeft,...navRight].map(([label,page])=><a key={page} href={link(page)} onClick={()=>setOpen(false)}>{label}</a>)}</div>}</header>
}
export function Footer(){return <footer className="prime-footer"><div className="prime-container"><div className="prime-footer-grid"><div><Logo/><p style={{marginTop:25}}>Хората зад събитието. Подбрани, подготвени и присъстващи с причина.</p></div><div><h3>Навигация</h3><nav>{[...navLeft,...navRight].slice(0,6).map(([l,p])=><a key={p} href={link(p)}>{l}</a>)}</nav></div><div><h3>За брандове</h3><nav><a href={link("Services")}>Услуги и формати</a><a href={link("Portfolio")}>Реални проекти</a><a href={link("Contact")}>Направете запитване</a></nav></div><div><h3>За хората</h3><nav><a href={link("Profiles")}>Разгледайте профили</a><a href={link("JoinTeam")}>Стани част от екипа</a><a href={link("FAQ")}>Често задавани въпроси</a></nav></div></div><div className="prime-footer-bottom"><span>PRIME Hostess · Brandit Solution</span><span>© 2026 · София, България</span></div></div></footer>}
export function Shell({children,dark=false}:{children:ReactNode;dark?:boolean}){return <div className="prime-page prime-shell"><Header/>{children}<Footer/></div>}
export function PageHero({eyebrow,title,copy}:{eyebrow:string;title:string;copy?:string}){return <section className="prime-page-hero"><div className="prime-container prime-reveal"><div className="prime-eyebrow">{eyebrow}</div><h1 className="prime-display">{title}</h1>{copy&&<p>{copy}</p>}</div></section>}
export function Button({href,label,ghost=false,onClick}:{href?:string;label:string;ghost?:boolean;onClick?:()=>void}){return href?<a className={`prime-button ${ghost?"ghost":""}`} href={href}>{label}<span>→</span></a>:<button className={`prime-button ${ghost?"ghost":""}`} onClick={onClick}>{label}<span>→</span></button>}
export function ImageBox({src,className=""}:{src:string;className?:string}){return <div className={`prime-media ${className}`} style={{backgroundImage:`url(${src})`}}/>}