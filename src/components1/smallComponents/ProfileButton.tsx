import Image from "next/image";
import React from "react";

interface ProfileButtonProps {
  imageSrc: string;
  name: string;
  onClick: () => void;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({
  imageSrc,
  name,
  onClick,
}) => {
  return (
    <button onClick={onClick} className="p-1">
      <div className="relative w-10 h-10 rounded-full overflow-hidden border-2">
        <Image
          src={imageSrc}
          alt={name}
          width={40}
          height={40}
          className="object-cover"
        />
      </div>
    </button>
  );
};

export default ProfileButton;
