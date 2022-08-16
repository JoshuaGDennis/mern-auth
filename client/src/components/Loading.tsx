import { CircularProgress, Stack, Typography } from "@mui/material";

interface LoadingProps {
  message: string;
}

const Loading = ({ message }: LoadingProps) => (
  <Stack
    alignItems="center"
    justifyContent="center"
    spacing={2}
    sx={{
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    }}
  >
    <CircularProgress size={60} />
    <Typography sx={{ color: (theme) => theme.palette.grey[600] }}>
      {message}
    </Typography>
  </Stack>
);

export default Loading;
