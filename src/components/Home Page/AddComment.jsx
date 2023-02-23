import { Box, Button, Grid, InputBase } from "@mui/material";
import React, { useState } from "react";
import AddCommentIcon from "@mui/icons-material/AddComment";
import Joi from "joi";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const AddComment = ({ onSubmitComment, post }) => {
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
              className="add-photo-button"
              disabled={isFormInvalid()}
              variant="contained"
              startIcon={<AddCircleOutlineOutlinedIcon />}
              disableElevation
              type="submit"
              sx={{
                transform: "translateY(0%)",
                width: "130px",
                borderRadius: "1000px",
                backgroundColor: "#84e7b3",
                fontFamily: "Raleway, Arial, Helvetica, sans-serif",
                fontWeight: "700",

                "&:hover": { backgroundColor: "#074147" },
              }}
            >
              Submit
            </Button>
          }
          multiline
          fullWidth
          sx={{
            backgroundColor: "#eaebef",
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
