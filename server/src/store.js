import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
export const defaultPath=path.resolve(root,'../data/db.json');
export function readDb(file=defaultPath){return JSON.parse(fs.readFileSync(file,'utf8'));}
export function writeDb(db,file=defaultPath){const tmp=`${file}.${process.pid}.tmp`;fs.writeFileSync(tmp,JSON.stringify(db,null,2));fs.renameSync(tmp,file);}
export function publicProfile(p){const {likedMe,...safe}=p;return safe;}
export function feed(db){const swiped=new Set(db.swipes.map(s=>s.profileId));return db.profiles.filter(p=>!swiped.has(p.id)).map(publicProfile);}
export function matches(db){const ids=new Set(db.swipes.filter(s=>s.direction==='like').map(s=>s.profileId));return db.profiles.filter(p=>ids.has(p.id)&&p.likedMe).map(publicProfile);}
export function swipe(db,profileId,direction){if(!['like','pass'].includes(direction))return {status:400,error:'direction must be like or pass'};if(!Number.isInteger(profileId))return {status:400,error:'profileId must be an integer'};const profile=db.profiles.find(p=>p.id===profileId);if(!profile)return {status:404,error:'Profile not found'};if(db.swipes.some(s=>s.profileId===profileId))return {status:409,error:'Profile already swiped'};db.swipes.push({profileId,direction,createdAt:new Date().toISOString()});const matched=direction==='like'&&profile.likedMe===true;return {status:200,data:{matched,profile:matched?publicProfile(profile):null}};}
