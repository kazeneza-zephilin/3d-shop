import PropTypes from "prop-types";
import { useSnapshot } from "valtio";
import { getContrastingColor } from "../config/helpers";

import state from "../store";
const CustomButton = ({ type, title, customStyles, handleClick }) => {
    const snap = useSnapshot(state);

    const generateStyle = (type) => {
        if (type === "filled") {
            return {
                backgroundColor: snap.color,
                color: getContrastingColor(snap.color),
            };
        } else if (type === 'outline'){
            return {
                borderWidth: '1px',
                borderColor: snap.color,
                color: snap.color,
            }
        }
    };

    return (
        <button
            className={`px-2 py-1.5 flex-1 rounded-md cursor-pointer ${customStyles}`}
            style={generateStyle(type)}
            onClick={handleClick}
        >
            {title}
        </button>
    );
};

CustomButton.propTypes = {
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    customStyles: PropTypes.string,
    handleClick: PropTypes.func,
};

export default CustomButton;
