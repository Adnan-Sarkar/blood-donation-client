import React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Container, Dialog, DialogContent, DialogTitle, styled, SxProps } from "@mui/material";

type TProps = {
  title: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  sx?: SxProps;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const CustomFullScreenModal = ({
                                 title = "",
                                 open = false,
                                 setOpen,
                                 children,
                                 sx,
                               }: TProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        fullScreen
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{ ...sx }}
        TransitionComponent={Transition}
      >
        <Container>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
          <DialogContent>{children}</DialogContent>
        </Container>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default CustomFullScreenModal;