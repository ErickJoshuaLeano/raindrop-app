import { Box, Button, Grid, InputBase, useTheme } from "@mui/material";
import React, { useState } from "react";
import AddCommentIcon from "@mui/icons-material/AddComment";
import Joi from "joi";
import SendIcon from "@mui/icons-material/Send";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const AddComment = ({ onSubmitComment, post, setUpdateComments }) => {
  const theme = useTheme();
  const [form, setForm] = useState({
    body: "",
  });

  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    body: Joi.string().required(),
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmitComment(form, post.id);
    form.body = "";
    setUpdateComments(true);
  };

  const handleChange = ({ currentTarget: input }) => {
    setForm({
      ...form,
      [input.name]: input.value,
    });

    const { error } = schema
      .extract(input.name)
      .label(input.name)
      .validate(input.value);

    if (error) {
      setErrors({ ...errors, [input.name]: error.details[0].message });
    } else {
      delete errors[input.name];
      setErrors(errors);
    }
  };

  const isFormInvalid = () => {
    const result = schema.validate(form);

    return !!result.error;
  };

  return (
    <Grid component="form" justifyContent="center" onSubmit={handleSubmit}>
      <Grid item xs={12}>
        <InputBase
          name="body"
          error={!!errors.body}
          helperText={errors.body}
          onChange={handleChange}
          value={form.body}
          startAdornment={<AddCommentIcon sx={{ marginRight: "10px" }} />}
          endAdornment={
            <Button
              className="submit"
              disabled={isFormInvalid()}
              variant="contained"
              startIcon={<SendIcon />}
              disableElevation
              type="submit"
              sx={{
                transform: "translateY(0%)",
                width: "130px",
                borderRadius: "1000px",
                backgroundColor: theme.palette.postButton.main,
                fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                fontWeight: "700",

                "&:hover": { backgroundColor: "#074147" },
              }}
            >
              Send
            </Button>
          }
          multiline
          fullWidth
          sx={{
            backgroundColor: theme.palette.darkAccents.main,
            fontFamily: "Raleway, Arial, Helvetica, sans-serif",
            padding: "10px",
            borderRadius: "10px",
          }}
          placeholder="Add Comment"
        />
      </Grid>
    </Grid>
  );
};

export default AddComment;
