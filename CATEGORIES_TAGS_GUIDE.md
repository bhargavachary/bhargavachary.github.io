# Blog Categories & Tags Style Guide

Last Updated: October 3, 2025

## Overview

This guide ensures consistent categorization and tagging across all blog posts for better discoverability, SEO, and user experience.

---

## The 8 Core Categories

Every blog post MUST have at least one category. Posts MAY have a secondary category if they genuinely span two themes.

### 1. **Technology**
**Use when:** The primary focus is on tech products, innovations, technical analysis, or digital tools.

**Examples:**
- AI/ML systems and innovations
- Hardware reviews (processors, laptops, phones)
- Software and platforms
- Cloud computing, cybersecurity
- Tech company analysis

**Sample Posts:** Apple Intelligence, Intel Lunar Lake, OpenAI o1, Microsoft Outage

---

### 2. **Personal Growth**
**Use when:** The post focuses on introspection, life lessons, self-improvement, or personal transformation.

**Examples:**
- Personal reflections and life stories
- Emotional development
- Dealing with loss or change
- Motivation and inspiration
- Personal decision-making journeys

**Sample Posts:** Tribute to Father, The One and Only, Digital Detox, Deserving Recap

---

### 3. **Culture & Society**
**Use when:** The post examines cultural practices, social issues, heritage, or community dynamics.

**Examples:**
- Cultural traditions and festivals
- Social issues (discrimination, inclusion)
- Language and diversity
- Cultural heritage documentation
- Community and identity

**Sample Posts:** Odisha Sanskruti, Bengaluru Discrimination, Neurodiversity, Language Policy

---

### 4. **Travel & Exploration**
**Use when:** The primary narrative is about travel experiences, journeys, or geographical exploration.

**Examples:**
- Travel memoirs and journeys
- Adventure stories
- Geographic explorations
- Cultural immersion through travel
- Travel photography narratives

**Sample Posts:** Eastern Ghats, Traveler in Me, Berhampur to Vizianagaram

---

### 5. **Education & Academia**
**Use when:** The focus is on learning, teaching, academic experiences, or educational philosophy.

**Examples:**
- University/college experiences
- Research and academic projects
- Study tips and guidance
- Educational philosophy
- Homeschooling and alternative education

**Sample Posts:** IIT First Semester, PhD Journey, Homeschooling, CASS Conference

---

### 6. **Sustainability & Environment**
**Use when:** Environmental impact, conservation, or sustainable living is the primary theme.

**Examples:**
- Climate change and conservation
- Sustainable transportation
- Environmental advocacy
- Green technology
- Eco-friendly lifestyle choices

**Sample Posts:** EVs vs Hybrids, E-Cycles, Mother Earth, Billions in Change

---

### 7. **Professional Development**
**Use when:** The focus is on career growth, workplace dynamics, or professional skills.

**Examples:**
- Career progression and insights
- Workplace relationships
- Professional skills development
- Work-life balance
- Industry trends affecting careers

**Sample Posts:** Professional Journeys, Human Element in Professional Life

---

### 8. **Current Affairs & Opinion**
**Use when:** The post responds to recent events or provides strong opinions on contemporary issues.

**Examples:**
- Political and economic analysis
- Social crises and responses
- Policy critique and recommendations
- Geopolitical commentary
- Op-ed style pieces

**Sample Posts:** Trump Tariffs, Atul Subhash Case

---

## Secondary Categories

A post MAY have a secondary category if it genuinely spans two themes with significant depth in both areas.

### When to Use Secondary Categories:
- The post devotes substantial content (30%+) to a second theme
- The secondary theme provides critical context or analysis
- Removing the secondary category would misrepresent the post's scope

### When NOT to Use Secondary Categories:
- Brief mentions or tangential references
- When the second theme is merely a vehicle for the primary theme
- When you're unsure (default to primary only)

### Examples:
✅ **Good Use:**
- "Apple Intelligence" (Technology) + (Personal Growth) - Tech review with deep personal reflection
- "Odisha Culture" (Culture & Society) + (Travel & Exploration) - Cultural education with travel insights

