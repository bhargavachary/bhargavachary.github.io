---
layout: page
title: "Categories"
subtitle: "Posts organized by category"
permalink: /categories/
hero_image: /images/hero/computer-science.jpg
hero_darken: true
---

<div class="content">
    {% assign sorted_categories = site.categories | sort %}
    {% for category in sorted_categories %}
        <h2 id="{{ category[0] | slugify }}" class="title is-4">
            <span class="tag is-primary is-medium">{{ category[1] | size }}</span>
            {{ category[0] }}
        </h2>

        <div class="columns is-multiline">
            {% for post in category[1] %}
                <div class="column is-12-mobile is-6-tablet is-4-desktop">
                    {% include post-card.html %}
                </div>
            {% endfor %}
        </div>

        <hr class="my-5">
    {% endfor %}
</div>
