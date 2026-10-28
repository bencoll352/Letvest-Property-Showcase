import { siteConfig } from '@/site-config';
const asset=(path:string)=>`${import.meta.env.BASE_URL}${path.replace(/^\//,'')}`;
export function FamilyStory(){
 const family=siteConfig.family;
 const members=family.members.filter(member=>member.approved&&member.name.trim()&&member.role.trim()&&member.biography.trim());
 if(!members.length&&!family.introductionApproved)return null;
 return <section className="family-story" aria-labelledby="family-heading"><h3 className="display" id="family-heading">Meet the people behind JM LetVest</h3>{family.introductionApproved&&family.introduction&&<p className="family-introduction">{family.introduction}</p>}<div className="family-members">{members.map(member=><article className="family-member" key={member.name}>{member.photographApproved&&member.photograph.trim()&&<img src={asset(member.photograph)} alt={member.name} width="480" height="560" loading="lazy" />}<div><h4>{member.name}</h4><p className="family-role">{member.role}</p><p>{member.biography}</p></div></article>)}</div>{family.storyApproved&&family.relationship.trim()&&family.reasonForStarting.trim()&&family.westSussexConnection.trim()&&<div className="family-origin"><h4>Why we started JM LetVest</h4><p>{family.relationship}</p><p>{family.reasonForStarting}</p><p>{family.westSussexConnection}</p></div>}</section>;
}
export function FamilyCommitments(){
 const commitments=siteConfig.family.commitments.filter(commitment=>commitment.approved&&commitment.title.trim()&&commitment.detail.trim());
 if(!commitments.length)return null;
 return <section className="family-commitments" aria-labelledby="commitment-heading"><h3 className="display" id="commitment-heading">What this means for you</h3><div className="agreement-grid">{commitments.map(commitment=><article className="care-card" key={commitment.title}><h4>{commitment.title}</h4><p>{commitment.detail}</p></article>)}</div></section>;
}
