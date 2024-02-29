import * as React from "react";

interface ContentProps {
    content: React.ReactNode;
    className: string;
}

interface HTMLContentProps {
    content: string;
    className: string;
}


export const HTMLContent = ({ content, className }: HTMLContentProps) => (
    <div className={className} dangerouslySetInnerHTML={{ __html: content }} />
);

const Content = ({ content, className }: ContentProps) => (
    <div className={className}>{content}</div>
);

export default Content;
