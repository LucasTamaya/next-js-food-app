import { Dispatch, SetStateAction } from "react";
import SnackBar from "./Common/SnackBar";

interface Props {
  openCheckoutSuccess: boolean;
  openSnackBar: boolean;
  setOpenSnackBar: Dispatch<SetStateAction<boolean>>;
}

const LayoutBeforeChekout: React.FC<Props> = ({
  openCheckoutSuccess,
  openSnackBar,
  setOpenSnackBar,
}) => {
  return (
    <main className="w-full h-[70vh] flex justify-center items-center">
      <p className="font-bold text-3xl text-main-red text-center">
        Redirection to Stripe checkout
      </p>
      {openCheckoutSuccess && (
        <SnackBar
          openSnackBar={openSnackBar}
          setOpenSnackBar={setOpenSnackBar}
          severity="success"
          message="Redirection to Stripe checkout"
        />
      )}
    </main>
  );
};

export default LayoutBeforeChekout;
