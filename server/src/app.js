import express from 'express';
import cors from 'cors';
import {readDb,writeDb,feed,matches,swipe,defaultPath} from './store.js';
export function createApp(file=defaultPath){const app=express();app.use(cors());app.use(express.json({limit:'16kb'}));
app.get('/api/health',(_,res)=>res.json({ok:true}));
app.get(['/feed','/api/feed'],(_,res)=>res.json({profiles:feed(readDb(file))}));
app.get(['/matches','/api/matches'],(_,res)=>res.json({matches:matches(readDb(file))}));
app.post(['/swipe','/api/swipe'],(req,res)=>{const db=readDb(file);const result=swipe(db,req.body?.profileId,req.body?.direction);if(result.status===200)writeDb(db,file);res.status(result.status).json(result.data??{error:result.error});});
app.use((err,req,res,next)=>{if(err instanceof SyntaxError&&'body'in err)return res.status(400).json({error:'Invalid JSON body'});console.error(err);res.status(500).json({error:'Internal server error'});});return app;}
