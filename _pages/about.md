---
layout: about
title: About
permalink: /
subtitle: Research Associate and PhD Student in Computer Science

profile:
  align: right
  image: rtwoo-headshot.png
  image_circular: true
  orbit:
    enabled: true
    frames_path: assets/img/profile-orbit/facelift-yaw
    frame_count: 32
    frame_prefix: frame_
    frame_suffix: _landmarks_pose.png
    frame_pad: 3
    yaw_left_frame: 16
    yaw_center_frame: 24
    yaw_right_frame: 32
    asset_version: original-match-20260522-2304
  more_info: >
    <div class="office-location" aria-label="Tempe, Arizona addresses">
      <div class="office-location__details">
        <div class="office-location__label">
          <span class="office-location__tag office-location__tag--icon" aria-hidden="true">
            <i class="fa-solid fa-building-columns office-location__icon"></i>
          </span>
          <div class="office-location__label-text">
            <strong>Arizona State University (ASU)</strong>
            <span>Tempe, AZ 85281</span>
          </div>
        </div>
        <div class="office-location__list">
          <a class="office-location__item" href="https://www.google.com/maps/search/?api=1&query=Brickyard%20Engineering%20699%20S%20Mill%20Ave%20Tempe%20AZ%2085281" target="_blank" rel="external nofollow noopener" aria-label="Open SVL address in Google Maps">
            <span class="office-location__tag">SVL</span>
            <div>
              <strong>Brickyard Engineering<br/>(BYENG) 351AC</strong>
              <span>699 S Mill Ave</span>
            </div>
          </a>
          <a class="office-location__item" href="https://www.google.com/maps/search/?api=1&query=Helmick%20Center%20660%20S%20College%20Ave%20Tempe%20AZ%2085281" target="_blank" rel="external nofollow noopener" aria-label="Open CWT address in Google Maps">
            <span class="office-location__tag">CWT</span>
            <div>
              <strong>Helmick Center (HLMK) 541A</strong>
              <span>660 S College Ave</span>
            </div>
          </a>
        </div>
      </div>
    </div>

selected_papers: true
selected_papers_position: inline
social: false
interest_flow: true

announcements:
  enabled: false
  scrollable: false
  limit:

latest_posts:
  enabled: false
  scrollable: false
  limit:
---

<div class="content-section-card content-section-card--bio" markdown="1">

I work at the intersection of educational technology, human-computer interaction, and applied machine learning. I build and study how adaptive learning, personalized tutoring systems, interactive learning envioronments, collaboration tools, information visualization, immersive training, and other forms of technology-enhanced learning can help diverse learners and educators succeed across formal education and workforce training contexts.

