const buttonVariants = cva(
  `
    inline-flex items-center justify-center gap-2
    whitespace-nowrap rounded-md
    text-sm font-medium
    transition-all duration-200
    border
    focus-visible:outline-none
    disabled:pointer-events-none
    disabled:opacity-50
    h-10 px-4 py-2
  `,
  {
    variants: {
      state: {
        default: `
          bg-[#2b2b2b]
          border-[#3a3a3a]
          text-white
          hover:bg-red-600
          hover:border-red-500
        `,

        positive: `
          bg-red-600
          border-red-500
          text-white
          hover:bg-red-500
        `,

        negative: `
          bg-black
          border-[#555]
          text-white
          hover:bg-[#1a1a1a]
        `,
      },

      size: {
        default: "",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10 p-0",
      },
    },

    defaultVariants: {
      state: "default",
      size: "default",
    },
  }
);
