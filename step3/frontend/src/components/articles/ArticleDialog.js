import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import NumberFormatCustom from "utils/NumberFormatCustom";

const ArticleDialog = ({
  isDialogOpened,
  handleCloseDialog,
  handleSaveDialog,
}) => {
  // state variable for information about the article to create
  const [article, setArticle] = useState({
    name: "",
    description: "",
    price: "0",
  });

  // state variables for error flags
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [priceError, setPriceError] = useState(false);

  // function called each time we change one of the fields in the form
  const onChange = (e) => {
    setArticle({
      ...article,
      [e.target.name]: e.target.value,
    });
  };

  // function called when we click the Save button
  const handleSave = () => {
    let error = false;

    setNameError(false);
    if (article.name === "") {
      error = true;
      setNameError(true);
    }

    setDescriptionError(false);
    if (article.description === "") {
      error = true;
      setDescriptionError(true);
    }

    setPriceError(false);
    if (Number(article.price) === 0) {
      error = true;
      setPriceError(true);
    }
    if (!error) {
      handleCloseDialog();
      handleSaveDialog(article);
    }
  };

  return (
    <div>
      <Dialog open={isDialogOpened} onClose={handleCloseDialog}>
        <DialogTitle>Article</DialogTitle>
        <DialogContent>
          <TextField
            error={nameError}
            helperText={nameError ? "A name is required" : ""}
            autoFocus
            margin="dense"
            name="name"
            value={article.name}
            label="Enter the name of the article"
            fullWidth
            variant="standard"
            onChange={onChange}
          />
          <TextField
            error={descriptionError}
            helperText={descriptionError ? "A description is required" : ""}
            margin="dense"
            name="description"
            value={article.description}
            label="Enter the description of the article"
            fullWidth
            variant="standard"
            onChange={onChange}
          />
          <TextField
            error={priceError}
            helperText={
              priceError ? "The price must be greater than 0 ETH" : ""
            }
            label="Price in ETH"
            value={article.price}
            onChange={onChange}
            name="price"
            variant="standard"
            InputProps={{
              inputComponent: NumberFormatCustom,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ArticleDialog.propTypes = {
  isDialogOpened: PropTypes.bool.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
  handleSaveDialog: PropTypes.func.isRequired,
};

export default ArticleDialog;
