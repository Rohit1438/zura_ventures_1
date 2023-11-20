import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "../Pages/Homepage";




export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      {/* <Route
        path="/admin"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route path="/watchlist" element={<SavedPage />} />
      <Route path="/movies/:id" element={<SingleProductsPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} /> */}
    </Routes>
  );
};
