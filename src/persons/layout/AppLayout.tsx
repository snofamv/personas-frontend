import { Box, Toolbar } from "@mui/material";
import { Navbar, Sidebar } from "../components/ui";

interface Props {
  children: React.JSX.Element;
}
const drawerWidth = 240;
export const AppLayout = ({ children }: Props) => {
  return (
    <Box sx={{ display: "flex" }}>
      {/* NAVBAR */}
      <Navbar drawerWidth={drawerWidth} />
      {/* SIDEBAR */}
      <Sidebar drawerWidth={drawerWidth} />
      <Box component={"main"} sx={{ flexGrow: 1, p: 3 }}>
        {/* TOOLBAR O NAVBAR */}
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default AppLayout;
