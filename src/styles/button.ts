import { css } from '@emotion/react';
import { primary } from './colors/primary';
import { grayscale } from './colors/grayscale';
import { secondary } from './colors/secondary';
import { typography, applyTypography } from './typography';

export const button = {
    Primary: css`
        background-color: ${primary[30]};
        color: #fff;
        ${applyTypography('label.medium')}
        border: none;
        border-radius: 8px;
        box-shadow: none;
        transition: background-color 0.2s;
        cursor: pointer;
        &:hover {
            background-color: ${primary[40]};
        }
        &:active {
            background-color: ${primary[50]};
        }
        &:disabled {
            background-color: ${grayscale[30]};
            color: ${grayscale[60]};
        }
    `,
    Secondary: css`
        background-color: ${secondary[5]};
        border: 1px solid ${secondary[10]};
        color: ${secondary[50]};
        ${applyTypography('label.medium')}
        border-radius: 8px;
        box-shadow: none;
        transition: background-color 0.2s;
        cursor: pointer;
        &:hover {
            background-color: ${secondary[10]};
            border: 1px solid ${secondary[20]};
            color: ${secondary[60]};
        }
        &:active {
            background-color: ${secondary[20]};
            border: 1px solid ${secondary[30]};
            color: ${secondary[70]};
        }
        &:disabled {
            background-color: ${grayscale[30]};
            border: 1px solid ${grayscale[40]};
            color: ${grayscale[60]};
        }
    `,
    Tertiary: css`
        background-color: ${grayscale[0]};
        border: 1px solid ${secondary[70]};
        color: ${secondary[70]};
        ${applyTypography('label.medium')}
        border-radius: 8px;
        box-shadow: none;
        transition: background-color 0.2s;
        cursor: pointer;
        &:hover {
            background-color: ${grayscale[5]};
        }
        &:active {
            background-color: ${primary[5]};
            border: 1px solid ${secondary[60]};
        }
        &:disabled {
            background-color: ${grayscale[30]};
            border: 1px solid ${grayscale[40]};
            color: ${grayscale[60]};
        }
    `,
};