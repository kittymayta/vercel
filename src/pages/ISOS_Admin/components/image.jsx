import React, { useState } from 'react';

const Image = ({ imagen }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex flex-col items-center">
        <div
        className="relative group overflow-hidden"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        >
            <img
            src={imagen.link}
            className={`transition-transform duration-300 ease-in-out ${hovered ? "scale-125" : "scale-100"}`}
            style={{ width: '300px', height: '200px', objectFit: 'cover' }}
            />
            {hovered && (
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2">
                <p>{imagen.descripcion}</p>
            </div>
            )}
        </div>
    </div>
  );
};

export default Image;