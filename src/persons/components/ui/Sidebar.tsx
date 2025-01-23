import { People, PersonAdd, PersonSearch } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router";
interface Props {
  drawerWidth: number;
}

const PATHS = [
  { id: 1, title: "Personas", pathName: "persons", routeIcon: <People /> },
  { id: 2, title: "Buscar", pathName: "search", routeIcon: <PersonSearch /> },
  { id: 3, title: "Agregar", pathName: "add", routeIcon: <PersonAdd /> },
];
export const Sidebar = ({ drawerWidth }: Props) => {
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent" //Temporary
        open
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            @Bienvenido
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {/* LINKS DEL NAVBAR */}
          {PATHS.map((path) => {
            return (
              <ListItem
                key={path.id}
                disablePadding
                sx={{
                  ml: 3,
                  alignItems: "center",
                  "&:hover": { backgroundColor: "action.hover" },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: "primary.main",
                  }}
                >
                  {path.routeIcon}
                </ListItemIcon>
                <Grid item>
                  <Button
                    variant="text"
                    sx={{
                      textTransform: "none",
                      px: 2,
                      "& a": {
                        textDecoration: "none",
                        color: "text.primary",
                        "&:hover": { color: "primary.main" },
                      },
                    }}
                  >
                    <Link to={`/${path.pathName}`}>{path.title}</Link>
                  </Button>
                </Grid>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </Box>
  );
};
