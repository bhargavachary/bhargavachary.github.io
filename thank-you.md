---
layout: page
permalink: /thank-you/
title: "Thank You!"
subtitle: "You're all set! 🎉"
hero_image: /images/hero/thank-you.jpg
hero_darken: true
---

<div class="content">
  <div style="text-align: center; padding: 3rem 0;">
    <div style="font-size: 4rem; margin-bottom: 1rem;">🎉</div>

    <h1 style="color: var(--text-primary); margin-bottom: 1rem;">Thank You for Subscribing!</h1>

    <p style="font-size: 1.2rem; color: var(--text-secondary); margin-bottom: 2rem;">
      You've successfully joined the newsletter. I'll send you updates about new content—at most one email per month.
    </p>

    <div style="background: var(--bg-secondary); padding: 2rem; border-radius: 8px; margin: 2rem 0; border: 1px solid var(--border-color);">
      <h3 style="color: var(--text-primary); margin-bottom: 1rem;">What happens next?</h3>
      <ul style="text-align: left; display: inline-block; color: var(--text-secondary);">
        <li style="margin-bottom: 0.5rem;">✅ You'll receive a confirmation email shortly</li>
        <li style="margin-bottom: 0.5rem;">📧 Updates only when new content is posted</li>
        <li style="margin-bottom: 0.5rem;">🚫 No spam, ever</li>
        <li style="margin-bottom: 0.5rem;">🔓 Unsubscribe anytime</li>
      </ul>
    </div>

    <div style="margin-top: 3rem;">
      <a href="{{ site.url }}/" class="button is-primary is-large" style="margin-right: 1rem;">
        <span class="icon"><i class="fas fa-home"></i></span>
        <span>Back to Home</span>
      </a>

      <a href="{{ site.url }}/about/" class="button is-light is-large">
        <span class="icon"><i class="fas fa-user"></i></span>
        <span>Learn More About Me</span>
      </a>
    </div>
  </div>
</div>

<style>
[data-theme="dark"] .button.is-light {
  background-color: var(--bg-secondary);
  border-color: var(--border-color);
  color: var(--text-primary);
}

[data-theme="dark"] .button.is-light:hover {
  background-color: var(--bg-tertiary);
}
</style>