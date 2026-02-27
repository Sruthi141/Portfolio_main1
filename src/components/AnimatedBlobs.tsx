import { motion } from "framer-motion";

export function AnimatedBlobs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      <motion.div
        animate={{
          y: [0, -20, 10, 0],
          x: [0, 15, -10, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="blob"
        style={{
          width: 500,
          height: 500,
          top: "10%",
          left: "-5%",
          background: "hsl(173, 80%, 45%)",
          opacity: 0.06,
        }}
      />
      <motion.div
        animate={{
          y: [0, 25, -15, 0],
          x: [0, -20, 10, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="blob"
        style={{
          width: 400,
          height: 400,
          top: "50%",
          right: "-10%",
          background: "hsl(262, 80%, 55%)",
          opacity: 0.05,
        }}
      />
      <motion.div
        animate={{
          y: [0, -10, 20, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="blob"
        style={{
          width: 300,
          height: 300,
          bottom: "10%",
          left: "30%",
          background: "hsl(200, 90%, 50%)",
          opacity: 0.04,
        }}
      />
    </div>
  );
}
