// All hero settings and copy live here, so you never touch the animation code.

export const SEQUENCE = {
  count: 240,
  path: (n) => `${import.meta.env.BASE_URL}frames/ezgif-frame-${String(n).padStart(3, "0")}.jpg`,
  focusX: 0.42,
  focusY: 0.5,
  smoothing: 0.1,
  startAt: 0.25,
};

export const BRAND = "Rough Diamonds";

// export const NAV = [
//   { label: "Rough", href: "#rough" },
//   { label: "Polished", href: "#polished" },
//   { label: "Jewellery", href: "#jewellery" },
//   { label: "Contact", href: "#contact" },
// ];

// // in / out are scroll positions between 0 and 1. Retime them to match your video.
// export const BEATS = [
//   {
//     id: "hero",
//     in: 0, out: 0.12, fade: 0.05,
//     title: ["Rough diamonds,", { em: "sourced from the deep." }],
//     body: "Supplier and manufacturer of natural rough diamonds, from the first sort to the final polish.",
//     actions: [{ label: "Request rough inventory", href: "#contact", solid: true }],
//     hero: true,
//   },
//   {
//     id: "origin",
//     side: "right",
//     in: 0.17, out: 0.36,
//     title: ["Formed over billions of years."],
//     body: "Every rough stone is different in colour, crystal shape and inclusion. We read each one carefully before a single cut is planned.",
//   },
//   {
//     id: "plan",
//     in: 0.41, out: 0.6,
//     title: ["The stone decides", "the plan."],
//     body: "Our sorters and planners study every rough for its best yield, then manufacture it to the specification you need.",
//   },
//   {
//     id: "roof",
//     side: "right",
//     in: 0.65, out: 0.84,
//     title: ["From rough to polished, under one roof."],
//     body: "Sorting, planning, cutting and polishing, with a clear record of where each stone has been.",
//   },
//   {
//     id: "begin",
//     side: "center",
//     in: 0.89, out: 1.01, fade: 0.04,
//     title: ["Begin with the stone."],
//     body: "Browse available rough, or speak with our team about a parcel made to your needs.",
//     actions: [
//       { label: "View rough diamonds", href: "#rough", solid: true },
//       { label: "Contact us", href: "#contact" },
//     ],
//   },
// ];
