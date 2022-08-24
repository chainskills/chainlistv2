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
    // state variable used to kee the information about the article
    const [article, setArticle] = useState({
                                           name: "",
                                           description: "",
                                           price: "0",
                                           });
    
    // state variable used to display error messages
    const [errorName, setErrorName] = useState(false);
    const [errorDescription, setErrorDescription] = useState(false);
    const [errorPrice, setErrorPrice] = useState(false);
    
    // function called each time we change a value
    const onChange = (e) => {
        setArticle({
                   ...article,
                   [e.target.name]: e.target.value,
                   });
    };
    
    // function called when we click on the Save button
    const handleSave = () => {
        let error = false;
        
        setErrorName(false);
        if (article.name === "") {
            error = true;
            setErrorName(true);
        }
        
        setErrorDescription(false);
        if (article.description === "") {
            error = true;
            setErrorDescription(true);
        }
        
        setErrorPrice(false);
        if (Number(article.price) === 0) {
            error = true;
            setErrorPrice(true);
        }
        
        if (!error) {
            handleCloseDialog(false);
            handleSaveDialog(article);
        }
    };
    
    // called when we cancel changes
    const handleCancel = () => {
        handleCloseDialog(false);
    };
    
    return (
            <div>
            <Dialog open={isDialogOpened} onClose={handleCancel}>
            <DialogTitle>Article</DialogTitle>
            <DialogContent>
            <TextField
            error={errorName}
            helperText={errorName ? "A name is required" : ""}
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
            error={errorDescription}
            helperText={errorDescription ? "A description is required" : ""}
            margin="dense"
            name="description"
            value={article.description}
            label="Enter the description of the article"
            fullWidth
            variant="standard"
            onChange={onChange}
            />
            <TextField
            error={errorPrice}
            helperText={
            errorPrice ? "The price must be greater than 0 ETH" : ""
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
            <Button onClick={handleCancel} color="primary">
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