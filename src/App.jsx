import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, Star, Wind } from 'lucide-react';

// Screen 1: The Candle
const Screen1 = ({ onNext }) => {
  const [blowing, setBlowing] = useState(false);
  const [flameVisible, setFlameVisible] = useState(true);

  const handleBlow = () => {
    setBlowing(true);
    setTimeout(() => {
      setFlameVisible(false);
      setTimeout(() => {
        onNext();
      }, 1500); // wait for 1.5s after flame out to transition
    }, 1000); // 1s "blowing" effect
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5 } }}
      className="w-full h-full flex flex-col items-center justify-center p-6 text-center"
    >
      <div className="relative w-64 h-64 mb-10 mt-10">
        <img src="/cake.png" alt="Birthday Cake" className="w-full h-full object-cover rounded-xl shadow-[0_0_50px_rgba(255,215,0,0.1)]" />
        {flameVisible && (
          <motion.div 
            className="absolute top-[18%] left-[49%] -translate-x-1/2 w-4 h-12 bg-gradient-to-t from-yellow-300 via-orange-400 to-red-500 rounded-full blur-[2px] animate-flicker"
            style={{ boxShadow: '0 0 20px 5px rgba(255, 165, 0, 0.6)' }}
            exit={{ scale: 0, opacity: 0 }}
          />
        )}
      </div>
      
      <motion.p 
        className="font-serif text-xl text-cream/90 mb-12 leading-relaxed"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        "Có một món quà nhỏ dành cho cậu... Nhưng trước khi mở, thổi nến trước nhé"
      </motion.p>

      <motion.button 
        onClick={handleBlow}
        disabled={blowing}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`px-8 py-3 rounded-full font-medium transition-all ${
          blowing 
            ? 'bg-transparent border border-cream/30 text-cream/50 cursor-not-allowed' 
            : 'bg-gradient-to-r from-gold to-yellow-500 text-maroon-900 shadow-[0_0_20px_rgba(212,175,55,0.4)]'
        }`}
      >
        {blowing ? (
          <span className="flex items-center gap-2"><Wind className="w-5 h-5 animate-pulse" /> Đang thổi...</span>
        ) : (
          "Thổi nến 💨"
        )}
      </motion.button>
    </motion.div>
  );
};

// Screen 2: The Whisper
const Screen2 = ({ onNext }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 500);
    const t2 = setTimeout(() => setStep(2), 2500);
    const t3 = setTimeout(() => setStep(3), 4500);
    const t4 = setTimeout(() => setStep(4), 6500);
    const t5 = setTimeout(() => onNext(), 10000); // auto transition

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
  }, [onNext]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 2 } }}
      className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-black absolute inset-0 z-10"
    >
      <div className="space-y-6 font-serif text-xl leading-relaxed text-cream/90 max-w-[80%]">
        <AnimatePresence>
          {step >= 1 && (
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }}>
              Ngọn nến đã tắt...
            </motion.p>
          )}
          {step >= 2 && (
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }}>
              nhưng cậu không đi qua năm nay một mình đâu.
            </motion.p>
          )}
          {step >= 3 && (
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }}>
              Từ từ thôi nhé.
            </motion.p>
          )}
          {step >= 4 && (
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }} className="font-semibold text-gold mt-8 text-2xl">
              Cậu, Tớ ở đây mà.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Screen 3: The Wish
const Screen3 = ({ onNext }) => {
  const options = ["Hạnh phúc hơn", "Trúng Vietlott", "Khỏe mạnh hơn", "Bình yên hơn"];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50, transition: { duration: 0.8 } }}
      className="w-full h-full flex flex-col items-center justify-start pt-20 p-6"
    >
      <motion.div 
        initial={{ y: -20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ delay: 0.5 }}
        className="flex flex-col items-center mb-16"
      >
        <Sparkles className="text-gold w-8 h-8 mb-4 opacity-80" />
        <h1 className="font-serif text-3xl text-gold tracking-widest font-semibold uppercase">Một Điều Ước</h1>
        <div className="w-16 h-px bg-gold/50 mt-4"></div>
      </motion.div>

      <div className="w-full grid grid-cols-1 gap-4">
        {options.map((option, idx) => (
          <motion.button
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + idx * 0.2 }}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNext(option)}
            className="relative group overflow-hidden w-full bg-gradient-to-r from-maroon-800/40 to-transparent border border-maroon-800/60 rounded-xl p-5 text-left flex items-center justify-between shadow-lg backdrop-blur-sm"
          >
            <span className="font-serif text-lg text-cream/90 group-hover:text-gold transition-colors">{option}</span>
            <div className="w-2 h-2 rounded-full bg-gold/30 group-hover:bg-gold transition-colors"></div>
            
            {/* Hanging string visual */}
            <div className="absolute top-0 left-6 w-px h-full bg-gradient-to-b from-maroon-900 to-transparent opacity-20"></div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

// Screen 4: Memory Heart
const Screen4 = ({ onNext }) => {
  // A simple representation of a heart shape using a grid of squares.
  // 1 = photo placeholder, 0 = empty space
  const heartGrid = [
    [0, 1, 1, 0, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 1 } }}
      className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-black to-maroon-900"
    >
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mb-12 animate-float"
      >
        <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
          {heartGrid.map((row, rIdx) => 
            row.map((cell, cIdx) => (
              <div key={`${rIdx}-${cIdx}`} className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                {cell === 1 ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + (rIdx * 0.1) + (cIdx * 0.05) }}
                    className="w-full h-full bg-maroon-800/50 rounded-sm overflow-hidden border border-cream/10 shadow-sm"
                  >
                    <img src="/memory.png" className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity" alt="" />
                  </motion.div>
                ) : null}
              </div>
            ))
          )}
        </div>
      </motion.div>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 1 }}
        className="text-center font-serif text-lg text-cream/90 mb-8 max-w-[280px]"
      >
        Tất cả những kỷ niệm nhỏ này là dành cho cậu. Chúc Mừng Sinh Nhật, Cậu.
      </motion.p>

      <motion.button 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
        onClick={onNext}
        className="flex items-center gap-2 text-gold font-medium px-6 py-3 border border-gold/30 rounded-full hover:bg-gold/10 transition-colors"
      >
        Lá thư dành cho cậu ➔
      </motion.button>
    </motion.div>
  );
};

