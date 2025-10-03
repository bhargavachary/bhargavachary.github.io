---
layout: page
permalink: /about/
title: "About"
subtitle: "Just another not so ordinary, time travelling, computer engineer."
hero_image: /images/hero/about-village.jpg
hero_darken: true
---

<div class="columns">
    <div class="column is-one-quarter">
        {% include author-profile.html %}
    </div>
    <div class="column">
        <div class="content">
            <p>Hello there! I'm D K Bhargav Achary, but you can call me "Bhargav." Hailing from Berhampur, a bustling business hub in the southern part of Odisha, I proudly wear my identity as a Telugu by birth, an Odia by heart, and an Indian by spirit.<br>
            This unique blend gives my life an incredibly dynamic flavor!</p>

            <p>By day, I'm a passionate systems engineer, driven by the belief that change starts with us.<br>
            I thrive on initiating the changes we all talk about but often shy away from due to fear, lethargy, or a casual attitude. I'm all about transforming ideas into reality and pushing boundaries.</p>

            <p>But my life isn't all about tech and systems. I'm blessed with a beautiful wife who is incredibly smart, full of aspirations, and brimming with energy. Together, we navigate the adventures of life with our vibrant 3-year-old, who, as of June 2024, fills our home with endless energy and joy. My parents have been the cornerstone of my journey. My mother, a passionate homemaker, and my father, a retired teacher recovering from a stroke during the COVID times, have instilled in me the values of hard work and resilience.<br>
            My father's courage and strength inspire me daily; he always tells me, "Don't worry, be happy," reminding me to stay positive no matter what.</p>

            <p>Beyond the realm of technology, I find joy in the adrenaline of cricket, the finesse of badminton, the freedom of bicycling, and the rhythm of music. Gaming, traveling, and exploring new horizons keep my spirit alive and kicking.</p>

            <p>Stay connected with me on <a href="https://instagram.com/bhargav_achary/" target="_blank">Instagram</a>, <a href="https://twitter.com/bhargav_achary/" target="_blank">X (formerly Twitter)</a>, and don't forget to give my <a href="https://facebook.com/BhargavAchary.github.io" target="_blank">Facebook page</a> a like for all the latest updates.<br>
            This personal website is my canvas to share my thoughts, suggestions, and experiences with a wider audience. I'm here to engage, learn, and grow with you.</p>

            <p>Feel free to share your opinions, feedback, and comments through <a href="https://disqus.com/home/forums/bhargavacharyin/" target="_blank">disqus</a>.<br>
            Let's make this journey of learning and interaction a memorable one!</p>

            <hr>

            <p class="has-text-centered" style="margin-top: 2rem;">
                <strong>Looking for my professional portfolio?</strong><br>
                <span style="opacity: 0.9;">More details about my work and projects at</span>
                <a href="/init.d/" style="font-weight: 600; color: #00d1b2;">init.d</a> ✨
            </p>

            <div style="text-align: center; margin-top: 3rem; margin-bottom: 2rem;">
                <a href="https://dkbachary.github.io" target="_blank" class="retro-launch-button" id="launch-button-about">
                    <span class="retro-arrow">►►►</span> Launch Main Hub <span class="retro-arrow">◄◄◄</span>
                </a>
                <p style="font-family: 'Courier New', monospace; color: #666; font-size: 1.2em; margin-top: 15px;">
                    // Press <kbd style="background: #333; padding: 2px 8px; border-radius: 4px; color: #00d1b2; border: 1px solid #555;">ENTER</kbd> to continue...
                </p>
            </div>
        </div>
    </div>
</div>

<style>
/* Responsive: stack sidebar below content on mobile */
@media screen and (max-width: 768px) {
    .columns {
        flex-direction: column-reverse;
    }

    .author-profile {
        position: static !important;
        margin-top: 2rem;
    }
}

/* Retro Launch Button */
.retro-launch-button {
    display: inline-block;
    font-family: 'Courier New', monospace;
    font-size: 1.5em;
    font-weight: bold;
    color: #00d1b2;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 2px;
    padding: 15px 35px;
    background: transparent;
    border: 3px solid #00d1b2;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 209, 178, 0.3);
    transition: all 0.3s ease;
}

.retro-launch-button:hover {
    transform: scale(1.05);
    background: rgba(0, 209, 178, 0.1);
    box-shadow: 0 0 20px rgba(0, 209, 178, 0.5);
}

.retro-launch-button .retro-arrow {
    display: inline-block;
}

@keyframes arrow-bounce {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(5px); }
}

.retro-launch-button:hover .retro-arrow {
    animation: arrow-bounce 1s infinite;
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const launchButton = document.getElementById('launch-button-about');
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

