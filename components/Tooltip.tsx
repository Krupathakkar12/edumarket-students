import React from 'react';

interface TooltipProps {
    text: string;
    children: React.ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip: React.FC<TooltipProps> = ({ text, children, position = 'bottom' }) => {
    const positionClasses = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2'
    };

    return (
        <div className="relative group inline-block">
            {children}
            <div className={`absolute ${positionClasses[position]} z-50 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none`}>
                <div className="bg-gray-900 text-white text-xs font-medium px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                    {text}
                    <div className={`absolute w-2 h-2 bg-gray-900 transform rotate-45 ${position === 'top' ? 'top-full left-1/2 -translate-x-1/2 -mt-1' :
                            position === 'bottom' ? 'bottom-full left-1/2 -translate-x-1/2 -mb-1' :
                                position === 'left' ? 'left-full top-1/2 -translate-y-1/2 -ml-1' :
                                    'right-full top-1/2 -translate-y-1/2 -mr-1'
                        }`}></div>
                </div>
            </div>
        </div>
    );
};
