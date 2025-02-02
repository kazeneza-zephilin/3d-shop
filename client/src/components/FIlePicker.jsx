/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import CustomButton from "./CustomButton";

const FIlePicker = ({ file, setFile, readFile }) => {
    return (
        <div className="filepicker-container">
            <div className="flex flex-1 flex-col">
                <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <label htmlFor="file-upload" className="filepicker-label">
                    upload photo
                </label>
                <p className="mt-2 text-gray-500 text-xs truncate">
                  {file  === ''? "No file selected": file.name}
                </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <CustomButton 
              type="outline"
              title="logo"
              handleClick={() => readFile('logo')}
              customStyles='text-sm'
              />
              <CustomButton 
              type="filled"
              title="full"
              handleClick={() => readFile('full')}
              customStyles='text-sm'
              />
            </div>
        </div>
    );
};
FIlePicker.propTypes = {
    file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    setFile: PropTypes.func.isRequired,
    readFile: PropTypes.func.isRequired,
};

export default FIlePicker;
