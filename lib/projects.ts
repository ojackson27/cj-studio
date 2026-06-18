export interface Project {
  name: string;
  type: string;
  img: string;
  color: string;
  enter: { x?: number; y?: number; opacity: number };
  slug: string;
  description: string;
  url?: string;
  quote?: {
    text: string;
    author: string;
  };
  details: string[];
}

export const projects: Project[] = [
  {
    name: "Range Shipping",
    type: "Maritime Logistics",
    // TODO: replace with a real screenshot of range-shipping-site.vercel.app
    img: "https://images.unsplash.com/photo-1598139384902-5a8217874645?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800",
    color: "from-slate-200/80 to-blue-100/80",
    enter: { x: -40, opacity: 0 },
    slug: "range-shipping",
    description:
      "Range Shipping needed a digital presence that matched the institutional weight of 47 years in dry bulk operations. We built a fast, authoritative site that speaks directly to commodity traders and fleet owners — clean enough for a boardroom, specific enough to earn trust.",
    url: "https://range-shipping-site.vercel.app",
    details: [
      "Cinematic scroll hero with 120-frame canvas sequence — scroll-driven, no autoplay",
      "Institutional credibility architecture: industry memberships, fleet specs, and operational history front-loaded",
      "Full mobile optimisation with sub-second load performance on Vercel's edge network",
      "Precision dark design language built for a 47-year-old independent operator",
    ],
  },
  {
    name: "Uncle Sam's",
    type: "Restaurant",
    // TODO: replace with a real screenshot of uncle-sams.vercel.app
    img: "https://images.unsplash.com/photo-1653259038915-7cf0b7a4dd6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800",
    color: "from-red-100/80 to-amber-100/80",
    enter: { x: 40, opacity: 0 },
    slug: "uncle-sams",
    description:
      "Cardiff's best-loved burger bar since 1981 needed a site that did justice to four decades of reputation. We built a bold, food-first site with online ordering, a loyalty signup, and photography-led storytelling that turns first-timers into regulars.",
    url: "https://uncle-sams.vercel.app",
    details: [
      "Food-first layout — every section anchored by photography of the restaurant and dishes",
      "Online ordering with Uber Eats and Just Eat deep-links built into the menu flow",
      "Sam's Club loyalty signup with Resend-powered welcome email",
      "Mobile-first build optimised for hungry users searching on the go",
    ],
  },
];
