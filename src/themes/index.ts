import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          background: "none",
          padding: "10px 6px",
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          display: "inline-block",
          verticalAlign: "top",
          width: 250,
        },
      },
      defaultProps: {
        size: "small",
      },
    },
    MuiSelect: {
      defaultProps: {
        size: "small",
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          // width: 250,
          // @better-do: Write "margin: 4" here will creating BUGs!!
          marginRight: 4,
          marginLeft: 4,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
    MuiCheckbox: {
      defaultProps: { size: "small" },
    },
  },
});
