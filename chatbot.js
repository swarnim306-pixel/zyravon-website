// ZYRAVON guided website demo assistant — not a live AI service.
(() => {
const $=id=>document.getElementById(id), panel=$("chatPanel"), input=$("chatInput"), messages=$("chatMessages");
const add=(s,user)=>{const d=document.createElement("div");d.textContent=s;d.style.cssText="padding:10px 12px;border-radius:10px;margin:8px 0;max-width:92%;white-space:pre-wrap;"+(user?"background:#51458f;margin-left:auto":"background:#1a263b");messages.appendChild(d);messages.scrollTop=messages.scrollHeight};
const reply=s=>{let q=s.toLowerCase();
if(/price|cost|rate|charge|budget/.test(q))return "Pricing depends on project scope, tools and integrations. Share your requirements through the project form so the team can review them. I cannot quote a price here.";
if(/automation|workflow|repetitive|manual/.test(q))return "ZYRAVON's AI Automation helps connect tools and simplify repeatable tasks, handoffs and follow-ups. Which task takes too much time in your business?";
if(/agent|chatbot|customer support|assistant/.test(q))return "ZYRAVON designs AI agents for defined tasks such as answering common questions, collecting enquiries and supporting customer operations. Complex cases should have a human handoff.";
if(/software|website|dashboard|portal|app/.test(q))return "Our Custom Software service covers websites, portals, dashboards and digital tools shaped around a business workflow.";
if(/operation|team|request/.test(q))return "Digital Operations focuses on making requests, information and service processes clearer and more connected.";
if(/hello|hi|hey/.test(q))return "Hello! Welcome to ZYRAVON. Are you exploring AI Automation, an AI Agent, Custom Software or Digital Operations?";
return "I can explain our four areas: AI Automation, Intelligent AI Agents, Custom Software and Digital Operations. Tell me which interests you, or describe the task you want to improve."};
$("chatToggle").onclick=()=>{panel.style.display=panel.style.display==="none"?"block":"none";input.focus()};
$("chatClose").onclick=()=>panel.style.display="none";
$("chatForm").onsubmit=e=>{e.preventDefault();let v=input.value.trim();if(!v)return;add(v,true);input.value="";setTimeout(()=>add(reply(v)),160)};
$("menuBtn").onclick=()=>{let open=$("navLinks").classList.toggle("open");$("menuBtn").setAttribute("aria-expanded",String(open));$("menuBtn").textContent=open?"×":"☰"};
$("navLinks").querySelectorAll("a").forEach(a=>a.onclick=()=>{$("navLinks").classList.remove("open");$("menuBtn").textContent="☰"});
$("year").textContent=new Date().getFullYear();
$("projectForm").onsubmit=e=>{e.preventDefault();let f=new FormData(e.currentTarget);let sub=encodeURIComponent("ZYRAVON project enquiry — "+f.get("need"));let body=encodeURIComponent("Name: "+f.get("name")+"\nEmail: "+f.get("email")+"\nCompany: "+(f.get("company")||"Not provided")+"\nNeed: "+f.get("need")+"\n\nProject details:\n"+f.get("message"));location.href="mailto:YOUR_CONFIRMED_BUSINESS_EMAIL?subject="+sub+"&body="+body};
})();