Currently, I split my time between the [Sonoran Visualization Lab (SVL)](https://chrisbryan.github.io/) led by Dr. Chris Bryan in the School of Computing and Augmented Intelligence and the [Construction Workforce and Technology (CWT) Lab](https://www.cwt-lab.com/) led by Dr. Ricardo Eiris in the School of Sustainable Engineering and the Built Environment at ASU.

If you're interested in collaborating, please feel free to reach out: [rtwoo@asu.edu](mailto:rtwoo@asu.edu)

</div>

<div class="about-contact-strip" aria-label="Contact and account links">
  <div class="contact-icons">
    <a href="https://scholar.google.com/citations?user=lK7zmLYAAAAJ" title="Google Scholar" rel="external nofollow noopener" target="_blank"><i class="ai ai-google-scholar"></i></a>
    <a href="https://github.com/rtwoo" title="GitHub" rel="external nofollow noopener" target="_blank"><i class="fa-brands fa-github"></i></a>
    <a href="https://www.linkedin.com/in/rtwoo" title="LinkedIn" rel="external nofollow noopener" target="_blank"><i class="fa-brands fa-linkedin"></i></a>
    <a href="https://search.asu.edu/profile/3798829" title="ASU Profile" rel="external nofollow noopener" target="_blank"><i class="fa-solid fa-building-columns"></i></a>
  </div>
</div>

<figure class="interest-flow-figure" aria-labelledby="interest-flow-caption">
  <div class="interest-flow" role="img" aria-label="A flow diagram showing computer science, education, and cognitive science and psychology converging into human-computer interaction and educational technology."></div>
  <figcaption id="interest-flow-caption">
    <span class="interest-flow-caption__label">Figure 1.</span> The research interests of Ryan T. Woo.
  </figcaption>
</figure>

{% if page.selected_papers %}
<h2>
  <a href="{{ '/publications/' | relative_url }}" style="color: inherit">Selected Publications</a>
</h2>
{% include selected_papers.liquid %}
{% endif %}

<section class="awards-recognition" aria-labelledby="awards-recognition-heading">
  <h2 id="awards-recognition-heading">Awards & Recognition</h2>
  <ol class="awards-recognition__list">
    <li>
      <time>2025</time>
      <span><strong>Outstanding Undergraduate Student Poster</strong> <span>OpenMRT, Central Arizona-Phoenix Long-Term Ecological Research ASM Poster Symposium</span></span>
    </li>
    <li>
      <time>2024</time>
      <span><strong>Certificate of Excellence: Outstanding Innovation</strong> <span>Undergraduate Teaching Assistant Program, Ira A. Fulton Schools of Engineering, ASU</span></span>
    </li>
    <li>
      <time>2024</time>
      <span><strong>Generator Award: Outstanding Team Leader</strong> <span>Engineering Projects in Community Service, ASU</span></span>
    </li>
    <li>
      <time>2024</time>
      <span><strong>SUN Award for leadership and innovation</strong> <span>School of Computing and Augmented Intelligence, ASU</span></span>
    </li>
    <li>
      <time>2023</time>
      <span><strong>Most Creative Use of GitHub</strong> <span>sunhacks, ASU</span></span>
    </li>
    <li>
      <time>2023</time>
      <span><strong>Devils Invent, 2nd Place</strong> <span>Attendance Management System, ASU</span></span>
    </li>
  </ol>
</section>

<h2>What I'm up to now</h2>

<div class="content-section-card content-section-card--prose" markdown="1">

## Research Highlights

- Investigating gaps in knowledge, skills, and dispositions of students studying computing disciplines through the [Hidden Curricula-Addressing Unseen Challenges within Computer Science Education](https://www.nsf.gov/awardsearch/showAward?AWD_ID=2434430&HistoricalAwards=false) project.
- Modeling learning processes in immersive training environments through the NSF-funded [iVisit: Situated Learning Experiences through Web-based Virtual Field Trips](https://www.nsf.gov/awardsearch/showAward?AWD_ID=2336507&HistoricalAwards=false) project.
- Designing retrieval-augmented question generation pipelines (RASQAL) and AI teaching assistants (SAGE) that support faculty at scale with Teaching Professor [Dr. Yinong Chen](https://search.asu.edu/profile/328180).
- During my undergrad, co-developed OpenMRT with [Pouya Shaeri](https://pouyashaeri.github.io/), an NSF CAREER project advancing human thermal exposure modeling with street-level imagery under [Dr. Ariane Middel and the SHaDE Lab](https://shadelab.asu.edu/).

</div>

<div class="content-section-card content-section-card--prose" markdown="1">

## Teaching & Outreach

I've supported courses ranging from introductory programming (CSE 110) to upper-division distributed software development (CSE 445), and supervise/mentor student design teams through the [Engineering Projects in Community Service (EPICS)](https://epics.engineering.asu.edu/) program and year-long [CS Capstone](https://sites.google.com/asu.edu/cidse-capstone/home) course.

As an organizer with the [Software Developers Association (./SoDA) at ASU](https://thesoda.io/), I have led planning of local hackathons, workshops, and coding contests and contribute to STEM outreach initiatives like the SCAI [Robotics Camp](https://venus.sod.asu.edu/roboticscamp/) and [Desert CodeSprouts](https://scai.engineering.asu.edu/desert-codesprouts-workshop/).

I am also a student member of ACM SIGCSE, IEEE CS, IEEE EdSoc, and ACL SIGEDU.

</div>
