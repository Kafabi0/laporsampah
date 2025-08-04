
import React from "react";
import { Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function ModernButton({ to, children }) {
  return (
    <Box
      component={RouterLink}
      to={to}
      sx={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        px: 3,
        py: 1.5,
        fontSize: "1.1rem",
        fontWeight: 700,
        color: "white",
        textDecoration: "none",
        cursor: "pointer",
        overflow: "hidden",
        transition: "color 0.48s cubic-bezier(0.23,1,0.32,1), transform 0.48s cubic-bezier(0.23,1,0.32,1)",
        "&::before": {
          content: '""',
          position: "absolute",
          zIndex: -1,
          left: 0,
          top: "50%",
          transform: "translateY(-50%) scaleY(0)",
          width: "3px",
          height: "100%",
          backgroundColor: "green",
          transition: "transform 0.48s 0.4s cubic-bezier(0.23,1,0.32,1), width 0.48s 0.1s cubic-bezier(0.23,1,0.32,1)",
        },
        "&:hover": {
          color: "#fff",
          transform: "translateY(-1px)",
          "&::before": {
            transform: "translateY(-50%) scaleY(1)",
            width: "100%",
            transition: "transform 0.48s 0.1s cubic-bezier(0.23,1,0.32,1), width 0.48s 0.4s cubic-bezier(0.23,1,0.32,1)",
          },
        },
        "&:active": {
          transform: "scale(0.95)",
        },
      }}
    >
      {children}
    </Box>
  );
}
