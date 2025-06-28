import PropTypes from "prop-types";
import { useSnapshot } from "valtio";
import { getContrastingColor } from "../config/helpers";

import state from "../store";
const CustomButton = ({
    type,
    title,
    customStyles,
    handleClick,
    disabled = false,
}) => {
    const snap = useSnapshot(state);

    const generateStyle = (type) => {
        const baseStyle = {
            opacity: disabled ? 0.5 : 1,
            cursor: disabled ? "not-allowed" : "pointer",
        };

        if (type === "filled") {
            return {
                ...baseStyle,
                backgroundColor: snap.color,
                color: getContrastingColor(snap.color),
            };
        } else if (type === "outline") {
            return {
                ...baseStyle,
                borderWidth: "1px",
                borderColor: snap.color,
                color: snap.color,
            };
        }
        return baseStyle;
    };

    return (
        <button
            className={`px-2 py-1.5 flex-1 rounded-md transition-opacity ${customStyles}`}
            style={generateStyle(type)}
            onClick={disabled ? undefined : handleClick}
            disabled={disabled}
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
    disabled: PropTypes.bool,
};

export default CustomButton;
