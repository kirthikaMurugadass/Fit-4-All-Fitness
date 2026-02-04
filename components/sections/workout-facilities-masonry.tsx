"use client"

import Masonry from "@/components/Masonry"

// Items for Workout Facility Masonry grid
// Reuse existing high-quality workout images with varied heights
// for a clean, premium masonry layout
const items = [
  {
    id: "1",
    img: "/images/workout-left-1.jpg",
    url: "#",
    height: 400,
  },
  {
    id: "2",
    img: "/images/workout-right-1.jpg",
    url: "#",
    height: 300,
  },
  {
    id: "3",
    img: "/images/workout-left-2.jpg",
    url: "#",
    height: 500,
  },
  {
    id: "4",
    img: "/images/workout-right-2.jpg",
    url: "#",
    height: 380,
  },
  {
    id: "5",
    img: "/images/workout-right3.jpg",
    url: "#",
    height: 420,
  },
  {
    id: "6",
    img: "/images/workout-right-4.jpg",
    url: "#",
    height: 360,
  },
  {
    id: "7",
    img: "/images/membership-bg.jpg",
    url: "#",
    height: 320,
  },
  {
    id: "8",
    img: "/images/facilities-1.jpg",
    url: "#",
    height: 450,
  },
  {
    id: "9",
    img: "/images/facilities-2.jpg",
    url: "#",
    height: 380,
  },
    {
        id: "10",
        img: "/images/testimonial-gym-2.jpg",
        url: "#",
        height: 430,
    },
    {
        id: "11",
        img: "/images/testimonial-gym-3.jpg",
        url: "#",
        height: 250,
    },
    {
        id: "12",
        img: "/images/workout-right-6.jpg",
        url: "#",
        height: 200,
    },
    // {
    //     id: "13",
    //     img: "/images/workout-right-5.jpg",
    //     url: "#",
    //     height: 430,
    // },
    // {
    //     id: "14",
    //     img: "/images/program-group.jpg",
    //     url: "#",
    //     height: 430,
    // },
    // {
    //     id: "15",
    //     img: "/images/program-personal.jpg",
    //     url: "#",
    //     height: 430,
    // },
]

export function WorkoutFacilitiesMasonry() {
  return (
    <Masonry
      items={items}
      ease="power3.out"
      duration={0.6}
      stagger={0.05}
      animateFrom="bottom"
      scaleOnHover
      hoverScale={0.95}
      blurToFocus
      colorShiftOnHover={false}
    />
  )
}

