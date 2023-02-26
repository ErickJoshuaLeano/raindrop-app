import { Grid, TextField } from "@mui/material";
import React from "react";

const EditUserForm = () => {
  return (
    <div>
      {" "}
      <Grid item xs={12}>
        <TextField
          name="name"
          error={!!errors.name}
          helperText={errors.name}
          onChange={handleChange}
          value={form.name}
          label="Name"
          variant="standard"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="username"
          error={!!errors.username}
          helperText={errors.username}
          onChange={handleChange}
          value={form.username}
          label="Username"
          variant="standard"
          fullWidth
        />
      </Grid>
      <Grid item xs={1}>
        <TextField
          name="email"
          error={!!errors.email}
          helperText={errors.email}
          onChange={handleChange}
          value={form.email}
          label="Email"
          variant="standard"
          fullWidth
        />
      </Grid>
    </div>
  );
};

export default EditUserForm;
