import { css } from '@emotion/react';

export const typography = {
  heading: {
    large:   { fontSize: 40, fontWeight: 700, lineHeight: '150%', letterSpacing: 1 },
    medium:  { fontSize: 32, fontWeight: 700, lineHeight: '150%', letterSpacing: 1 },
    small:   { fontSize: 25, fontWeight: 700, lineHeight: '150%', letterSpacing: 1 },
  },
  title: {
    xlarge:  { fontSize: 25, fontWeight: 700, lineHeight: '150%', letterSpacing: 0 },
    large:   { fontSize: 21, fontWeight: 700, lineHeight: '150%', letterSpacing: 0 },
    medium:  { fontSize: 19, fontWeight: 700, lineHeight: '150%', letterSpacing: 0 },
    small:   { fontSize: 17, fontWeight: 700, lineHeight: '150%', letterSpacing: 0 },
    xsmall:  { fontSize: 15, fontWeight: 700, lineHeight: '150%', letterSpacing: 0 },
  },
  body: {
    large:   { fontSize: 19, fontWeight: 400, lineHeight: '150%', letterSpacing: 0 },
    medium:  { fontSize: 17, fontWeight: 400, lineHeight: '150%', letterSpacing: 0 },
    small:   { fontSize: 16, fontWeight: 400, lineHeight: '150%', letterSpacing: 0 },
    xsmall:  { fontSize: 13, fontWeight: 400, lineHeight: '150%', letterSpacing: 0 },
  },
  label: {
    large:   { fontSize: 19, fontWeight: 400, lineHeight: '150%', letterSpacing: 0 },
    medium:  { fontSize: 17, fontWeight: 400, lineHeight: '150%', letterSpacing: 0 },
    small:   { fontSize: 15, fontWeight: 400, lineHeight: '150%', letterSpacing: 0 },
    xsmall:  { fontSize: 13, fontWeight: 400, lineHeight: '150%', letterSpacing: 0 },
  },
} as const;

type TypographyCategory = keyof typeof typography;
type HeadingSize = keyof typeof typography.heading;
type TitleSize = keyof typeof typography.title;
type BodySize = keyof typeof typography.body;
type LabelSize = keyof typeof typography.label;

type TypographyStyle = 
  | `heading.${HeadingSize}`
  | `title.${TitleSize}`
  | `body.${BodySize}`
  | `label.${LabelSize}`;

type TypographySize = HeadingSize | TitleSize | BodySize | LabelSize;

export const applyTypography = (style: TypographyStyle) => {
  const [category, size] = style.split('.') as [TypographyCategory, string];
  const typographyStyle = typography[category][size as keyof typeof typography[typeof category]];
  
  return css`
    font-size: ${typographyStyle.fontSize}px;
    font-weight: ${typographyStyle.fontWeight};
    line-height: ${typographyStyle.lineHeight};
    letter-spacing: ${typographyStyle.letterSpacing}px;
  `;
}; 