import React from 'react';
import PropTypes from 'prop-types';

const ErrorHandler = ({ error, onClose }) => {
    if (!error) return null;

    const getErrorConfig = (type) => {
        const configs = {
            api_limit: {
                title: 'API Rate Limit Exceeded',
                icon: '⏱️',
                bgColor: 'bg-orange-50',
                borderColor: 'border-orange-200',
                textColor: 'text-orange-800',
                buttonColor: 'bg-orange-600 hover:bg-orange-700'
            },
            network: {
                title: 'Network Error',
                icon: '🌐',
                bgColor: 'bg-red-50',
                borderColor: 'border-red-200',
                textColor: 'text-red-800',
                buttonColor: 'bg-red-600 hover:bg-red-700'
            },
            generation: {
                title: 'Generation Failed',
                icon: '🎨',
                bgColor: 'bg-yellow-50',
                borderColor: 'border-yellow-200',
                textColor: 'text-yellow-800',
                buttonColor: 'bg-yellow-600 hover:bg-yellow-700'
            },
            upload: {
                title: 'Upload Error',
                icon: '📁',
                bgColor: 'bg-blue-50',
                borderColor: 'border-blue-200',
                textColor: 'text-blue-800',
                buttonColor: 'bg-blue-600 hover:bg-blue-700'
            },
            validation: {
                title: 'Validation Error',
                icon: '⚠️',
                bgColor: 'bg-purple-50',
                borderColor: 'border-purple-200',
                textColor: 'text-purple-800',
                buttonColor: 'bg-purple-600 hover:bg-purple-700'
            },
            general: {
                title: 'Error',
                icon: '❌',
                bgColor: 'bg-gray-50',
                borderColor: 'border-gray-200',
                textColor: 'text-gray-800',
                buttonColor: 'bg-gray-600 hover:bg-gray-700'
            }
        };
        return configs[type] || configs.general;
    };

    const config = getErrorConfig(error.type);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className={`max-w-md w-full ${config.bgColor} ${config.borderColor} border rounded-lg shadow-lg`}>
                <div className="p-6">
                    <div className="flex items-center mb-4">
                        <span className="text-2xl mr-3">{config.icon}</span>
                        <h3 className={`text-lg font-semibold ${config.textColor}`}>
                            {config.title}
                        </h3>
                    </div>
                    
                    <p className={`mb-6 ${config.textColor}`}>
                        {error.message}
                    </p>
                    
                    <div className="flex justify-end">
                        <button
                            onClick={onClose}
                            className={`px-4 py-2 ${config.buttonColor} text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                        >
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

ErrorHandler.propTypes = {
    error: PropTypes.shape({
        message: PropTypes.string.isRequired,
        type: PropTypes.string,
        timestamp: PropTypes.number
    }),
    onClose: PropTypes.func.isRequired
};

export default ErrorHandler;
