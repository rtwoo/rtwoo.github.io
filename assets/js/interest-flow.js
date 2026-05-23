(function () {
  "use strict";

  if (!window.d3) {
    return;
  }

  var d3 = window.d3;
  var sourceNodes = [
    {
      id: "cs",
      title: "Computer Science",
      detail: "HCI, AI/ML, data",
      color: "#0077a3",
    },
    {
      id: "education",
      title: "Education",
      detail: "learning sciences and design",
      color: "#4f7f2a",
    },
    {
      id: "cog",
      title: "Cognitive Science",
      detail: "psychology, behavior, affect",
      color: "#9a6a1f",
    },
  ];
  var coreNode = {
    id: "edtech",
    title: "Educational Technology",
    titleLines: ["Educational Technology"],
    detail: "e-learning, technology-enhanced learning (TEL), computer-based/managed/aided instruction/training (CBI/CBT/CAI)",
    detailLines: [
      "e-learning; technology-enhanced learning (TEL)",
      "computer-based, managed, and aided",
      "instruction/training (CBI, CBT, CAI)",
    ],
    color: "#8c1d40",
  };
  var outcomeNodes = [
    {
      id: "adaptive",
      title: "Adaptive Learning",
      detail: "personalized support",
      color: "#b08300",
    },
    {
      id: "analytics",
      title: "Learning Analytics",
      detail: "evidence and insight",
      color: "#007c89",
    },
    {
      id: "immersive",
      title: "Immersive Training",
      detail: "situated practice",
      color: "#7a6752",
    },
  ];

  function splitTitle(title) {
    if (title.length < 18) {
      return [title];
    }

    if (title.indexOf(" ") === -1) {
      return [title];
    }

    var parts = title.split(" ");
    var midpoint = Math.ceil(parts.length / 2);

    return [parts.slice(0, midpoint).join(" "), parts.slice(midpoint).join(" ")];
  }

  function nodePath(source, target, bend, vertical) {
    if (vertical) {
      var verticalX1 = source.x;
      var verticalY1 = source.y + source.height / 2;
      var verticalX2 = target.x;
      var verticalY2 = target.y - target.height / 2;
      var verticalDy = Math.max(20, (verticalY2 - verticalY1) * 0.55);

      return (
        "M" +
        verticalX1 +
        "," +
        verticalY1 +
        "C" +
        (verticalX1 + bend) +
        "," +
        (verticalY1 + verticalDy) +
        " " +
        (verticalX2 + bend) +
        "," +
        (verticalY2 - verticalDy) +
        " " +
        verticalX2 +
        "," +
        verticalY2
      );
    }

    var x1 = source.x + source.width / 2;
    var y1 = source.y;
    var x2 = target.x - target.width / 2;
    var y2 = target.y + bend;
    var dx = Math.max(44, (x2 - x1) * 0.55);

    return "M" + x1 + "," + y1 + "C" + (x1 + dx) + "," + y1 + " " + (x2 - dx) + "," + y2 + " " + x2 + "," + y2;
  }

  function renderNode(group, node) {
    group.style("--interest-node-color", node.color);

    group
      .append("rect")
      .attr("class", "interest-flow__node interest-flow__node--" + node.kind)
      .attr("x", node.x - node.width / 2)
      .attr("y", node.y - node.height / 2)
      .attr("width", node.width)
      .attr("height", node.height)
      .attr("rx", 0);

    group
      .append("rect")
      .attr("class", "interest-flow__node-rule")
      .attr("x", node.x - node.width / 2)
      .attr("y", node.y - node.height / 2)
      .attr("width", node.width)
      .attr("height", 3);

    var titleLines = node.titleLines || splitTitle(node.title);
    var detailLines = node.detailLines || (node.detail ? [node.detail] : []);
    var titleLineHeight = node.kind === "core" ? 17.5 : 16.5;
    var detailLineHeight = node.kind === "core" ? 13.5 : 14;
    var titleBaselineOffset = node.kind === "core" ? 13 : 12.25;
    var detailGap = detailLines.length ? (node.kind === "core" ? 10 : 8.5) : 0;
    var textBlockHeight = titleLines.length * titleLineHeight + detailGap + detailLines.length * detailLineHeight;
    var titleStartY = node.y - textBlockHeight / 2 + titleBaselineOffset;

    titleLines.forEach(function (line, index) {
      group
        .append("text")
        .attr("class", "interest-flow__label" + (node.kind === "core" ? " interest-flow__label--core" : ""))
        .attr("x", node.x)
        .attr("y", titleStartY + index * titleLineHeight)
        .text(line);
    });

    detailLines.forEach(function (line, index) {
      group
        .append("text")
        .attr("class", "interest-flow__sub-label" + (node.kind === "core" ? " interest-flow__sub-label--core" : ""))
        .attr("x", node.x)
        .attr("y", titleStartY + titleLines.length * titleLineHeight + detailGap + index * detailLineHeight)
        .text(line);
    });
  }

  function nodeLabel(node) {
    var detailLines = node.detailLines || (node.detail ? [node.detail] : []);

    return [node.title].concat(detailLines).join(". ");
  }

  function setActiveNode(svg, activeId) {
    svg.classed("interest-flow--has-active", true);
    svg.selectAll(".interest-flow__node-group").classed("is-active", function (node) {
      return node.id === activeId;
    });
    svg.selectAll(".interest-flow__node-group").classed("is-muted", function (node) {
      var connected = node.id === activeId || node.id === "edtech" || activeId === "edtech";

      return !connected;
    });
    svg.selectAll(".interest-flow__link-element").classed("is-active", function (link) {
      return link.source.id === activeId || link.target.id === activeId;
    });
    svg.selectAll(".interest-flow__link-element").classed("is-muted", function (link) {
      return link.source.id !== activeId && link.target.id !== activeId;
    });
  }

  function setActiveLink(svg, activeLink) {
    svg.classed("interest-flow--has-active", true);
    svg.selectAll(".interest-flow__node-group").classed("is-active", function (node) {
      return node.id === activeLink.source.id || node.id === activeLink.target.id;
    });
    svg.selectAll(".interest-flow__node-group").classed("is-muted", function (node) {
      return node.id !== activeLink.source.id && node.id !== activeLink.target.id;
    });
    svg.selectAll(".interest-flow__link-element").classed("is-active", function (link) {
      return link.source.id === activeLink.source.id && link.target.id === activeLink.target.id;
    });
    svg.selectAll(".interest-flow__link-element").classed("is-muted", function (link) {
      return link.source.id !== activeLink.source.id || link.target.id !== activeLink.target.id;
    });
  }

  function clearActiveNode(svg) {
    svg.classed("interest-flow--has-active", false);
    svg.selectAll(".interest-flow__node-group, .interest-flow__link-element").classed("is-active", false).classed("is-muted", false);
  }

  function layout(width) {
    var compact = width < 640;
    var height = compact ? 750 : 350;
    var margin = compact ? { top: 22, right: 18, bottom: 22, left: 18 } : { top: 24, right: 24, bottom: 18, left: 24 };

    if (compact) {
      return {
        width: width,
        height: height,
        margin: margin,
        sources: sourceNodes.map(function (node, index) {
          return Object.assign({}, node, {
            kind: "source",
            x: width * 0.5,
            y: 76 + index * 84,
            width: Math.min(270, width - 48),
            height: 58,
          });
        }),
        core: Object.assign({}, coreNode, {
          kind: "core",
          x: width * 0.5,
          y: 390,
          width: Math.min(320, width - 38),
          height: 126,
        }),
        outcomes: outcomeNodes.map(function (node, index) {
          return Object.assign({}, node, {
            kind: "outcome",
            x: width * 0.5,
            y: 540 + index * 78,
            width: Math.min(260, width - 58),
            height: 58,
          });
        }),
        compact: compact,
      };
    }

    return {
      width: width,
      height: height,
      margin: margin,
      sources: sourceNodes.map(function (node, index) {
        return Object.assign({}, node, {
          kind: "source",
          x: width * 0.17,
          y: 92 + index * 86,
          width: 188,
          height: 62,
        });
      }),
      core: Object.assign({}, coreNode, {
        kind: "core",
        x: width * 0.52,
        y: 190,
        width: 314,
        height: 126,
      }),
      outcomes: outcomeNodes.map(function (node, index) {
        return Object.assign({}, node, {
          kind: "outcome",
          x: width * 0.84,
          y: 92 + index * 98,
          width: 184,
          height: 58,
        });
      }),
      compact: compact,
    };
  }

  function renderScaffold(svg, frame) {
    var scaffold = svg.append("g").attr("class", "interest-flow__scaffold").attr("aria-hidden", "true");

    scaffold
      .append("rect")
      .attr("class", "interest-flow__background")
      .attr("x", 0.5)
      .attr("y", 0.5)
      .attr("width", frame.width - 1)
      .attr("height", frame.height - 1);

    var labels;
    var separators;

    if (frame.compact) {
      labels = [
        { x: frame.width * 0.5, y: 28, text: "DOMAINS" },
        { x: frame.width * 0.5, y: 318, text: "SPECIALIZATION" },
        { x: frame.width * 0.5, y: 488, text: "APPLICATIONS" },
      ];
      separators = [
        { x1: 28, y1: 304, x2: frame.width - 28, y2: 304 },
        { x1: 28, y1: 474, x2: frame.width - 28, y2: 474 },
      ];
    } else {
      labels = [
        { x: frame.width * 0.17, y: 34, text: "DOMAINS" },
        { x: frame.width * 0.52, y: 112, text: "SPECIALIZATION" },
        { x: frame.width * 0.84, y: 34, text: "APPLICATIONS" },
      ];
      separators = [
        { x1: frame.width * 0.34, y1: 50, x2: frame.width * 0.34, y2: frame.height - 24 },
        { x1: frame.width * 0.68, y1: 50, x2: frame.width * 0.68, y2: frame.height - 24 },
      ];
    }

    scaffold
      .selectAll(".interest-flow__separator")
      .data(separators)
      .enter()
      .append("line")
      .attr("class", "interest-flow__separator")
      .attr("x1", function (separator) {
        return separator.x1;
      })
      .attr("y1", function (separator) {
        return separator.y1;
      })
      .attr("x2", function (separator) {
        return separator.x2;
      })
      .attr("y2", function (separator) {
        return separator.y2;
      });

    scaffold
      .selectAll(".interest-flow__axis-label")
      .data(labels)
      .enter()
      .append("text")
      .attr("class", "interest-flow__axis-label")
      .attr("x", function (label) {
        return label.x;
      })
      .attr("y", function (label) {
        return label.y;
      })
      .text(function (label) {
        return label.text;
      });
  }

  function render(container, force) {
    var element = container.node();
    var width = Math.max(320, Math.round(element.getBoundingClientRect().width || element.clientWidth || 640));

    if (!force && element.__interestFlowWidth === width) {
      return;
    }

    element.__interestFlowWidth = width;

    var frame = layout(width);
    var svg = container.selectAll("svg").data([frame]);
    var svgEnter = svg.enter().append("svg").attr("class", "interest-flow__svg");

    svg = svgEnter.merge(svg);
    svg.attr("viewBox", "0 0 " + frame.width + " " + frame.height).attr("height", frame.height);
    svg.selectAll("*").remove();

    renderScaffold(svg, frame);

    var linkGroup = svg.append("g").attr("class", "interest-flow__links");
    var sourceLinks = frame.sources.map(function (source, index) {
      return {
        source: source,
        target: frame.core,
        bend: frame.compact ? -48 + index * 48 : -20 + index * 20,
        color: source.color,
        width: frame.compact ? 9 : 12,
        vertical: frame.compact,
      };
    });
    var outcomeLinks = frame.outcomes.map(function (target, index) {
      return {
        source: frame.core,
        target: target,
        bend: frame.compact ? 36 - index * 36 : -20 + index * 20,
        color: target.color,
        width: frame.compact ? 7 : 10,
        vertical: frame.compact,
      };
    });
    var links = sourceLinks.concat(outcomeLinks);

    linkGroup
      .selectAll(".interest-flow__rail")
      .data(links)
      .enter()
      .append("path")
      .attr("class", "interest-flow__rail interest-flow__link-element")
      .attr("d", function (link) {
        return nodePath(link.source, link.target, link.bend, link.vertical);
      })
      .attr("stroke-width", function (link) {
        return link.width + 6;
      })
      .attr("opacity", 0.45);

    linkGroup
      .selectAll(".interest-flow__link")
      .data(links)
      .enter()
      .append("path")
      .attr("class", "interest-flow__link interest-flow__link-element")
      .attr("d", function (link) {
        return nodePath(link.source, link.target, link.bend, link.vertical);
      })
      .attr("stroke", function (link) {
        return link.color;
      })
      .attr("stroke-width", function (link) {
        return link.width;
      })
      .attr("opacity", 0.35);

    linkGroup
      .selectAll(".interest-flow__pulse")
      .data(links)
      .enter()
      .append("path")
      .attr("class", "interest-flow__pulse interest-flow__link-element")
      .attr("d", function (link) {
        return nodePath(link.source, link.target, link.bend, link.vertical);
      })
      .attr("stroke", function (link) {
        return link.color;
      })
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "1 18")
      .attr("stroke-dashoffset", function (_, index) {
        return index * -4;
      })
      .append("animate")
      .attr("attributeName", "stroke-dashoffset")
      .attr("from", "0")
      .attr("to", "-38")
      .attr("dur", "4.8s")
      .attr("repeatCount", "indefinite");

    linkGroup
      .selectAll(".interest-flow__hit-link")
      .data(links)
      .enter()
      .append("path")
      .attr("class", "interest-flow__hit-link")
      .attr("d", function (link) {
        return nodePath(link.source, link.target, link.bend, link.vertical);
      })
      .attr("stroke-width", function (link) {
        return link.width + 18;
      })
      .attr("tabindex", 0)
      .attr("role", "img")
      .attr("aria-label", function (link) {
        return link.source.title + " to " + link.target.title;
      })
      .on("mouseenter focus", function (_, link) {
        setActiveLink(svg, link);
      })
      .on("mouseleave blur", function () {
        clearActiveNode(svg);
      });

    var nodes = frame.sources.concat([frame.core], frame.outcomes);
    var nodeGroups = svg
      .append("g")
      .attr("class", "interest-flow__nodes")
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g");

    nodeGroups
      .attr("class", function (node) {
        return "interest-flow__node-group interest-flow__node-group--" + node.kind;
      })
      .attr("tabindex", 0)
      .attr("role", "img")
      .attr("aria-label", nodeLabel)
      .on("mouseenter focus", function (_, node) {
        setActiveNode(svg, node.id);
      })
      .on("mouseleave blur", function () {
        clearActiveNode(svg);
      });

    nodeGroups.each(function (node) {
      renderNode(d3.select(this), node);
    });
  }

  function mount() {
    d3.selectAll(".interest-flow").each(function () {
      var container = d3.select(this);

      render(container, true);

      if (window.ResizeObserver) {
        var observer = new ResizeObserver(function () {
          render(container);
        });
        observer.observe(this);
      } else {
        window.addEventListener("resize", function () {
          render(container);
        });
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
