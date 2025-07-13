import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface Props {
  open: boolean;
  onAddConfirm: () => void;
  onRemoveConfirm: () => void;
  onCancel: () => void;
  movieName: string;
  isFavorite: boolean;
}

const FavoriteModal: React.FC<Props> = ({
  open,
  onAddConfirm,
  onRemoveConfirm,
  onCancel,
  movieName,
  isFavorite,
}) => {
  if (isFavorite) {
    return (
      <Dialog open={open} onClose={onCancel}>
        <DialogTitle>Удалить из избранного?</DialogTitle>
        <DialogContent>
          <Typography>
            Вы уверены, что хотите удалить «{movieName}» из избранного?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>Отмена</Button>
          <Button variant="contained" onClick={onRemoveConfirm}>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Добавить в избранное?</DialogTitle>
      <DialogContent>
        <Typography>
          Вы уверены, что хотите добавить «{movieName}» в избранное?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Отмена</Button>
        <Button variant="contained" onClick={onAddConfirm}>
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FavoriteModal;
