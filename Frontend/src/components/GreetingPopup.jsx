import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import eveAnimation from "../assets/greeting.json";

export default function GreetingPopup() {

  const location = useLocation();
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {

    setShow(true);

    // fade in
    setTimeout(() => setVisible(true), 100);

    // start fade out
    setTimeout(() => setVisible(false), 3800);

    // remove component
    const timer = setTimeout(() => {
      setShow(false);
    }, 4500);

    return () => clearTimeout(timer);

  }, [location.pathname]);

  if (!show) return null;

  return (
    <div
      className={`
        fixed bottom-6 right-6 z-50
        flex flex-col items-center
        transition-opacity duration-700
        ${visible ? "opacity-100" : "opacity-0"}
      `}
    >

      {/* Text bubble */}
      <div className="
        px-4 py-2 mb-2
        rounded-xl shadow-md
        text-sm sm:text-base font-semibold
        bg-white dark:bg-gray-800
        text-gray-800 dark:text-cyan-300
      ">
        Hello Analyst!
      </div>

      {/* Animation */}
      <div className="w-32 sm:w-40 md:w-44">
        <Lottie
          animationData={eveAnimation}
          loop={true}
        />
      </div>

    </div>
  );
}