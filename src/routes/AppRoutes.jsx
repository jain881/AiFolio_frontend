import React from "react";
import LandingPage from "../LandingPage";
import { Routes, Route } from "react-router-dom";
import MainPage from "../Portfolio/MainPage";
import NeoStackPortfolio from "../Portfolio/PaidPortfolio/NeoStackPortfolio";
import AdminPanel from "../Portfolio/AdminPanel";
import CinematicPortfolio from "../Portfolio/PaidPortfolio/CinematicPortfolio";
import LuminaPortfolio from "../Portfolio/PaidPortfolio/LuminaPortfolio";

const AppRoutes = () => {
    const injectedData = window.__PORTFOLIO_DATA__ || null;

    return (
        <Routes>
            <Route path="/" element={<LandingPage/>} />
            {injectedData && (
                <Route
                path="/portfolio"
                element={<MainPage responseData={injectedData} />}
                />
            )}
            <Route path = '/paid/neostack' element={<NeoStackPortfolio />} />
            <Route path = '/paid/cinematic' element={<CinematicPortfolio />} />
            <Route path = '/paid/lumina' element={<LuminaPortfolio />} />
            <Route path="/admin" element={<AdminPanel />} />

            {/* Fallback */}
            <Route path="*" element={<LandingPage />} />
        </Routes>
    )
}

export default AppRoutes;