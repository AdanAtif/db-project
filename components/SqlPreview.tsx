"use client";

import React from "react";

type SQLPreviewProps = {
  sqlText: string;
};

const SQLPreview: React.FC<SQLPreviewProps> = ({ sqlText }) => {
  return (
    <div className="relative py-3 sm:max-w-md w-full">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-200 to-emerald-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
      <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-8">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-semibold text-slate-950 mb-4">
            SQL Preview
          </h2>
          <p className="bg-gray-100 p-6 rounded-md text-lg font-bold">
            {sqlText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SQLPreview;
