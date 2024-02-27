export interface TemplateProps {
    entry: {
        getIn: (args: string[]) => any;
    };
    widgetFor: (arg: string) => any;
}

