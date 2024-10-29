import React from "react";
import {useNavigate} from "react-router-dom"; // Import useNavigate hook

interface Props {
    onEnter: () => void; // This prop is for the 'Enter' button
}

const AgeVerificationCard: React.FC<Props> = ({onEnter}) => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // Navigates back to the previous page
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            {" "}
            {/* Full viewport height and center alignment */}
            <div className="bg-black p-6 rounded-lg shadow-lg max-w-md mx-auto">
                <h1 className="text-3xl font-bold text-white mb-4 text-center">🍆TikCok💦💦💦</h1>
                <h2 className="text-xl font-bold text-white mb-4 text-center">CONFIRM YOU ARE OVER 18</h2>
                <p className="text-white text-sm mb-6 text-center">
                    This website contains age-restricted materials including nudity and explicit depictions of sexual
                    activity. By entering, you affirm that you are at least 18 years of age or the age of majority in
                    the jurisdiction you are accessing the website from and you consent to viewing sexually explicit
                    content.
                </p>

                <div className="grid grid-cols-[1fr,2fr] gap-6">
                    <button
                        onClick={goBack} // Use goBack function here for the "Go Back" button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center justify-center">
                        GO BACK
                    </button>
                    <button
                        onClick={onEnter} // Use onEnter prop for the "Enter" button
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center">
                        ENTER
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AgeVerificationCard;
