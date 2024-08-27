import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";

// Créez un composant de route protégée
const ProtectedRoute = ({ children }) => {
  // Vérifiez si l'utilisateur est authentifié (vous devrez implémenter cette fonction)
  const isAuthenticated = () => {
    // Exemple : vérifiez le token dans le localStorage ou l'état de l'application
    return localStorage.getItem("token") !== null;
  };

  if (!isAuthenticated()) {
    // Redirigez vers la page de connexion si non authentifié
    return <Navigate to="/auth/sign-in" replace />;
  }

  return children;
};

const App = () => {
  return (
    <Routes>
      <Route path="auth/*" element={<AuthLayout />} />

      <Route path="admin/*" element={<AdminRoute><AdminLayout /></AdminRoute>} />
      <Route path="rtl/*" element={<AdminRoute><RtlLayout /> </AdminRoute>} />

      <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />
    </Routes>
  );
};

const AdminRoute = ({ children }) => {

  const token = localStorage.getItem("token");


  return token ? <> {children}</> : <Navigate to="/auth/sign-in" />;
};


export default App;



// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import RtlLayout from "layouts/rtl";
// import AdminLayout from "layouts/admin";
// import AuthLayout from "layouts/auth";

// const App = () => {
//   return (
//     <Routes>
//       <Route path="auth/*" element={<AuthLayout />} />

//       {/* No authentication required for these routes */}
//       <Route path="admin/*" element={<AdminLayout />} />
//       <Route path="rtl/*" element={<RtlLayout />} />

//       <Route path="/" element={<Navigate to="/admin" replace />} />
//     </Routes>
//   );
// };

// export default App;
