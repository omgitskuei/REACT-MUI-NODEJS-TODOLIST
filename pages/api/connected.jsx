import clientPromise from "../../lib/mongodb.js";
import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";
import TroubleshootOutlinedIcon from "@mui/icons-material/TroubleshootOutlined";
import Typography from "@mui/material/Typography";

export const getServerSideProps = async () => {
  try {
    await clientPromise;
    console.log("Connected!");
    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};

export default function Connected({ isConnected }) {
  return (
    <div className="container">
      <main>
        {isConnected ? (
          <Typography sx={{ mt: 3, mb: 3 }} color="text.secondary">
            <TroubleshootOutlinedIcon sx={{ mr: 1, verticalAlign: "middle" }} />
            {"Connected to MongoDB"}
          </Typography>
        ) : (
          <Typography sx={{ mt: 3, mb: 3 }} color="text.secondary">
            <SearchOffOutlinedIcon sx={{ mr: 1, verticalAlign: "middle" }} />
            {"Not Connected to MongoDB"}
          </Typography>
        )}
      </main>
    </div>
  );
}