❌ **Poor Use:**
- Adding "Technology" just because a post mentions smartphones
- Adding "Culture & Society" because the post references a place

---

## Tag Strategy

### Core Principles:
1. **Limit:** 5-8 tags per post (maximum)
2. **Reuse:** Always check existing tags before creating new ones
3. **Specificity:** Be specific but not hyper-specific
4. **Consistency:** Use the same tag format across posts
5. **Searchability:** Think about what readers would search for

---

## Master Tag List

Choose tags from these categories. Add new tags sparingly and only when necessary.

### Technology Tags (15)
- AI
- Apple
- Intel
- Qualcomm
- Microsoft
- Google
- Cloud Computing
- Semiconductors
- Hardware
- Software
- Open Source
- Linux
- Machine Learning
- Cybersecurity
- Computing

### Place Tags (8)
- Odisha
- Bengaluru
- India
- Hyderabad
- Kolkata
- USA
- China
- Global

### Topic Tags (20)
- Education
- Homeschooling
- Parenting
- Travel
- Culture
- Language
- Diversity
- Sustainability
- Electric Vehicles
- Climate
- Energy
- Mental Health
- Neurodiversity
- Career
- Professional Growth
- Family
- Motivation
- Social Issues
- Legal System
- Politics

### Activity Tags (8)
- Biking
- Photography
- Writing
- Teaching
- Research
- Coding
- Adventure
- Exploration

### Product/Platform Tags (Use Sparingly)
- iOS
- macOS
- WWDC
- Processors
- Laptops
- Automobiles

---

## Tag Guidelines

### ✅ DO:
- Use "AI" instead of "ArtificialIntelligence" or "AIFeatures"
- Use "Bengaluru" consistently (not "Bangalore")
- Use "Electric Vehicles" or "EV" for brevity
- Keep tags readable and searchable
- Think about SEO and discoverability

### ❌ DON'T:
- Create version-specific tags: ~~"iOS18"~~, ~~"macOS15"~~
- Use product codes: ~~"Core Ultra 200V"~~, ~~"M3 Pro"~~
- Create hyper-local tags: ~~"Golanthara"~~, ~~"Kalyanpur"~~
- Use event-specific tags: ~~"WWDC2024"~~, ~~"CASS2018"~~
- Concatenate words: ~~"AppleIntelligence"~~, ~~"PickupTrucks"~~ (use "Apple", "Pickup Trucks" separately)
- Use more than 8 tags per post

---

## Front Matter Template

```yaml
---
layout: post
title: "Your Post Title"
date: YYYY-MM-DD HH:MM:SS +0530
author: Your Name
image: assets/images/post-image.jpg
excerpt: "Brief 1-2 sentence description of the post"

categories:
  - Primary Category
  - Secondary Category  # Optional - only if truly multidisciplinary

tags:
  - Tag 1
  - Tag 2
  - Tag 3
  - Tag 4
  - Tag 5
  # Maximum 8 tags total
---
```

---

## Decision Tree for Categorization

```
START: What is the PRIMARY focus of your post?

├─ Is it about tech products/analysis?
│  └─ YES → Technology
│
├─ Is it about personal reflection/growth?
│  └─ YES → Personal Growth
│
├─ Is it about culture/heritage/social issues?
│  └─ YES → Culture & Society
│
├─ Is it a travel narrative/journey?
│  └─ YES → Travel & Exploration
│
├─ Is it about learning/teaching/academia?
│  └─ YES → Education & Academia
│
├─ Is it about environment/sustainability?
│  └─ YES → Sustainability & Environment
│
├─ Is it about career/workplace?
│  └─ YES → Professional Development
│
└─ Is it responding to current events with opinions?
   └─ YES → Current Affairs & Opinion

SECONDARY CATEGORY:
- Ask: Does the post devote 30%+ content to a second theme?
  - YES → Add secondary category
  - NO → Keep primary only
```

---

## Tag Selection Checklist

Before finalizing tags for a post:

