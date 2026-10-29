import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Star } from 'lucide-react';

export interface CustomerReview { quote: string; attribution: string; source: string; approved: boolean }
// Populate only with genuine reviews and permission to display the attribution.
export const customerReviews: CustomerReview[] = [];
export const sampleReviews: CustomerReview[] = [
 'The proposal made the rent, bills and responsibilities easy to understand.',
 'A personal approach that took the time to understand what mattered to us.',
 'We appreciated having the management scope explained in plain English.',
 'The discussion helped us compare the two services with confidence.',
 'Knowing who to contact about maintenance made the process feel simpler.',
 'It was helpful to see the costs and exclusions set out together.',
 'The property appraisal gave us a clear starting point for our plans.',
 'We valued the focus on finding the right arrangement for our home.',
 'The emphasis on communication and agreed updates was reassuring.',
 'Having the handover details explained helped us plan ahead.',
 'The team’s local approach was exactly what we were looking for.',
 'A straightforward conversation about our property and our priorities.',
].map((quote,index)=>({quote,attribution:`Sample review ${String(index+1).padStart(2,'0')}`,source:'Layout demonstration only',approved:true}));

export function Reviews({ reviews = import.meta.env.DEV ? sampleReviews : customerReviews }: { reviews?: CustomerReview[] }) {
 const items = reviews.filter(review => review.approved && review.quote.trim() && review.attribution.trim() && review.source.trim()).slice(0,12);
 const track = useRef<HTMLDivElement>(null);
 const [paused,setPaused]=useState(false);
 const [interacting,setInteracting]=useState(false);
 const [reduced,setReduced]=useState(false);
 const [index,setIndex]=useState(0);
 useEffect(()=>{const media=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReduced(media.matches);update();media.addEventListener('change',update);return()=>media.removeEventListener('change',update);},[]);
 const move=(direction:number)=>{const element=track.current;if(!element)return;const card=element.firstElementChild as HTMLElement|null;if(!card)return;const step=card.offsetWidth+24;const max=Math.max(0,Math.ceil((element.scrollWidth-element.clientWidth)/step));const current=Math.round(element.scrollLeft/step);const next=direction>0?(current>=max?0:current+1):(current<=0?max:current-1);element.scrollTo({left:next*step,behavior:reduced?'instant':'smooth'});setIndex(next);};
 useEffect(()=>{if(paused||interacting||reduced||items.length<2)return;const timer=window.setInterval(()=>move(1),5000);return()=>clearInterval(timer);},[paused,interacting,reduced,items.length]);
 if(!items.length)return null;
 return <section className="section reviews-section" aria-label="Customer reviews" onMouseEnter={()=>setInteracting(true)} onMouseLeave={()=>setInteracting(false)} onFocusCapture={()=>setInteracting(true)} onBlurCapture={event=>{if(!event.currentTarget.contains(event.relatedTarget))setInteracting(false);}}><div className="container-wide"><div className="reviews-heading"><div><span className="eyebrow">{import.meta.env.DEV?'Review layout preview':'In our customers’ words'}</span><h2 className="display">Personal service.<em>Real experiences.</em></h2></div><div className="reviews-controls"><button type="button" aria-label="Previous review" onClick={()=>move(-1)}><ChevronLeft/></button><button type="button" aria-label={paused?'Play reviews':'Pause reviews'} onClick={()=>setPaused(!paused)}>{paused?<Play/>:<Pause/>}</button><button type="button" aria-label="Next review" onClick={()=>move(1)}><ChevronRight/></button></div></div>{import.meta.env.DEV&&<p className="sample-notice">Sample reviews — not customer testimonials. Demonstration content is hidden in the published build.</p>}<div ref={track} className="reviews-track" tabIndex={0} aria-label="Customer review carousel" onScroll={()=>{const el=track.current;const first=el?.firstElementChild as HTMLElement|null;if(el&&first)setIndex(Math.round(el.scrollLeft/(first.offsetWidth+24)));}}>{items.map((review,i)=><figure className="review-card" key={`${review.attribution}-${i}`}><span className="review-stars" aria-label="Five stars — sample rating">{Array.from({length:5},(_,i)=><Star key={i} size={17} aria-hidden="true"/>)}</span>{import.meta.env.DEV&&<small>Sample review — not a customer testimonial</small>}<blockquote>{review.quote}</blockquote><figcaption><strong>{review.attribution}</strong><span>{review.source}</span></figcaption></figure>)}</div><p className="review-position" aria-live={paused?'polite':'off'}>Review {index+1} of {items.length}</p></div></section>;
}
