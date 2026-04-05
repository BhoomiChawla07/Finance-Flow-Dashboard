import { Box, Typography } from "@mui/material";

const NoData = ({ message = "No Data Available" }) => {
  return (
    <Box
      sx={{
        textAlign: "center",
        p: 4,
        color: "gray",
      }}
    >
      <Typography variant="h6">{message}</Typography>
    </Box>
  );
};

export default NoData;