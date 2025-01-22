import { People, PersonAdd, PersonSearch } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  Grid,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
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
            Fabian Niclous
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {/* LINKS DEL NAVBAR */}
          {PATHS.map((path) => (
            <ListItem key={path.id} disablePadding>
              {/* Envolvemos el botón con Link para hacerlo funcional */}
              <ListItemButton
                component={Link}
                href={`/${path.pathName.toLowerCase()}`}
              >
                <ListItemIcon>{path.routeIcon}</ListItemIcon>
                <Grid container>
                  <ListItemText primary={path.title} />
                </Grid>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
