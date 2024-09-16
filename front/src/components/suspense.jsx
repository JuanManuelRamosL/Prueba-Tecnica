import React, { useEffect, useState } from "react";

export default function SuspenseCard() {
  return (
    <div className="w-full max-w-lg p-4 border border-gray-300 rounded-lg mb-5 animate-pulse">
      <div className="flex flex-col items-center">
        <div className="w-full h-40 bg-gray-300 rounded mb-4"></div>
        <div className="w-3/4 h-6 bg-gray-300 rounded mb-2"></div>
        <div className="w-1/2 h-6 bg-gray-300 rounded mb-4"></div>
        <div className="w-5/6 h-4 bg-gray-200 rounded mb-2"></div>
        <div className="w-5/6 h-4 bg-gray-200 rounded mb-2"></div>
      </div>
    </div>
  );
}
