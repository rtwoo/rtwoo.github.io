---
layout: page
permalink: /presentations/
title: Presentations
description: Research talks, posters, and project presentations.
nav: true
nav_order: 3
redirect_from:
  - /talks/
---

{% assign talks = site.talks | sort: "date" | reverse %}
{% assign research_talks = talks | where: "category", "research" %}
{% assign innovation_talks = talks | where: "category", "innovation" %}

{% if research_talks.size > 0 %}
## Research Talks & Posters

<div class="presentation-list">
  {% for talk in research_talks %}
    <article class="presentation-item">
      <div class="presentation-item__year">{{ talk.date | date: "%Y" }}</div>
      <div class="presentation-item__body">
        <a class="presentation-item__title" href="{{ talk.url | relative_url }}">{{ talk.title }}</a>
        <div class="presentation-item__meta">
          {{ talk.presentation_type }}{% if talk.venue %}, {{ talk.venue }}{% endif %}{% if talk.location %}, {{ talk.location }}{% endif %}
        </div>
      </div>
    </article>
  {% endfor %}
</div>
{% endif %}

{% if innovation_talks.size > 0 %}
## Other Talks and Presentations

<div class="presentation-list">
  {% for talk in innovation_talks %}
    <article class="presentation-item">
      <div class="presentation-item__year">{{ talk.date | date: "%Y" }}</div>
      <div class="presentation-item__body">
        <a class="presentation-item__title" href="{{ talk.url | relative_url }}">{{ talk.title }}</a>
        <div class="presentation-item__meta">
          {{ talk.presentation_type }}{% if talk.venue %}, {{ talk.venue }}{% endif %}{% if talk.location %}, {{ talk.location }}{% endif %}
        </div>
      </div>
    </article>
  {% endfor %}
</div>
{% endif %}
