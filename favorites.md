---
title: "Favorites"
layout: page
permalink: /favorites/
subtitle: "Here is an invitation to dive into my all-time favorite posts—each one a journey worth taking. Explore and discover; you won't be disappointed!"
hero_image: /images/hero/india-culture.jpg
hero_darken: true
favorite_posts:
  - /2016/03/01/the-social-network-outage.html
  - /2015/10/04/odisha-the-land-slighty-unknown.html
  - /2015/12/29/a-deserving-recap.html
  - /2015/10/21/the-open-source-movement.html
  - /2016/05/05/let-us-save-mother-earth.html
---

## Favorite Posts

<p class="subtitle">Here are some of my most cherished writings:</p>

<div class="columns is-multiline">
  {% for favorite_url in page.favorite_posts %}
    {% assign post = site.posts | where: "url", favorite_url | first %}
    {% if post %}
      <div class="column is-12-mobile is-6-tablet is-4-desktop">
        {% include post-card.html %}
      </div>
    {% endif %}
  {% endfor %}
</div>
