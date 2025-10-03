---
permalink: /professional/
title: "init.d"
subtitle: "Where systems meet curiosity, and code meets coffee ☕"
layout: page
hero_image: /images/hero/technology-modern.jpg
hero_darken: true
---


<style>
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

@keyframes blink {
  0%, 50% { opacity: 1 }
  51%, 100% { opacity: 0 }
}

.terminal {
  background: #1a1a1a;
  color: #00ff00;
  font-family: 'Courier New', monospace;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
  border: 2px solid #333;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
}

.boot-sequence {
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 20px;
}

.cursor::after {
  content: '_';
  animation: blink 1s infinite;
}

.service-card {
  background: linear-gradient(145deg, #2d2d2d, #1a1a1a);
  border: 1px solid #444;
  border-radius: 12px;
  padding: 25px;
  margin: 15px 0;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.service-card:hover {
  border-color: #00ff00;
  box-shadow: 0 5px 20px rgba(0, 255, 0, 0.2);
  transform: translateY(-5px);
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00ff00, transparent);
  animation: scan 3s infinite;
}

@keyframes scan {
  0% { left: -100%; }
  100% { left: 100%; }
}

.status-indicator {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 10px;
  animation: pulse 2s infinite;
}

.status-ok { background: #00ff00; }
.status-warning { background: #ffaa00; }
.status-info { background: #0088ff; }
.status-critical { background: #ff4444; }

@keyframes pulse {
  0%, 100% { opacity: 0.7; transform: scale(0.9); }
  50% { opacity: 1; transform: scale(1.1); }
}

.init-header {
  text-align: center;
  margin: 30px 0;
  font-family: 'Courier New', monospace;
}

.system-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin: 30px 0;
}

@media (max-width: 768px) {
  .system-grid {
    grid-template-columns: 1fr;
  }
}

.boot-complete {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  padding: 30px;
  border-radius: 15px;
  margin: 30px 0;
  position: relative;
  overflow: hidden;
}

.boot-complete::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
  animation: shine 3s infinite;
}

@keyframes shine {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
  <!-- Left Terminal: System Boot & Life Journey -->
  <div class="terminal">
    <div class="boot-sequence">
      <div style="color: #00ffff; font-weight: bold;">┌──[SYSTEM INITIALIZATION]──</div>
      <div>[    0.000000] Bhargav OS v2024.10 booting...</div>
      <div>[    0.050000] Detecting hardware evolution:</div>
      <div>[    0.100000] ├─ 2005: MS-DOS games on 486DX</div>
      <div>[    0.150000] ├─ 2010: Ubuntu dual-boot adventure</div>
      <div>[    0.200000] ├─ 2015: MacBook Pro + cloud era</div>
      <div>[    0.250000] ├─ 2020: Kubernetes clusters deployed</div>
      <div>[    0.300000] └─ 2024: AI/ML on edge devices</div>
      <div style="margin-top: 10px;">[    0.400000] Loading life.modules...</div>
      <div>[    0.450000] ✓ curiosity.ko loaded</div>
      <div>[    0.500000] ✓ persistence.ko loaded</div>
      <div>[    0.550000] ✓ innovation.ko loaded</div>
      <div style="margin-top: 10px; color: #00ff00;">[    0.600000] System ready <span class="cursor"></span></div>
    </div>
  </div>

  <!-- Right Terminal: Skills & Technology Stack -->
  <div class="terminal">
    <div class="boot-sequence">
      <div style="color: #ff00ff; font-weight: bold;">┌──[CAPABILITY MATRIX]──</div>
      <div>[  INIT  ] Scanning skill tree...</div>
      <div style="margin-top: 10px;">[  CODE  ] Languages proficient:</div>
      <div>         ├─ Python: ████████░░ 80%</div>
      <div>         ├─ JavaScript: ███████░░░ 70%</div>
      <div>         ├─ Go: ██████░░░░ 60%</div>
      <div>         └─ Bash: ████████░░ 80%</div>
      <div style="margin-top: 10px;">[  STACK ] Infrastructure:</div>
      <div>         ├─ Docker/K8s: ████████░░</div>
      <div>         ├─ AWS/GCP: ███████░░░</div>
      <div>         └─ CI/CD: ████████░░</div>
      <div style="margin-top: 10px;">[  FOCUS ] Current interests:</div>
      <div>         ├─ GenAI & LLMs 🤖</div>
      <div>         ├─ Edge Computing 📡</div>
      <div>         └─ Systems Design 🏗️</div>
      <div style="margin-top: 10px; color: #00ff00;">[  READY ] All systems go! <span class="cursor"></span></div>
    </div>
  </div>
</div>

<style>
@media (max-width: 768px) {
  div[style*="grid-template-columns: 1fr 1fr"] {
    grid-template-columns: 1fr !important;
  }
}
</style>

<div class="init-header">
  <h1 style="color: #00ff00; font-size: 2.5em; margin: 0;">
    ┌─[bhargav@init.d]─[~]<br>
    └──$ systemctl status --all
  </h1>
  <p style="color: #666; margin-top: 20px;">System initialization complete. All services operational.</p>
</div>

<div class="system-grid">
  <div class="service-card">
    <h3 style="color: #00ff00; font-family: 'Courier New', monospace; margin-top: 0;">
      <span class="status-indicator status-ok"></span>ai-research.service
    </h3>
    <div style="color: #ccc; font-family: 'Courier New', monospace; font-size: 12px; margin-bottom: 15px;">
      ● Active: <span style="color: #00ff00;">running</span> (GPUs go brrrr)<br>
      ● Process: Training models while dreaming of AGI<br>
      ● Memory: 99 problems but RAM ain't one<br>
      ● Uptime: ∞ (we don't do downtime here)
    </div>
    <p style="color: #999; font-size: 14px;">
      🤖 LLMs, transformers, and the occasional cat-dog confusion
    </p>
  </div>

  <div class="service-card">
    <h3 style="color: #00ff00; font-family: 'Courier New', monospace; margin-top: 0;">
      <span class="status-indicator status-info"></span>tech-gadgets.service
    </h3>
    <div style="color: #ccc; font-family: 'Courier New', monospace; font-size: 12px; margin-bottom: 15px;">
      ● Active: <span style="color: #0088ff;">monitoring</span> (gadget radar ON)<br>
      ● Process: Unboxing therapy in progress<br>
      ● I/O: Credit card → gadgets → happiness<br>
      ● Warning: Wallet.balance critically low
    </div>
    <p style="color: #999; font-size: 14px;">
      📱 If it beeps, blinks, or needs charging...
    </p>
  </div>

  <div class="service-card">
    <h3 style="color: #00ff00; font-family: 'Courier New', monospace; margin-top: 0;">
      <span class="status-indicator status-warning"></span>professional-growth.service
    </h3>
    <div style="color: #ccc; font-family: 'Courier New', monospace; font-size: 12px; margin-bottom: 15px;">
      ● Active: <span style="color: #ffaa00;">optimizing</span> (git push career)<br>
      ● Process: Learning > Earning (sometimes)<br>
      ● Network: LinkedIn connections++<br>
      ● Status: Imposter syndrome patched ✓
    </div>
    <p style="color: #999; font-size: 14px;">
      📈 Career growth, skill trees, and debugging life.exe
    </p>
  </div>

  <div class="service-card">
    <h3 style="color: #00ff00; font-family: 'Courier New', monospace; margin-top: 0;">
      <span class="status-indicator status-critical"></span>science-life.service
    </h3>
    <div style="color: #ccc; font-family: 'Courier New', monospace; font-size: 12px; margin-bottom: 15px;">
      ● Active: <span style="color: #ff4444;">experimental</span> (caffeine-powered)<br>
      ● Process: Optimizing human.exe daily<br>
      ● Data: 10K steps, 8hrs sleep (aspirational)<br>
      ● Error: Work-life balance not found
    </div>
    <p style="color: #999; font-size: 14px;">
      🧬 Where biology meets biography, and curiosity meets chaos
    </p>
  </div>
</div>

<style>
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

.retro-button {
  display: inline-block;
  font-family: 'VT323', 'Courier New', monospace;
  font-size: 3.5em;
  font-weight: bold;
  color: #00ff00;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 3px;
  padding: 20px 40px;
  background: #1a1a1a;
  border: 4px solid #00ff00;
  border-radius: 10px;
  box-shadow:
    0 0 10px #00ff00,
    0 0 20px #00ff00,
    0 0 30px #00ff00,
    inset 0 0 10px rgba(0, 255, 0, 0.2);
  text-shadow:
    0 0 5px #00ff00,
    0 0 10px #00ff00,
    0 0 15px #00ff00,
    2px 2px 4px rgba(0, 0, 0, 0.8);
  transition: all 0.3s ease;
  animation: glow-pulse 2s infinite;
  position: relative;
}

.retro-button:hover {
  transform: scale(1.05);
  background: rgba(0, 255, 0, 0.1);
  box-shadow:
    0 0 20px #00ff00,
    0 0 30px #00ff00,
    0 0 40px #00ff00,
    0 0 50px #00ff00,
    inset 0 0 20px rgba(0, 255, 0, 0.3);
}

.retro-button:active {
  transform: scale(0.98);
}

@keyframes glow-pulse {
  0%, 100% {
    box-shadow:
      0 0 10px #00ff00,
      0 0 20px #00ff00,
      0 0 30px #00ff00,
      inset 0 0 10px rgba(0, 255, 0, 0.2);
  }
  50% {
    box-shadow:
      0 0 15px #00ff00,
      0 0 25px #00ff00,
      0 0 35px #00ff00,
      0 0 45px #00ff00,
      inset 0 0 15px rgba(0, 255, 0, 0.3);
  }
}

.retro-arrow {
  display: inline-block;
  animation: arrow-bounce 1s infinite;
}

@keyframes arrow-bounce {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(10px); }
}
</style>

<div style="text-align: center; margin-top: 60px; margin-bottom: 40px;">
  <a href="https://dkbachary.github.io" target="_blank" class="retro-button" id="launch-button">
    <span class="retro-arrow">►►►</span> Launch Main Hub <span class="retro-arrow">◄◄◄</span>
  </a>
  <p style="font-family: 'VT323', monospace; color: #666; font-size: 1.5em; margin-top: 20px;">
    // Press <kbd style="background: #333; padding: 2px 8px; border-radius: 4px; color: #00ff00; border: 1px solid #555;">ENTER</kbd> to continue...
  </p>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const launchButton = document.getElementById('launch-button');
      if (launchButton) {
        // Visual feedback: flash the button
        launchButton.style.transform = 'scale(0.95)';
        setTimeout(function() {
          launchButton.style.transform = 'scale(1.05)';
          setTimeout(function() {
            window.open(launchButton.href, '_blank');
          }, 100);
        }, 100);
      }
    }
  });
});
</script>