import React, { useState } from 'react';
import {
  TextField,
  Button,
  Card,
  IconButton,
  InputAdornment,
  styled,
  type ButtonProps,
  type TextFieldProps,
  type CardProps,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

// --- Custom TextField ---
export const AppTextField = styled((props: TextFieldProps) => {
  const { type, ...other } = props;
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';

  return (
    <TextField
      slotProps={{
        input: {
          endAdornment: isPassword ? (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                size="small"
              >
                {showPassword ? (
                  <VisibilityOff fontSize="small" />
                ) : (
                  <Visibility fontSize="small" />
                )}
              </IconButton>
            </InputAdornment>
          ) : null,
        },
      }}
      type={isPassword ? (showPassword ? 'text' : 'password') : type}
      {...other}
    />
  );
})({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#F5F5F7',
    borderRadius: '12px',
    transition: 'all 0.2s ease-in-out',
    padding: '2px 4px', // Adjusting for internal padding to reach ~14px vertical
    '& fieldset': {
      border: 'none',
    },
    '&:hover fieldset': {
      border: 'none',
    },
    '&.Mui-focused fieldset': {
      border: '2px solid #4F46E5',
    },
    '& input': {
      padding: '14px 16px',
      color: '#1a1a2e',
      '&::placeholder': {
        color: '#9CA3AF',
        opacity: 1,
      },
    },
  },
  '& .MuiInputLabel-root': {
    display: 'none', // We'll use external labels as per the design
  },
});

// --- Custom Button ---
export const AppButton = styled(Button)<ButtonProps & { fullWidth?: boolean }>(
  ({ fullWidth }) => ({
    backgroundColor: '#4F46E5',
    color: '#FFFFFF',
    borderRadius: '8px',
    padding: '12px 24px',
    fontWeight: 600,
    textTransform: 'none',
    fontSize: '1rem',
    boxShadow: 'none',
    width: fullWidth ? '100%' : 'auto',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: '#3730A3', // Darker blue
      boxShadow: '0px 4px 12px rgba(79, 70, 229, 0.2)',
    },
    '&:active': {
      transform: 'scale(0.98)',
    },
  }),
);

// --- Custom Card ---
export const AppCard = styled(Card)<CardProps>(() => ({
  backgroundColor: '#FFFFFF',
  borderRadius: '20px',
  padding: '32px',
  boxShadow: '0px 4px 20px rgba(0,0,0,0.08)',
  transition: 'all 0.3s ease-in-out',
  border: 'none',
  '&:hover': {
    boxShadow: '0px 8px 30px rgba(0,0,0,0.12)',
    transform: 'translateY(-2px)',
  },
}));
