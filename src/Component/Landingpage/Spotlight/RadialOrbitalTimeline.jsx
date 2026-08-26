import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Link as LinkIcon,
  Zap,
  Calendar,
  Code,
  FileText,
  User,
  Clock,
} from "lucide-react";

const RadialOrbitalTimeline = () => {
  const [expandedItems, setExpandedItems] = useState({});
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [pulseEffect, setPulseEffect] = useState({});
  const [activeNodeId, setActiveNodeId] = useState(null);

  const containerRef = useRef(null);

  const timelineData = [
    {
      id: 1,
      title: "Planning",
      date: "Jan 2024",
      content: "Project planning and requirements gathering phase.",
      icon: Calendar,
      relatedIds: [2],
      status: "completed",
      energy: 100,
    },
    {
      id: 2,
      title: "Design",
      date: "Feb 2024",
      content: "UI/UX design and system architecture.",
      icon: FileText,
      relatedIds: [1, 3],
      status: "completed",
      energy: 90,
    },
    {
      id: 3,
      title: "Development",
      date: "Mar 2024",
      content: "Core features implementation and testing.",
      icon: Code,
      relatedIds: [2, 4],
      status: "in-progress",
      energy: 60,
    },
    {
      id: 4,
      title: "Testing",
      date: "Apr 2024",
      content: "User testing and bug fixes.",
      icon: User,
      relatedIds: [3, 5],
      status: "pending",
      energy: 30,
    },
    {
      id: 5,
      title: "Release",
      date: "May 2024",
      content: "Final deployment and release.",
      icon: Clock,
      relatedIds: [4],
      status: "pending",
      energy: 10,
    },
  ];

  // Auto rotation
  useEffect(() => {
    let timer;
    if (autoRotate) {
      timer = setInterval(() => {
        setRotationAngle((prev) => (prev + 0.4) % 360);
      }, 50);
    }
    return () => clearInterval(timer);
  }, [autoRotate]);

  const toggleItem = (id) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) newState[key] = false;
      });
      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);
        const related =
          timelineData.find((item) => item.id === id)?.relatedIds || [];
        setPulseEffect(
          related.reduce((acc, rid) => ({ ...acc, [rid]: true }), {}),
        );
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }
      return newState;
    });
  };

  const calculatePosition = (index, total) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 220;
    const rad = (angle * Math.PI) / 180;
    const x = radius * Math.cos(rad);
    const y = radius * Math.sin(rad);
    return { x, y, angle };
  };

  const isRelatedToActive = (id) =>
    activeNodeId &&
    timelineData.find((i) => i.id === activeNodeId)?.relatedIds.includes(id);

  return (
    <div
      ref={containerRef}
      className="w-full min-h-[860px] sm:min-h-[960px] flex items-center justify-center overflow-visible relative py-10 sm:py-14"
      onClick={() => {
        setExpandedItems({});
        setActiveNodeId(null);
        setPulseEffect({});
        setAutoRotate(true);
      }}
    >
      <div className="relative w-[760px] h-[760px] sm:w-[800px] sm:h-[800px] flex items-center justify-center">
        {/* Central Core */}
        <div className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500 flex items-center justify-center z-20 shadow-2xl animate-pulse">
          <div className="w-8 h-8 bg-white/90 rounded-full" />
        </div>

        {/* Orbit Ring */}
        <div className="absolute w-[480px] h-[480px] rounded-full border border-white/10" />

        {timelineData.map((item, index) => {
          const pos = calculatePosition(index, timelineData.length);
          const isExpanded = expandedItems[item.id];
          const isRelated = isRelatedToActive(item.id);
          const isPulsing = pulseEffect[item.id];
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="absolute cursor-pointer transition-all duration-700"
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px)`,
                zIndex: isExpanded ? 50 : 10,
              }}
              onClick={(e) => {
                e.stopPropagation();
                toggleItem(item.id);
              }}
            >
              {/* Pulse Ring */}
              {isPulsing && (
                <div className="absolute -inset-6 rounded-full border border-white/30 animate-ping" />
              )}

              {/* Node */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300
                ${
                  isExpanded
                    ? "bg-white text-black scale-125 shadow-xl"
                    : isRelated
                      ? "bg-white/60 text-black border-white animate-pulse"
                      : "bg-[#2F2A26] text-gray-300 border-white/40 hover:border-white/70"
                }`}
              >
                <Icon size={18} />
              </div>

              {/* Label */}
              <div
                className={`absolute top-14 left-1/2 -translate-x-1/2 text-xs font-semibold tracking-widest text-center whitespace-nowrap transition-all
                ${isExpanded ? "text-gray-500 scale-110" : "text-gray-500"}`}
              >
                {item.title}
              </div>

              {/* Expanded Card */}
              {isExpanded && (
                <div className="absolute top-24 left-1/2 -translate-x-1/2 w-72 bg-zinc-950/95 backdrop-blur-xl border border-white/20 rounded-xl p-5 shadow-2xl z-50">
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className={`px-3 py-1 text-xs font-bold rounded-full border
                      ${
                        item.status === "completed"
                          ? "bg-white text-black"
                          : item.status === "in-progress"
                            ? "bg-white/90 text-black"
                            : "bg-zinc-800 text-white"
                      }`}
                    >
                      {item.status.toUpperCase()}
                    </div>
                    <span className="text-xs text-white/50 font-mono">
                      {item.date}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed mb-5">
                    {item.content}
                  </p>

                  {/* Energy */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="flex items-center gap-1 text-white/70">
                        <Zap size={14} /> Energy
                      </span>
                      <span className="font-mono text-white">
                        {item.energy}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
                        style={{ width: `${item.energy}%` }}
                      />
                    </div>
                  </div>

                  {/* Related Nodes */}
                  {item.relatedIds.length > 0 && (
                    <div>
                      <div className="flex items-center gap-1 text-xs uppercase tracking-widest text-white/60 mb-2">
                        <LinkIcon size={14} /> Connected
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {item.relatedIds.map((relId) => {
                          const rel = timelineData.find((i) => i.id === relId);
                          return (
                            <button
                              key={relId}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleItem(relId);
                              }}
                              className="flex items-center gap-1 text-xs px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg text-white/80 hover:text-white transition-all"
                            >
                              {rel?.title} <ArrowRight size={12} />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="absolute bottom-8 text-white/40 text-sm font-mono tracking-widest">
        Click nodes • Orbital Timeline
      </div>
    </div>
  );
};

export default RadialOrbitalTimeline;
