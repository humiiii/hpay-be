import React from "react";
const Footer = () => {
  return (
    <footer className="bg-gray-100 text-center py-4 text-sm text-gray-600">
      &copy; {new Date().getFullYear()} MyApp. All rights reserved.
    </footer>
  );
};
export default Footer;
