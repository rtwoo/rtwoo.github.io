(function () {
  "use strict";

  if (!window.d3 || !document.body) {
    return;
  }

  var d3 = window.d3;
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var layer = d3
    .select(document.body)
    .insert("svg", ":first-child")
    .attr("class", "node-link-background")
    .attr("aria-hidden", "true")
    .attr("focusable", "false")
    .attr("preserveAspectRatio", "none");

  var polygonLayer = layer.append("g").attr("class", "node-link-background__polygons");
  var linkLayer = layer.append("g").attr("class", "node-link-background__links");
  var nodeLayer = layer.append("g").attr("class", "node-link-background__nodes");
  var colorState = {
    themeColor: "",
    linkColor: d3.interpolateHsl("#d8c3cc", "#8c1d40"),
    nodeColor: d3.interpolateHsl("#747474", "#8c1d40"),
  };

  var state = {
    width: 0,
    height: 0,
    nodes: [],
    timer: null,
    lastElapsed: null,
    resizeTimer: null,
  };

  function targetNodeCount() {
    var area = window.innerWidth * window.innerHeight;

    if (window.innerWidth < 576) {
      return 18;
    }

    return Math.max(26, Math.min(48, Math.round(area / 23000)));
  }

  function linkDistance() {
    if (window.innerWidth < 576) {
      return 108;
    }

    return Math.max(125, Math.min(172, window.innerWidth * 0.105));
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function refreshColors() {
    var themeColor = window.getComputedStyle(document.documentElement).getPropertyValue("--global-theme-color").trim() || "#8c1d40";

    if (themeColor === colorState.themeColor) {
      return;
    }

    var base = d3.hsl(themeColor);

    if (Number.isNaN(base.h)) {
      base = d3.hsl("#8c1d40");
    }

    var weak = d3.hsl(base.h, clamp(base.s * 0.18, 0.08, 0.18), clamp(base.l + 0.24, 0.45, 0.72));
    var strong = d3.hsl(base.h, clamp(base.s * 1.22, 0.72, 1), clamp(base.l - 0.03, 0.28, 0.62));
    var neutral = d3.hsl(base.h, 0.03, 0.47);

    colorState.themeColor = themeColor;
    colorState.linkColor = d3.interpolateHsl(weak, strong);
    colorState.nodeColor = d3.interpolateHsl(neutral, strong);
  }

  function linkStrokeColor(link) {
    return colorState.linkColor(clamp(Math.pow(link.strength, 0.72), 0, 1));
  }

  function nodeFillColor(node) {
    return colorState.nodeColor(clamp(Math.pow(node.connectionStrength || 0, 0.65), 0, 1));
  }

  function createNode(id) {
    var speed = window.innerWidth < 576 ? 0.28 : 0.36;
    var angle = Math.random() * Math.PI * 2;
    var nodeSpeed = speed * (0.55 + Math.random() * 0.65);

    return {
      id: id,
      x: Math.random() * state.width,
      y: Math.random() * state.height,
      vx: Math.cos(angle) * nodeSpeed,
      vy: Math.sin(angle) * nodeSpeed,
      radius: 2.3 + Math.random() * 2.2,
      phase: Math.random() * Math.PI * 2,
      connectionStrength: 0,
    };
  }

  function reconcileNodes() {
    var count = targetNodeCount();
    var current = state.nodes.length;

    if (current < count) {
      for (var id = current; id < count; id += 1) {
        state.nodes.push(createNode(id));
      }
    } else if (current > count) {
      state.nodes = state.nodes.slice(0, count);
    }
  }

  function resize() {
    state.width = Math.max(1, window.innerWidth);
    state.height = Math.max(1, window.innerHeight);

    layer.attr("viewBox", "0 0 " + state.width + " " + state.height).attr("width", state.width).attr("height", state.height);
    reconcileNodes();

    state.nodes.forEach(function (node) {
      node.x = Math.max(0, Math.min(state.width, node.x));
      node.y = Math.max(0, Math.min(state.height, node.y));
    });

    render();
  }

  function onResize() {
    window.clearTimeout(state.resizeTimer);
    state.resizeTimer = window.setTimeout(resize, 150);
  }

  function updateNodes(delta, elapsed) {
    var padding = 16;

    state.nodes.forEach(function (node) {
      var drift = elapsed * 0.00035 + node.phase;
      node.vx += Math.cos(drift) * 0.006 * delta;
      node.vy += Math.sin(drift * 1.27) * 0.006 * delta;

      var speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
      var maxSpeed = window.innerWidth < 576 ? 0.46 : 0.58;

      if (speed > maxSpeed) {
        node.vx = (node.vx / speed) * maxSpeed;
        node.vy = (node.vy / speed) * maxSpeed;
      }

      node.x += node.vx * delta;
      node.y += node.vy * delta;

      if (node.x < -padding) {
        node.x = -padding;
        node.vx = Math.abs(node.vx);
      } else if (node.x > state.width + padding) {
        node.x = state.width + padding;
        node.vx = -Math.abs(node.vx);
      }

      if (node.y < -padding) {
        node.y = -padding;
        node.vy = Math.abs(node.vy);
      } else if (node.y > state.height + padding) {
        node.y = state.height + padding;
        node.vy = -Math.abs(node.vy);
      }
    });
  }

  function computeNetwork() {
    var nodes = state.nodes;
    var distance = linkDistance();
    var distanceSquared = distance * distance;
    var links = [];
    var adjacency = nodes.map(function () {
      return new Set();
    });

    nodes.forEach(function (node) {
      node.connectionStrength = 0;
    });

    for (var i = 0; i < nodes.length; i += 1) {
      for (var j = i + 1; j < nodes.length; j += 1) {
        var dx = nodes[i].x - nodes[j].x;
        var dy = nodes[i].y - nodes[j].y;
        var distSquared = dx * dx + dy * dy;

        if (distSquared < distanceSquared) {
          var dist = Math.sqrt(distSquared);
          var strength = 1 - dist / distance;

          links.push({
            id: i + "-" + j,
            source: nodes[i],
            target: nodes[j],
            strength: strength,
          });

          adjacency[i].add(j);
          adjacency[j].add(i);
          nodes[i].connectionStrength = Math.max(nodes[i].connectionStrength, strength);
          nodes[j].connectionStrength = Math.max(nodes[j].connectionStrength, strength);
        }
      }
    }

    return {
      links: links,
      adjacency: adjacency,
    };
  }

  function polygonArea(points) {
    var area = 0;

    for (var i = 0; i < points.length; i += 1) {
      var current = points[i];
      var next = points[(i + 1) % points.length];
      area += current.x * next.y - next.x * current.y;
    }

    return Math.abs(area / 2);
  }

  function polygonStrength(points) {
    var distance = linkDistance();
    var strength = 0;

    for (var i = 0; i < points.length; i += 1) {
      var current = points[i];
      var next = points[(i + 1) % points.length];
      var dx = current.x - next.x;
      var dy = current.y - next.y;
      var edgeDistance = Math.sqrt(dx * dx + dy * dy);

      strength += clamp(1 - edgeDistance / distance, 0, 1);
    }

    return strength / points.length;
  }

  function addPolygon(cycles, seen, ids) {
    var key = ids
      .slice()
      .sort(function (a, b) {
        return a - b;
      })
      .join("-");

    if (seen.has(key)) {
      return;
    }

    seen.add(key);

    var points = ids.map(function (id) {
      return state.nodes[id];
    });
    var center = points.reduce(
      function (acc, point) {
        acc.x += point.x;
        acc.y += point.y;
        return acc;
      },
      { x: 0, y: 0 }
    );

    center.x /= points.length;
    center.y /= points.length;

    points = points.slice().sort(function (a, b) {
      return Math.atan2(a.y - center.y, a.x - center.x) - Math.atan2(b.y - center.y, b.x - center.x);
    });

    var area = polygonArea(points);

    if (area < 550 || area > 34000) {
      return;
    }

    var strength = polygonStrength(points);

    cycles.push({
      key: key,
      points: points,
      center: center,
      area: area,
      opacity: Math.min(0.16, 0.048 + area / 390000 + strength * 0.085),
    });
  }

  function compactPolygons(cycles) {
    var selected = [];

    cycles
      .sort(function (left, right) {
        return right.area - left.area;
      })
      .forEach(function (polygon) {
        var overlapsExisting = selected.some(function (existing) {
          var dx = polygon.center.x - existing.center.x;
          var dy = polygon.center.y - existing.center.y;
          var centerDistance = Math.sqrt(dx * dx + dy * dy);
          var areaDifference = Math.abs(polygon.area - existing.area);

          return centerDistance < 54 && areaDifference < 12000;
        });

        if (!overlapsExisting) {
          selected.push(polygon);
        }
      });

    return selected.slice(0, 18);
  }

  function findClosedPolygons(adjacency) {
    var cycles = [];
    var seen = new Set();

    for (var i = 0; i < adjacency.length; i += 1) {
      adjacency[i].forEach(function (j) {
        if (j <= i) {
          return;
        }

        adjacency[j].forEach(function (k) {
          if (k <= j || !adjacency[i].has(k)) {
            return;
          }

          addPolygon(cycles, seen, [i, j, k]);
        });
      });
    }

    for (var a = 0; a < adjacency.length; a += 1) {
      adjacency[a].forEach(function (b) {
        if (b <= a) {
          return;
        }

        adjacency[b].forEach(function (c) {
          if (c <= a || c === b) {
            return;
          }

          adjacency[c].forEach(function (d) {
            if (d <= a || d === b || d === c || !adjacency[d].has(a)) {
              return;
            }

            addPolygon(cycles, seen, [a, b, c, d]);
          });
        });
      });
    }

    return compactPolygons(cycles);
  }

  function polygonPath(points) {
    return (
      "M" +
      points
        .map(function (point) {
          return point.x.toFixed(1) + "," + point.y.toFixed(1);
        })
        .join("L") +
      "Z"
    );
  }

  function render() {
    refreshColors();

    var network = computeNetwork();
    var polygons = findClosedPolygons(network.adjacency);

    polygonLayer
      .selectAll("path")
      .data(polygons, function (polygon) {
        return polygon.key;
      })
      .join(
        function (enter) {
          return enter.append("path").attr("class", "node-link-background__polygon").attr("opacity", 0);
        },
        function (update) {
          return update;
        },
        function (exit) {
          return exit.remove();
        }
      )
      .attr("d", function (polygon) {
        return polygonPath(polygon.points);
      })
      .attr("opacity", function (polygon) {
        return polygon.opacity;
      });

    linkLayer
      .selectAll("line")
      .data(network.links, function (link) {
        return link.id;
      })
      .join(
        function (enter) {
          return enter.append("line").attr("class", "node-link-background__link").attr("opacity", 0);
        },
        function (update) {
          return update;
        },
        function (exit) {
          return exit.remove();
        }
      )
      .attr("x1", function (link) {
        return link.source.x;
      })
      .attr("y1", function (link) {
        return link.source.y;
      })
      .attr("x2", function (link) {
        return link.target.x;
      })
      .attr("y2", function (link) {
        return link.target.y;
      })
      .attr("stroke-width", function (link) {
        return 0.7 + link.strength * 1.05;
      })
      .style("stroke", linkStrokeColor)
      .attr("opacity", function (link) {
        return 0.08 + link.strength * 0.2;
      });

    nodeLayer
      .selectAll("circle")
      .data(state.nodes, function (node) {
        return node.id;
      })
      .join(
        function (enter) {
          return enter.append("circle").attr("class", "node-link-background__node").attr("opacity", 0.24);
        },
        function (update) {
          return update;
        },
        function (exit) {
          return exit.remove();
        }
      )
      .attr("cx", function (node) {
        return node.x;
      })
      .attr("cy", function (node) {
        return node.y;
      })
      .attr("r", function (node) {
        return node.radius;
      })
      .style("fill", nodeFillColor)
      .attr("opacity", 0.24);
  }

  function frame(elapsed) {
    if (state.lastElapsed === null) {
      state.lastElapsed = elapsed;
    }

    var delta = Math.min(2.4, Math.max(0.35, (elapsed - state.lastElapsed) / 16.67));
    state.lastElapsed = elapsed;

    updateNodes(delta, elapsed);
    render();
  }

  function stopAnimation() {
    if (state.timer) {
      state.timer.stop();
      state.timer = null;
      state.lastElapsed = null;
    }
  }

  function startAnimation() {
    stopAnimation();

    if (document.hidden || prefersReducedMotion.matches) {
      render();
      return;
    }

    state.timer = d3.timer(frame);
  }

  function onVisibilityChange() {
    if (document.hidden) {
      stopAnimation();
    } else {
      startAnimation();
    }
  }

  resize();
  startAnimation();

  window.addEventListener("resize", onResize, { passive: true });
  document.addEventListener("visibilitychange", onVisibilityChange);

  if (typeof prefersReducedMotion.addEventListener === "function") {
    prefersReducedMotion.addEventListener("change", startAnimation);
  } else if (typeof prefersReducedMotion.addListener === "function") {
    prefersReducedMotion.addListener(startAnimation);
  }
})();
