// ZYRAVON website assistant — guided demo, not connected to a live AI service.
(() => {
  const $ = id => document.getElementById(id);
  const toggle = $('chatToggle'), panel = $('chatPanel'), close = $('chatClose');
  const form = $('chatForm'), input = $('chatInput'), messages = $('chatMessages');
  const add = (text, user=false) => {
    const item = document.createElement('div');
    item.textContent = text;
    item.style.cssText = `white-space:pre-wrap;max-width:90%;margin:${user?'8px 0 8px auto':'8px auto 8px 0'};padding:10px 12px;border-radius:10px;background:${user?'#51458f':'#1a263b'};color:#f4f7ff`;
    messages.appendChild(item); messages.scrollTop = messages.scrollHeight;
  };
  const answer = q => {
    const s = q.toLowerCase();
    if (/price|cost|charge|rate|budget/.test(s)) return "Project pricing depends on the scope and features. Share what you need through the Contact section and the ZYRAVON team can review it.";
    if (/service|what do you do|offer/.test(s)) return "ZYRAVON works on AI automation, intelligent AI agents, custom software and digital operations.";
    if (/contact|email|talk|human|team/.test(s)) return "You can reach the team through the Contact section. The current email placeholder is hello@zyravon.com and should be confirmed before launch.";
    if (/website|software|app|develop|build/.test(s)) return "We can discuss websites, dashboards and custom digital tools. Tell us your goal and the features you have in mind.";
    if (/hello|hi|hey|namaste/.test(s)) return "Hello! Welcome to ZYRAVON. Are you interested in AI automation, an AI assistant, or custom software?";
    return "Thanks for your message. This is a guided website demo, not a live AI service yet. Please use the Contact section to send your project details to the team.";
  };
  toggle.addEventListener('click', () => { panel.style.display = panel.style.display === 'none' ? 'block' : 'none'; });
  close.addEventListener('click', () => panel.style.display = 'none');
  form.addEventListener('submit', e => {
    e.preventDefault(); const q = input.value.trim(); if (!q) return;
    add(q, true); input.value = ''; setTimeout(() => add(answer(q)), 250);
  });
  const menuBtn = $('menuBtn'), nav = $('navLinks');
  menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
  $('year').textContent = new Date().getFullYear();
  $('contactForm').addEventListener('submit', e => {
    e.preventDefault(); const d = new FormData(e.currentTarget);
    const body = `Name: ${d.get('name')}\nEmail: ${d.get('email')}\nCompany: ${d.get('company') || 'Not provided'}\n\nProject details:\n${d.get('message')}`;
    location.href = `mailto:hello@zyravon.com?subject=${encodeURIComponent('New ZYRAVON project enquiry')}&body=${encodeURIComponent(body)}`;
  });
})();