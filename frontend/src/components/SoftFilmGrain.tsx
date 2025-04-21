import { useEffect } from "react";

const SoftFilmGrain = () => {
  return (
    <div className="film-grain-overlay">
      <style jsx global>{`
        .film-grain-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 9999;
          opacity: 0.12; /* Adjust for subtlety */
          mix-blend-mode: overlay;
        }

        .film-grain-overlay::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          animation: noise 0.5s steps(2) infinite;
        }

        @keyframes noise {
          0% {
            transform: translate(0, 0);
          }
          10% {
            transform: translate(-1%, -1%);
          }
          20% {
            transform: translate(-2%, 1%);
          }
          30% {
            transform: translate(1%, -2%);
          }
          40% {
            transform: translate(-1%, 2%);
          }
          50% {
            transform: translate(2%, 1%);
          }
          60% {
            transform: translate(1%, -1%);
          }
          70% {
            transform: translate(2%, -2%);
          }
          80% {
            transform: translate(-2%, -1%);
          }
          90% {
            transform: translate(1%, 2%);
          }
          100% {
            transform: translate(0, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default SoftFilmGrain;
