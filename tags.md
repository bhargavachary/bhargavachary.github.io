---
layout: page
title: "Tags"
subtitle: "Posts organized by tags"
permalink: /tags/
hero_image: /images/hero/tech-workspace.jpg
hero_darken: true
---

<div class="content">
    {% assign sorted_tags = site.tags | sort %}
    {% for tag in sorted_tags %}
        <h2 id="{{ tag[0] | slugify }}" class="title is-4">
            <span class="tag is-info is-medium">{{ tag[1] | size }}</span>
            {{ tag[0] }}
        </h2>

        <div class="columns is-multiline">
            {% for post in tag[1] %}
                <div class="column is-12-mobile is-6-tablet is-4-desktop">
                    {% include post-card.html %}
                </div>
            {% endfor %}
        </div>

        <hr class="my-5">
    {% endfor %}
</div>