- [ ] Have I limited tags to 5-8?
- [ ] Have I checked the Master Tag List first?
- [ ] Are my tags specific but not hyper-specific?
- [ ] Would readers search for these tags?
- [ ] Have I avoided product versions and event years?
- [ ] Are my tags consistent with existing post tags?
- [ ] Do my tags complement (not duplicate) my categories?

---

## Real Examples from the Blog

### Example 1: Technology Post
**Post:** "Apple Intelligence: The Seamless AI in Apple's Ecosystem"

**Categories:**
- Technology

**Tags:**
- Apple
- AI
- Technology
- Innovation
- WWDC
- iOS
- Ecosystem

**Why:** Pure tech analysis with no significant secondary theme. Tags cover the company, technology, and platform without version numbers.

---

### Example 2: Multidisciplinary Post
**Post:** "Rethinking Education: A Journey into Homeschooling"

**Categories:**
- Education & Academia
- Personal Growth

**Tags:**
- Education
- Homeschooling
- Parenting
- Learning
- Alternative Education
- Child Development

**Why:** Primarily about education philosophy, but deeply personal journey. Secondary category justified by substantial personal reflection.

---

### Example 3: Culture + Environment
**Post:** "Happy Diwali!"

**Categories:**
- Culture & Society
- Sustainability & Environment

**Tags:**
- Culture
- Festival
- Tradition
- Diwali
- India
- Sustainability
- Personal Reflection

**Why:** Cultural education about Diwali with significant environmental advocacy (eco-friendly celebrations).

---

## Common Mistakes to Avoid

### 1. Too Many Categories
❌ **Wrong:** Categories: Technology, Innovation, Apple, AI, Computing
✅ **Right:** Categories: Technology

**Why:** Many of those are tags, not categories. Keep categories broad.

---

### 2. Tag Overload
❌ **Wrong:** 17 tags including "iOS18", "iPadOS18", "macOS15", "AppleIntelligence", "WWDC2024"
✅ **Right:** 6 tags: Apple, AI, Technology, Innovation, WWDC, iOS

**Why:** Consolidated redundant tags, removed version numbers, stayed under 8.

---

### 3. Hyper-Specific Tags
❌ **Wrong:** Tags: Golanthara, Panchama, Kalyanpur, Ganjam District
✅ **Right:** Tags: Odisha, Eastern Ghats, Travel

**Why:** Hyper-local tags have no reusability. Broader regional tags work better.

---

### 4. Wrong Primary Category
❌ **Wrong:** "Pickup Trucks in India" → Primary: Automobiles
✅ **Right:** "Pickup Trucks in India" → Primary: Culture & Society

**Why:** The post is about lifestyle choices and cultural attitudes toward vehicles, not a technical auto review.

---

## Maintenance

### Quarterly Review
Every 3 months, review:
- Tag usage frequency (remove tags used only 1-2 times)
- Category distribution (ensure balance)
- New tag requests (evaluate before adding)

### Annual Audit
Every year:
- Consolidate similar tags
- Update this guide with new examples
- Analyze reader search patterns
- Adjust tag strategy based on analytics

---

## Quick Reference Card

```
CATEGORIES (8): Technology | Personal Growth | Culture & Society |
Travel & Exploration | Education & Academia | Sustainability & Environment |
Professional Development | Current Affairs & Opinion

TAGS: 5-8 per post maximum
- Choose from Master Tag List
- Be specific but reusable
- Think: What would readers search for?
- Avoid: versions, product codes, hyper-local places, event years

FORMAT:
categories:
  - Primary Category
  - Secondary Category (optional)

tags:
  - Tag 1
  - Tag 2
  - Tag 3
```

---

## Questions?

When in doubt:
1. Check similar existing posts for reference
2. Ask: "What is the PRIMARY theme?"
3. Choose the category that represents 50%+ of the content
4. Limit tags to what's truly essential
5. Consult this guide's examples

---

**Remember:** Categories are for broad organization. Tags are for specific discovery. Together, they help readers find content and understand your blog's ecosystem.
