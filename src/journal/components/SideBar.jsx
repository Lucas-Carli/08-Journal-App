import { Grid, Box, Divider, Drawer, List, ListItem, ListItemText,  ListItemButton, ListItemIcon, Toolbar, Typography } from "@mui/material"
import { TurnedInNot } from "@mui/icons-material"

export const SideBar = ({ drawerWidth = 240}) => {
    return (
        <Box
            component='nav'
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant='permanent' // temporary
                open
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width:  drawerWidth }
                }}
            >
                <Toolbar>
                    <Typography variant='h6' noWrap component='div'>
                        Lucas Carli
                    </Typography>

                </Toolbar>
                <Divider />

                <List>
                    {
                        ['Enero', 'Febrero', 'Marzo', 'Abril'].map(text => (
                            <ListItem key={ text } disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <TurnedInNot />
                                    </ListItemIcon>

                                    <Grid container>
                                        <ListItemText primary={text} />
                                        <ListItemText secondary={'Sint labore incididunt laboris fugiat veniam amet laborum culpa ex aliqua occaecat ea ea.'} />
                                    </Grid>

                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </List>

            </Drawer>
        </Box>
    )
}