// Screen 5: The Letter
const Screen5 = ({ onNext }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50, transition: { duration: 0.8 } }}
      className="w-full h-full flex flex-col items-center p-6 pt-12 overflow-y-auto no-scrollbar relative"
    >
      <div className="w-full max-w-sm relative rounded-md shadow-2xl p-6 pb-20 mt-8 bg-[#e8dcc4] overflow-hidden">
        {/* Paper texture overlay via image */}
        <div 
          className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none"
          style={{ backgroundImage: 'url(/paper.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        ></div>
        
        {/* Polaroid at top */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-28 bg-white p-2 pb-6 shadow-md rotate-[-3deg] z-10 border border-gray-200">
          <div className="w-full h-full bg-gray-200 overflow-hidden">
             <img src="/memory.png" className="w-full h-full object-cover grayscale opacity-80" alt="" />
          </div>
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-400 rounded-full shadow-inner opacity-80 z-20" style={{boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)'}}></div>
        </div>

        <div className="mt-28 font-handwriting text-2xl text-[#2c2825] leading-loose relative z-10 space-y-4">
          <p>Gửi cậu,</p>
          <p>
            Thêm một tuổi mới rồi. Tuổi mới có thể sẽ có nhiều thử thách hơn, nhưng tớ mong cậu luôn giữ được nụ cười này. 
          </p>
          <p>
            Dù thế giới ngoài kia có bộn bề thế nào, hãy nhớ rằng luôn có một góc nhỏ bình yên ở đây đợi cậu.
          </p>
          <p className="text-right mt-8 mr-4">
            - Ký tên.
          </p>
        </div>
      </div>

      <motion.button 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={onNext}
        className="mt-8 mb-8 text-cream/70 hover:text-gold transition-colors flex items-center gap-2"
      >
        Vẫn còn nữa ➔
      </motion.button>
    </motion.div>
  );
};

// Screen 6: Shooting Star
const Screen6 = ({ wish }) => {
  const [shot, setShot] = useState(false);
  const [showFinal, setShowFinal] = useState(false);

  const handleShoot = () => {
    setShot(true);
    setTimeout(() => {
      setShowFinal(true);
    }, 1500); // Wait for shooting star animation to finish
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full flex flex-col items-center justify-center p-6 relative bg-gradient-to-b from-[#0a0a1a] to-black"
    >
      {shot && !showFinal && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[80%] left-[20%] w-1 h-1 bg-white rounded-full shadow-[0_0_20px_4px_rgba(255,255,255,0.8)] animate-shooting-star z-50">
            <div className="absolute top-0 right-0 w-[100px] h-px bg-gradient-to-l from-white to-transparent origin-right transform rotate-45"></div>
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {!showFinal ? (
          <motion.div 
            key="wish-prep"
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center text-center"
          >
            <div className="mb-12 font-serif text-2xl text-cream/90 flex flex-col gap-4 items-center">
              <span className="text-sm uppercase tracking-widest text-gold/70">Điều ước của cậu</span>
              <span className="text-3xl font-bold text-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.3)] px-6 py-3 border border-gold/20 rounded-2xl bg-gold/5">
                "{wish}"
              </span>
            </div>

            <p className="text-cream/60 mb-8">Gửi điều ước lên trời</p>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleShoot}
              disabled={shot}
              className="w-20 h-20 rounded-full bg-gradient-to-br from-gold to-yellow-600 flex items-center justify-center shadow-[0_0_30px_rgba(255,215,0,0.4)] disabled:opacity-50"
            >
              <Star className="w-10 h-10 text-maroon-900 fill-maroon-900" />
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="final-message"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, type: "spring" }}
            className="text-center"
          >
            <Sparkles className="w-16 h-16 text-gold mx-auto mb-6 animate-pulse" />
            <h1 className="font-serif text-4xl text-gold font-semibold mb-4 drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]">
              Điều ước đã được gửi đi ✨
            </h1>
            <p className="text-cream/80 text-lg">
              Chúc cậu một tuổi mới rực rỡ và bình an.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function App() {
  const [step, setStep] = useState(0);
  const [wish, setWish] = useState("");

  return (
    <div className="w-full h-[100dvh] bg-black flex justify-center font-sans text-cream overflow-hidden">
      <div className="w-full max-w-[480px] h-full relative flex flex-col items-center bg-gradient-to-b from-maroon-900/40 to-black overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <AnimatePresence mode="wait">
          {step === 0 && <Screen1 key="screen1" onNext={() => setStep(1)} />}
          {step === 1 && <Screen2 key="screen2" onNext={() => setStep(2)} />}
          {step === 2 && <Screen3 key="screen3" onNext={(w) => { setWish(w); setStep(3); }} />}
          {step === 3 && <Screen4 key="screen4" onNext={() => setStep(4)} />}
          {step === 4 && <Screen5 key="screen5" onNext={() => setStep(5)} />}
          {step === 5 && <Screen6 key="screen6" wish={wish} />}
        </AnimatePresence>
      </div>
    </div>
  );
}
