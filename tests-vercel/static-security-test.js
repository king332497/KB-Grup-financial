"use strict";
const fs=require("node:fs");
const path=require("node:path");
const assert=require("node:assert");
const root=path.resolve(__dirname,"..");
const pages=["index.html","login.html","identitas.html","verifikasi.html","profil-pengajuan.html","tahap8.html","tahap9.html","dashboard.html"];
for(const file of pages){
  const text=fs.readFileSync(path.join(root,file),"utf8");
  assert(text.includes("simulation-runtime.js"),`${file} harus memuat simulation-runtime.js`);
}
const runtime=fs.readFileSync(path.join(root,"simulation-runtime.js"),"utf8");
assert(runtime.includes('/api/session/command'),"runtime harus polling command");
assert(!runtime.includes('new EventSource'),"runtime Vercel tidak boleh bergantung pada SSE process-local");
assert(runtime.includes('Object.hasOwn(ROUTES'),"runtime harus memiliki browser-side whitelist");
const admin=fs.readFileSync(path.join(root,"admin.html"),"utf8");
assert(admin.includes('/api/admin/move'),"admin move endpoint hilang");
assert(admin.includes('/api/admin/sessions'),"admin sessions endpoint hilang");
assert(!admin.includes('new EventSource'),"admin Vercel harus memakai shared-state polling, bukan process-local SSE");
const backend=fs.readFileSync(path.join(root,"lib/realtime-backend.js"),"utf8");
for(const bad of ["eval(","new Function(","child_process","exec(","spawn("]){assert(!backend.includes(bad),`backend mengandung pola terlarang: ${bad}`);}
assert(backend.includes('ROUTE_CODES.has(body.routeCode)'),"backend whitelist route harus aktif");
assert(backend.includes('UPSTASH_REDIS_REST_URL'),"shared Redis config hilang");
console.log("static-security-test: PASS");
