export const letterErrorKeyframes = (reverse: boolean): Keyframe[] => [
  {
    transform: "translateX(0)",
    borderColor: "rgb(var(--color-letter-border))",
  },
  {
    transform: `translateX(${reverse ? -2 : 2}px)`,
  },
  {
    transform: `translateX(${reverse ? 2 : -2}px)`,
    borderColor: "rgb(var(--color-letter-error))",
  },
  {
    transform: `translateX(${reverse ? -2 : 2}px)`,
    borderColor: "rgb(var(--color-letter-error))",
  },
  {
    transform: "translateX(0)",
    borderColor: "rgb(var(--color-letter-border))",
  },
];
