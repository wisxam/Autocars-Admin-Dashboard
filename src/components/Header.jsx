//this is a shared component that will be used in multiple places
import { Palette } from "@mui/icons-material";
import { Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { tokens } from "../theme";
//the header will take in 2 properties which will be the title and the subtitle
const Header = ({ title, subtitle }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode); 
    return (
        <Box mb="30px">   
            <Typography 
             variant="h2"
             color={colors.grey[100]} 
             fontWeight="bold"
             sx={{ mb: "5px"}}
            >
             { title }
             </Typography>
            <Typography variant="h5" color={colors.greenAccent[400]}>{ subtitle }</Typography>
        </Box>
    )
}

export default Header;