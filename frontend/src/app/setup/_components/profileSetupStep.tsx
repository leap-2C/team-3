import { Dispatch, SetStateAction } from "react";
interface ProfileSetupProps {
  setStep: Dispatch<SetStateAction<string>>;
}
const ProfileSetup: React.FC<ProfileSetupProps> = ({ setStep }) => {
  const handleClickBlue = () => {
    setStep("CardSetup");
  };
  return (
    <>
      <div>
        <button onClick={handleClickBlue} className="text-white">
          CLick me to change step
        </button>
      </div>
    </>
  );
};

export default ProfileSetup;
