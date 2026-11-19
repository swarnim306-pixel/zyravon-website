
(() => {
  const style = document.createElement("style");
  style.textContent = `
    #zyravon-chat-button {
      position: fixed; right: 24px; bottom: 24px; z-index: 9999;
      background: #8b5cf6; color: white; border: 0; border-radius: 50px;
      padding: 15px 22px; font-size: 15px; font-weight: bold;
      cursor: pointer; box-shadow: 0 5px 25px #0005;
    }
    #zyravon-chat {
      display: none; position: fixed; right: 24px; bottom: 85px;
      width: 340px; max-width: calc(100vw - 32px); height: 440px;
      max-height: calc(100vh - 120px); z-index: 9999;
      background: #111827; color: white; border: 1px solid #374151;
      border-radius: 16px; overflow: hidden; font-family: Arial, sans-serif;
      box-shadow: 0 10px 35px #0008;
    }
    #zyravon-chat-header {
      background: #6d28d9; padding: 17px; font-weight: bold;
    }
    #zyravon-chat-header small { display:block; font-weight:normal; margin-top:5px; }
    #zyravon-chat-messages {
      height: 300px; overflow-y: auto; padding: 14px;
    }
    .zyravon-message {
      padding: 11px 13px; border-radius: 12px; margin: 9px 0;
      max-width: 85%; line-height: 1.4; font-size: 14px;
      overflow-wrap: anywhere;
    }
    .zyravon-bot { background:#273449; }
    .zyravon-user { background:#6d28d9; margin-left:auto; }
    #zyravon-chat-form { display:flex; gap:8px; padding:12px; }
    #zyravon-chat-input {
      min-width:0; flex:1; padding:12px; border-radius:9px;
      border:1px solid #4b5563; background:#1f2937; color:white;
    }
    #zyravon-chat-form button {
      background:#8b5cf6; color:white; border:0; border-radius:9px;
      padding:0 15px; cursor:pointer;
    }
  `;
  document.head.appendChild(style);

  const button = document.createElement("button");
  button.id = "zyravon-chat-button";
  button.textContent = "Chat with ZYRAVON";

  const chat = document.createElement("section");
  chat.id = "zyravon-chat";
  chat.innerHTML = `
    <div id="zyravon-chat-header">
      ZYRAVON Assistant
      <small>How can we help your business?</small>
    </div>
    <div id="zyravon-chat-messages" aria-live="polite"></div>
    <form id="zyravon-chat-form">
      <input id="zyravon-chat-input" placeholder="Type your message..." required>
      <button type="submit">Send</button>
    </form>
  `;

  document.body.append(button, chat);

  const messages = chat.querySelector("#zyravon-chat-messages");
  const input = chat.querySelector("#zyravon-chat-input");

  function addMessage(text, sender) {
    const item = document.createElement("div");
    item.className = "zyravon-message " + sender;
    item.textContent = text;
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
  }

  function reply(message) {
    const text = message.toLowerCase();

    if (text.includes("service") || text.includes("offer")) {
      return "ZYRAVON offers AI Automation, Intelligent AI Agents, Custom Software and Digital Operations.";
    }
    if (text.includes("price") || text.includes("cost")) {
      return "Pricing depends on your project requirements. Tell us what you need, and our team can review it.";
    }
    if (text.includes("automation")) {
      return "We help businesses automate repetitive tasks and improve their workflows.";
    }
    if (text.includes("agent") || text.includes("chatbot")) {
      return "AI agents can help with customer support, enquiries and business tasks.";
    }
    if (text.includes("hello") || text.includes("hi")) {
      return "Hello! Welcome to ZYRAVON. How can we help your business today?";
    }
    return "Thanks for contacting ZYRAVON! Please tell us a little about your project and what you want to achieve.";
  }

  button.addEventListener("click", () => {
    chat.style.display = chat.style.display === "block" ? "none" : "block";
  });

  chat.querySelector("#zyravon-chat-form").addEventListener("submit", event => {
    event.preventDefault();
    const message = input.value.trim();
    if (!message) return;
    addMessage(message, "zyravon-user");
    input.value = "";
    addMessage(reply(message), "zyravon-bot");
  });

  addMessage("Welcome to ZYRAVON! I'm the website support demo. What would you like to know?", "zyravon-bot");
})();
