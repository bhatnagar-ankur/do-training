import { useState, useEffect } from "react";
import HomeLayout from "@/components/HomeLayout";
import AdvancedGrid from "@/components/AdvancedGrid";

export default function Profile() {
  
    return (
        <HomeLayout >
            <div className="flex flex-wrap justify-center mt-8">
               

                <div className="p-6 bg-white rounded-lg shadow-md w-full lg:w-2/3 m-4">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">User Data Grid</h2>
                    <AdvancedGrid />
                </div>
            </div>
        </HomeLayout>
    );
}
