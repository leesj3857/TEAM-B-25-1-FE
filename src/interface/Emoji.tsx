// interface/Emoji.tsx
import styled from '@emotion/styled';

interface EmojiProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export default function Emoji({ children, ...props }: EmojiProps) {
  return <EmojiText {...props}>{children}</EmojiText>;
}

const EmojiText = styled.span`
  font-family: 'Tossface';
`;
